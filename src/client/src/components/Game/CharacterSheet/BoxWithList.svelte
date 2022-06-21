<script lang="ts">
    import { modifyCharacter } from "../../../stores";
    import IconButton, { Icon } from '@smui/icon-button';
    import type { Character } from "../../../interfaces/Character";
    import ListItemDetail from "./ListItemDetail.svelte";

    export let label: string;
    export let addNewListItem: () => void;

</script>

<box class="inside-box-content">
    <slot name="filter-menu"></slot>
    <div class="inside-box-list">
        <slot name="list"></slot>
        <sendable class="add-new-item" on:click={() => { addNewListItem(); $modifyCharacter() }}>
            <Icon class="material-icons">{'add'}</Icon>
        </sendable>
    </div>
    <div class="box-label">
        {label}
    </div>
</box>


<style>

    .inside-box-content {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    

    .inside-box-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.25em;
        scrollbar-width: thin;
        overflow-y: auto;
    }

    .add-new-item {
        padding-top: 0.3em;
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