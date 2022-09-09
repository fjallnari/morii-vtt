<script lang="ts">
    import type { Character, Feature, Item } from "../../interfaces/Character";
    import SimpleButton from "../SimpleButton.svelte";
    import Dialog from '@smui/dialog';
    import CircularProgress from '@smui/circular-progress';
    import axios from "axios";
    import type QuickCreateData from "../../interfaces/QuickCreateData";
    import { Icon } from '@smui/button';
    import type QuickCreateCharacterParts from "../../interfaces/QuickCreateCharacterParts";
    import StepDetailRace from "./StepDetailRace.svelte";
    import StepDetailClass from "./StepDetailClass.svelte";
    import StepDetailSpellcasting from "./StepDetailSpellcasting.svelte";
    import StepDetailAbilityScores from "./StepDetailAbilityScores.svelte";
    import StepDetailBackground from "./StepDetailBackground.svelte";
    import StepDetailSummary from "./StepDetailSummary.svelte";
    import { nanoid } from "nanoid/non-secure";

    export let createCharacter: (characterTemplate?: {}) => Promise<void>;
    
    let open: boolean = true;
    let selectedStepIndex: number = 0;
    let characterTemplate: Partial<Character> = {};
    let characterParts: Partial<QuickCreateCharacterParts> = {};

    let creationSteps = [
        { name: 'Race', icon: 'account-supervisor', isCompleted: false, component: StepDetailRace },
        { name: 'Class', icon: 'arrow-projectile-multiple', isCompleted: false, component: StepDetailClass },
        { name: 'Spellcasting', icon: 'fire', isCompleted: false, component: StepDetailSpellcasting },
        { name: 'Ability Scores', icon: 'counter', isCompleted: false, component: StepDetailAbilityScores },
        { name: 'Background', icon: 'sprout', isCompleted: false, component: StepDetailBackground },
        { name: 'Summary', icon: 'clipboard-text', isCompleted: false, component: StepDetailSummary },
    ];

    const closeDialog = () => {
        characterParts = {};
        selectedStepIndex = 0;
        open = false;
    }
    
    // open is here just so the quick create fully resets for each open of the dialog
    // quick and dirty way to trigger the reactivity
    const loadQuickCreateData = async (open: boolean) => {
        if (open) {
            try {
                const response = await axios.get('/api/quick-create-data');
                const { characterSkeleton, ...quickCreateData } = response.data;

                characterTemplate = characterSkeleton;
                characterParts.ability_scores = quickCreateData.asBlank;
                characterParts.as_gen_info = quickCreateData.asGenInfo;
                characterParts.bio = quickCreateData.bio;
                characterParts.name = '';
                characterParts.weapons = quickCreateData.weapons;

                return quickCreateData as QuickCreateData;
            }
            catch (err) {
                console.log(err); 
            }
        }
        return {};
    }

    const assembleCharacterSheet = () => {
        const currentHP = characterParts.class?.hp.current ?? '';

        // ABILITY SCORES & SKILLS
        const skillsFinal = [].concat((characterParts.race?.skill_prof ?? [])).concat((characterParts.class?.skills.final ?? [])).concat((characterParts.bio?.skills ?? []));
        
        Object.keys(characterTemplate.ability_scores).forEach( tag => {
            let AS = characterTemplate.ability_scores[tag];
            AS.value = characterParts.ability_scores[tag].value ?? '';
            AS.saving_throw = characterParts.class?.saving_throws.includes(tag) ?? false;
            AS.skills = AS.skills.map(skill => { return { name: skill.name, proficiency: skillsFinal.some(skillIter => skillIter.toLowerCase() === skill.name.toLowerCase()) ? 1 : 0 }});
        });

        // FEATURES
        const racialTraits = (characterParts.race?.features ?? [])
            .map(trait => Object.assign(trait, { id: nanoid(16), type: 0, source: trait.source === '' ? characterParts.race?.name : trait.source ?? '' }));
        
        const classFeatures = (characterParts.class?.features.filter(feature => feature.level <= characterParts.class?.level ?? 0) ?? [])
            .map(feature => {  return { id: nanoid(16), name: feature.name, content: feature.content, type: 1, source: characterParts.class?.name ?? ''}});
        
        const feats = (characterParts.as_gen_info?.feats ?? []).map(feat => Object.assign(feat, { id: nanoid(16), type: 2, source: feat.source ?? '' }));

        const bkgFeatures = (characterParts.bio?.features ?? [])
            .map(feature => Object.assign(feature, { id: nanoid(16), type: 3, source: !feature.source || feature.source === '' ? characterParts.bio?.name : feature.source }));

        const featuresFinal = [].concat(racialTraits).concat(classFeatures).concat(feats).concat(bkgFeatures);

        // PROF BONUS
        const proficiencyBonus = characterParts.class ? Math.floor((characterParts.class.level - 1) / 4) + 2 : 0;

        // TOOLS
        const toolsProf = [].concat(characterParts.race?.tools_prof.map(tool => tool.name) ?? [])
            .concat(characterParts.class?.tool_prof.tools.map(tool => tool.name) ?? [])
            .concat(characterParts.bio.tools)
            .filter(tool => typeof tool === 'string' && tool !== '')
            .map(tool => { 
                return { 
                    id: nanoid(16),
                    name: tool,
                    ability: '',
                    proficiency: 1
                }
            });

        // OTHER PROF
        const languages = [].concat(characterParts.race?.languages ?? []).concat(characterParts.bio.languages)
            .map(language => {
                return {
                    id: nanoid(16),
                    name: language,
                    type: 3,
                    content: ''
                }
            });
        
        const otherProf = [].concat(characterParts.race?.other_prof ?? [])
            .concat(characterParts.class?.other_prof ?? [])
            .map(prof => { 
                return { 
                    id: nanoid(16),
                    name: prof.name,
                    type: prof.type ?? 0,
                    content: ''
                } 
            });
        
        // RESOURCES && RESOURCES && ATTACKS

        let resources = (characterParts.class?.resources ?? []).map(resource => Object.assign(resource, { id: nanoid(16), item_id: '', type: resource.type }));
        let attacks = [];

        const attackSkeleton = {
            atk_ability: '', // e.g. STR
            atk_bonus: '',
            atk_proficiency: false,
            range: '',
            dmg_die: '', // e.g. 1d6
            dmg_ability: '', // e.g. STR
            dmg_bonus: '',
            dmg_type: '', // e.g. Slashing
            versatile_die: '',
            versatile_active: false,
        }

        // EQUIPMENT
        const equipment = [].concat(characterParts.class?.equipment.flatMap(line => line.final) ?? []).concat(characterParts.bio.equipment)
            .map(item => {
                const itemID = nanoid(16);
                let resourceID = undefined;
                let attackID = undefined;
                
                const isResource = item.tags?.includes('resource') && true;
                const hasAttack = item.tags?.includes('weapon') && true;

                if (isResource) {
                    resourceID = nanoid(16);
                    resources = resources.concat([{ id: resourceID, item_id: itemID, name: item.name, total: item.amount, current: item.amount, type: 'complex' }]);
                }

                if (hasAttack) {
                    attackID = nanoid(16);
                    attacks = attacks.concat([Object.assign({}, { ... attackSkeleton, ... characterParts.weapons[item.name] ?? {},
                        id: nanoid(16), 
                        name: item.name, 
                        item_id: itemID,
                        atk_proficiency: otherProf.some(prof => prof.name === item.name) // TODO
                    })])
                }

                return {
                    id: itemID,
                    name: item.name,
                    is_equipped: true,
                    amount: item.amount,
                    has_weight: false,
                    has_attack: hasAttack,
                    attack_id: attackID ?? '',
                    want_tooltip: false,
                    tooltip: item.description ?? item.tooltip ?? '',
                    use_as_resource: isResource,
                    resource_id: resourceID ?? ''
                } as Item;
            })
        
        // SPELLCASTING
        const spellsFinal = characterParts.class?.spellcasting?.spells_by_level ?? characterTemplate.spells_by_level;

        Object.keys(spellsFinal).forEach(level => {
            spellsFinal[level].slots_total = spellsFinal[level].slots_current = characterParts.class?.spellcasting?.spell_slots[characterParts.class?.level - 1][~~level - 1] ?? '';
        })

        Object.assign(characterTemplate, {
            name: characterParts.name ?? '',
            classes: `${characterParts.class?.name ?? ''} ${characterParts.class?.level ?? ''}`,
            race: characterParts.race?.name ?? '',
            background: characterParts.bio?.name ?? '',
            prof_bonus: new Intl.NumberFormat("en-US", { signDisplay: 'exceptZero' }).format(proficiencyBonus + 0),
            speed_max: characterParts.race?.speed ?? '',
            hp_max: currentHP,
            hp_current: currentHP,
            hd_total: `${characterParts.class?.level ?? 0}d${characterParts.class?.hp.hit_die}`,
            hd_current: { [`d${characterParts.class?.hp.hit_die}`] : characterParts.class?.level ?? 0},

            inventory: equipment,
            other_profs: otherProf.concat(languages),
            tools: toolsProf,
            resources: resources,
            attacks: attacks,
            features: featuresFinal,

            // BIO TAB
            age: characterParts.race?.age ?? '',
            alignment: characterParts.race?.alignment ?? '',
            appearance: characterParts.bio.appearance ?? '',
            backstory: characterParts.bio.backstory ?? '',
            person_traits: characterParts.bio.personality ?? '',
            ideals: characterParts.bio.ideals ?? '',
            bonds: characterParts.bio.bonds ?? '',
            flaws: characterParts.bio.flaws ?? '',

            // SPELLS
            spell_ability: characterParts.class?.spellcasting?.ability ?? '',
            spells_by_level: spellsFinal
        });
                
        createCharacter(characterTemplate);
    }

    // $: skillsFinal = [].concat((characterParts.race?.skill_prof ?? []).map(skill => { return { name: skill, step: 0 }}))
    //     .concat((characterParts.class?.skills.final ?? []).map(skill => { return { name: skill, step: 1 }}))
    //     .concat((characterParts.bio?.skills ?? []).map(skill => { return { name: skill, step: 4 }}));

    // $: skillConflicts = skillsFinal.reduce((acc, curr) => {
    //     return acc[curr.name] ? acc[curr.name] = acc[curr.name].concat([curr.step]) : acc[curr.name] = [].concat([curr.step]), acc
    // }, {});

    // $: if (skillsFinal.length > 0 && skillConflicts) {
                        
    // }

</script>

<SimpleButton value='Quick-Create' icon="electric_bolt" type="primary" onClickFn={() => open = true}></SimpleButton>
<Dialog
    bind:open
    fullscreen
    scrimClickAction=""
    escapeKeyAction=""
    aria-labelledby="simple-title"
    surface$style="padding: 1em 1em; width: 80vw !important;"
>
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <h3 id="simple-title">Quick-Create</h3>
    {#await loadQuickCreateData(open)}
        <div id="progress-circle"><CircularProgress style="height: 4em; width: 4em;" indeterminate /></div>
    {:then quickCreateData}
        <dialog-content>
            <div class="creation-steps-list">
                {#each creationSteps as step, index}
                    <box class="creation-step-item {index === selectedStepIndex ? 'selected': ''}" on:click={() => {selectedStepIndex = index}} tabindex='0'>
                        <img class="step-icon"  
                            src="../static/{step.icon}.svg" 
                            alt="step-icon"
                        >
                        {step.name}
                        {#if step.isCompleted} <!-- TODO -->
                            <Icon id="filled-in-icon" class="material-icons">done</Icon>
                        {/if}
                    </box>
                {/each}
            </div>

            <svelte:component 
                this={creationSteps[selectedStepIndex].component}
                quickCreateData={quickCreateData}
                bind:characterParts={characterParts}
                bind:isCompleted={creationSteps[selectedStepIndex].isCompleted}
            />

            <dialog-buttons class="quick-create-buttons">
                <SimpleButton value='Cancel' icon="close" onClickFn={() => closeDialog()}></SimpleButton>
                <SimpleButton value='Create' icon='create' type='green' onClickFn={() => assembleCharacterSheet()}></SimpleButton>
            </dialog-buttons>
        </dialog-content>
    {/await}
</Dialog>

<style>

    dialog-content {
        height: calc(80vh - 2.5em);
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr; 
        grid-template-rows: 5fr 5fr 1fr;
        gap: 1em; 
        grid-template-areas: 
            "creation-steps step-detail step-detail step-detail"
            "creation-steps step-detail step-detail step-detail"
            "dialog-buttons dialog-buttons dialog-buttons dialog-buttons";
        font-family: Quicksand;
    }

    dialog-buttons { grid-area: dialog-buttons;
        display: flex;
        justify-content: center;
        gap: 1em;
    }

    :global(dialog-buttons.quick-create-buttons simple-button) {
        max-width: 25%;
        font-size: 1.5em;
        padding: 0.5em 0.5em !important;
    }

    .creation-steps-list { grid-area: creation-steps; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1em;
    }

    .creation-step-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5em;

        font-family: Quicksand;
        font-size: x-large;
        font-weight: 500;
        text-transform: uppercase;
        padding: 0.6em 0.3em;
        cursor: pointer;
        transition: all .2s ease-in-out;
    }

    .creation-step-item:hover {
        transform: scale(1.04);
        background-color: var(--clr-box-bg-light);
    }

    .creation-step-item:active {
        background-color: var(--clr-accent-darker);
    }

    .selected {
        transform: scale(1.04) !important;
        background-color: var(--clr-accent-dark) !important;
    }

    .creation-step-item img {
        height: 1em;
        width: 1em;
    }

</style>