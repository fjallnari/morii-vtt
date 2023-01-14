<script lang="ts">
    import GAME_SYSTEMS from "../../enum/GameSystems";
    import type { Character } from "../../interfaces/Character";
    import type GameData from "../../interfaces/GameData";
    import { selectedCharacter, selectedGameTab, socket } from "../../stores";
    import CharacterSheetRouter from "./CharacterSheet/CharacterSheetRouter.svelte";

    export let gameData: GameData;

    let ownerGameTabs = (GAME_SYSTEMS[gameData.system]?.gameTabs ?? []).filter(tab => tab.access === 'owner');
    $: selectedTabComponent = ownerGameTabs.find(tab => tab.id === $selectedGameTab)?.component;

    $socket.on('change-character', (modifiedCharacter: Character) => {
        const index = gameData.characters.findIndex( char => char._id === modifiedCharacter._id);
        gameData.characters[index] = modifiedCharacter;

        if ($selectedCharacter && $selectedCharacter._id === modifiedCharacter._id) {
            selectedCharacter.set(modifiedCharacter);
        }
    });

    $socket.on('add-character', (newCharacter: Character) => {
        gameData.characters = gameData.characters.concat([newCharacter]);
    });

    $socket.on('delete-character', (deletedCharacterID: string, isNPC: boolean) => {
        if (isNPC) {
            gameData.npcs = gameData.npcs.filter(npc => npc._id !== deletedCharacterID);
        }
        else {
            gameData.characters = gameData.characters.filter(character => character._id !== deletedCharacterID);
        }
        selectedCharacter.set(undefined);
    });

</script>


{#if $selectedCharacter}
    <CharacterSheetRouter bind:character={$selectedCharacter}></CharacterSheetRouter>
{:else}
    <svelte:component this={selectedTabComponent} bind:gameData={gameData}></svelte:component>
{/if}