<script lang="ts">
    import axios from "axios";
    import { accessToken } from "../stores";
    import io from 'socket.io-client';
    import { user } from '../stores';
    import { params, push, replace } from "svelte-spa-router";
    import Chat from "../components/Game/Chat.svelte";
    import GameInfo from "../components/Game/GameInfo.svelte";
    import CircularProgress from '@smui/circular-progress';
    import CharacterHandler from "../components/Game/CharacterHandler.svelte";
    import GameOverview from "../components/Game/GameOverview.svelte";

    const socket = io();

    // returns current campaign object or redirects to dashboard
    const loadGame = async () => {
		// prevents race condition in case loading finishes before access token is refresh (e.g. on reload)
		// TODO: refactor the "refresh token/load secure route" flow
		await new Promise(res => setTimeout(res, 500));
		try {
			const response = await axios.get(`/api/game/${$params.id}`, {
				headers: {
					'Authorization': `Bearer ${$accessToken}`
				}
			});
                        
			user.set(response.data.userInfo);
            socket.emit('join-room', { roomID: $params.id, userID: $user._id });
			return $user.gameData;
		}
		catch {
            replace('/');
		}
	}

</script>

{#await loadGame()}
    <div id="progress-circle"><CircularProgress style="height: 4em; width: 4em;" indeterminate /></div>
{:then gameData}
    <div class="game-content">
        {#if $user.gameData && $user._id === $user.gameData.owner}
            <GameOverview></GameOverview>
        {:else}
            <CharacterHandler gameData={gameData}></CharacterHandler>
        {/if}
        <div class="right-panel">
            <GameInfo gameData={gameData}></GameInfo>
            <Chat socket={socket}></Chat>
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