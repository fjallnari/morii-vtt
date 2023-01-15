<script lang="ts">
    import type { CharacterCairn } from "../../../../interfaces/Cairn/CharacterCairn";
    import CharSheetMenu from "../Components/CharSheetMenu.svelte";

    export let character: CharacterCairn;


</script>

<tab-container>
    <box class="character-basic-info"></box>
    <box class="ability-scores"></box>
    <box class="traits"></box>
    <box class="inventory"></box>
    <box class="notes"></box>
    <box class="armor"></box>
    <box class="hp"></box>
    <box class="deprived"></box>
    <CharSheetMenu></CharSheetMenu>
</tab-container>

<style>

    tab-container {
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr; 
        gap: 0.5em; 
        grid-template-areas: 
            "character-basic-info character-basic-info character-basic-info character-basic-info character-basic-info inventory inventory inventory inventory"
            "character-basic-info character-basic-info character-basic-info character-basic-info character-basic-info inventory inventory inventory inventory"
            "ability-scores ability-scores ability-scores deprived deprived inventory inventory inventory inventory"
            "ability-scores ability-scores ability-scores hp hp inventory inventory inventory inventory"
            "ability-scores ability-scores ability-scores hp hp inventory inventory inventory inventory"
            "ability-scores ability-scores ability-scores armor armor inventory inventory inventory inventory"
            "ability-scores ability-scores ability-scores armor armor notes notes notes notes"
            "traits traits traits traits traits notes notes notes notes"
            "traits traits traits traits traits notes notes notes notes"
            "traits traits traits traits traits notes notes notes notes"
            "traits traits traits traits traits notes notes notes notes"
            ". . . char-sheet-menu char-sheet-menu char-sheet-menu . . ."; 
    }

    .character-basic-info { grid-area: character-basic-info; 
        margin: 0.75em 0em 0em 0.75em;
    }

    .ability-scores { grid-area: ability-scores; 
        margin: 0em 0em 0em 0.75em;
    }

    .traits { grid-area: traits; 
        margin: 0em 0em 0em 0.75em;
    }

    .inventory { grid-area: inventory; 
        margin: 0.75em 0.75em 0em 0em;
    }

    .notes { grid-area: notes; 
        margin: 0em 0.75em 0em 0em;
    }

    .armor { grid-area: armor; }
    .hp { grid-area: hp; }
    .deprived { grid-area: deprived; }

</style>