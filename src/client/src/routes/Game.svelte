<script lang="ts">
    import axios from "axios";
    import { accessToken } from "../stores";
    import io from 'socket.io-client';
    import { user } from '../stores';
    import { params, push, replace } from "svelte-spa-router";
    import Chat from "../components/Game/Chat.svelte";
    import GameInfo from "../components/Game/GameInfo.svelte";

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
            socket.emit('join-room', $params.id);
			return $user.campaigns[0];
		}
		catch {
            replace('/');
		}
	}

</script>

{#await loadGame() then currentCampaign}
    <div class="game-content">
        <div class="character-sheet-box">
            <h1>Character sheet</h1>
        </div>

        <div class="right-panel">
            <GameInfo currentCampaign={currentCampaign}></GameInfo>
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

    .character-sheet-box {
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        height: inherit;
        background-color: #212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        flex-grow: 5;
    }


</style>