<script lang="ts">
    import { fileReader, validateCharacter, validateVTTESCharacter } from "../../main";
    import { CharacterVTTESConverter } from "../../util/CharacterVTTESConverter";
    import type { CharacterVTTES } from "../../interfaces/CharacterVTTES";
    import SimpleButton from "../SimpleButton.svelte";

    export let createCharacter: (characterTemplate?: {}) => Promise<void>;
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
                createCharacter(validatedSheet);
            };
        }
    }

</script>


<SimpleButton value='Import from Morii JSON' icon="upload_file" onClickFn={() => { fileInput.click() }}></SimpleButton>
<input style="display:none" type="file" accept=".json" on:change={ (event) => importFromJSON(event)} bind:this={fileInput}>

<SimpleButton value='Import from roll20 JSON' icon="upload_file" onClickFn={() => { fileInputVTTES.click() }}></SimpleButton>
<input style="display:none" type="file" accept=".json" on:change={ (event) => importFromJSON(event, true)} bind:this={fileInputVTTES}>

