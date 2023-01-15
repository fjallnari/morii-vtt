<script lang="ts">
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";

    export let value: string;
    export let tooltip: string = undefined;
    
</script>


<div class="armor-class-wrapper">
    <InPlaceEditBox 
        bind:value={value}
        boxLabel="Armor Class"
        editWidth="2em"
        editHeight="2em"
        tooltip={tooltip}>
    </InPlaceEditBox>
</div>

<style>
    .armor-class-wrapper :global(box) {
        width: 5em;
        height: 5em;
        border: 0.5em solid transparent;
        border-radius: 50% 50% 50% 50% / 12% 12% 70% 70%;
    }

    .armor-class-wrapper :global(box .box-main-text) {
        font-size: 1.5em;
        font-weight: var(--semi-bold);
    }

    .armor-class-wrapper :global(box .box-label) {
        width: 5em;
        margin-bottom: -0.25em;
    }

</style>