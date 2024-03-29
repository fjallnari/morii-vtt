<script lang="ts">
    import { user } from "../../../stores";
    import SvelteMarkdown from 'svelte-markdown';
    import type MessageData from '../../../interfaces/MessageData';
    import ANIMALS from '../../../enum/SVGAnimals';
    import PrettyRollResult from './PrettyRollResult.svelte';
    import LangMessage from './LangMessage.svelte';
    import Icon from "@iconify/svelte";
    import HtmlRendererOverride from "../../HTMLRendererOverride.svelte";

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

    $: characterName = `${message?.skillCheckInfo?.characterName !== '' ? ` (${message?.skillCheckInfo?.characterName})` : ''}`;

</script>

<div class="message-content">
    <div class="sender-info">
        <div class="sender-name">
            {message.senderInfo.username}{message.skillCheckInfo ? characterName : ''}
        </div>
        {#if message.senderInfo._id === $user.gameData?.owner}
            <Icon class="big-icon" icon="mdi:crown" color="var(--clr-icon-owner)" />    
        {/if}
        <div class='message-ext-info'>{message.langData?.name ? `in ${message.langData?.name} ` : ''}{message.messageMode === MESSAGE_MODES.GM ? 'to GM' : ''}</div>
    </div>

    <div class="message-timestamp">
        {message.timestamp}
    </div>
    
    <div class="sender-pfp">
        {#if message && message.messageMode === MESSAGE_MODES.PUBLIC}
            <pfp class='user-icon' style="background-color: #{message.senderInfo.settings.pfpColor};">
                {@html `${ANIMALS[message.senderInfo.settings.pfpID] ?? ANIMALS['default']}`}
            </pfp>
        {:else}
            <div class="mode-icon-wrapper">
                <Icon class="mode-icon" icon="mdi:{message.messageMode === MESSAGE_MODES.SECRET ? 'eye-off': 'message-text-lock'}"/>
            </div>
        {/if}
    </div>

    <div class="message-text{message.messageMode !== MESSAGE_MODES.PUBLIC ? ' non-public': ''}">
        {#if message.rollResult && ! message.rollResult.error}
            <PrettyRollResult message={message}></PrettyRollResult>
        {:else if message.langData}
            <LangMessage message={message}></LangMessage>
        {:else}
            <SvelteMarkdown source={message.rollResult && message.rollResult.error ? getCleanErrorMessage(message.rollResult.error, message.messageText) : message.messageText} 
                renderers={{html: HtmlRendererOverride}}
            />
        {/if}
    </div>
</div>

<style>
    .message-content {  display: grid;
        grid-template-columns: minmax(0, 0.5fr) minmax(0, 3fr) minmax(0, 1fr);
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
        align-items: center;
        font-family: Montserrat;
        gap: 0.5em;
    }

    .sender-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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

    .sender-pfp > pfp, .mode-icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 25%;
    }

    .sender-pfp pfp.user-icon {
        width: 100%;
        height: 100%;
        background-color: var(--clr-box-bg-normal);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }

    :global(.mode-icon-wrapper .mode-icon) {
        font-size: 2.25em;
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