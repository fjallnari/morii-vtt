<script lang="ts">
    import axios from "axios";
    import io from 'socket.io-client';
    import { user, socket } from '../stores';
    import { push, replace } from "svelte-spa-router";
    import Chat from "../components/Game/Chat.svelte";
    import GameInfo from "../components/Game/GameInfo.svelte";
    import CircularProgress from '@smui/circular-progress';
    import CharacterHandler from "../components/Game/CharacterHandler.svelte";
    import GameDashboard from "../components/Game/GameDashboard.svelte";

    export let params: { id?: string } = {};

    // initialises socket
    socket.set(io());

    // returns current campaign object or redirects to dashboard
    const loadGame = async () => {
		try {
			const response = await axios.get(`/api/game/${params.id}`);
                        
			user.set(response.data.userInfo);
            $socket.emit('join-room', { roomID: params.id, userID: $user._id });
			return $user.gameData;
		}
		catch (err){
            replace('/');
            console.log(err);
		}
	}

</script>

{#await loadGame()}
    <div id="progress-circle"><CircularProgress style="height: 4em; width: 4em;" indeterminate /></div>
{:then gameData}
    <div class="game-content">
        {#if $user && $user._id === gameData.owner}
            <GameDashboard gameData={gameData}></GameDashboard>
        {:else}
            <CharacterHandler gameData={gameData}></CharacterHandler>
        {/if}
        <div class="right-panel">
            <GameInfo gameData={gameData}></GameInfo>
            <Chat></Chat>
        </div>
    </div>
{/await}


<style>
    .game-content {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding-top: 1em;
        height: 95vh;
        gap: 1em;
    }

    .right-panel {
        display: flex;
        flex-direction: column; 
        align-items: center;
        height: inherit;
        gap: 1em;
    }

    #progress-circle {
      display: flex; 
      justify-content: center;
      align-items: center;
      height: 95vh;
    }


</style>