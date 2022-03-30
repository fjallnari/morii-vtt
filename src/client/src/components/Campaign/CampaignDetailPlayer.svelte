<script lang="ts">
    import IconButton from '@smui/icon-button';
    import List, {
        Item,
        Graphic,
        Separator,
        Meta,
        Text,
    } from '@smui/list';
    import { push, replace } from 'svelte-spa-router';

    import { accessToken, campaignDetailActive, selectedCampaign, user } from '../../stores';
    import CampaignLeave from './CampaignLeave.svelte';

</script>

<div class="campaign-detail-content">
    <div class="campaign-action-bar">
        <IconButton class="material-icons" style="color: #A7C284; font-size: xx-large;" ripple={false} on:click={() => {push(`/game/${$selectedCampaign._id}`)}}>play_arrow</IconButton>
        <CampaignLeave></CampaignLeave>
    </div>
    <div id="players-list">
        <List
        style="width: 34em; text-align: left; gap: 1em;"
        >
        <Item style="font-family: Montserrat">
            <img class="player-role-image" src="../static/crown.svg" alt="crown">
            <Text>
                {$selectedCampaign.owner.username}
            </Text>
        </Item>
        <Separator />
        {#each $selectedCampaign.players as player}
            <div class="campaign-item">
                <Item>
                    <img class="player-role-image" src="../static/dice.svg" alt="dice">
                    <Text>
                        {player.username}
                    </Text>
                </Item>
            </div>
        {/each}
        </List> 
    </div>
</div>

<div id="close-campaign-detail">
    <IconButton class="material-icons" on:click={() => campaignDetailActive.set(false)}>close</IconButton>
</div>

<style>
    .campaign-detail-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }

    .campaign-action-bar {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }

    .campaign-item {
        font-family: Montserrat;
    }

    .player-role-image {
        margin-right: 1em;
    }

    #close-campaign-detail {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

</style>
