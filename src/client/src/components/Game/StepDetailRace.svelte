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

    export let characterParts: QuickCreateCharacterParts;
    export let quickCreateData: QuickCreateData;

    let selectedRace: RaceData | undefined = characterParts.race;

    // fires up on every change of selected race
    $ : if (selectedRace) {
        characterParts.race = selectedRace;
    }

    const addRacialTrait = () => {
        selectedRace.features = selectedRace.features.concat([ {name: '', content: ''} ]);    
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

    <box class="languages"></box>
    <box class="skill-prof"></box>
    <box class="tools-prof"></box>
    <box class="other-prof"></box>

    {#if selectedRace && selectedRace.features}
        <BoxWithList label='Racial Traits' inlineStyle='grid-area: features; max-height: 26em;' addNewListItem={addRacialTrait}>
            <div class="features-list" slot='list'>
                {#each selectedRace.features as feature}
                    <SimpleAccordionDetail bind:value={feature.name} bind:content={feature.content} icon='account-supervisor'></SimpleAccordionDetail>
                {/each}
            </div>
        </BoxWithList>
    {:else}
        <box class="features-placeholder">
            <div class="box-main-text">X</div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Racial Traits
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
            "languages languages skill-prof skill-prof tools-prof tools-prof other-prof other-prof"
            "languages languages skill-prof skill-prof tools-prof tools-prof other-prof other-prof"; 
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

    .features-placeholder { grid-area: features;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        font-size: 1.3em;
        font-weight: var(--semi-bold);
        font-family: Quicksand;
    }

    .languages { grid-area: languages; }
    .skill-prof { grid-area: skill-prof; }
    .tools-prof { grid-area: tools-prof; }
    .other-prof { grid-area: other-prof; }

</style>