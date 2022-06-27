<script lang="ts">
    import type GameData from "../../interfaces/GameData";
    import Button, { Label, Icon } from '@smui/button';
    import axios from 'axios';
    import { params, push, replace } from "svelte-spa-router";
    import { accessToken, user } from '../../stores';
    import CharacterSheetRouter from "./CharacterSheetRouter.svelte";

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
            <Button variant="raised" on:click={() => createCharacter()}>
                <Icon class="material-icons">add</Icon>
                <Label>Create New</Label>
            </Button>
            <Button variant="raised" color="secondary" on:click={() => {}} disabled>
                <Icon class="material-icons">person</Icon>
                <Label>Use Existing</Label>
            </Button>
            <Button variant="raised" on:click={() => {}} disabled>
                <Icon class="material-icons">upload_file</Icon>
                <Label>Import from file</Label>
            </Button>
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

</style>