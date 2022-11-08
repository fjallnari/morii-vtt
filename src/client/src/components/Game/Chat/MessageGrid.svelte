<script lang="ts">
    import { user } from "../../../stores";
    import SvelteMarkdown from 'svelte-markdown';
    import type MessageData from '../../../interfaces/MessageData';
    import ANIMALS from '../../../enum/Animals';
    import PrettyRollResult from './PrettyRollResult.svelte';
    import LangMessage from './LangMessage.svelte';

    export let message: MessageData;

    enum MESSAGE_MODES {
        PUBLIC,
        SECRET,
        GM
    }

    const getCleanErrorMessage = (errorMessage: string, messageText: string) => {
        const cleanError = errorMessage.startsWith('Expected') ? `Invalid dice notation: ${messageText}.` : errorMessage;
        return `ERROR: ${cleanError}`;
    }

</script>

<div class="message-content">
    <div class="sender-info">
        {message.senderInfo.username}{message.skillCheckInfo ? ` (${message.skillCheckInfo.characterName})` : ''}
        {#if message.senderInfo._id === $user.gameData?.owner}
            <div class='owner-icon'>
                <img src="../static/crown.svg" alt="gm">                
            </div>
        {/if}
        <div class='message-ext-info'>{message.langData?.name ? `in ${message.langData?.name} ` : ''}{message.messageMode === MESSAGE_MODES.GM ? 'to GM' : ''}</div>
    </div>

    <div class="message-timestamp">
        {message.timestamp}
    </div>
    
    <div class="sender-pfp">
        {#if message && message.messageMode === MESSAGE_MODES.PUBLIC}
            <img class='user-icon' style="background-color: #{message.senderInfo.settings.pfpColor};" src="../static/pfp/{ANIMALS[message.senderInfo.settings.pfpID]}.svg" alt="pfp">
        {:else}
            <img class='mode-icon' src="../static/{message.messageMode === MESSAGE_MODES.SECRET ? 'eye-off': 'message-text-lock'}.svg" alt="msg-mode">
        {/if}
    </div>

    <div class="message-text{message.messageMode !== MESSAGE_MODES.PUBLIC ? ' non-public': ''}">
        {#if message.rollResult && ! message.rollResult.error}
            <PrettyRollResult message={message}></PrettyRollResult>
        {:else if message.langData}
            <LangMessage message={message}></LangMessage>
        {:else}
            <SvelteMarkdown source={message.rollResult && message.rollResult.error ? getCleanErrorMessage(message.rollResult.error, message.messageText) : message.messageText} />
        {/if}
    </div>
</div>

<style>
    .message-content {  display: grid;
        grid-template-columns: 0.5fr 3fr 1fr;
        grid-template-rows: 0.01fr 2fr;
        grid-auto-flow: row;
        width: 26em;
        gap: 0.5em 0.5em;
        grid-template-areas:
            "sender-pfp sender-info message-timestamp"
            "sender-pfp message-text message-text";
    }

    .sender-info { grid-area: sender-info;
        display: flex;
        justify-content: flex-start;
        font-family: Montserrat;
        gap: 0.5em;
    }

    .message-ext-info {
        color: darkgrey;
    }

    .message-timestamp { grid-area: message-timestamp;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: x-small;
        font-family: Montserrat;    
    }

    .message-text { grid-area: message-text;
        background-color: var(--clr-box-bg-normal);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        font-family: Quicksand;
        overflow-wrap: anywhere;
        padding: 0.5em;
    }

    .message-text.non-public {
        background-color: var(--clr-box-bg-light);
    }

    .sender-pfp { grid-area: sender-pfp;
        display: flex;
        justify-content: center;
        width: 2.5em;
        height: 2.5em; 
    }

    .sender-pfp > img {
        border-radius: 25%;
    }

    .sender-pfp img.user-icon {
        background-color: var(--clr-box-bg-normal);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }

    .sender-pfp img.mode-icon {
        width: 2.25em;
        height: 2.25em;
    }

    .owner-icon {
        width: 1em;
        height: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /** MARKDOWN 'CORRECTIONS' */
    
    :global(.message-text p) {
        margin: 0;
        text-align: left;
        margin: 0.5em;
    }

    :global(.message-text h1, .message-text h2, .message-text h3, .message-text h4, .message-text h5) {
        margin: 0.8em 0em;
    }

    :global(.message-text ul) {
        text-align: left;
    }

    :global(.message-text li:not(:last-child)) { 
        margin-bottom: 0.3rem;
    }

</style>