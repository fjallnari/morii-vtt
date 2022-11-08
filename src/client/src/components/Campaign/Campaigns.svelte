<script lang="ts">
    import List, {
        Item,
        Meta,
        Text,
        PrimaryText,
        SecondaryText,
    } from '@smui/list';
    import { campaignDetailActive, campaignNewActive, selectedCampaign, user } from '../../stores';
    import SimpleIconButton from '../SimpleIconButton.svelte';

    let selection = '';

    const showCampaignDetails = (campaignId: string) => {
        selection = campaignId;
        selectedCampaign.set($user.campaigns.find(campaign => campaign._id === campaignId));
        campaignDetailActive.set(true);
    }

    const switchToCampaignCreation = () => {
        campaignDetailActive.set(false);
        campaignNewActive.set(! $campaignNewActive);
    }

</script>

<div class="campaigns-content">
    <List
        class="demo-list"
        twoLine
        singleSelection
    >
        {#each $user?.campaigns ?? [] as campaign}
            <div class="campaign-item">
                <Item
                    style="margin-bottom: 1em; border-radius: 1%;"
                    on:SMUI:action={() => showCampaignDetails(campaign._id)}
                    selected={selection === campaign._id}
                >
                    <Text>
                        <PrimaryText>{campaign.name}</PrimaryText>
                        <SecondaryText>{campaign.system}</SecondaryText>
                    </Text>
                    <Meta>
                        <div class="role-image">
                            <img id="role-icon" src="../static/{campaign?.owner?._id === $user?._id ? 'crown': 'dice'}.svg" alt="role">
                        </div>
                    </Meta>
                </Item>
            </div>
        {/each}
    </List>
</div>

<div id="create-campaign-button">
    <SimpleIconButton icon="mdi:add" width="1.5em" onClickFn={() => switchToCampaignCreation() }></SimpleIconButton>
</div>

<style>
    #create-campaign-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

    .campaigns-content {
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: 85%;
    }

    :global(.campaigns-content ul) {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        text-align: left; 
    }

    .role-image {
        margin-right: 2em;
    }

    .campaign-item:hover {
        transform: scale(1.02);
    }

    .campaign-item {
        font-family: Montserrat;
    }

</style>