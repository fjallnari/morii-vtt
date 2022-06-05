<script lang="ts">
    import InPlaceEditBox from "./InPlaceEditBox.svelte";
    
    export let value: string;
    export let modifyCharacter: () => Promise<void>;

</script>

<div class="armor-class-wrapper">
    <InPlaceEditBox 
        bind:characterStat={value}
        boxLabel="Armor Class"
        editModeWidth="2em"
        editModeHeight="2em"
        modifyCharacter={modifyCharacter}>
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
        font-weight: bold;
    }

    .armor-class-wrapper :global(box .box-label) {
        width: 5em;
        margin-bottom: -0.25em;
    }

</style>