<script lang="ts">
    import ANIMALS from "../../enum/Animals";
    import type MessageData from "../../interfaces/MessageData";
    import IconButton, { Icon } from '@smui/icon-button';
    import PrettyRollResult from "./PrettyRollResult.svelte";

    export let message: MessageData;

</script>


<div class="message-content">
    {#if message.isPublic}
        <div class="sender-info">
            <img id="pfp" style="background-color: #{message.senderInfo.settings.pfpColor};" src="../static/pfp/{ANIMALS[message.senderInfo.settings.pfpID]}.svg" alt="pfp">
            {message.senderInfo.username}
        </div>
    {:else}
        <div class="sender-info">
            <Icon class="material-icons" style="font-size: xx-large;">visibility_off</Icon>
        </div>
    {/if}
    <div class="message-text" style="background: { message.isPublic ? '#252529' : '#3b3b42' }">
        {#if message.rollResult}
            <PrettyRollResult rollResult={message.rollResult}></PrettyRollResult>
        {:else}
            {message.messageText}
        {/if}
        <!-- <img class="dice-roll" src="../static/d20.svg" alt="d20"> -->
        <div class="message-timestamp">
            {message.timestamp}
        </div>
    </div>
</div>

<style>
    .message-content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 26em;
        gap: 1em;
    }

    .sender-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 5em;
        height: 5em;
        gap: 0.5em;
        font-family: Montserrat;
        font-size: medium;
    }

    .message-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 24em;
        padding: 0.5em;
        background-color:#252529;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 1%;
        font-family: Quicksand;
        font-size: large;
        overflow-wrap: anywhere;
        gap: 0.5em;
    }

    .message-timestamp {
        display: flex;
        align-self: flex-end;
        font-size: x-small;
        font-family: Montserrat;
    }

    #pfp {
        border-radius: 15%;
        width: 2em;
        height: 2em;
    }


</style>