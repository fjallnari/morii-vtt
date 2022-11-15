<script lang="ts">
    import { push, replace } from "svelte-spa-router";
    import type GameData from "../../interfaces/GameData";
    import { selectedCharacter, user } from '../../stores';
    import SimpleIconButton from '../SimpleIconButton.svelte';

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
            <SimpleIconButton icon='material-symbols:dashboard-rounded' color='#A7C284' onClickFn={() => showGameOverview()}></SimpleIconButton>
        {/if}
        <SimpleIconButton icon='mdi:logout' color='#EFA48B' onClickFn={() => leaveGame()}></SimpleIconButton>
    </div>
</div>

<style>
    .game-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
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
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-left: 1em;
        margin: 0.5em 0em;
    }

    .game-info .icon-bar {
        display: flex;
        gap: 1em;
        padding-right: 1em;
    }

</style>