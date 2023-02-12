<script lang="ts">
    import { modifyCharacter, ownerSocketID, selectedCharacterTab,socket, user, userIDPairs } from "../../../stores";
    import { params } from "svelte-spa-router";
    import axios from "axios";
    import GAME_SYSTEMS from "../../../enum/GameSystems";
    import type CharacterAny from "../../../interfaces/CharacterAny";
    
    export let character: CharacterAny;

    $socket.on('change-character', (modifiedCharacter) => {
        if ($user._id === $user.gameData.owner) {return}
        character = modifiedCharacter;
    });

    $socket.on('delete-character', (_, isNPC: boolean) => {
        if ($user._id === $user.gameData.owner) {return}
        character = undefined;
    });

    // the 'debug' variable can be used to track different character sheet changes
    modifyCharacter.set(async (debug: string = '') => {
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
            
            // console.log(`modifying character: ${debug} at ${new Date().toISOString()}`);

            await axios.post('/api/modify-character', {
                modifiedCharacter: character,
            });
        }
        catch (err){
            console.log(err);
        }
	})
    
    selectedCharacterTab.set(0);
    const characterSheetTabs = GAME_SYSTEMS[$user?.gameData?.system].characterSheetTabs;

</script>

<svelte:component this={characterSheetTabs[$selectedCharacterTab].component} bind:character={character}></svelte:component>