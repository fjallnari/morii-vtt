<script lang="ts">
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";

    export let coins: Record<string, string>;
    
</script>

<div class="coins">
    {#each Object.keys(coins) as coinType}
        <InPlaceEditBox bind:value={coins[coinType]} boxLabel={coinType} valueFontSize="1.2em" editWidth="2em" editHeight="2em" />
    {/each}
</div>

<style>
    .coins { grid-area: coins;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5em;
    }

</style>