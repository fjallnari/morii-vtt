<script lang="ts">
    import type { Character } from "../../interfaces/Character";
    import { selectedCharacterTab } from "../../stores";
    import CharacterSheetBio from "./CharacterSheetBio.svelte";
    import CharacterSheetCore from "./CharacterSheetCore.svelte";
    import CharacterSheetSettings from "./CharacterSheetSettings.svelte";
    import CharacterSheetSpells from "./CharacterSheetSpells.svelte";

    export let character: Character;

    selectedCharacterTab.set(0);
    const tabsComponents = [CharacterSheetCore, CharacterSheetBio, CharacterSheetSpells, CharacterSheetSettings]

</script>

<svelte:component this={tabsComponents[$selectedCharacterTab]} bind:character={character}></svelte:component>