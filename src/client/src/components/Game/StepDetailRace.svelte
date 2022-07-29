<script lang="ts">
    import Autocomplete from '@smui-extra/autocomplete';
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

    export let characterParts: QuickCreateCharacterParts;
    export let quickCreateData: QuickCreateData;
    export let isDialogOpen: boolean;

    let selectedRace: RaceData | undefined = characterParts.race;
    let chosenTool: string = '';

    // fires up on every change of selected race
    $ : characterParts.race = selectedRace;

    // reset the selectedRace if the quick-create dialog is closed
    $: if (! isDialogOpen) {
        selectedRace = undefined;
    }

    const addTrait = () => {
        selectedRace.features = selectedRace.features.concat([ {name: '', content: ''} ]); 
    }

    const deleteTrait = (i: number) => {
        selectedRace.features = selectedRace.features.filter((_, index: number) => i !== index);
    }

    $: if (chosenTool) {
        selectedRace.tools_prof = selectedRace.tools_prof.slice(1).concat([[chosenTool]]);
        chosenTool = undefined;
    }

</script>

<div class="race-detail">
    <div class="select-race">
        <h4>Select race:</h4>
        <Autocomplete
            options={quickCreateData.races}
            textfield$variant="outlined"
            getOptionLabel={(race) =>
                race ? `${race.name}` : ''}
            bind:value={selectedRace}
        />
    </div>

    <div class="ability-score-increase">
        {#each ABILITY_TAGS.slice(1) as abilityTag}
            <RowBoxWithLabel label={abilityTag} valueWidth='4rem' valueFontSize='1.5em' labelFontSize='large'>
                <div slot='value'>
                    {#if selectedRace && selectedRace.as_increase}
                        <InPlaceEdit bind:value={selectedRace.as_increase[`${abilityTag}`]} editWidth="2em" editHeight="2em" on:submit={() => {}}/>
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

        <BoxWithChips bind:chipsArray={selectedRace.tools_prof} label='Tool Proficiencies' let:index={index} gridArea='tools-prof' blankChip={['']}>
            <div class="chip">
                {#if selectedRace.tools_prof[index].length < 2}
                    <InPlaceEdit bind:value={selectedRace.tools_prof[index][0]} editWidth='5rem' editHeight='1.5rem' on:submit={() => {}}/>
                {:else}
                    <SegmentedButton segments={selectedRace.tools_prof[index]} let:segment singleSelect bind:selected={chosenTool}>
                        <!-- Note: the `segment` property is required! -->
                        <Segment {segment}>
                            <Label>{segment}</Label>
                        </Segment>
                    </SegmentedButton>
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
        <box class="features-placeholder">
            <div class="box-main-text">X</div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Racial Traits
            </div>
        </box>
        <box class="tools-prof-placeholder">
            <div class="box-main-text">X</div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Tools Proficiencies
            </div>
        </box>
        <box class="other-prof-placeholder">
            <div class="box-main-text">X</div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Other Proficiencies
            </div>
        </box>
        <box class="skill-prof-placeholder">
            <div class="box-main-text">X</div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Skill Proficiencies
            </div>
        </box>
        <box class="languages-placeholder">
            <div class="box-main-text">X</div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Languages
            </div>
        </box>
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
        justify-content: center;
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

    .ability-score-increase { grid-area: ability-score-increase; 
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        gap: 0em 10%;
    }

    .features-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.25em;
    }

    .features-placeholder { grid-area: features; }
    .languages-placeholder { grid-area: languages; }
    .skill-prof-placeholder { grid-area: skill-prof; }
    .tools-prof-placeholder { grid-area: tools-prof; }
    .other-prof-placeholder { grid-area: other-prof; }

    .languages-placeholder, .skill-prof-placeholder, 
    .tools-prof-placeholder, .other-prof-placeholder, 
    .skill-prof-placeholder, .features-placeholder {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        font-size: 1.3em;
        font-weight: var(--semi-bold);
        font-family: Quicksand;
    }

</style>