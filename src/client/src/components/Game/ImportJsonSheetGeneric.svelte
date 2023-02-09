<script lang="ts">
    import { fileReader } from "../../main";
    import SimpleButton from "../SimpleButton.svelte";
    import type { ValidateFunction } from "ajv";

    export let createCharacter: (characterTemplate?: {}) => Promise<void>;
    export let validateCharacter: ValidateFunction<unknown>;
    export let CharacterConverter = undefined; // should be used for any non-morii .json imports
    export let label: string = "Import from Morii JSON";
    export let icon: string = "mdi:code-json";

    let fileInput: HTMLInputElement;

    const constructValidatedSheet = (characterObj: unknown) => {
        const isValid = validateCharacter(characterObj);

        if (!isValid) {
            throw new Error(`JSON Validation Error.`);
            // TODO:  add UI popup or smth for this error
        }

        return CharacterConverter ? new CharacterConverter(characterObj).constructCharacter() : characterObj;
    }
	
	const importFromJSON = (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
        let jsonSheet = event.currentTarget.files[0];
        if (jsonSheet && jsonSheet.type === 'application/json'){
            fileReader.readAsText(jsonSheet);
            fileReader.onload = _ => {
                const validatedSheet = constructValidatedSheet(JSON.parse(<string> fileReader.result));
                createCharacter(validatedSheet);
            };
        }
    }

</script>

<SimpleButton value={label} icon={icon} iconClass='' onClickFn={() => { fileInput.click() }}></SimpleButton>
<input style="display:none" type="file" accept=".json" on:change={ (event) => importFromJSON(event)} bind:this={fileInput}>
