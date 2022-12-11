<script lang="ts">
    import type MessageData from "../../../interfaces/MessageData";
    import { selectedCharacter, user } from "../../../stores";

    export let message: MessageData;

    const langFonts = {
        'elvish': "Midjungards",
        'dwarvish': "MOONRUNE",
        'gnomish': "MOONRUNE"
    }

    $: langFont = langFonts[message.langData.name.toLowerCase()] ?? 'Quicksand';

    $: isLegible = ($user?.gameData?.characters ?? []).find(char => char.playerID === $user._id)?.other_profs.find(prof => prof.name.toLowerCase() === message.langData.name.toLowerCase()) && true || $user?._id === $user?.gameData?.owner;

</script>

<div class="lang-message {isLegible ? 'legible': ''}" style="font-family: {langFont};">
    {isLegible ? message.langData.originalMessage : message.messageText}
</div>

<style>
    .lang-message {
        text-align: left;
    }

    .lang-message.legible {
        font-family: Quicksand !important;
    }

</style>