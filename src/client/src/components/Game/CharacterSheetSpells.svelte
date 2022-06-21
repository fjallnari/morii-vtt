<script lang="ts">
    import type { Character } from "../../interfaces/Character";
    import CharacterSheetMenu from "./CharacterSheetMenu.svelte";

    export let character: Character;
</script>

<tab-container>
    spells for {character.name}
    <CharacterSheetMenu></CharacterSheetMenu>
</tab-container>

<style>
    tab-container {
        height: inherit;
        flex: 5;

        background-color: #212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        
        font-weight: 100;
        font-family: Quicksand;
    }

</style>