<script lang="ts">
    import Icon from "@iconify/svelte";
    import { nanoid } from "nanoid/non-secure";
    import type { CharacterShadowdark } from "../../../../interfaces/Shadowdark/CharacterShadowdark";
    import type ItemShadowdark from "../../../../interfaces/Shadowdark/ItemShadowdark";
    import { modifyCharacter, sendSkillCheck } from "../../../../stores";
    import { convertValueToASMod } from "../../../../util/util";
    import BioTextareaBox from "../../../BioTextareaBox.svelte";
    import BoxWithChips from "../../../BoxWithChips.svelte";
    import BoxWithList from "../../../BoxWithList.svelte";
    import BoxWithMax from "../../../BoxWithMax.svelte";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";
    import RowBoxWithLabel from "../../../RowBoxWithLabel.svelte";
    import SimpleAccordionDetail from "../../SimpleAccordionDetail.svelte";
    import Armor from "../Components/Armor.svelte";
    import CharSheetMenu from "../Components/CharSheetMenu.svelte";
    import Coins from "../Components/Coins.svelte";
    import HpBox from "../Components/HpBox.svelte";
    import AbilityScoreWithModBasic from "./AbilityScoreWithModBasic.svelte";
    import AttackDetailShadowdark from "./AttackDetailShadowdark.svelte";
    import ItemDetailShadowdark from "./ItemDetailShadowdark.svelte";
    import ProficienciesShadowdark from "./ProficienciesShadowdark.svelte";
    import TalentsShadowdark from "./TalentsShadowdark.svelte";

    export let character: CharacterShadowdark;

    const addItem = () => {
        character.gear = character.gear.concat([{id: nanoid(10), name: '', type: 'item' }]);
    }

    const deleteItem = (item: ItemShadowdark) => {
        character.gear = character.gear.filter(itemIter => itemIter !== item);
        $modifyCharacter('delete-item');
    }

    let filledSlotsCount: number = 0;
    $: {
        filledSlotsCount = character.gear.reduce(
            (acc, item) => acc + ~~item.weight,
            0
        );
        character.filled_slots = filledSlotsCount.toString();
    }

    const rollStatCheck = (AS: string) => {
        $sendSkillCheck(convertValueToASMod(character.ability_scores[AS].value), `${AS} check`, character.name);
    }

    const rollDeathTimer = () => {
        $sendSkillCheck(convertValueToASMod(character.ability_scores['CON'].value), `death timer | d4 + CON`, character.name, '-', 'd4')
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
                convertValueToMod={convertValueToASMod}
                onClickFn={() => rollStatCheck(AS)}
            />
        {/each}
    </div>

    <div class="hp">
        <HpBox 
            bind:currentHP={character.hp} 
            bind:maxHP={character.hp_max} 
            label="Hit Points" 
            showHPBar={false}
            onDeathFn={() => rollDeathTimer()}
        />
    </div>

    <div class="death-luck">
        <RowBoxWithLabel
            label='Luck'
            clickable
            tooltipText="Use luck to reroll any roll you just made. You must use the new result."
            onClickFn={() => { character.luck = !character.luck; $modifyCharacter('luck-token') }}
        >
            <Icon icon="{character.luck ? 'mdi:auto-awesome': ''}" />
        </RowBoxWithLabel>
        <RowBoxWithLabel
            label='Death timer'
            tooltipText="Character is unconscious and dying if reduced to 0 HP - unless healed/stabilised they die in 1d4 + CON mod (min 1) turns."
            onClickFn={() => {}}
        >
            <InPlaceEdit bind:value={character.death_timer} editWidth='2.5rem' editHeight='2.5rem' on:submit={() => {}}/>
        </RowBoxWithLabel>
    </div>
    
    <div class="armor">
        <Armor
            bind:value={character.ac}
            valueFontSize='2em'
            tooltip="10 + DEX modifier, unless you wear armor.">
        </Armor>
    </div>

    <div class="coins">
        {#each Object.keys(character.coins) as coinType}
            <InPlaceEditBox bind:value={character.coins[coinType]} boxLabel={coinType} valueFontSize="1.2em" editWidth="2em" editHeight="2em" />
        {/each}
    </div>

    <div class="slots">
        <RowBoxWithLabel
            label='Slots'
            onClickFn={() => {}}
        >
        <InPlaceEdit bind:value={character.total_slots} editWidth='2.5rem' editHeight='2.5rem' on:submit={() => {}}/>
        </RowBoxWithLabel>
        <RowBoxWithLabel
            label='Filled slots'
            onClickFn={() => { }}
        >
            {character.filled_slots}
        </RowBoxWithLabel>
    </div>

    <div class="attacks">
        <BoxWithList label='Attacks' addNewListItem={() => {}}>
            <div class="item-list" slot='list'>
                {#each character.attacks as item, index}
                    <AttackDetailShadowdark />
                {/each}
            </div>
        </BoxWithList>
    </div>

    <div class="prof">
        <ProficienciesShadowdark bind:character={character}/>
    </div>

    <div class="gear">
        <BoxWithList label='Gear' addNewListItem={addItem}>
            <div class="item-list" slot='list'>
                {#each character.gear as item, index}
                    <ItemDetailShadowdark
                        bind:item deleteItem={deleteItem}
                    />
                {/each}
            </div>
        </BoxWithList>
    </div>

    <box class="spells"></box>

    <TalentsShadowdark bind:talents={character.talents}/>
    
    
    <div class="license">This sheet is an independent product published under the Shadowdark RPG Third-Party License and is not affiliated with The Arcane Library, LLC. Shadowdark RPG © The Arcane Library, LLC.</div>
    <CharSheetMenu />
</tab-container>

<style>
    tab-container {  display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 0.75fr 0.5fr 0.5fr 0.25fr 0.75fr 1.5fr 1.5fr 1fr 1fr 1fr .5fr;
        gap: 0.75em;
        grid-auto-flow: row;
        box-sizing: border-box;
        padding: 0.75em;
        grid-template-areas:
            "char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info"
            "ability-scores attacks attacks armor death-luck death-luck spells spells spells"
            "ability-scores attacks attacks armor slots slots spells spells spells"
            "ability-scores attacks attacks hp slots slots spells spells spells"
            "ability-scores attacks attacks hp coins coins spells spells spells"
            "ability-scores attacks attacks gear gear gear spells spells spells"
            "ability-scores prof prof gear gear gear talents talents talents"
            "ability-scores prof prof gear gear gear talents talents talents"
            "ability-scores prof prof gear gear gear talents talents talents"
            "ability-scores prof prof gear gear gear talents talents talents"
            "license license license char-sheet-menu char-sheet-menu char-sheet-menu talents talents talents";
    }

    :global(.shadowdark-character .box-label) {
        font-size: 0.9em;
    }

    .char-basic-info { grid-area: char-basic-info; 
        display: flex;
        flex-direction: row;
        gap: 0.5em;
    }

    .ability-scores { grid-area: ability-scores; 
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        gap: 0.5em;
    }

    .hp { grid-area: hp; }

    .prof { grid-area: prof; }

    .death-luck { grid-area: death-luck;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
        z-index: 10;
    }

    .slots { grid-area: slots;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-wrap: wrap;
    }

    .coins { grid-area: coins;
        display: flex;
        justify-content: space-evenly;
        gap: 0.5em;
        align-items: center;
    }

    .armor { grid-area: armor; 
        display: flex;
        justify-content: center;
        gap: 0.5em;
    }

    .gear { grid-area: gear;
        width: 100%;
        height: 100%;
    }

    .item-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.25em;
    }

    .attacks { grid-area: attacks; }

    .spells { grid-area: spells; 
    }

    .license { grid-area: license;
        font-size: 0.8em;
        display: flex;
        justify-content: center;
        align-items: center;
    }



</style>