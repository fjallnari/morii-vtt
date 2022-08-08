<script lang="ts">
    import IconButton from '@smui/icon-button';
    import { push, replace } from "svelte-spa-router";
    import type GameData from "../../interfaces/GameData";
    import { selectedCharacter, user } from '../../stores';

    export let gameData: GameData;

    const showGameOverview = () => {
        selectedCharacter.set(undefined);
    }

    const leaveGame = () => {
        selectedCharacter.set(undefined);
        replace('/');
    }

</script>

<div class="game-info">

    <h3>{gameData ? gameData.name : '_'}</h3>
    <div class="icon-bar">
        {#if $user && $user._id === gameData.owner}
            <IconButton class="material-icons" style="color: #A7C284; font-size: xx-large;" ripple={false} on:click={() => showGameOverview()}>dashboard</IconButton>
        {/if}
        <IconButton class="material-icons" style="color: #EFA48B; font-size: xx-large;" ripple={false} on:click={() => leaveGame()}>logout</IconButton>
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
        background-color: var(--clr-box-bg-dark);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    .game-info h3 {
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

</style>