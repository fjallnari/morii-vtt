<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { CharacterShadowdark } from "../../../../interfaces/Shadowdark/CharacterShadowdark";
    import { modifyCharacter } from "../../../../stores";
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";
    import RowBoxWithLabel from "../../../RowBoxWithLabel.svelte";
    import Armor from "../Components/Armor.svelte";
    import CharSheetMenu from "../Components/CharSheetMenu.svelte";
    import HpBox from "../Components/HpBox.svelte";
    import AbilityScoreWithModBasic from "./AbilityScoreWithModBasic.svelte";

    export let character: CharacterShadowdark;

</script>

<tab-container class="shadowdark-character">
    <div class="char-basic-info">
        <InPlaceEditBox bind:value={character.name} boxLabel="Character Name" inlineStyle="flex-grow: 4;" editWidth="10em" valueFontSize="1.5em" />
        <InPlaceEditBox bind:value={character.ancestry} boxLabel="Ancestry" inlineStyle="flex-grow: 3;" editWidth="6em" valueFontSize="1.5em" />
        <InPlaceEditBox bind:value={character.class} boxLabel="Class" inlineStyle="flex-grow: 2;" editWidth="5em" valueFontSize="1.5em" />
        <InPlaceEditBox bind:value={character.level} boxLabel="Level" inlineStyle="flex-grow: 1;" editWidth="2em" valueFontSize="1.5em" />
        <InPlaceEditBox bind:value={character.xp} boxLabel="XP" inlineStyle="flex-grow: 1;" editWidth="2em" valueFontSize="1.5em" />
        <InPlaceEditBox bind:value={character.background} boxLabel="Background" inlineStyle="flex-grow: 2;" editWidth="10em" valueFontSize="1.5em" />
        <InPlaceEditBox bind:value={character.title} boxLabel="Title" inlineStyle="flex-grow: 2;" editWidth="5em" valueFontSize="1.5em" />
        <InPlaceEditBox bind:value={character.alignment} boxLabel="Alignment" inlineStyle="flex-grow: 1;" editWidth="2em" valueFontSize="1.5em" />
    </div>
    <div class="hp">
        <HpBox bind:currentHP={character.hp} bind:maxHP={character.hp_max} label="Hit Points" />
    </div>
    <div class="armor">
        <Armor
            bind:value={character.ac}
            valueFontSize='2em'
            tooltip="10 + DEX modifier, unless you wear armor.">
        </Armor>
    </div>
    <div class="ability-scores">
        {#each Object.keys(character.ability_scores) as AS}
            <AbilityScoreWithModBasic bind:value={character.ability_scores[AS].value} name={AS}/>
        {/each}
    </div>
    <box class="gear"></box>

    <box class="coins"></box>
    <div class="luck">
        <RowBoxWithLabel
            label='Luck token'
            clickable
            tooltipText="Deprived PCs cannot recover HP. If deprived for more than a day, they add a Fatigue to inventory."
            onClickFn={() => { character.luck = !character.luck; $modifyCharacter('luck-token') }}
        >
            <Icon icon="{character.luck ? 'mdi:auto-awesome': ''}" />
        </RowBoxWithLabel>
    </div>
    <box class="languages"></box>
    <box class="talents"></box>
    <box class="attacks"></box>
    <box class="notes"></box>
    <div class="license"></div>
    <CharSheetMenu />
</tab-container>


<style>
    tab-container {  display: grid;
        grid-template-columns: 1fr 1fr 1fr 1.5fr 1fr 0.5fr 1fr 1fr 1fr;
        grid-template-rows: 0.75fr 0.75fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr;
        gap: 0.75em;
        grid-auto-flow: row;
        grid-template-areas:
            "char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info"
            "ability-scores ability-scores ability-scores hp luck coins languages languages languages"
            "ability-scores ability-scores ability-scores hp armor coins attacks attacks attacks"
            "notes notes notes . . . attacks attacks attacks"
            "notes notes notes gear gear gear attacks attacks attacks"
            "notes notes notes gear gear gear talents talents talents"
            "notes notes notes gear gear gear talents talents talents"
            "notes notes notes gear gear gear talents talents talents"
            "license license license char-sheet-menu char-sheet-menu char-sheet-menu talents talents talents";
    }

    :global(.shadowdark-character .box-label) {
        font-size: 0.9em;
    }

    .char-basic-info { grid-area: char-basic-info; 
        margin: 0.75em 0.75em 0em 0.75em;
        display: flex;
        flex-direction: row;
        gap: 0.5em;
    }

    .ability-scores { grid-area: ability-scores; 
        margin-left: 0.75em;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        min-width: 0;
        flex-flow: wrap;
    }

    .gear { grid-area: gear; }

    .hp { grid-area: hp; }

    .armor { grid-area: armor; 
        display: flex;
        justify-content: center;
        gap: 0.5em;
    }

    .coins { grid-area: coins; }

    .luck { grid-area: luck; }

    .languages { grid-area: languages; 
        margin-right: 0.75em;
    }

    .talents { grid-area: talents; 
        margin: 0em 0.75em 0.75em 0em;
    }

    .attacks { grid-area: attacks; 
        margin-right: 0.75em;
    }

    .license { grid-area: license; }

    .notes { grid-area: notes; 
        margin-left: 0.75em;
    }

</style>