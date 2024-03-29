<script lang="ts">
    import { params } from "svelte-spa-router";
    import { user, socket, ownerSocketID, messageMode } from '../../../stores';
    import type MessageData from "../../../interfaces/MessageData";
    import MessageGrid from "./MessageGrid.svelte";
    import SimpleIconButton from "../../SimpleIconButton.svelte";
    import { tooltip, Tooltip } from "@svelte-plugins/tooltips";

    // export let socket;
    let messages: MessageData[] = [];
    let messageText: string = '';
    let isMsgBoxFocused = false;
    let lastKeypress: string;
    
    $socket.on('chat-message', (incomingMessage: MessageData) => {
        messages = ([incomingMessage, ...messages]);
    })

    const sendMessage = () => {
        // don't want to send empty message
        if (!messageText || !messageText.trim()){ 
            return;
        }

        $socket.emit('chat-message', {
            senderInfo: {
                _id: $user._id, 
                username: $user.username,
                settings: $user.settings,
            }, 
            messageText: messageText, 
            gameID: $params.id,
            ownerSocketID: $ownerSocketID,
            messageMode: $messageMode
        });
        messageText = '';
    }

    const handleKeydown = (event: KeyboardEvent) => {
        // handles sending the message on 'Enter' keypress; Shift + Enter works as regular Enter key
        if (isMsgBoxFocused) {
            if (lastKeypress !== 'Shift' && event.key === 'Enter') {
                event.preventDefault();
                sendMessage();
            }
            lastKeypress = event.key;
        }
    }
    
</script>

<svelte:window on:keydown={handleKeydown}/>
<div class="chat-box">
    <div class="messages-box">
        {#each messages as message}
            <MessageGrid message={message}></MessageGrid>
        {/each}
        <div class="help-message">
            Use /r to roll dice e.g. /r 4d6kh3.<br>For more info, use <em>/help or /h</em>
        </div>
    </div>
    <div class="send-message-box">
        <textarea bind:value={messageText} on:focus={() => isMsgBoxFocused = true} on:blur={() => isMsgBoxFocused = false} spellcheck={false}></textarea>

        <div class="send-options-box">
            <Tooltip
                content='{['Public', 'Secret', 'GM Only'][$messageMode]}'
                theme="dark-tooltip"
                animation='slide'
            >
                <SimpleIconButton 
                    icon={`mdi:${['earth', 'eye-off', 'crown'][$messageMode]}`}
                    color={$messageMode === 2 ? 'var(--clr-icon-owner)' : 'inherit'}
                    onClickFn={() => { messageMode.set($messageMode + 1 + ($messageMode === 2 ? -3 : 0)) }}>
                </SimpleIconButton>
            </Tooltip>
            <SimpleIconButton icon='material-symbols:send-rounded' onClickFn={sendMessage}></SimpleIconButton>
        </div>
    </div>
</div>


<style>
    .chat-box {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: var(--clr-box-bg-dark);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    .messages-box {
        display: flex;
        flex-direction: column-reverse;
        gap: 1.5em;
        margin-top: 2em;
        overflow-y: auto;
        overflow-x: hidden;
        height: inherit;
        padding-right: 1.5em;
        padding-bottom: 4px;
        scrollbar-width: thin;
    }

    .send-message-box {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 1em;
        gap: 1em;
    }

    .send-message-box textarea {
        font-size: 1.1em;
        width: 18rem; 
        height: 5rem;
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

    .help-message {
        font-family: Quicksand;
        font-size: large;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #1d1d22;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #757578;
        border: transparent;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #404044;
    }

</style>