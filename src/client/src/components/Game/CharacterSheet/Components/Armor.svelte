<script lang="ts">
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";

    export let value: string;
    export let label: string = "Armor";
    export let tooltip: string = undefined;
    export let valueFontSize: string = '1.5em'
    
</script>


<div class="armor-class-wrapper">
    <InPlaceEditBox 
        bind:value={value}
        boxLabel={label}
        editWidth="2em"
        editHeight="2em"
        valueFontSize={valueFontSize}
        tooltip={tooltip}>
    </InPlaceEditBox>
</div>

<style>
    :global(.armor-class-wrapper box) {
        width: 5em;
        height: 5em;
        border: 0.5em solid transparent;
        border-radius: 50% 50% 50% 50% / 12% 12% 70% 70%;
    }

    :global(.armor-class-wrapper box .box-main-text) {
        font-weight: var(--semi-bold);
        margin-bottom: 0em;
    }

    :global(.armor-class-wrapper box .box-label) {
        width: 5em;
    }

</style>