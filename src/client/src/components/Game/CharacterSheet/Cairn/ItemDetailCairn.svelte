<script lang="ts">
    import Icon from "@iconify/svelte";
    import Svelecte from "svelecte/src/Svelecte.svelte";
    import { slide } from "svelte/transition";
    import type { ItemCairn } from "../../../../interfaces/Cairn/CharacterCairn";
    import { modifyCharacter, selectedCharacter, sendSkillCheck } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import SimpleButton from "../../../SimpleButton.svelte";

    export let item: ItemCairn;

    export let textareaHeight: string = '10em';
    export let editWidth: string = '18rem';
    export let editHeight: string = '1.5rem';
    export let deleteItem: (item: ItemCairn) => void = () => {};
    export let onSubmitFn: () => void = $modifyCharacter;

    let isOpen: boolean = false;

    const itemTypeIcons = {
        'item': 'mdi:cube',
        'armor': 'mdi:shield-half-full',
        'weapon': 'mdi:sword',
        'spellbook': 'mdi:fire'
    }

    let itemTypeIndex = Object.keys(itemTypeIcons).indexOf(item.type);
    let oldTypeIndex = itemTypeIndex;

    $: itemIcon = itemTypeIcons[item.type];

    $: if (itemTypeIndex !== oldTypeIndex && item.type !== 'fatigue') {
        oldTypeIndex = Object.keys(itemTypeIcons).indexOf(item.type);
        item.type = Object.keys(itemTypeIcons)[itemTypeIndex] ?? item.type;
        onSubmitFn();
    }

    const rollAttack = () => {
        if (item.damage && item.damage !== '') {
            $sendSkillCheck(0, `${item.name.toLowerCase()} | damage (${item.damage})`, `${$selectedCharacter?.name.split(' ')[0]}`, '-', '', '', item.damage);
        }
    }

</script>

<box class="item-main-container {item.type === "fatigue" ? 'striped' : ''}">
    {#if item.type === 'fatigue'}
        <div class="fatigue">
            <div class="fatigue-title">FATIGUE</div>
            <sendable class="fatigue-remove" on:click={() => deleteItem(item)} on:keyup={() => {}}>
                <Icon class="medi-icon" icon='mdi:close'/>
            </sendable>
        </div>
    {:else}
        <div class="item-summary">
            {#if item.type === 'weapon'}
                <sendable class="item-type-icon" on:click={() => rollAttack()} on:keyup={() => {}}>
                    <Icon class="medi-icon" icon={itemIcon} />
                </sendable>
            {:else}
                <div class="item-type-icon">
                    <Icon class="medi-icon" icon={itemIcon} />
                </div>
            {/if}
            <div class="item-name">
                <InPlaceEdit bind:value={item.name} editWidth={editWidth} editHeight={editHeight} on:submit={() => onSubmitFn()}/>
            </div>
            <div class="item-bulky">
                <sendable on:click={() => {(!item.stacks && !item.bulky) ? item.bulky = true : (!item.stacks && item.bulky) ? (item.stacks = true, item.bulky = false) : (item.stacks = false, item.bulky = false); onSubmitFn();}} on:keyup={() => {}}>
                    <Icon class="medi-icon" icon="{item.stacks ? 'mdi:card-multiple' : item.bulky ? 'mdi:weight': 'mdi:feather'}" />
                </sendable>
            </div>
            <sendable class="item-menu" on:click={() => { isOpen = !isOpen }} on:keyup={() => {}}>
                <Icon class="big-icon" icon="material-symbols:{isOpen ? 'menu-open-rounded' : 'menu-rounded'}" />
            </sendable>
        </div>
    {/if}
    {#if isOpen}
        <div class="single-detail-line">
            <div class="line-title">Item type: </div>
            <div class="item-type-select">
                <Svelecte
                    options={Object.keys(itemTypeIcons)}
                    placeholder='---'
                    bind:value={itemTypeIndex}>
                </Svelecte>
            </div>
            {#if item.type === 'weapon'}
                <div class="line-title">Damage:</div>
                <InPlaceEdit bind:value={item.damage} editWidth='2em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
            {/if}
        </div>
        <div class="details" transition:slide|local>
            <textarea style='height: {textareaHeight};' on:change={() => onSubmitFn()} bind:value={item.description}></textarea>
            <SimpleButton value='Delete' type="delete" onClickFn={() => deleteItem(item)}></SimpleButton>
        </div>
    {/if}
</box>

<style>
    box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 95%;
    }

    .item-main-container {
        background-color: var(--clr-box-bg-light);
    }

    .striped {
        background: repeating-linear-gradient( 45deg,
            var(--clr-box-bg-light),
            var(--clr-box-bg-light) 10px,
            var(--clr-accent-darker) 10px,
            var(--clr-accent-darker) 20px
        );
    }

    .fatigue {
        display: grid;
        grid-template-columns: 1fr 20fr 2fr;
        grid-template-rows: 2fr;
        gap: 0.5em;
        padding: 0.5em 0em;
        grid-template-areas: ". fatigue-title fatigue-remove"
    }

    .fatigue-title { grid-area: fatigue-title;
        font-weight: var(--semi-bold);
    }

    .fatigue-remove { grid-area: fatigue-remove;
        justify-content: center;
    }

    .item-summary {
        display: grid;
        grid-template-columns: 1fr 1fr 20fr 1fr 1fr;
        grid-template-rows: 2fr;
        gap: 0.5em;
        padding: 0.5em 0em;
        grid-template-areas: "item-type-icon . item-name item-bulky item-menu"
    }

    .item-type-icon { grid-area: item-type-icon;
        margin-left: 0.5em;
    }

    .item-bulky { grid-area: item-bulky;
        border-right: 1px solid var(--clr-text);
        padding-right: 0.5em;
        gap: 0.25em;
    }

    .item-name { grid-area: item-name;
        font-size: 1.1em;
        font-weight: 400;
        font-family: Quicksand;
        text-align: center;
    }

    .item-menu { grid-area: item-menu;
        margin-right: 0.5em;
    }

    .item-summary > div, .item-summary > sendable {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.details {
		padding: 0em 0.5em 0.5em 0.5em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.5em;
    }

    :global(.details > span) {
        width: 100%;
    }

    .single-detail-line {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.4em;
        font-weight: 400;
        font-family: Quicksand;
        padding: 0.5em;
    }

    .single-detail-line div {
        font-size: 1em;
    }

    .line-title {
        font-family: Athiti;
        font-weight: var(--semi-bold);
    }

    .item-type-select {
        width: 30%;
    }

</style>
