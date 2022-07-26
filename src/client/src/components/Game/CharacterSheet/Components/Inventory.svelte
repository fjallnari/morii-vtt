<script lang="ts">
    import { modifyCharacter } from "../../../../stores";
    import { Icon } from '@smui/icon-button';
    import ItemDetail from "./ItemDetail.svelte";
    import type { Character, Item } from "../../../../interfaces/Character";
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";
    import { nanoid } from 'nanoid/non-secure'

    export let character: Character;

    const coin_types = Object.keys(character.coins);

    const addNewItem = () => {
        const itemSkeleton: Item = {
            id: nanoid(16),
            name: '',
            is_equipped: false,
            amount: '1',
            has_weight: false,
            has_attack: false,
            want_tooltip: false,
            use_as_resource: false,
        }

        character.inventory = character.inventory.concat([itemSkeleton]);
        return itemSkeleton.id;
    }


</script>

<div class="coins-boxes">
    {#each coin_types as coin_type, index}
        <InPlaceEditBox bind:value={character.coins[coin_type]} boxLabel={coin_type} 
            inlineStyle="margin-{index === 0 ? 'top': 'bottom'}: {[0, coin_types.length - 1].includes(index) ? '0.5': '0'}em;"
            editWidth="2em" editHeight="2em">
        </InPlaceEditBox>
    {/each}
</div>
<box class="inventory-box box-with-label">
    {#if character.inventory.length === 0}
        <div class="box-main-text">
            <sendable on:click={() => { addNewItem(); $modifyCharacter() }}>
                <Icon class="material-icons">{'add'}</Icon>
            </sendable>
        </div>
    {:else}
        <div class="inventory-items">
            {#each character.inventory as item}
                <ItemDetail bind:item={item} bind:character={character}></ItemDetail>
            {/each}
            <sendable class="add-new-item" on:click={() => { addNewItem(); $modifyCharacter() }}>
                <Icon class="material-icons">{'add'}</Icon>
            </sendable>
        </div>
    {/if}
    
    <div class="box-justify-filler"></div>
    <div class="box-label">
        Equipment
    </div>
</box>

<style>
    .inventory-box {
        margin-left: -2em;
        height: 100%;
        display: flex;
        align-items: normal;
    }

    .coins-boxes {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        align-items: center;
        height: 100%;
    }

    .coins-boxes :global(box) {
        width: 3em;
        height: 1em;
        margin-right: 2em;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .inventory-items {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 0.25em;

        margin-top: 0.5em;
        overflow-y: auto;
        height: 100%;
        scrollbar-width: thin;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #1d1d22;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #757578;
        border: transparent;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #404044;
    }

</style>