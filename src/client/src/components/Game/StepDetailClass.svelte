<script lang="ts">
    import Autocomplete from '@smui-extra/autocomplete';
    import type ClassData from "../../interfaces/ClassData";
    import type QuickCreateCharacterParts from "../../interfaces/QuickCreateCharacterParts";
    import type QuickCreateData from "../../interfaces/QuickCreateData";
    import Slider from '@smui/slider';
    import BoxWithChips from '../BoxWithChips.svelte';
    import SKILLS from '../../enum/Skills';
    import InPlaceEdit from '../InPlaceEdit.svelte';
    import QCreateHitPoints from './QCreateHitPoints.svelte';
    import { validateClassName } from '../../util/util';
    import ABILITY_NAMES from '../../enum/AbilityNames';
    import QCreateEquipment from './QCreateEquipment.svelte';
    import BoxWithList from '../BoxWithList.svelte';
    import SimpleAccordionDetail from './SimpleAccordionDetail.svelte';

    export let characterParts: QuickCreateCharacterParts;
    export let quickCreateData: QuickCreateData;
    export let isDialogOpen: boolean;

    let selectedClass: ClassData | undefined = characterParts.class;
    
    // fires up on every change of selected class
    $ : characterParts.class = selectedClass;

    const placeholderBoxes = [
        { label: 'Class Resources', gridArea: 'class-resources' },
        { label: 'Tools Proficiencies', gridArea: 'tools' },
        { label: 'Other Proficiencies', gridArea: 'other-prof' },
        { label: 'Hit Points', gridArea: 'hit-points' },
        { label: 'Skills', gridArea: 'skills' },
        { label: 'Equipment', gridArea: 'equipment' },
        { label: 'Saving Throws', gridArea: 'saving-throws' },
        { label: 'Features', gridArea: 'features' }
    ];

    $: skillChooseList = selectedClass && selectedClass.skills && selectedClass.skills.type === 'list' ? selectedClass.skills.choose_list : SKILLS;

</script>

<div class="class-detail">
    <div class="select-class">
        <h4>Select class:</h4>
        <Autocomplete
            options={quickCreateData.classes}
            textfield$variant="outlined"
            getOptionLabel={(charClass) =>
                charClass ? `${charClass.name}` : ''}
            bind:value={selectedClass}
        />
        <box class="class-icon">
            <img id="main-class" src="../static/class-icons/{validateClassName(selectedClass ? selectedClass.name.toLowerCase() : '')}.svg" alt="class-icon">
        </box>
    </div>

    {#if selectedClass}
        <BoxWithList label='Features' inlineStyle='grid-area: features;' addNewListItem={() => {}} isModifyDisabled>
            <div class='level-slider' slot='filter-menu'>
                <Slider bind:value={selectedClass.level} min={1} max={20} step={1} discrete tickMarks/>
                <!-- <div class="level-slider-label">Level: {selectedClass.level}</div> -->            
            </div>
            <div class="features-list" slot='list'>
                {#each selectedClass.features.filter(feature => feature.level <= selectedClass.level) as feature, index}
                    <SimpleAccordionDetail 
                        bind:value={feature.name} 
                        bind:content={feature.content}
                        icon='arrow-projectile-multiple' 
                        deleteItem={() => {}}>
                    </SimpleAccordionDetail>
                {/each}
            </div>
        </BoxWithList>

        <box class="class-resources"></box>

        <!-- EQUIPMENT -->
        <QCreateEquipment bind:selectedClass={selectedClass}></QCreateEquipment>

        <!-- TOOLS -->
        <BoxWithChips 
            bind:chipsArray={selectedClass.tool_prof.tools} 
            label='Tools Proficiencies' 
            let:index={index} 
            gridArea='tools' 
            blankChip={{name: ''}}
            headerText={selectedClass.tool_prof.label}
        >
            {#if selectedClass.tool_prof.tools[index].choose_list}
                <select bind:value={selectedClass.tool_prof.tools[index].name} on:change={() => {}}>
                    <option value="" selected disabled hidden>{selectedClass.tool_prof.tools[index].placeholder ?? '???'}</option>
                    {#each selectedClass.tool_prof.tools[index].choose_list as tool}
                        <option value={tool}>
                            {tool}
                        </option>
                    {/each}
                </select>
            {:else}
                <InPlaceEdit bind:value={selectedClass.tool_prof.tools[index].name} editWidth='5rem' editHeight='1.5rem' on:submit={() => {}}/>                    
            {/if}
        </BoxWithChips>

        <!-- HIT POINTS -->
        <QCreateHitPoints bind:selectedClass={selectedClass}></QCreateHitPoints>

        <!-- OTHER PROFICIENCIES -->
        <BoxWithChips bind:chipsArray={selectedClass.other_prof} label='Other Proficiencies' let:index={index} gridArea='other-prof' blankChip={{name: '', type: 0}}>
            <InPlaceEdit bind:value={selectedClass.other_prof[index].name} editWidth='5rem' editHeight='1.5rem' on:submit={() => {}}/>
        </BoxWithChips>

        <!-- SKILLS -->
        {#if selectedClass.skills.choose_n !== 0}
            <BoxWithChips 
                bind:chipsArray={skillChooseList} 
                let:index={index} 
                gridArea='skills'
                chipsType='select-n' 
                bind:selectNFinalArray={selectedClass.skills.final}
                selectNMaxChips={selectedClass.skills.choose_n}
                headerText={`Choose ${selectedClass.skills.choose_n} skills from:`}
            >
                {skillChooseList[index]}
            </BoxWithChips>
        {:else}
            <!-- here only for the 'Custom' class, to let people pick their desired skills -->
            <BoxWithChips bind:chipsArray={selectedClass.skills.final} label='Skills' let:index={index} gridArea='skills'>
                <select bind:value={selectedClass.skills.final[index]} on:change={() => {}}>
                    <option value="" selected disabled hidden>???</option>
                    {#each SKILLS as skill}
                        <option value={skill}>
                            {skill}
                        </option>
                    {/each}
                </select>
            </BoxWithChips>
        {/if}

        <!-- SAVING THROWS -->
        <BoxWithChips bind:chipsArray={selectedClass.saving_throws} label='Saving Throws' let:index={index} gridArea='saving-throws'>
            <select bind:value={selectedClass.saving_throws[index]} on:change={() => {}}>
                <option value="" selected disabled hidden>---</option>
                {#each ABILITY_NAMES as abilityName}
                    <option value={abilityName}>
                        {abilityName}
                    </option>
                {/each}
            </select>
        </BoxWithChips>
    {:else}
        {#each placeholderBoxes as placeholderBox}
            <box class="{placeholderBox.gridArea} placeholder">
                <div class="box-main-text">X</div>
                <div class="box-justify-filler"></div>
                <div class="box-label">
                    {placeholderBox.label}
                </div>
            </box>
        {/each}
    {/if}

    <div class="class-nav"></div>
</div>

<style>
    .class-detail { grid-area: step-detail;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        gap: 0.5em; 
        grid-template-areas: 
            "hit-points hit-points hit-points skills skills skills select-class select-class select-class select-class"
            "hit-points hit-points hit-points skills skills skills features features features features"
            "tools tools tools other-prof other-prof other-prof features features features features"
            "tools tools tools other-prof other-prof other-prof features features features features"
            "equipment equipment equipment equipment saving-throws saving-throws features features features features"
            "equipment equipment equipment equipment saving-throws saving-throws features features features features"
            "equipment equipment equipment equipment class-nav class-nav class-resources class-resources class-resources class-resources";
    }

    .select-class { grid-area: select-class; 
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }

    .select-class h4 {
        font-family: Athiti, sans-serif;
        font-size: x-large;
        font-weight: 500;
        text-transform: uppercase;
    }

    :global(.select-class > .smui-autocomplete) {
        max-width: 10em;
    }

    .class-icon {
        height: 100%;
        width: 100%;
        max-width: 5em;
        max-height: 5em;
    }

    #main-class {
        width: inherit;
        height: inherit;
    }

    .features { grid-area: features; }

    .features-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.25em;
    }

    .level-slider-label {
        font-size: 1em;
        font-family: Quicksand;
        text-transform: none;
    }

    .class-resources { grid-area: class-resources; }
    .tools { grid-area: tools; }
    .other-prof { grid-area: other-prof; }
    .hit-points { grid-area: hit-points; }
    .saving-throws { grid-area: saving-throws; }
    .skills { grid-area: skills; }
    .equipment { grid-area: equipment; }

    .class-nav { grid-area: class-nav; 
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }

    .placeholder {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        font-size: 1.3em;
        font-weight: var(--semi-bold);
        font-family: Quicksand;
    }

</style>