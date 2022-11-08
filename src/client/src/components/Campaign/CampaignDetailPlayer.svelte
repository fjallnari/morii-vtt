<script lang="ts">
    import List, {
        Item,
        Separator,
        Text,
    } from '@smui/list';
    import { push, replace } from 'svelte-spa-router';

    import { campaignDetailActive, selectedCampaign } from '../../stores';
    import SimpleIconButton from '../SimpleIconButton.svelte';
    import CampaignLeave from './CampaignLeave.svelte';

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
        <CampaignLeave></CampaignLeave>
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

    .player-role-image {
        margin-right: 1em;
    }

    #close-campaign-detail {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

</style>
