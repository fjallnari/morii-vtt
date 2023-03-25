<script lang="ts">
    import { params } from "svelte-spa-router";
    import { messageMode, ownerSocketID, selectedCharacter, socket, user } from "../../../../stores";
    import MarkdownBoxText from "../../MarkdownBoxText.svelte";
    import CharSheetMenu from "../Components/CharSheetMenu.svelte";

    const cairn = $user.gameData.cairn;

    // export let character: CharacterCairn;

    const sendScar = (scar: { name: string, description: string }) => {
        $socket.emit('chat-message', {
            senderInfo: {
                _id: $user._id, 
                username: $user.username,
                settings: $user.settings,
            }, 
            messageText: `#### ${scar.name}\n${scar.description}`,
            skillCheckInfo: {
                characterName: $selectedCharacter?.name,
                skillName: ''
            },
            gameID: $params.id,
            ownerSocketID: $ownerSocketID,
            messageMode: $messageMode
        });
    }

</script>

<tab-container>
    <box class="rules markdown-text">
        <MarkdownBoxText text={cairn.rules_basic}></MarkdownBoxText>
    </box>
    <box class="rules-combat markdown-text">
        <MarkdownBoxText text={cairn.rules_combat}></MarkdownBoxText>
    </box>
    <box class="scars markdown-text">
        <h4>SCARS</h4>
        <p>When an attack reduces a PC’s HP to exactly 0, they are uniquely impacted. Look up the result on the table below based on the total damage taken:</p>
        {#each cairn.scars as scar, index}
            <div class="scar-detail">
                <p>
                    <strong>
                        <sendable on:click={() => sendScar(scar)} on:keyup={() => {}}>
                            {index+1} | 
                            {scar.name}:
                        </sendable>
                    </strong>
                    {scar.description}
                </p>
            </div>
        {/each}
    </box>
    <CharSheetMenu></CharSheetMenu>
</tab-container>

<style>
    tab-container {
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr; 
        gap: 0.75em;
        box-sizing: border-box;
        padding: 0.75em;
        grid-template-areas: 
            "rules rules-combat scars"
            "rules rules-combat scars"
            "rules rules-combat scars"
            "rules rules-combat scars"
            "rules rules-combat scars"
            "rules rules-combat scars"
            "rules rules-combat scars"
            "rules char-sheet-menu scars"; 
    }

    tab-container > box {
        display: flex;
    }

    .scars { grid-area: scars; 
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        text-align: left;
        overflow-y: auto;
        scrollbar-width: thin;
    }

    .rules { grid-area: rules;
    }
    
    .rules-combat { grid-area: rules-combat; 
    }


    /** MARKDOWN 'CORRECTIONS' */

    :global(.markdown-text p) {
        margin: 0;
        text-align: left;
        margin: 0.5em;
        padding-right: 0.25em;
    }

    :global(.markdown-text h1, .markdown-text h2, .markdown-text h3, .markdown-text h4, .markdown-text h5) {
        margin: 0.8em 0em;
    }

    :global(.markdown-text ul) {
        text-align: left;
    }

    :global(.markdown-text li:not(:last-child)) { 
        margin-bottom: 0.3rem;
    }



</style>