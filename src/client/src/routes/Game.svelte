<script lang="ts">
    import axios from "axios";
    import { accessToken } from "../stores";
    import io from 'socket.io-client';
    import { selectedCampaign, user } from '../stores';
    import { location, params, replace } from "svelte-spa-router";

    $: loadGame();

    const socket = io("http://localhost:3000");
    let messages = [];
    let message = '';

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


    
    socket.on('chat message', (data) => {
      messages = [...messages, data];
    })

    function sendMessage() {
        // console.log({username: $user.username, msg: message, cid: $params.id});
        socket.emit('chat message', {username: $user.username, msg: message, cid: $params.id});
        message = '';
    }
</script>

<main>
    <div>
        {#each messages as message}
            <div>{message}</div>
        {/each}
    </div>
    <div>
        <input bind:value={message} placeholder="Message..." type="text">
        <button on:click={sendMessage}>Send</button>
    </div>
    <form><button formaction="/?#">back to dashboard</button></form>
</main>