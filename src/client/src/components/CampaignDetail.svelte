<script lang="ts">
    import IconButton from '@smui/icon-button/src/IconButton.svelte';
    import List, {
        Item,
        Graphic,
        Separator,
        Meta,
        Text,
    } from '@smui/list';
import App from '../App.svelte';
    import { campaignDetailActive, selectedCampaign, user } from '../stores';

    let options = [ 'Cyril', 'Tom Bombadill', 'Queen Elisabeth The Thirteenth of Her Name, Leader of The Island Folk'];

</script>

<div class="campaign-detail-content">
    <div class="campaign-action-bar">
        <IconButton class="material-icons" style="color: #b7ce63" ripple={false} on:click={() => {}}>play_arrow</IconButton>
        <IconButton class="material-icons" style="color: #38b9d6" ripple={false} on:click={() => {}}>add</IconButton>
        <IconButton class="material-icons" style="color: #9A9196" ripple={false} on:click={() => {}}>delete</IconButton>
        <IconButton class="material-icons" style="color: #ff6a60" ripple={false} on:click={() => {}}>logout</IconButton>  
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
                    <Meta>
                        <IconButton class="material-icons" style="color: #ff6a60" ripple={false} on:click={() => {}}>close</IconButton> 
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
