<script lang="ts">
    import Icon from "@iconify/svelte";
    import { campaignDetailActive, campaignNewActive, selectedCampaign, user } from '../../stores';
    import SimpleIconButton from "../SimpleIconButton.svelte";

    let selection = '';

    const showCampaignDetails = (campaignId: string) => {
        selection = campaignId;
        selectedCampaign.set($user.campaigns.find(campaign => campaign._id === campaignId));
        campaignDetailActive.set(true);
    }

    const switchToCampaignCreation = () => {
        campaignDetailActive.set(false);
        campaignNewActive.set(! $campaignNewActive);
    };

</script>

<div class="campaigns">
    <campaigns-list>
        {#each $user?.campaigns ?? [] as campaign}
            <item on:click={() => showCampaignDetails(campaign._id)} selected={selection === campaign._id} on:keyup={() => {}}>
                <div class="title">
                    {campaign.name}
                </div>
                <div class="subtitle">
                    {campaign.system}
                </div>
                <div class="icon">
                    <Icon class="big-icon" 
                        icon="mdi:{campaign.owner?._id === $user?._id ? 'crown': 'dice-multiple'}" 
                        color="var(--clr-icon-{campaign.owner?._id === $user?._id ? 'owner' : 'player'})"
                    />
                </div>            
            </item>
        {/each}
    </campaigns-list>
</div>

<div class="create-campaign-button">
    <SimpleIconButton icon="mdi:add" width="1.5em" onClickFn={() => switchToCampaignCreation() }></SimpleIconButton>
</div>


<style>
    .campaigns {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: thin;
    }

    campaigns-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5em;
        width: 100%;
        margin: 4px 0px;
        font-family: Quicksand;
    }
    
    item {
        display: grid; 
        grid-template-columns: 1fr 1fr 6fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        gap: 0.1em;
        width: 85%;
        padding: 0.25em 0.5em 0em 0.5em;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 150ms ease-out;
        background-color: transparent;
        
        grid-template-areas: 
            "title title padding-div icon"
            "subtitle subtitle . icon";
    }

    item:hover {
        transform: scale(1.02);
        background-color: var(--clr-box-bg-light);
    }

    item[selected="true"] {
        background-color: var(--clr-accent-muted);
    }

    item[selected="true"] .title {
        color: var(--clr-accent-light);
    }

    .title, .subtitle {
        text-align: left;
    }

    .title { grid-area: title; 
        font-family: Palanquin;
        font-size: 1.1em;
        opacity: 0.9;
    }

    .subtitle { grid-area: subtitle;
        font-family: Quicksand;
        font-size: 0.9em;
        color: var(--clr-text);
        opacity: 0.7;
    }

    .icon { grid-area: icon; 
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 0.2em;
    }

    .create-campaign-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

</style>