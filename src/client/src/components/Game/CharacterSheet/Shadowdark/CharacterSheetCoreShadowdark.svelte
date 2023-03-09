<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { CharacterShadowdark } from "../../../../interfaces/Shadowdark/CharacterShadowdark";
    import { modifyCharacter } from "../../../../stores";
    import BioTextareaBox from "../../../BioTextareaBox.svelte";
    import BoxWithChips from "../../../BoxWithChips.svelte";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";
    import RowBoxWithLabel from "../../../RowBoxWithLabel.svelte";
    import Armor from "../Components/Armor.svelte";
    import CharSheetMenu from "../Components/CharSheetMenu.svelte";
    import Coins from "../Components/Coins.svelte";
    import HpBox from "../Components/HpBox.svelte";
    import AbilityScoreWithModBasic from "./AbilityScoreWithModBasic.svelte";

    export let character: CharacterShadowdark;

    
    const getSDModifier: (value: string) => number = (value: string) => {
        // TODO
        return ~~value + 2;
    }

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

    <div class="ability-scores">
        {#each Object.keys(character.ability_scores) as AS}
            <AbilityScoreWithModBasic 
                bind:value={character.ability_scores[AS].value} 
                name={AS}
                convertValueToMod={getSDModifier}
            />
        {/each}
    </div>
    <div class="hp">
        <HpBox bind:currentHP={character.hp} bind:maxHP={character.hp_max} label="Hit Points" />
    </div>    
    <div class="luck">
        <RowBoxWithLabel
            label='Luck'
            clickable
            tooltipText="Use luck to reroll any roll you just made. You must use the new result."
            onClickFn={() => { character.luck = !character.luck; $modifyCharacter('luck-token') }}
        >
            <Icon icon="{character.luck ? 'mdi:auto-awesome': ''}" />
        </RowBoxWithLabel>
    </div>
    <div class="armor">
        <Armor
            bind:value={character.ac}
            valueFontSize='2em'
            tooltip="10 + DEX modifier, unless you wear armor.">
        </Armor>
    </div>

    <Coins bind:coins={character.coins}/>
    
    <BioTextareaBox bind:charAttribute={character.notes} inlineStyle="grid-area: notes;" label="Notes" />
    
    <box class="attacks"></box>
    <box class="gear"></box>
    <box class="talents"></box>
    <box class="spells"></box>

    <BoxWithChips bind:chipsArray={character.languages} label='Languages' let:index={index}>
        <InPlaceEdit bind:value={character.languages[index]} editWidth='5rem' editHeight='1.5rem' on:submit={() => {}}/>
    </BoxWithChips>
    
    <div class="license">This sheet is an independent product published under the Shadowdark RPG Third-Party License and is not affiliated with The Arcane Library, LLC. Shadowdark RPG © The Arcane Library, LLC.</div>
    <CharSheetMenu />
</tab-container>

<style>
    tab-container {  display: grid;
        grid-template-columns: 1fr 1fr 0.5fr 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 0.75fr 0.75fr 1fr 1fr 1fr 1fr 1fr 1fr .5fr;
        gap: 0.75em;
        grid-auto-flow: row;
        grid-template-areas:
            "char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info"
            "ability-scores luck hp hp attacks attacks attacks spells spells spells"
            "ability-scores armor hp hp attacks attacks attacks spells spells spells"
            "ability-scores languages languages coins attacks attacks attacks spells spells spells"
            "ability-scores languages languages coins gear gear gear talents talents talents"
            "ability-scores notes notes notes gear gear gear talents talents talents"
            "ability-scores notes notes notes gear gear gear talents talents talents"
            "ability-scores notes notes notes gear gear gear talents talents talents"
            "license license license license char-sheet-menu char-sheet-menu char-sheet-menu talents talents talents";
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
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        gap: 0.5em;
    }

    .hp { grid-area: hp; }

    .luck { grid-area: luck; 
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .armor { grid-area: armor; 
        display: flex;
        justify-content: center;
        gap: 0.5em;
    }

    .attacks { grid-area: attacks; }

    .gear { grid-area: gear; }

    .talents { grid-area: talents; 
        margin: 0em 0.75em 0.75em 0em;
    }

    .spells { grid-area: spells; 
        margin-right: 0.75em;
    }

    .license { grid-area: license;
        font-size: 0.8em;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0em 0em 0.75em 0.75em; 
    }


</style>