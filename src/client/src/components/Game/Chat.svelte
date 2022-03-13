<script lang="ts">
    import { params } from "svelte-spa-router";
    import { user } from '../../stores';
    import type MessageData from "../../interfaces/MessageData";
    import Message from "./Message.svelte";
    import Button, { Label } from '@smui/button';
    import Textfield from '@smui/textfield';
    import IconButton, { Icon } from '@smui/icon-button';

    export let socket;
    let messages: MessageData[] = [];
    let messageText: string = '';
    let isMessagePublic = true;
    
    socket.on('chat message', (incomingMessage: MessageData) => {
        messages = [incomingMessage, ...messages];
    })

    const sendMessage = () => {
        // don't want to send empty message
        if (messageText === ''){ 
            return;
        }
        // not an ideal solution, sends bit too much data on each message
        socket.emit('chat message', {
            senderInfo: {
                _id: $user._id, 
                username: $user.username, 
                pfpColor: $user.settings.pfpColor,
                pfpID: $user.settings.pfpID
            }, 
            messageText: messageText, 
            gameID: $params.id,
            isPublic: isMessagePublic
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
    <div class="send-message-box">
        <Textfield style="width: 18em; height: 5em;" bind:value={messageText} variant="outlined"></Textfield>
        <div class="send-options-box">
            <IconButton toggle bind:pressed={isMessagePublic}>
                <Icon class="material-icons" on>visibility</Icon>
                <Icon class="material-icons">visibility_off</Icon>
            </IconButton>
            <IconButton class="material-icons" on:click={() => sendMessage()}>send</IconButton>
        </div>
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
        gap: 1em;
    }

    .messages-box {
        display: flex;
        flex-direction: column-reverse;
        gap: 1.2em;
        margin-top: 2em;
        overflow-y: auto;
        overflow-x: hidden;
        padding-right: 1.5em;
    }

    .send-message-box {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 1em;
        width: 28em;
        height: 8em;
        gap: 1em;
    }

    .send-options-box {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1em;
        height: 4em;
        width: 8em;
    }


</style>