<script lang="ts">
    import CLASS_NAMES from "../../../enum/ClassNames";
    import type { Character } from "../../../interfaces/Character";
    import type GameData from "../../../interfaces/GameData";
    import { selectedCharacter, socket } from "../../../stores";
    import CharacterSheetRouter from "../CharacterSheet/CharacterSheetRouter.svelte";
    import CharactersList from "./CharactersList.svelte";
    import NpcList from "./NpcList.svelte";

    export let gameData: GameData;

    $socket.on('change-character', (modifiedCharacter: Character) => {
        const index = gameData.characters.findIndex( char => char._id === modifiedCharacter._id);
        gameData.characters[index] = modifiedCharacter;
    });

    $socket.on('add-character', (newCharacter: Character) => {
        gameData.characters = gameData.characters.concat([newCharacter]);
    });

    $socket.on('delete-character', (deletedCharacter: Character, isNPC: boolean) => {
        if (isNPC) {
            gameData.npcs = gameData.npcs.filter(npc => npc._id !== deletedCharacter._id);
        }
        else {
            gameData.characters = gameData.characters.filter(character => character._id !== deletedCharacter._id);
        }
        selectedCharacter.set(undefined);
    });

    const getClassIcon = (character: Character) => {
        const classes = character.classes.split(' ');
        const className = classes[0].toLowerCase();
        const validatedClassName = CLASS_NAMES.includes(className) ? className : 'no-class';

        return classes.length <= 2 ? validatedClassName : 'multiclass-mockup';
    }

</script>


{#if $selectedCharacter}
    <CharacterSheetRouter character={$selectedCharacter}></CharacterSheetRouter>
{:else}
    <div class="dashboard-container">
        <CharactersList gameData={gameData} getClassIcon={getClassIcon}></CharactersList>
        <div class="npcs">
            <h3>NPCs</h3>
            <NpcList gameData={gameData} getClassIcon={getClassIcon}></NpcList>
        </div>
    </div>
{/if}


<style>
    .dashboard-container {
        flex: 5;
        background-color: #212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        display: grid; 
        grid-template-columns: 0.2fr 1fr 1fr 1fr 0.2fr; 
        grid-template-rows: 1fr 1fr 1fr; 
        gap: 0.5em; 
        grid-template-areas: 
            "characters-list characters-list characters-list characters-list characters-list"
            ". npcs . . ."
            ". npcs . . ."; 
    }

    .npcs { grid-area: npcs; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0em 0em 0.75em 0em;
    }

    .dashboard-container > div > h3 {
        font-size: 1.5em;
        font-family: Quicksand;
        font-weight: 100;
        text-transform: uppercase;
    }

</style>