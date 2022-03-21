<script lang="ts">
    import axios from "axios";
    import { accessToken } from "../stores";
    import io from 'socket.io-client';
    import { user } from '../stores';
    import { params, push, replace } from "svelte-spa-router";
    import Chat from "../components/Game/Chat.svelte";
    import Button, { Label } from '@smui/button';
    import IconButton from '@smui/icon-button';
    import Tooltip, { Wrapper } from '@smui/tooltip';

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
            <div class="game-info">
                <h3>{currentCampaign.name}</h3>
                <div class="icon-bar">
                    <Wrapper>
                        <IconButton class="material-icons" style="color: #EFA48B" ripple={false} on:click={() => push('/')}>logout</IconButton>
                        <Tooltip>Return to dashboard</Tooltip>
                    </Wrapper>
                    
                </div>
            </div>
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
    }

    .right-panel {
        display: flex; 
        flex-direction: column; 
        align-items: center;

        width: 30em;
        height: 57em;
        gap: 2em;
    }

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
        padding-right: 1em;
    }

    .character-sheet-box {
        display: flex; 
        flex-direction: column; 
        align-items: center;
        
        width: 80em; 
        height: 57em; 
        background-color: #212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }


</style>