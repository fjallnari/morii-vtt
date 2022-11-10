<script lang="ts">
    import { campaignNewActive } from '../../stores';
    import SimpleButton from '../SimpleButton.svelte';
    import SimpleIconButton from '../SimpleIconButton.svelte';
    import CampaignJoin from './CampaignJoin.svelte';
    import CampaignNew from './CampaignNew.svelte';


    let decided: boolean = false;
    let wantsToJoin: boolean = false;

</script>


<div class="choice-content">
    {#if wantsToJoin}
        <CampaignJoin></CampaignJoin>
    {:else if decided}
        <CampaignNew></CampaignNew>
    {:else}
        <SimpleButton value="Create" icon="mdi:folder-plus" iconClass='big-icon' type="green" onClickFn={() => { decided = true; wantsToJoin = false; } }></SimpleButton>
        <SimpleButton value="Join" icon="mdi:folder-arrow-right" iconClass='big-icon' type="primary" onClickFn={() => { decided = true; wantsToJoin = true; } }></SimpleButton>
        
        <div id="cancel-button">
            <SimpleIconButton icon="mdi:close" width="1.5em" onClickFn={() => campaignNewActive.set(! $campaignNewActive)}></SimpleIconButton>
        </div>
    {/if}
</div>

<style>
    .choice-content {
        padding-top: 2em;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 2em;
        height: 30em;
        width: 17em;
    }

    :global(.choice-content > simple-button) {
        padding: 0.5rem 0em;
        font-size: 1.2em;
    }

    #cancel-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

</style>