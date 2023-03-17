<script lang="ts">
    import Icon from "@iconify/svelte";
    import { modifyCharacter } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";

    export let value: string = '???';
    export let color: string = 'var(--clr-box-bg-light)';
    export let icon: string = '';
    export let editWidth: string = '5rem';
    export let editHeight: string = '1.5rem';
    export let deleteChip: () => void = () => {};
    export let onSubmitFn: () => void = () => $modifyCharacter();

</script>

<box class='chip' style="background-color: {color};">
    <Icon class="medi-icon" icon={icon} />
    <InPlaceEdit bind:value editWidth={editWidth} editHeight={editHeight} on:submit={() => onSubmitFn()}/>
    <sendable class="delete-chip" on:click={() => { deleteChip()}} on:keyup={() => {}}>
        <Icon class="medi-icon" icon="mdi:close" />
    </sendable>
</box>

<style>
    .chip {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 0.2em;
        font-size: 1em;
        padding: 0.4em;
        background-color: var(--clr-box-bg-lighter);
        flex-wrap: wrap;
        max-width: 90%;
    }
</style>