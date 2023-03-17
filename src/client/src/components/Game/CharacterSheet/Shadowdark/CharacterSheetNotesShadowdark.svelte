<script lang="ts">
    import type { CharacterShadowdark } from "../../../../interfaces/Shadowdark/CharacterShadowdark";
    import BioTextareaBox from "../../../BioTextareaBox.svelte";
    import CharacterSheetMenu from "../Components/CharSheetMenu.svelte";

    export let character: CharacterShadowdark;

</script>

<tab-container class="shadowdark-character">
    <div class="rules">

    </div>
    <BioTextareaBox bind:charAttribute={character.notes} label='Notes' inlineStyle='grid-area: notes;'></BioTextareaBox>
    <BioTextareaBox bind:charAttribute={character.foes} label='Foes' inlineStyle='grid-area: foes;'></BioTextareaBox>
    <BioTextareaBox bind:charAttribute={character.allies} label='Allies' inlineStyle='grid-area: allies;'></BioTextareaBox>
    <BioTextareaBox bind:charAttribute={character.shinies} label='Shinies' inlineStyle='grid-area: shinies;'></BioTextareaBox>
    <CharacterSheetMenu></CharacterSheetMenu>
</tab-container>

<style>
    tab-container {
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr; 
        grid-template-rows: 3fr 3fr 3fr .5fr; 
        gap: 0.75em;
        box-sizing: border-box;
        padding: 0.75em;
        grid-template-areas: 
            "rules notes foes"
            "rules notes allies"
            "rules notes shinies"
            "rules char-sheet-menu shinies";
    }

    .rules { grid-area: rules;

    }

</style>