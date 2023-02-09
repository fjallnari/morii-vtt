<script lang="ts">
    import { validateCharacterCairn } from "../../../../main";
    import ImportJsonSheetGeneric from "../../ImportJsonSheetGeneric.svelte";

    export let createCharacter: (characterTemplate?: {}) => Promise<void>;


</script>

<ImportJsonSheetGeneric createCharacter={createCharacter} validateCharacter={validateCharacterCairn}/>