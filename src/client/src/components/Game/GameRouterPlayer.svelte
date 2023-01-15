<script lang="ts">
    import type GameData from "../../interfaces/GameData";
    import axios from 'axios';
    import { params, replace } from "svelte-spa-router";
    import { user, socket, ownerSocketID } from '../../stores';
    import SimpleButton from "../SimpleButton.svelte";
    import CharacterSheetRouter from "./CharacterSheet/CharacterSheetRouter.svelte";
    import GAME_SYSTEMS from "../../enum/GameSystems";

    export let gameData: GameData;

    let character = gameData.characters.find(character => character.playerID === $user._id);

    // returns user's updated game data
    const createCharacter = async (characterTemplate = {}) => {
		try {
            const response = await axios.post('/api/create-character', {
                campaignID: $params.id,
                characterTemplate: characterTemplate
            });

            character = response.data.characterInfo;
			user.set(Object.assign($user, {gameData: Object.assign( gameData, { characters: gameData.characters.concat([response.data.characterInfo]) })}));
            if ($ownerSocketID) {
                $socket.emit('add-character', { ownerSocketID: $ownerSocketID, character: character });
            }
		}
		catch {
            replace('/');
		}
	}

</script>

{#if gameData && character}
    <CharacterSheetRouter bind:character={character}></CharacterSheetRouter>
{:else}
    <div class="no-character-panel">
        <h3>You don't have any character assigned to this campaign.</h3>
        <div class="new-character-options">
            <SimpleButton value='Create New' type="green" icon="material-symbols:note-add" onClickFn={createCharacter}></SimpleButton>
            {#each GAME_SYSTEMS[gameData.system].creationOptions as creationOption}
                <svelte:component this={creationOption} createCharacter={createCharacter} />
            {/each}
        </div>
    </div>
{/if}

<style>

    h3 {
        font-family: Montserrat;
        font-size: xx-large;
        font-weight: 100;
    }

    .no-character-panel {
        display: flex;
        height: inherit;
        flex: 5;
        background-color: var(--clr-box-bg-dark);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;

        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    .new-character-options {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5em;
    }

    :global(.new-character-options > simple-button) {
        font-size: 1.5em;
        padding: 0.5em 0.5em !important;
    }

</style>