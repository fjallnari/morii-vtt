<script lang="ts">
    import { Icon } from '@smui/icon-button';
    import { user } from "../../../stores";
    import SvelteMarkdown from 'svelte-markdown';
    import type MessageData from '../../../interfaces/MessageData';
    import ANIMALS from '../../../enum/Animals';
    import PrettyRollResult from './PrettyRollResult.svelte';

    export let message: MessageData;

</script>

<div class="message-content">
    <div class="sender-info">
        {message.senderInfo.username}{message.skillCheckInfo ? ` (${message.skillCheckInfo.characterName})` : ''}
    </div>

    <div class="message-timestamp">
        {message.timestamp}
    </div>

    {#if message && message.isPublic}
        <div class="sender-pfp">
            {#if $user.gameData && message.senderInfo._id === $user.gameData.owner}
                <img src="../static/crown.svg" alt="crown">
            {:else}
                <img style="background-color: #{message.senderInfo.settings.pfpColor};" src="../static/pfp/{ANIMALS[message.senderInfo.settings.pfpID]}.svg" alt="pfp">
            {/if}
        </div>
    {:else}
        <div class="sender-pfp">
            <Icon class="material-icons" style="font-size: xx-large;">visibility_off</Icon>
        </div>
    {/if}

    <div class="message-text" style="background: { message.isPublic ? '#252529' : '#303036' }">
        {#if message.rollResult}
            <PrettyRollResult message={message}></PrettyRollResult>
        {:else}
            <SvelteMarkdown source={message.messageText} />
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
    }

    .message-timestamp { grid-area: message-timestamp;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: x-small;
        font-family: Montserrat;    
    }

    .sender-pfp { grid-area: sender-pfp;
        display: flex;   
    }

    .message-text { grid-area: message-text;
        background-color:#252529;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 1%;
        font-family: Quicksand;
        overflow-wrap: anywhere;
        padding: 0.5em;
    }
    .sender-pfp img {
        border-radius: 25%;
        width: 2.5em;
        height: 2.5em;
        background-color: #252529;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
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