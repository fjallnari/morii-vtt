<script lang="ts">
    import Icon from '@iconify/svelte';
    import axios from 'axios';
    import { push, replace } from 'svelte-spa-router';
    import type UserSimple from '../../interfaces/UserSimple';
    import { campaignDetailActive, selectedCampaign, user } from '../../stores';
    import SimpleIconButton from '../SimpleIconButton.svelte';
    import CampaignDelete from './CampaignDelete.svelte';
    import CampaignLeave from './CampaignLeave.svelte';
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
        {#if $user._id === $selectedCampaign.owner._id}
            <CreateInviteCode></CreateInviteCode>
            <CampaignDelete></CampaignDelete>
        {:else}
            <CampaignLeave></CampaignLeave>
        {/if}
    </div>
    <div class="players-list">
        <div class="owner-item player-item">
            <div class="username">
                <Icon class="big-icon" icon="mdi:crown" color="var(--clr-icon-owner)" />
                {$selectedCampaign.owner.username}
            </div>
            <div class="kick-player"></div>
        </div>
        <hr class="solid">
        {#if ($selectedCampaign?.players ?? []).length === 0}
            <div class="no-players">
                <Icon class="biggest-icon" 
                    icon="mdi:account-group"
                    color="#DBD8B3"
                />
                <span>There are no players in this campaign.<br/>Go ahead and invite some!</span>
            </div>
        {:else}
            {#each $selectedCampaign?.players as player}
                <div class="player-item">
                    <div class="username">
                        <Icon class="big-icon" icon="mdi:dice-multiple" color="var(--clr-icon-player)" />
                        {player.username}
                    </div>
                    <div class="kick-player">
                        {#if $user._id === $selectedCampaign.owner._id}
                            <SimpleIconButton
                                width="1.5em"
                                icon="mdi:close" 
                                onClickFn={() => kickPlayer(player)}
                                color='#FF6A60'
                            >
                            </SimpleIconButton>
                        {/if}
                    </div>                
                </div>
            {/each}
        {/if}
    </div>
</div>

<div class="close-campaign-detail">
    <SimpleIconButton icon="mdi:close" width="1.5em" onClickFn={() => campaignDetailActive.set(false)}></SimpleIconButton>
</div>

<style>
    .campaign-detail-content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        gap: 1em;
        min-height: 0;
    }

    .campaign-action-bar {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }

    .players-list {
        overflow-x: hidden;
        overflow-y: auto;
        scrollbar-width: thin;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.25em;
        min-height: 85%;
    }

    .player-item {
        display: grid; 
        grid-template-columns: 6fr 1fr; 
        grid-template-rows: 1fr; 
        gap: 0.2em;
        width: 80%;
        min-height: 2.5em;
        padding: 0.2em 0.4em;
        border-radius: 4px;
        font-family: Quicksand;
        transition: background-color 150ms ease-out;
        background-color: transparent;
        grid-template-areas: 
            "username kick-player";
    }

    .player-item:hover {
        background-color: var(--clr-box-bg-light);
    }

    hr.solid {
        border-top-color: rgba(255, 255, 255, 0.2);
        width: 84%;
        margin: -0.1em;
    }

    .username { grid-area: username; 
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 1em;
    }

    .kick-player { grid-area: kick-player; 
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .no-players {
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        padding: 2em;
        font-family: Montserrat;
        font-size: 1em;
    }

    .close-campaign-detail {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

</style>