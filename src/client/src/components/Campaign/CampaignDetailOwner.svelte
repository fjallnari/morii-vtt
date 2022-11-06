<script lang="ts">
    import IconButton from '@smui/icon-button';
    import List, {
        Item,
        Separator,
        Meta,
        Text,
    } from '@smui/list';
    import axios from 'axios';
    import { push, replace } from 'svelte-spa-router';
    import type UserSimple from '../../interfaces/UserSimple';
    import { campaignDetailActive, selectedCampaign } from '../../stores';
    import CampaignDelete from './CampaignDelete.svelte';
    import CreateInviteCode from './CreateInviteCode.svelte';


    const kickPlayer = async (kickedPlayer: UserSimple) => {
        try {            
            const response = await axios.post('/api/kick-player', {
                playerID: kickedPlayer._id,
                campaignID: $selectedCampaign._id
            });

            if (response.status === 200) {
                selectedCampaign.update( campaign => {
                    return Object.assign(campaign, {players: campaign.players.filter( player => player._id !== kickedPlayer._id)});
                })
            }

        }
        catch (err) {
            console.log(err);
        }
    }

</script>

<div class="campaign-detail-content">
    <div class="campaign-action-bar">
        <IconButton class="material-icons" style="color: #A7C284; font-size: xx-large;" ripple={false} on:click={() => {push(`/game/${$selectedCampaign._id}`)}}>play_arrow</IconButton>
        <CreateInviteCode></CreateInviteCode>
        <CampaignDelete></CampaignDelete>       
    </div>
    <div class="players-list">
        <List>
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
                    <Meta>
                        <IconButton class="material-icons" style="color: #ff6a60" ripple={false} on:click={() => kickPlayer(player)}>close</IconButton> 
                    </Meta>
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
        justify-content: flex-start;
        width: 85%;
        gap: 1em;
        min-height: 0;
    }

    .players-list {
        overflow-x: hidden;
        overflow-y: auto;
    }

    :global(.players-list ul) {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        text-align: left;
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
