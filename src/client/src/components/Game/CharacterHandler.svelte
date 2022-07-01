<script lang="ts">
    import type GameData from "../../interfaces/GameData";
    import axios from 'axios';
    import { params, replace } from "svelte-spa-router";
    import { user, socket } from '../../stores';
    import SimpleButton from "../SimpleButton.svelte";
    import CharacterSheetRouter from "./CharacterSheet/CharacterSheetRouter.svelte";

    export let gameData: GameData;

    let character = gameData.characters.find(character => character.playerID === $user._id);

    // returns user's updated game data
    const createCharacter = async () => {
		try {
            const response = await axios.post('/api/create-character', {
                campaignID: $params.id,
            });

            character = response.data.characterInfo;
			user.set(Object.assign($user, {gameData: Object.assign( gameData, { characters: gameData.characters.concat([response.data.characterInfo]) })}));
            $socket.emit('add-character', { modifierID: $user._id, roomID: $params.id, character: character });
		}
		catch {
            replace('/');
		}
	}

    const importFromJSON = () => {
        // TODO
    }

</script>



{#if gameData && character}
    <CharacterSheetRouter bind:character={character}></CharacterSheetRouter>
{:else}
    <div class="no-character-panel">
        <h3>You don't have any character assigned to this campaign.</h3>
        <div class="new-character-options">
            <SimpleButton value='Create New' type="green" icon="note_add" onClickFn={createCharacter}></SimpleButton>
            <SimpleButton value='Create With Guide' icon="quiz" onClickFn={() => {}} disabled></SimpleButton>
            <SimpleButton value='Copy Existing Sheet' icon="file_copy" onClickFn={() => {}} disabled></SimpleButton>
            <SimpleButton value='Import from MSVTT JSON' icon="upload_file" onClickFn={() => {}} disabled></SimpleButton>
            <SimpleButton value='Import from roll20 JSON' icon="upload_file" onClickFn={() => {}} disabled></SimpleButton>
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
        background-color: #212125;
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
        gap: 2em;
    }

    :global(.new-character-options simple-button) {
        font-size: 1.5em;
        padding: 0.5em 0.5em;
    }

</style>