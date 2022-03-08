<script lang="ts">
    import io from 'socket.io-client';
    import { selectedCampaign, user } from '../stores';

    const socket = io("http://localhost:3000");
    let messages = [];
    let message = '';

    socket.emit('join-room', $selectedCampaign._id);

    
    socket.on('chat message', (data) => {
      messages = [...messages, data];
    })

    function sendMessage() {
        socket.emit('chat message', {username: $user.username, msg: message, cid: $selectedCampaign._id});
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