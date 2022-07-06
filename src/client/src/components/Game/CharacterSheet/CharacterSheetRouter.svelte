<script lang="ts">
    import { formatModifier, getASModifier, isMessagePublic, modifyCharacter, selectedCharacterTab, sendSkillCheck, socket, user } from "../../../stores";
    import CharacterSheetBio from "./CharacterSheetBio.svelte";
    import CharacterSheetCore from "./CharacterSheetCore.svelte";
    import CharacterSheetSettings from "./CharacterSheetSettings.svelte";
    import CharacterSheetSpells from "./CharacterSheetSpells.svelte";
    import type { Character } from "../../../interfaces/Character";
    import { params } from "svelte-spa-router";
    import axios from "axios";
    

    export let character: Character;

    $socket.on('change-character', (modifiedCharacter: Character) => {
        character = modifiedCharacter;
    });

    $socket.on('delete-character', (_: Character, isNPC: boolean) => {
        character = undefined;
    });

    modifyCharacter.set(async () => {
        try {
            await axios.post('/api/modify-character', {
                modifiedCharacter: character,
            });
            // don't send socket emit if the character is an npc
            if ($user.gameData.owner !== character.playerID) {
                $socket.emit('change-character', { modifierID: $user._id, roomID: $params.id, character: character });
            }
        }
        catch (err){
            console.log(err);
        }
	})

    sendSkillCheck.set(async (modifier: number, skillName: string, dice_type = 'd20') => {
        $socket.emit('chat-message', {
            senderInfo: {
                _id: $user._id, 
                username: $user.username,
                settings: $user.settings,
            }, 
            messageText: `/r ${dice_type}${$formatModifier(modifier, "always")}`,
            skillCheckInfo: {
                characterName: character.name,
                skillName: skillName
            },
            gameID: $params.id,
            isPublic: $isMessagePublic
        });
    });

    /**
     * Formats modifier to show plus signs if the modifier is positive
     */
    formatModifier.set((modifier: number, signDisplay: ("exceptZero" | "always" | "auto" | "never") = "exceptZero") => {
        return new Intl.NumberFormat("en-US", {
            signDisplay: signDisplay
        }).format(modifier);
    });

    /**
     * 
     * @param AS - ability score tag, e.g. 'WIS', 'DEX', 'STR' ...
     */
    getASModifier.set((AS: string) => {
        return (~~(character.ability_scores[AS] ? character.ability_scores[AS].value : 0) - 10) / 2 >> 0;
    });

    
    selectedCharacterTab.set(0);
    const tabsComponents = [CharacterSheetCore, CharacterSheetBio, CharacterSheetSpells, CharacterSheetSettings];

</script>

<svelte:component this={tabsComponents[$selectedCharacterTab]} bind:character={character}></svelte:component>

<style>
    :global(box) {
        background-color: var(--primary-box-background-color);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    :global(mod) {
        font-weight: bold;
        border-bottom: 1px #F2E8CF dotted;
        min-width: 1.2em;
        margin: 0em 0.3em;
    }

    :global(sendable) {
        cursor: pointer;
        transition-duration: 200ms;
        transition-property: color;
    }

    :global(sendable:active) {
        color: var(--primary-accent-color);
        transition-duration: 200ms;
        transition-property: color;
    }

    :global(textarea) {
        width: 100%;
        padding: 0.5em 0.5em;
        box-sizing: border-box;
        border: 1px solid #ffffff8a;
        border-radius: 4px;
        background-color: transparent;
        font-size: 1em;
        font-family: Athiti;
        color: var(--primary-text-color);
        resize: none;
        scrollbar-width: thin;
    }

    :global(textarea:focus) {
        outline: none !important;
        border: 2px solid var(--primary-accent-color);
        caret-color: var(--primary-accent-color);
    }

    :global(select) {
        background-color: var(--secondary-box-background-color);
        color: inherit;
        border: none;
        font-size: inherit;
        font-family: inherit;
        cursor: pointer;
        border-radius: 4px;
    }

    :global(.box-with-label) {
        flex-grow: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }

    :global(.box-main-text) {
        margin-top: auto;
        margin-bottom: -0.6vw;
    }

    :global(.box-justify-filler) {
        margin-top: auto; 
        height: 0;
    }
    
    :global(.box-label) {
        color: #FCF7F8;
        font-size: 0.6vw;
        font-weight: 200;
        font-family: Athiti;
        text-transform: uppercase;
    }
</style>