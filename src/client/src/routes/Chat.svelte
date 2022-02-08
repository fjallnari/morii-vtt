<script lang="ts">
    import io from 'socket.io-client'

    const socket = io("http://localhost:3000")
    let messages = []
    let message = ''
    
    socket.on('chat message', (data) => {
        messages = [...messages, data]
    })

    function sendMessage() {
        socket.emit('chat message', message)
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
      <form><button formaction="/?#">back to login</button></form>
</main>