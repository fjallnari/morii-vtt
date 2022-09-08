<script lang="ts">
    import type QuickCreateCharacterParts from "../../interfaces/QuickCreateCharacterParts";
    import type QuickCreateData from "../../interfaces/QuickCreateData";
    import { formatModifier } from "../../stores";
    import { getASModifier, validateClassName } from "../../util/util";
    import BoxWithChips from "../BoxWithChips.svelte";
    import BoxWithIcon from "../BoxWithIcon.svelte";
    import BoxWithList from "../BoxWithList.svelte";
    import InPlaceEditBox from "../InPlaceEditBox.svelte";
    import SimpleAccordionDetail from "./SimpleAccordionDetail.svelte";
    import { Icon } from '@smui/icon-button';
    import { human, species } from 'fantastical';
    import Svelecte from "svelecte/src/Svelecte.svelte";

    export let characterParts: QuickCreateCharacterParts;
    export let quickCreateData: QuickCreateData;
    export let isCompleted: boolean;


    $: skillsFinal = [].concat({ name: 'race', items: characterParts.race?.skill_prof ?? []})
        .concat({name: 'class', items: characterParts.class?.skills.final ?? []})
        .concat({name: 'background', items: characterParts.bio.skills});
    
    $: languagesFinal = [].concat(characterParts.race?.languages ?? []).concat(characterParts.bio.languages);
    $: toolsFinal = [].concat(characterParts.race?.tools_prof ?? []).concat(characterParts.class?.tool_prof.tools.map(tool => tool.name) ?? []).concat(characterParts.bio.tools);
    $: otherProfFinal = [].concat(characterParts.race?.other_prof.map(prof => prof.name) ?? []).concat(characterParts.class?.other_prof.map(prof => prof.name) ?? []);

    $: equipmentFinal = [].concat(characterParts.class?.equipment.flatMap(line => line.final) ?? []).concat(characterParts.bio.equipment);

    $: featuresFinal = [].concat(characterParts.race?.features ?? [])
        .concat(characterParts.class?.features.filter(feature => feature.level <= characterParts.class?.level ?? 1) ?? [])
        .concat(characterParts.as_gen_info.feats)
        .concat(characterParts.bio.features);

    $: classIcon = `class-icons/${validateClassName(characterParts.class ? characterParts.class.name.toLowerCase() : '')}`;
    $: raceIcon = `${characterParts.race?.name ? `race-icons/${characterParts.race?.name.toLowerCase()}` : 'account-supervisor'}`

    let selectedGender: 'male' | 'female' = 'male';

    const nameGenOpts = [
        { name: 'Human', fce: () => human({allowMultipleNames: true}) },
        { name: 'Elf', fce: () => species.elf(selectedGender), needsGender: true },
        { name: 'Dwarf', fce: () => species.dwarf(selectedGender), needsGender: true },
        { name: 'Halfling', fce: () => species.halfling(selectedGender), needsGender: true },
        { name: 'Tiefling', fce: () => species.halfdemon(selectedGender), needsGender: true },
        { name: 'Gnome', fce: () => species.gnome(selectedGender), needsGender: true },
        { name: 'Dragon', fce: () => species.dragon(selectedGender), needsGender: true },
        { name: 'Fairy', fce: () => species.fairy(selectedGender), needsGender: true },
        { name: 'Angel', fce: () => species.angel(selectedGender), needsGender: true },
        { name: 'Demon', fce: () => species.demon() },
        { name: 'Goblin', fce: () => species.goblin() },
    ];

    let selectedNameGen = nameGenOpts.find(opt => opt.name === characterParts.race?.name) ?? undefined;

    const generateName = () => {
        if (!selectedNameGen) {return}

        characterParts.name = selectedNameGen.fce();
    }

</script>
 
<summary-detail>
    <div class="basics">
        <div class="char-name">
            <div class="name-edit">
                <InPlaceEditBox bind:value={characterParts.name} characterLimit={20} boxLabel="Character Name" onSubmitFce={() => {}}></InPlaceEditBox>
                <sendable class='random-name' on:click={() => generateName()}>
                    <Icon class="material-icons">{'shuffle'}</Icon>
                </sendable> 
            </div>
            <div class="name-gen">
                <Svelecte 
                    options={nameGenOpts}
                    valueAsObject
                    placeholder='Name-gen'
                    class="svelecte-control{selectedNameGen ? '' : ' error-pulse'}"
                    bind:value={selectedNameGen}>
                </Svelecte>
                <box class="gender-options">
                    {#if selectedNameGen?.needsGender}
                        <div class='box-main-text'>
                            <sendable class='gender-icon {selectedGender === 'male' ? ' selected-gender': ''}' on:click={() => selectedGender = 'male'}>
                                <Icon class="material-icons">{'male'}</Icon>
                            </sendable> 
                            <sendable class='gender-icon{selectedGender === 'female' ? ' selected-gender': ''}' on:click={() => selectedGender = 'female'}>
                                <Icon class="material-icons">{'female'}</Icon>
                            </sendable> 
                        </div>
                    {:else}
                        <div class='box-main-text gender-icon'>
                            <Icon class="material-icons">{'all_inclusive'}</Icon>
                        </div> 
                    {/if}
                    <div class="box-justify-filler"></div>
                    <div class="box-label">
                        Gender options
                    </div>
                </box>
            </div>
        </div>
        <BoxWithIcon label='Race' value={characterParts.race?.name ?? '???'} icon={raceIcon}></BoxWithIcon>
        <BoxWithIcon label='Class' value={characterParts.class?.name ?? '???'} icon={classIcon}></BoxWithIcon>
    </div>
    <div class="error-log"></div>
</summary-detail>

<style>
    summary-detail { grid-area: step-detail;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        gap: 0.5em 0.5em;
        grid-template-areas: 
            "basics basics basics basics basics basics basics basics basics basics"
            "basics basics basics basics basics basics basics basics basics basics"
            "basics basics basics basics basics basics basics basics basics basics"
            "basics basics basics basics basics basics basics basics basics basics"
            "error-log error-log error-log error-log error-log . . . . ."
            "error-log error-log error-log error-log error-log . . . . ."
            "error-log error-log error-log error-log error-log . . . . ."
            "error-log error-log error-log error-log error-log . . . . .";
        }

    .error-log { grid-area: error-log; }

    .basics { grid-area: basics; 
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 0.5em;      
    }

    :global(.basics > *) {
        height: 30%;
    }

    :global(.basics .box-with-icon) {
        flex: 2;
    }

    .char-name {
        display: grid; 
        grid-template-columns: 5fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        gap: 0.5em; 
        grid-template-areas: 
            "name-edit name-gen"
            "name-edit name-gen";
        flex: 5;  
    }

    .name-gen { grid-area: name-gen; 
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.2em;
        height: 100%;
    }

    .name-edit { grid-area: name-edit; 
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 2em;
        position: relative;
    }

    .random-name {
        position: absolute;
        top: 50%;
        right: 2%;
        transform: translate(0%, -50%);
    }

    .gender-options {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.25em;
        height: inherit;
    }

    .selected-gender {
        color: var(--clr-accent-light);
        border-bottom: 1px solid var(--clr-accent-light);
    }



</style>