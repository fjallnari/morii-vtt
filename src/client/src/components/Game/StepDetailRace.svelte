<script lang="ts">
    import type RaceData from "../../interfaces/RaceData";
    import type QuickCreateData from "../../interfaces/QuickCreateData";
    import type QuickCreateCharacterParts from "../../interfaces/QuickCreateCharacterParts";
    import BoxWithInfo from '../BoxWithInfo.svelte';
    import RowBoxWithLabel from '../RowBoxWithLabel.svelte';
    import InPlaceEdit from '../InPlaceEdit.svelte';
    import ABILITY_TAGS from '../../enum/AbilityTags';
    import BoxWithList from '../BoxWithList.svelte';
    import SimpleAccordionDetail from './SimpleAccordionDetail.svelte';
    import BoxWithChips from '../BoxWithChips.svelte';
    import SKILLS from '../../enum/Skills';
    import SegmentedButton, { Label, Segment } from '@smui/segmented-button';
    import Svelecte from 'svelecte/src/Svelecte.svelte';

    export let characterParts: QuickCreateCharacterParts;
    export let quickCreateData: QuickCreateData;
    export let isCompleted: boolean;

    let selectedRace: RaceData | undefined = characterParts.race;
    let chosenTool: string = '';

    // fires up on every change of selected race
    $ : characterParts.race = selectedRace;
    $ : isCompleted = selectedRace && selectedRace !== undefined;

    const addTrait = () => {
        selectedRace.features = selectedRace.features.concat([ {name: '', content: ''} ]); 
    }

    const deleteTrait = (i: number) => {
        selectedRace.features = selectedRace.features.filter((_, index: number) => i !== index);
    }

    $: if (chosenTool) {
        console.log(chosenTool)
        selectedRace.tools_prof = selectedRace.tools_prof.slice(1).concat([{ name: chosenTool }]);
        chosenTool = undefined;
    }

    const placeholderBoxes = [
        { label: 'Skill Proficiencies', gridArea: 'skill-prof' },
        { label: 'Other Proficiencies', gridArea: 'other-prof' },
        { label: 'Tools Proficiencies', gridArea: 'tools-prof' },
        { label: 'Languages', gridArea: 'languages' },
        { label: 'Racial Traits', gridArea: 'features' }
    ];

    $: raceIcon = `${characterParts.race?.name ? `race-icons/variant/${characterParts.race?.name.toLowerCase()}` : 'race'}`

</script>

<div class="race-detail">
    <div class="select-race">
        <h4>Select race:</h4>
        <Svelecte 
            options={quickCreateData.races}
            valueAsObject
            placeholder='Races'
            class="svelecte-control{selectedRace ? '' : ' error-pulse'}"
            bind:value={selectedRace}>
        </Svelecte>
        <box class="race-icon">
            <img id="main-class" src="../static/{raceIcon}.svg" alt="class-icon">
        </box>
    </div>

    <div class="ability-score-increase">
        {#each ABILITY_TAGS.slice(1) as abilityTag}
            <RowBoxWithLabel label={abilityTag} valueWidth='4rem' valueHeight='100%' valueFontSize='1.5em' labelFontSize='large'>
                <div slot='value'>
                    {#if selectedRace && selectedRace.as_increase}
                        <InPlaceEdit bind:value={selectedRace.as_increase[`${abilityTag}`]} editWidth="2em" editHeight="2em" on:submit={() => {}}/>
                    {:else}
                        <div>X</div>
                    {/if}
                </div>
            </RowBoxWithLabel>
        {/each}
    </div>

    <BoxWithInfo bind:mainObject={selectedRace} label="age"></BoxWithInfo>
    <BoxWithInfo bind:mainObject={selectedRace} label="alignment"></BoxWithInfo>
    <BoxWithInfo bind:mainObject={selectedRace} label="size" editWidth="4em"></BoxWithInfo>
    <BoxWithInfo bind:mainObject={selectedRace} label="speed"></BoxWithInfo>

    {#if selectedRace && selectedRace.features}
        <BoxWithList label='Racial Traits' inlineStyle='grid-area: features; max-height: 25.7em;' addNewListItem={addTrait} isModifyDisabled>
            <div class="features-list" slot='list'>
                {#each selectedRace.features as feature, index}
                    <SimpleAccordionDetail 
                        bind:value={feature.name} 
                        bind:content={feature.content} 
                        bind:source={feature.source} 
                        icon='account-supervisor' 
                        deleteItem={() => deleteTrait(index)}>
                    </SimpleAccordionDetail>
                {/each}
            </div>
        </BoxWithList>

        <BoxWithChips bind:chipsArray={selectedRace.tools_prof} label='Tool Proficiencies' let:index={index} gridArea='tools-prof' blankChip={{ name: '' }}>
            <div class="chip">
                {#if selectedRace.tools_prof[index].options}
                    <SegmentedButton segments={selectedRace.tools_prof[index].options} let:segment singleSelect bind:selected={chosenTool}>
                        <!-- Note: the `segment` property is required! -->
                        <Segment {segment}>
                            <Label>{segment}</Label>
                        </Segment>
                    </SegmentedButton>
                {:else}
                    <InPlaceEdit bind:value={selectedRace.tools_prof[index].name} editWidth='5rem' editHeight='1.5rem' on:submit={() => {}}/>
                {/if}
            </div>
        </BoxWithChips>

        <BoxWithChips bind:chipsArray={selectedRace.other_prof} label='Other Proficiencies' let:index={index} gridArea='other-prof' blankChip={{name: '', type: 0}}>
            <InPlaceEdit bind:value={selectedRace.other_prof[index].name} editWidth='5rem' editHeight='1.5rem' on:submit={() => {}}/>
        </BoxWithChips>

        <BoxWithChips bind:chipsArray={selectedRace.skill_prof} label='Skill Proficiencies' let:index={index} gridArea='skill-prof'>
            <select bind:value={selectedRace.skill_prof[index]} on:change={() => {}}>
                <option value="" selected disabled hidden>???</option>
                {#each SKILLS as skill}
                    <option value={skill}>
                        {skill}
                    </option>
                {/each}
            </select>
        </BoxWithChips>

        <BoxWithChips bind:chipsArray={selectedRace.languages} label='Languages' let:index={index}>
            <InPlaceEdit bind:value={selectedRace.languages[index]} editWidth='5rem' editHeight='1.5rem' on:submit={() => {}}/>
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
</div>


<style>
    .race-detail { grid-area: step-detail;
        display: grid; 
        grid-template-columns: 1fr 1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        gap: 0.5em; 
        grid-template-areas: 
            "ability-score-increase ability-score-increase ability-score-increase ability-score-increase select-race select-race select-race select-race"
            "ability-score-increase ability-score-increase ability-score-increase ability-score-increase features features features features"
            "age age alignment alignment features features features features"
            "age age alignment alignment features features features features"
            "size size speed speed features features features features"
            "size size speed speed features features features features"
            "tools-prof tools-prof other-prof other-prof skill-prof skill-prof languages languages"
            "tools-prof tools-prof other-prof other-prof skill-prof skill-prof languages languages"; 
    }

    .select-race { grid-area: select-race; 
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 1em;
    }

    .select-race h4 {
        font-family: Athiti, sans-serif;
        font-size: x-large;
        font-weight: 500;
        text-transform: uppercase;
        margin: 0em;
    }

    :global(.select-race > .svelecte-control) {
        font-size: large;
        --sv-min-height: 3em !important;
        max-width: 15em;
    }

    .race-icon {
        height: 100%;
        width: 100%;
        max-width: 5em;
        max-height: 5em;
    }

    #main-class {
        width: inherit;
        height: inherit;
    }

    .ability-score-increase { grid-area: ability-score-increase; 
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        gap: 0em 10%;
    }

    :global(.ability-score-increase row-box-with-label) {
        height: 40% !important;
    }

    .features-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.25em;
    }

    .features { grid-area: features; }
    .languages { grid-area: languages; }
    .skill-prof { grid-area: skill-prof; }
    .tools-prof { grid-area: tools-prof; }
    .other-prof { grid-area: other-prof; }

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