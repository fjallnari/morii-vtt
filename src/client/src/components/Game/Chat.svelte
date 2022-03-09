<script lang="ts">
    import { params } from "svelte-spa-router";
    import { user } from '../../stores';
    import List, {
        Item,
        Graphic,
        Meta,
        Text,
        PrimaryText,
        SecondaryText,
    } from '@smui/list';
    import type MessageData from "../../interfaces/MessageData";
    import Message from "./Message.svelte";
    import type UserSimple from "../../interfaces/UserSimple";


    export let socket;
    let messages: MessageData[] = [];
    let messageText: string;
    
    socket.on('chat message', (incomingMessage: MessageData) => {
        messages = [...messages, incomingMessage];
    })

    const sendMessage = () => {
        // not an ideal solution, sends bit too much data on each message
        socket.emit('chat message', {
            senderInfo: {
                _id: $user._id, 
                username: $user.username, 
                pfpColor: $user.settings.pfpColor,
                pfpID: $user.settings.pfpID
            }, 
            messageText: messageText, 
            gameID: $params.id
        });
        messageText = '';
    }
    
</script>

<div class="chat-box">
    <div class="messages-box">
        {#each messages as message}
            <Message message={message}></Message>
        {/each}
    </div>
    <div>
        <input bind:value={messageText} placeholder="Message..." type="text">
        <button on:click={sendMessage}>Send</button>
    </div>
</div>


<style>
    .chat-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        width: 30em;
        height: 57em;
        background-color:#212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 1%;
        gap: 2em;
    }

    .messages-box {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }


</style>