<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { CharacterCairn } from "../../../../interfaces/Cairn/CharacterCairn";
    import { modifyCharacter } from "../../../../stores";
    import BioTextareaBox from "../../../BioTextareaBox.svelte";
    import BoxWithMax from "../../../BoxWithMax.svelte";
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";
    import RowBoxWithLabel from "../../../RowBoxWithLabel.svelte";
    import SimpleButton from "../../../SimpleButton.svelte";
    import Armor from "../Components/Armor.svelte";
    import CharSheetMenu from "../Components/CharSheetMenu.svelte";
    import HpBox from "../Components/HpBox.svelte";

    export let character: CharacterCairn;

    const abilityScoreDetails = {
        "STR": {
            name: 'Strength',
            description: 'Used for saves requiring physical power, like lifting gates, bending bars, resisting poison, etc.'
        },
        "DEX": {
            name: 'Dexterity',
            description: 'Used for saves requiring poise, speed, and reflexes like dodging, climbing, sneaking, balancing, etc.'
        },
        "WIL": {
            name: 'Willpower',
            description: 'Used for saves to persuade, deceive, interrogate, intimidate, charm, provoke, manipulate spells, etc.'
        }
    }

    const characterRest = () => {
        if (!character.deprived) {
            character.hp = character.hp_max;
            $modifyCharacter();
        }
    }

    const characterSleep = () => {
        // clear all fatigue

    }

</script>

<tab-container class="cairn-character">
    <div class="character-basic-info">
        <InPlaceEditBox bind:value={character.name} boxLabel="Character Name" inlineStyle="flex-grow: 4;" editWidth="10em" valueFontSize="1.5em" />
        <InPlaceEditBox bind:value={character.background} boxLabel="Background" inlineStyle="flex-grow: 3;" editWidth="6em" valueFontSize="1.5em" />
        <InPlaceEditBox bind:value={character.age} boxLabel="Age" inlineStyle="flex-grow: 2;" editWidth="5em" valueFontSize="1.5em" />
    </div>

    <div class="ability-scores">
        {#each Object.keys(character.ability_scores) as AS}
        <div class="ability-score">
            <div class="ability-score-values">
                <BoxWithMax label={AS} bind:currentValue={character.ability_scores[AS].current} bind:maxValue={character.ability_scores[AS].max} />
            </div>
            <box class="ability-score-info">
                <em><strong>{abilityScoreDetails[AS].name}{": "}</strong>{abilityScoreDetails[AS].description}</em>
            </box>
        </div>
        {/each}
    </div>

    <!-- <div class="traits">
        {#each Object.keys(character.traits) as trait}
            <InPlaceEditBox 
                bind:value={character.traits[trait]} 
                boxLabel={trait} 
                editWidth="10rem"
                editHeight="2rem"
                valueFontSize="1.5em"
                inlineStyle="width: 33%; height: auto;"
            />
        {/each}
    </div> -->

    <BioTextareaBox bind:charAttribute={character.appearance} inlineStyle="grid-area: traits; margin: 0.75em 0.75em 0em 0em;" label="Appearance" />
    <BioTextareaBox bind:charAttribute={character.notes} inlineStyle="grid-area: notes; margin: 0em 0.75em 0.75em 0em;" label="Notes" />

    <div class="rest">
        <SimpleButton value='Quick rest' 
            icon="mdi:beer"
            iconWidth='1.25em' 
            onClickFn={() => characterRest()}
        />
        <SimpleButton value='Full night' 
            icon="mdi:bed" 
            iconWidth='1.25em'
            onClickFn={() => characterSleep()}
        />
    </div>
    
    <div class="coins">
        {#each Object.keys(character.coins) as coinType}
            <InPlaceEditBox bind:value={character.coins[coinType]} boxLabel={coinType} valueFontSize="1.2em" editWidth="2em" editHeight="2em" />
        {/each}
    </div>

    <div class="armor">
        <Armor
            bind:value={character.armor}
            valueFontSize='2em'
            tooltip="No one can have more than 3 Armor.">
        </Armor>
    </div>

    <div class="hp">
        <HpBox bind:currentHP={character.hp} bind:maxHP={character.hp_max} label="Hit Protection" />
    </div>

    <div class="deprived">
        <RowBoxWithLabel 
            label='Deprived'
            clickable
            onClickFn={() => { character.deprived = !character.deprived; $modifyCharacter() }}
        >
            <Icon icon="{character.deprived ? 'mdi:sleep': ''}" />
        </RowBoxWithLabel>
    </div>

    <box class="inventory"></box>

    <CharSheetMenu></CharSheetMenu>
</tab-container>

<style>

    tab-container {
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1.5fr 1fr 0.5fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr; 
        gap: 0.5em;
        grid-template-areas: 
            "character-basic-info character-basic-info character-basic-info character-basic-info character-basic-info character-basic-info traits traits traits"
            "ability-scores ability-scores ability-scores hp deprived coins traits traits traits"
            "ability-scores ability-scores ability-scores hp armor coins traits traits traits"
            "ability-scores ability-scores ability-scores rest rest coins notes notes notes"
            "ability-scores ability-scores ability-scores inventory inventory inventory notes notes notes"
            "ability-scores ability-scores ability-scores inventory inventory inventory notes notes notes"
            ". . . inventory inventory inventory notes notes notes"
            ". . . inventory inventory inventory notes notes notes"
            ". . . inventory inventory inventory notes notes notes"
            ". . . inventory inventory inventory notes notes notes"
            ". . . inventory inventory inventory notes notes notes"
            ". . . char-sheet-menu char-sheet-menu char-sheet-menu notes notes notes"; 
    }

    :global(.cairn-character .box-label) {
        font-size: 0.9em;
    }

    .character-basic-info { grid-area: character-basic-info; 
        margin: 0.75em 0em 0em 0.75em;
        display: flex;
        flex-direction: row;
        gap: 0.5em;
    }

    .ability-scores { grid-area: ability-scores; 
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    .ability-score {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        gap: 0.75em;
    }

    .ability-score-values {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        max-width: 10em;
        margin-right: -2em;
        z-index: 2;
    }

    .ability-score-info {
        width: 50%;
        padding: 0.25em 0.5em 0.25em 2em;
        text-align: left;
    }

    .traits { grid-area: traits; 
        margin: 0em 0em 0.75em 0.75em;
        display: flex;
        flex-flow: wrap;
        gap: 0.5em;
    }

    .inventory { grid-area: inventory; 
    }

    .armor { grid-area: armor; 
        display: flex;
        justify-content: center;
        gap: 0.5em;
    }

    .hp { grid-area: hp; }

    .deprived { grid-area: deprived; 
        display: flex;
        justify-content: center;
    }

    .rest { grid-area: rest; 
        display: flex;
        justify-content: center;
        gap: 0.5em;
        font-size: 1.25em;
    }

    /* :global(.rest > simple-button) {
        width: fit-content;
        padding: 0.2em 0.75em;
    } */

    .coins { grid-area: coins; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5em;
    }

</style>