<script lang="ts">
    import type Campaign from "../../interfaces/Campaign";
    import IconButton from '@smui/icon-button';
    import Tooltip, { Wrapper } from '@smui/tooltip';
    import Menu from '@smui/menu';
    import type { MenuComponentDev } from '@smui/menu';
    import List, { Item, Separator, Text } from '@smui/list';
    import { push } from "svelte-spa-router";
    import ANIMALS from "../../enum/Animals";

    export let currentCampaign: Campaign;

    let playerListMenu: MenuComponentDev;

</script>

<div class="game-info">

    <h3>{currentCampaign.name}</h3>
    <div class="icon-bar">
        <Menu bind:this={playerListMenu}>
            <List style="text-align: left; gap: 1em;">
                <Item style="font-family: Montserrat">
                    <img class="pfp" src="../static/crown.svg" alt="crown">
                    <Text style="padding-left: 1em;">
                        {currentCampaign.owner.username}
                    </Text>
                </Item>
                <Separator />

                {#each currentCampaign.players.sort((a, b) => a.username.localeCompare(b.username)) as player}
                    <div class="player-list-item">
                        <Item>
                            <img class="pfp" style="background-color: #{player.pfpColor};" src="../static/pfp/{ANIMALS[player.pfpID]}.svg" alt="pfp">
                            <Text style="padding-left: 1em;">
                                {player.username}
                            </Text>
                        </Item>
                    </div>
                {/each}
            </List>
        </Menu>
        <IconButton class="material-icons" style="color: #A7C284; font-size: xx-large;" ripple={false} on:click={() => playerListMenu.setOpen(true)}>person</IconButton>
        <IconButton class="material-icons" style="color: #EFA48B; font-size: xx-large;" ripple={false} on:click={() => push('/')}>logout</IconButton>
    </div>
</div>

<style>
    .game-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 30em;
        height: 5em;
        background-color:#212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    .game-info h3 {
        color: #FCF7F8;
        text-transform: uppercase;
        font-size: 2em;
        font-weight: 100;
        font-family: Montserrat;
        width: 8em;
        text-align: start;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-left: 1em;
    }

    .game-info .icon-bar {
        display: flex;
        gap: 1em;
        padding-right: 1em;
    }

    .player-list-item {
        font-family: Montserrat;
    }

    .pfp {
        border-radius: 15%;
        width: 2em;
        height: 2em;
    }

</style>