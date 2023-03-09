<script lang="ts">
    import SimpleButton from "../../../SimpleButton.svelte";

    export let createMenuEnabled: boolean;
    export let addMonster: () => void;
    export let viewRandomMonster: () => void;

</script>

<div class="add-monster-container">
    <SimpleButton value='Create New' type="green" icon="mdi:shape-plus" onClickFn={addMonster}></SimpleButton>
    <SimpleButton value='View random' icon='mdi:dice-multiple' type='primary' onClickFn={() => viewRandomMonster()}></SimpleButton>
    <SimpleButton value='' icon="mdi:close" onClickFn={() => {createMenuEnabled = false}}></SimpleButton>
</div>

<style>
    .add-monster-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-self: center;
        gap: 0.5em;
        width: 95%;
    }

    :global(.add-monster-container > simple-button) {
        font-size: 1.5em;
    }
</style>