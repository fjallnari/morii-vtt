<script lang="ts">
    import { formatModifier, getASModifier, modifyCharacter, ownerSocketID, selectedCharacter, selectedCharacterTab, sendSkillCheck, socket, user, userIDPairs } from "../../../stores";
    import type { Character } from "../../../interfaces/Character";
    import { params } from "svelte-spa-router";
    import axios from "axios";
    import GAME_SYSTEMS from "../../../enum/GameSystems";
    
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

    /**
     * 
     * @param AS - ability score tag, e.g. 'WIS', 'DEX', 'STR' ...
     */
    getASModifier.set((AS: string) => {
        return (~~(character.ability_scores[AS] ? character.ability_scores[AS].value : 0) - 10) / 2 >> 0;
    });

    
    selectedCharacterTab.set(0);
    const characterSheetTabs = GAME_SYSTEMS[$user?.gameData?.system].characterSheetTabs;

</script>

<svelte:component this={characterSheetTabs[$selectedCharacterTab].component} bind:character={character}></svelte:component>