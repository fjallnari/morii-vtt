<script lang="ts">
    import type { Character } from "../../../interfaces/Character";
    import BioTextareaBox from "../../BioTextareaBox.svelte";
    import InPlaceEditBox from "../../InPlaceEditBox.svelte";
    import CharacterSheetMenu from "./Components/CharSheetMenu.svelte";

    export let character: Character;

</script>

<tab-container>
    <div class="character-additional-info">
        <InPlaceEditBox bind:value={character.age} boxLabel="Age" editWidth="5em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.height} boxLabel="Height" editWidth="5em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.weight} boxLabel="Weight" editWidth="5em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.eyes} boxLabel="Eyes" editWidth="5em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.skin} boxLabel="Skin" editWidth="5em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.hair} boxLabel="Hair" editWidth="5em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.alignment} boxLabel="Alignment" editWidth="5em"></InPlaceEditBox>
    </div>

    <BioTextareaBox bind:charAttribute={character.appearance} styleClass='appearance'></BioTextareaBox>
    <BioTextareaBox bind:charAttribute={character.backstory} styleClass='backstory'></BioTextareaBox>
    <BioTextareaBox bind:charAttribute={character.allies} styleClass='allies-orgs' label='Allies & Organisations'></BioTextareaBox>
    <BioTextareaBox bind:charAttribute={character.enemies} styleClass='enemies'></BioTextareaBox>
    <BioTextareaBox bind:charAttribute={character.treasure} styleClass='treasury'></BioTextareaBox>
    <BioTextareaBox bind:charAttribute={character.person_traits} styleClass='personality-traits' label='Personality Traits'></BioTextareaBox>
    <BioTextareaBox bind:charAttribute={character.ideals} styleClass='ideals'></BioTextareaBox>
    <BioTextareaBox bind:charAttribute={character.bonds} styleClass='bonds'></BioTextareaBox>
    <BioTextareaBox bind:charAttribute={character.flaws} styleClass='flaws'></BioTextareaBox>
    <BioTextareaBox bind:charAttribute={character.other_notes} styleClass='other-notes' label='Other Notes'></BioTextareaBox>
    <CharacterSheetMenu></CharacterSheetMenu>
</tab-container>

<style>
    :root {
        --outer-edge-margin: 0.75em;
    }

    tab-container {
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr; 
        grid-template-rows: 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        gap: 0.5em 0.5em; 
        grid-template-areas: 
            "character-additional-info character-additional-info character-additional-info"
            "appearance allies-orgs personality-traits"
            "appearance allies-orgs personality-traits"
            "appearance allies-orgs personality-traits"
            "appearance allies-orgs ideals"
            "appearance enemies ideals"
            "appearance enemies ideals"
            "backstory enemies bonds"
            "backstory enemies bonds"
            "backstory treasury bonds"
            "backstory treasury flaws"
            "backstory treasury flaws"
            "backstory treasury flaws"
            "backstory treasury other-notes"
            "backstory treasury other-notes"
            "backstory char-sheet-menu other-notes";
    }

    .character-additional-info { grid-area: character-additional-info; 
        margin: 0.5em 0.5em 0em 0.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        color: #FCF7F8;
        font-size: 1.5em;
        gap: 0.35em;
    }

</style>