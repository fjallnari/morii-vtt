<script lang="ts">
    import type GameData from "../../interfaces/GameData";

    import CharacterSheet from "./CharacterSheet.svelte";
    import NoCharacter from "./NoCharacter.svelte";

    export let gameData: GameData;

</script>



{#if gameData && gameData.character}
    <CharacterSheet bind:character={gameData.character}></CharacterSheet>
{:else}
    <NoCharacter bind:gameData={gameData}></NoCharacter>
{/if}