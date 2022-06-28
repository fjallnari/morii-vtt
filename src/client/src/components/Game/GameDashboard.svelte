<script lang="ts">
    import { selectedCharacter, user, socket } from '../../stores';
    import type GameData from '../../interfaces/GameData';
    import CharactersList from './CharactersList.svelte';
    import CharacterSheetRouter from './CharacterSheetRouter.svelte';
    import type { Character } from '../../interfaces/Character';

    export let gameData: GameData;

    $socket.on('change-character', (modifiedCharacter: Character) => {
        const index = gameData.characters.findIndex( char => char._id === modifiedCharacter._id);
        gameData.characters[index] = modifiedCharacter;
    });

    $socket.on('add-character', (newCharacter: Character) => {
        gameData.characters = gameData.characters.concat([newCharacter]);
    });

    $socket.on('delete-character', (deletedCharacter: Character) => {
        gameData.characters = gameData.characters.filter(character => character._id !== deletedCharacter._id);
    });

</script>


{#if $selectedCharacter}
    <CharacterSheetRouter character={$selectedCharacter}></CharacterSheetRouter>
{:else}
    <div class="dashboard-container">
        <CharactersList gameData={gameData}></CharactersList>
    </div>
{/if}


<style>
    .dashboard-container {
        height: inherit;
        flex: 5;
        background-color: #212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }    

</style>