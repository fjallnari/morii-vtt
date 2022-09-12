<script lang="ts">
    import type QuickCreateCharacterParts from "../../interfaces/QuickCreateCharacterParts";
    import type QuickCreateData from "../../interfaces/QuickCreateData";
    import { formatModifier } from "../../stores";
    import { getASModifier, int2roman, validateClassName } from "../../util/util";
    import BoxWithChips from "../BoxWithChips.svelte";
    import BoxWithIcon from "../BoxWithIcon.svelte";
    import BoxWithList from "../BoxWithList.svelte";
    import InPlaceEditBox from "../InPlaceEditBox.svelte";
    import SimpleAccordionDetail from "./SimpleAccordionDetail.svelte";
    import { Icon } from '@smui/icon-button';
    //@ts-ignore
    import { human, species } from 'fantastical';
    import Svelecte from "svelecte/src/Svelecte.svelte";
    import BioTextareaBox from "../BioTextareaBox.svelte";

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
    $: raceIcon = `${characterParts.race?.name ? `race-icons/variant/${characterParts.race?.name.toLowerCase()}` : 'race'}`

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
    <BoxWithIcon 
        label='Race' 
        value={characterParts.race?.name ?? 'None'} 
        icon={raceIcon} 
        isDisabled={!characterParts.race && true}
        gridClass='race'>
    </BoxWithIcon>
    
    <BoxWithIcon 
        label='Class' 
        value={characterParts.class?.name ?? 'None'} 
        icon={classIcon} 
        isDisabled={!characterParts.class && true} 
        gridClass='class'>
    </BoxWithIcon>

    <box class="level">
        <div class='box-main-text'>{int2roman(characterParts.class?.level ?? 0)}</div>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Level
        </div>
    </box>

    <BoxWithIcon 
        label='Background' 
        value={characterParts.bio?.name !== '' ? characterParts.bio?.name : 'None'} 
        icon='background'
        isDisabled={characterParts.bio?.name === ''}
        gridClass='bkg'>
    </BoxWithIcon>

    <BoxWithIcon 
        label='Spellcasting' 
        value={characterParts.class?.spellcasting ? characterParts.class.spellcasting.isCustom ? 'Custom' : 'Default' : 'None'} 
        icon='spellcasting'
        isDisabled={typeof characterParts.class?.spellcasting === 'undefined'} 
        gridClass='spellcasting'>
    </BoxWithIcon>

    <BioTextareaBox 
        bind:charAttribute={characterParts.bio.backstory} 
        inlineStyle="grid-area: backstory;"
        label="Backstory" 
        socketModifyEnabled={false}>
    </BioTextareaBox>

    <BioTextareaBox 
        bind:charAttribute={characterParts.bio.appearance} 
        inlineStyle="grid-area: appearance;"
        label="Appearance" 
        socketModifyEnabled={false}>
    </BioTextareaBox>

    <div class="random-gen"></div>   

</summary-detail>

<style>
    summary-detail { grid-area: step-detail;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        gap: 0.5em 0.5em; 
        grid-template-areas: 
            "char-name char-name char-name char-name char-name race race race class class class level"
            "char-name char-name char-name char-name char-name race race race class class class level"
            "bkg bkg bkg spellcasting spellcasting spellcasting appearance appearance appearance appearance appearance appearance"
            "bkg bkg bkg spellcasting spellcasting spellcasting appearance appearance appearance appearance appearance appearance"
            "random-gen random-gen random-gen random-gen random-gen random-gen appearance appearance appearance appearance appearance appearance"
            "random-gen random-gen random-gen random-gen random-gen random-gen appearance appearance appearance appearance appearance appearance"
            "random-gen random-gen random-gen random-gen random-gen random-gen backstory backstory backstory backstory backstory backstory"
            "random-gen random-gen random-gen random-gen random-gen random-gen backstory backstory backstory backstory backstory backstory"
            "random-gen random-gen random-gen random-gen random-gen random-gen backstory backstory backstory backstory backstory backstory"
            "random-gen random-gen random-gen random-gen random-gen random-gen backstory backstory backstory backstory backstory backstory"; 
    }

    .random-gen { grid-area: random-gen; }

    .level { grid-area: level; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 2em;
        font-weight: var(--semi-bold);
    }

    .char-name { grid-area: char-name;
        display: grid; 
        grid-template-columns: 5fr 1fr;
        grid-template-rows: 1fr 1fr; 
        gap: 0.5em; 
        grid-template-areas: 
            "name-edit name-gen"
            "name-edit name-gen";
    }

    .name-gen { grid-area: name-gen; 
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.5em;
        height: 100%;
    }

    .name-edit { grid-area: name-edit; 
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 2.2em;
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
        height: inherit;
    }

    .selected-gender {
        color: var(--clr-accent-light);
        border-bottom: 1px solid var(--clr-accent-light);
    }


</style>