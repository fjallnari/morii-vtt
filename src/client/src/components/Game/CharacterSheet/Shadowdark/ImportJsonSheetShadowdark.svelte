<script lang="ts">
    import { validateCharacterDarklings, validateCharacterShadowdark } from "../../../../main";
    import { CharacterDarklingsConverter } from "../../../../util/CharacterDarklingsConverter";
    import ImportJsonSheetGeneric from "../../ImportJsonSheetGeneric.svelte";

    export let createCharacter: (characterTemplate?: {}) => Promise<void>;


</script>

<ImportJsonSheetGeneric createCharacter={createCharacter} validateCharacter={validateCharacterShadowdark}/>
<ImportJsonSheetGeneric 
    createCharacter={createCharacter} 
    validateCharacter={validateCharacterDarklings} 
    CharacterConverter={CharacterDarklingsConverter}
    label="Import from ShadowDarklings"
    icon="mdi:file-import"
/>