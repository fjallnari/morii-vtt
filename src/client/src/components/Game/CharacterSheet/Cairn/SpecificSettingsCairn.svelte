<script lang="ts">
    import type { CharacterCairn } from "../../../../interfaces/Cairn/CharacterCairn";
    import CreateRandomSheetCairn from "./CreateRandomSheetCairn.svelte";

    export let character: CharacterCairn;

</script>

<line-div>
    <CreateRandomSheetCairn bind:character={character} rerollExistingSheet={true}></CreateRandomSheetCairn>
</line-div>