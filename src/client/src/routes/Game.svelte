<script lang="ts">
    import axios from "axios";
    import { accessToken } from "../stores";
    import io from 'socket.io-client';
    import { selectedCampaign, user } from '../stores';
    import { params, replace } from "svelte-spa-router";
    import Chat from "../components/Game/Chat.svelte";

    $: loadGame();

    const socket = io("http://localhost:3000");

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
			return response.status === 200;
		}
		catch {
            replace('/');
			return false;
		}
	}

</script>

<div class="game-content"> 
    <div style="width:80em; height:57em; background-color:#212125; display: flex; flex-direction: column; align-items: center;">
        <h1>Character sheet</h1>
        <form style="width:5em;"><button formaction="/?#">back to dashboard</button></form>
    </div>
    <Chat socket={socket}></Chat>
</div>

<style>
    .game-content {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding-top: 1em;
    }


</style>