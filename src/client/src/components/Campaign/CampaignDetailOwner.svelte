<script lang="ts">
    import Icon from '@iconify/svelte';
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
    import SimpleIconButton from '../SimpleIconButton.svelte';
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
        <SimpleIconButton 
            icon="mdi:play" 
            onClickFn={() => {replace(`/game/${$selectedCampaign._id}`)}}
            color='#A7C284'
            width="2.5em"
            wrapperPadding="0.5em"
        >
        </SimpleIconButton>
        <CreateInviteCode></CreateInviteCode>
        <CampaignDelete></CampaignDelete>       
    </div>
    <div class="players-list">
        <List>
        <Item style="font-family: Montserrat">
            <Icon class="big-icon" icon="mdi:crown" color="var(--clr-icon-owner)" />
            <span class="username">
                {$selectedCampaign.owner.username}
            </span>
        </Item>
        <Separator />
        {#each $selectedCampaign.players as player}
            <div class="campaign-item">
                <Item>
                    <Icon class="big-icon" icon="mdi:dice-multiple" color="var(--clr-icon-player)" />
                    <span class="username">
                        {player.username}
                    </span>
                    <Meta>
                        <SimpleIconButton 
                            icon="mdi:close" 
                            onClickFn={() => kickPlayer(player)}
                            color='#FF6A60'
                        >
                        </SimpleIconButton>
                    </Meta>
                </Item>
            </div>
        {/each}
        </List> 
    </div>
</div>

<div id="close-campaign-detail">
    <SimpleIconButton icon="mdi:close" width="1.5em" onClickFn={() => campaignDetailActive.set(false)}></SimpleIconButton>
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

    .username {
        margin-left: 0.75em;
    }

    #close-campaign-detail {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

</style>
