<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { CharacterCairn, ItemCairn } from "../../../../interfaces/Cairn/CharacterCairn";
    import { modifyCharacter, sendSkillCheck } from "../../../../stores";
    import BioTextareaBox from "../../../BioTextareaBox.svelte";
    import BoxWithList from "../../../BoxWithList.svelte";
    import BoxWithMax from "../../../BoxWithMax.svelte";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";
    import RowBoxWithLabel from "../../../RowBoxWithLabel.svelte";
    import SimpleButton from "../../../SimpleButton.svelte";
    import Armor from "../Components/Armor.svelte";
    import CharSheetMenu from "../Components/CharSheetMenu.svelte";
    import HpBox from "../Components/HpBox.svelte";
    import ItemDetailCairn from "./ItemDetailCairn.svelte";

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
        // heal hp to max
        if (!character.deprived) {
            character.hp = character.hp_max;
            $modifyCharacter('short-rest');
        }
    }

    const characterSleep = () => {
        // clear all fatigue
        character.inventory = character.inventory.filter(item => item.type !== 'fatigue');
        characterRest();
        $modifyCharacter('sleep');
    }

    const addFatigue = () => {
        character.inventory = character.inventory.concat([{ type: 'fatigue' }]);
        $modifyCharacter('add-fatigue');
    }

    const restoreAbility = () => {
        // restore all abilities to max
        for (const AS in character.ability_scores) {
            character.ability_scores[AS].current = character.ability_scores[AS].max;
        }
        characterSleep();
        $modifyCharacter('week-rest');
    }

    const addItem = () => {
        character.inventory = character.inventory.concat([{ name: '', type: 'item' }]);
    }

    const deleteItem = (item: ItemCairn) => {
        character.inventory = character.inventory.filter(itemIter => itemIter !== item);
        $modifyCharacter('delete-item');
    }

    const moveItem = (itemToMove: ItemCairn, indexDiff: number) => {
        const currentIndex = character.inventory.findIndex(item => item === itemToMove);
        // prevent out of bounds errors
        if (indexDiff === -1 && currentIndex === 0 || indexDiff === 1 && currentIndex === character.inventory.length - 1) {
            return;
        }

        [character.inventory[currentIndex], character.inventory[currentIndex + indexDiff]] = [
            character.inventory[currentIndex + indexDiff], character.inventory[currentIndex]
        ];
        $modifyCharacter('move-item');
    }

    const sendAbilitySave = (AS: string) => {
        $sendSkillCheck(0, `${AS} save (<=${character.ability_scores[AS].current}) | `, `${character.name.split(' ')[0]}`, '-', 'd20', '', '', '', 'roll-under', ~~character.ability_scores[AS].current);
    }

    const recalculateArmor = () => {
        character.armor = character.inventory.reduce(
                (acc, item) => acc + (item.armor ? ~~item.armor : 0),
                0
        ).toString();
        $modifyCharacter('armor-recalc');
    }

    const stackItems = () => {
        let stackable = character.inventory.filter((item) => item.stacks).length;
        let unstackable = character.inventory.filter((item) => !item.stacks && !item.slotless).length;
        return stackable <= unstackable ? 0 : stackable - unstackable;
    }

    const checkOverEncumbered = () => {
        if (filledSlotsCount >= ~~character.slots && !character.manual_encumbrance) {
            character.hp = "0";
        }
    }

    let filledSlotsCount: number = 0;
    $: {
        filledSlotsCount = character.inventory.reduce(
            (acc, item) => acc + (item.bulky ? 2 : item.stacks || item.slotless ? 0 : 1),
            0
        ) + stackItems();
        character.slots_filled = filledSlotsCount.toString();
        checkOverEncumbered();
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
                <BoxWithMax label={AS}
                    bind:currentValue={character.ability_scores[AS].current}
                    bind:maxValue={character.ability_scores[AS].max}
                    sendable
                    sendFce={() => sendAbilitySave(AS)}
                />
            </div>
            <box class="ability-score-info">
                <em><strong>{abilityScoreDetails[AS].name}{": "}</strong>{abilityScoreDetails[AS].description}</em>
            </box>
        </div>
        {/each}
    </div>

    <BioTextareaBox bind:charAttribute={character.appearance} inlineStyle="grid-area: traits; margin: 0.75em 0.75em 0em 0em;" label="Appearance" />
    <BioTextareaBox bind:charAttribute={character.notes} inlineStyle="grid-area: notes; margin: 0em 0.75em 0.75em 0em;" label="Notes" />

    <div class="slots">
        <RowBoxWithLabel label='Total slots'>
            <InPlaceEdit bind:value={character.slots} editWidth='2em' editHeight='2em' on:submit={() => $modifyCharacter()}/>
        </RowBoxWithLabel>
        <RowBoxWithLabel 
            label='Filled slots'
            tooltipText='Filling all total item slots reduces a PC to 0 HP.'
            wantBorder={filledSlotsCount >= ~~character.slots && !character.manual_encumbrance}
        >
            {filledSlotsCount > ~~character.slots ? ~~character.slots : filledSlotsCount }
        </RowBoxWithLabel>
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
            tooltipText="Deprived PCs cannot recover HP. If deprived for more than a day, they add a Fatigue to inventory."
            onClickFn={() => { character.deprived = !character.deprived; $modifyCharacter('deprived') }}
        >
            <Icon icon="{character.deprived ? 'mdi:sleep': ''}" />
        </RowBoxWithLabel>
    </div>

    <BoxWithList label='Inventory' inlineStyle='grid-area: inventory;' addNewListItem={addItem}>
        <div class="item-list" slot='list'>
            {#each character.inventory as item, index}
                <ItemDetailCairn 
                    bind:item deleteItem={deleteItem} 
                    recalculateArmor={recalculateArmor}
                    moveItem={moveItem}
                />
            {/each}
        </div>
    </BoxWithList>

    <div class="macros">
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
        <SimpleButton value='Week’s rest'
            icon="mdi:bottle-tonic-plus"
            iconWidth='1.25em'
            onClickFn={() => restoreAbility()}
        />
        <SimpleButton value='Add fatigue'
            icon="mdi:sleep"
            iconWidth='1.25em'
            onClickFn={() => addFatigue()}
        />
        <div class="license">
            <a href="https://cairnrpg.com/cairn-srd/">Cairn</a>, by Yochai Gal. <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC-BY-SA 4.0.</a>
        </div>
    </div>

    <CharSheetMenu></CharSheetMenu>
</tab-container>

<style>

    tab-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1.5fr 1fr 0.5fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr;
        gap: 0.75em;
        grid-template-areas:
            "character-basic-info character-basic-info character-basic-info character-basic-info character-basic-info character-basic-info traits traits traits"
            "ability-scores ability-scores ability-scores hp deprived coins traits traits traits"
            "ability-scores ability-scores ability-scores hp armor coins traits traits traits"
            "ability-scores ability-scores ability-scores slots slots coins notes notes notes"
            "ability-scores ability-scores ability-scores inventory inventory inventory notes notes notes"
            "ability-scores ability-scores ability-scores inventory inventory inventory notes notes notes"
            "macros macros macros inventory inventory inventory notes notes notes"
            "macros macros macros inventory inventory inventory notes notes notes"
            "macros macros macros inventory inventory inventory notes notes notes"
            "macros macros macros inventory inventory inventory notes notes notes"
            "macros macros macros inventory inventory inventory notes notes notes"
            "macros macros macros char-sheet-menu char-sheet-menu char-sheet-menu notes notes notes";
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

    .item-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.25em;
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

    .slots { grid-area: slots;
        display: flex;
        justify-content: space-evenly;
        gap: 0.5em;
        white-space: nowrap;
    }

    .coins { grid-area: coins;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5em;
    }

    .macros { grid-area: macros;
        display: flex;
        justify-content: center;
        flex-flow: wrap;
        gap: 0.5em;
        font-size: 1.25em;
        height: fit-content;
    }

    :global(.cairn-character > .macros > *) {
        max-width: 45%;
        padding: 0.75em 0em;
    }

    .license {
        font-size: 1rem;
        white-space: nowrap;
    }

</style>
