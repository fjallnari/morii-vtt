<script lang="ts">
    import Button, { Label } from '@smui/button';
    import IconButton from '@smui/icon-button';
    import { campaignNewActive } from '../../stores';
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
        <Button variant="raised" color="secondary" on:click={() => { decided = true; wantsToJoin = false; }}>
            <Label>Create!</Label>
        </Button>

        <Button variant="raised" color="primary" on:click={() => { decided = true; wantsToJoin = true; }}>
            <Label>Join!</Label>
        </Button>
        
        <div id="cancel-button">
            <IconButton class="material-icons" on:click={ () => campaignNewActive.set(! $campaignNewActive) }>close</IconButton>
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

    #cancel-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

</style>