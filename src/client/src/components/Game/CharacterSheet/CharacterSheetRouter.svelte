<script lang="ts">
    import { formatModifier, getASModifier, isMessagePublic, modifyCharacter, ownerSocketID, selectedCharacter, selectedCharacterTab, sendSkillCheck, socket, user, userIDPairs } from "../../../stores";
    import CharacterSheetBio from "./CharacterSheetBio.svelte";
    import CharacterSheetCore from "./CharacterSheetCore.svelte";
    import CharacterSheetSettings from "./CharacterSheetSettings.svelte";
    import CharacterSheetSpells from "./CharacterSheetSpells.svelte";
    import type { Character } from "../../../interfaces/Character";
    import { params } from "svelte-spa-router";
    import axios from "axios";
    
    export let character: Character;

    $socket.on('change-character', (modifiedCharacter: Character) => {
        if ($user._id === $user.gameData.owner) {return}
        character = modifiedCharacter;
    });

    $socket.on('delete-character', (_: Character, isNPC: boolean) => {
        if ($user._id === $user.gameData.owner) {return}
        character = undefined;
    });

    modifyCharacter.set(async () => {
        try {
            // don't send socket emit if the character is an npc
            if ($user.gameData.owner !== character.playerID) {
                // if you are the owner, send the change emit only to the player, and viceversa
                const receiverSocketID = $user._id === $user.gameData.owner ? $userIDPairs[character.playerID] : $ownerSocketID;
                // send the emit only if the socketactually exists
                if (receiverSocketID) {                  
                    $socket.emit('change-character', { receiverSocketID: receiverSocketID, roomID: $params.id, character: character });
                }
            }

            await axios.post('/api/modify-character', {
                modifiedCharacter: character,
            });
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