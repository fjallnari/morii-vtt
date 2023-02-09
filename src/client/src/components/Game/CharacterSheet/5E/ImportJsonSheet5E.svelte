<script lang="ts">
    import { validateCharacter5E, validateCharacterVTTES } from "../../../../main";
    import { CharacterVTTESConverter } from "../../../../util/CharacterVTTESConverter";
    import ImportJsonSheetGeneric from "../../ImportJsonSheetGeneric.svelte";

    export let createCharacter: (characterTemplate?: {}) => Promise<void>;

</script>


<ImportJsonSheetGeneric createCharacter={createCharacter} validateCharacter={validateCharacter5E}/>
<ImportJsonSheetGeneric 
    createCharacter={createCharacter} 
    validateCharacter={validateCharacterVTTES} 
    CharacterConverter={CharacterVTTESConverter}
    label="Import from roll20 JSON"
    icon="mdi:file-import"
/>