<script lang="ts">
    import Icon from "@iconify/svelte";
    import { slide } from "svelte/transition";
    import type { ItemCairn } from "../../../../interfaces/Cairn/CharacterCairn";
    import { modifyCharacter } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import SimpleButton from "../../../SimpleButton.svelte";

    export let item: ItemCairn;

    export let textareaHeight: string = '10em';
    export let editWidth: string = '18rem';
    export let editHeight: string = '1.5rem';
    export let deleteItem: () => void = () => {};
    export let onSubmitFn: () => void = $modifyCharacter;

    let isOpen: boolean = false;

    const itemTypeIcons = {
        'item': 'mdi:cube',
        'armor': 'mdi:shield-half-full',
        'weapon': 'mdi:sword',
        'fatigue': 'mdi:sleep',
        'spellbook': 'mdi:fire'
    }

    $: itemIcon = itemTypeIcons[item.type];

</script>

<box class="item-main-container {item.type === "fatigue" ? 'striped' : ''}">
    {#if item.type === 'fatigue'}
        <div class="fatigue">
            <div class="fatigue-title">FATIGUE</div>
        </div>
    {:else}
        <div class="item-summary">
            <sendable class="item-type-icon">
                <Icon class="medi-icon" icon={itemIcon} />
            </sendable>
            <div class="item-name">
                <InPlaceEdit bind:value={item.name} editWidth={editWidth} editHeight={editHeight} on:submit={() => onSubmitFn()}/>
            </div>
            <div class="item-bulky">
                <sendable on:click={() => { item.bulky = !item.bulky; onSubmitFn()}} on:keyup={() => {}}>
                    <Icon class="medi-icon" icon="{item.bulky ? 'mdi:weight': 'mdi:feather'}" />
                </sendable>
            </div>
            <sendable class="item-menu" on:click={() => { isOpen = !isOpen }} on:keyup={() => {}}>
                <Icon class="big-icon" icon="material-symbols:{isOpen ? 'menu-open-rounded' : 'menu-rounded'}" />
            </sendable>
        </div>
    {/if}
    {#if isOpen}
        <div class="details" transition:slide|local>
            <textarea style='height: {textareaHeight};' on:change={() => onSubmitFn()} bind:value={item.description}></textarea>
            <SimpleButton value='Delete' type="delete" onClickFn={() => deleteItem()}></SimpleButton>
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

    .fatigue {
        display: grid; 
        grid-template-columns: 2fr 20fr 2fr; 
        grid-template-rows: 2fr; 
        gap: 0.5em;
        padding: 0.5em 0em;
        grid-template-areas: ". fatigue-title ."
    }

    .striped {
        background: repeating-linear-gradient( 45deg, 
            var(--clr-box-bg-light), 
            var(--clr-box-bg-light) 10px, 
            var(--clr-accent-darker) 10px, 
            var(--clr-accent-darker) 20px 
        );
    }

    .fatigue-title { grid-area: fatigue-title; 
        font-weight: var(--semi-bold);
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
    }

    .single-detail-line div {
        font-size: 1em;
    }

</style>