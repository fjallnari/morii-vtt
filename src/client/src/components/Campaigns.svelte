<script lang="ts">
    import List, {
        Item,
        Graphic,
        Meta,
        Text,
        PrimaryText,
        SecondaryText,
    } from '@smui/list';
    import Fab, { Icon } from '@smui/fab';
    import IconButton from '@smui/icon-button/src/IconButton.svelte';
    import Tooltip, { Wrapper } from '@smui/tooltip';
    import { campaignDetailActive, campaignNewActive, selectedCampaign, user } from '../stores';
 
    let options = [
        {
            name: 'Bunions & Flagons',
            description: 'D&D 5E',
            disabled: false,
        },
        {
            name: 'The Forlorn Mysterium',
            description: 'Call of Cthulhu',
            disabled: false,
        },
    ];

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

<div>
    <List
        class="demo-list"
        style="width: 34em; text-align: left; gap: 1em;"
        twoLine
        singleSelection
    >
        {#each ($user).campaigns as campaign}
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
                        <Wrapper>
                            {#if campaign.owner._id === $user._id}
                                <img id="crown" src="../static/crown.svg" alt="crown">
                                <Tooltip>GM</Tooltip>
                            {:else}
                                <img id="dice" src="../static/dice.svg" alt="dice">
                                <Tooltip>Player</Tooltip>
                            {/if}
                        </Wrapper>
                    </Meta>
                </Item>
            </div>
        {/each}
    </List>
</div>

<div id="create-campaign-button">
    <IconButton class="material-icons" on:click={ () => switchToCampaignCreation() }>add</IconButton>
</div>

<style>
    #create-campaign-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

    .campaign-item:hover {
        transform: scale(1.05);
    }

    .campaign-item {
        font-family: Montserrat;
    }

</style>