<script lang="ts">
    import type GameData from "../../../interfaces/GameData";
    import axios from 'axios';
    import { params } from "svelte-spa-router";
    import SimpleButton from "../../SimpleButton.svelte";
    import { fileReader, validateCharacter, validateVTTESCharacter } from "../../../main";
    import { CharacterVTTESConverter } from "../../../util/CharacterVTTESConverter";
    import type { CharacterVTTES } from "../../../interfaces/CharacterVTTES";

    export let gameData: GameData;
    export let createMenuEnabled: boolean;

    const createNPC = async (characterTemplate = {}) => {
		try {
            const response = await axios.post('/api/create-npc', {
                campaignID: $params.id,
                characterTemplate: characterTemplate
            });

            const newNpc = response.data.characterInfo;
            gameData.npcs = gameData.npcs.concat([newNpc]);
            createMenuEnabled = false;
		}
		catch (err) {
            console.log(err);
		}
	}

    let fileInput: HTMLInputElement;
    let fileInputVTTES: HTMLInputElement;

    const createValidatedCharacter = (characterObj, isVTTES: boolean) => {
        const isValid = isVTTES ? validateVTTESCharacter(characterObj) : validateCharacter(characterObj);

        if (!isValid) {
            throw new Error(`JSON Validation Error.`);
            // TODO:  add UI popup or smth for this error
        }

        return isVTTES ? new CharacterVTTESConverter(<CharacterVTTES> characterObj).constructCharacter() : characterObj;
    }
	
	const importFromJSON = (event: Event & { currentTarget: EventTarget & HTMLInputElement }, isVTTES: boolean = false) => {
        let jsonSheet = event.currentTarget.files[0];
        if (jsonSheet && jsonSheet.type === 'application/json'){
            fileReader.readAsText(jsonSheet);
            fileReader.onload = _ => {
                const validatedSheet = createValidatedCharacter(JSON.parse(<string> fileReader.result), isVTTES);
                    createNPC(validatedSheet);
            };
        }
    }

</script>

<div class="create-npc-container">
    <SimpleButton value='Create New' type="green" icon="note_add" onClickFn={createNPC}></SimpleButton>
    <SimpleButton value='Create With A Guide' icon="quiz" onClickFn={() => {}} disabled></SimpleButton>
    <SimpleButton value='Copy Existing Sheet' icon="file_copy" onClickFn={() => {}} disabled></SimpleButton>

    <SimpleButton value='Import from MSVTT JSON' icon="upload_file" onClickFn={() => { fileInput.click() }}></SimpleButton>
    <input style="display:none" type="file" accept=".json" on:change={ (event) => importFromJSON(event)} bind:this={fileInput}>

    <SimpleButton value='Import from roll20 JSON' icon="upload_file" onClickFn={() => { fileInputVTTES.click() }}></SimpleButton>
    <input style="display:none" type="file" accept=".json" on:change={ (event) => importFromJSON(event, true)} bind:this={fileInputVTTES}>
    <SimpleButton value='' icon="close" onClickFn={() => {createMenuEnabled = false;}}></SimpleButton>
</div>

<style>
    .create-npc-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5em;
    }

    :global(.create-npc-container simple-button) {
        font-size: 1.5em;
        padding: 0.5em 0.5em !important;
    }

</style>