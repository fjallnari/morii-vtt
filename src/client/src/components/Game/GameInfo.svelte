<script lang="ts">
    import IconButton from '@smui/icon-button';
    import { push } from "svelte-spa-router";
    import type GameData from "../../interfaces/GameData";

    export let gameData: GameData;

</script>

<div class="game-info">

    <h3>{gameData.name}</h3>
    <div class="icon-bar">
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

</style>