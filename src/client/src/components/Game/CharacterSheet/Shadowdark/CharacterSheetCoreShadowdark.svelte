<script lang="ts">
    import CharSheetMenu from "../Components/CharSheetMenu.svelte";

</script>

<tab-container>
    <box class="char-basic-info"></box>
    <box class="ability-scores"></box>
    <box class="gear"></box>
    <box class="hp"></box>
    <box class="armor"></box>
    <box class="coins"></box>
    <box class="luck"></box>
    <box class="languages"></box>
    <box class="talents"></box>
    <box class="attacks"></box>
    <box class="license"></box>
    <box class="notes"></box>
    <CharSheetMenu />
</tab-container>


<style>
    tab-container {  display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        gap: 0.75em;
        grid-auto-flow: row;
        grid-template-areas:
            "char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info char-basic-info"
            "ability-scores ability-scores ability-scores hp luck coins languages languages languages"
            "ability-scores ability-scores ability-scores hp armor coins attacks attacks attacks"
            "ability-scores ability-scores ability-scores . . . attacks attacks attacks"
            "ability-scores ability-scores ability-scores gear gear gear attacks attacks attacks"
            "ability-scores ability-scores ability-scores gear gear gear talents talents talents"
            "notes notes notes gear gear gear talents talents talents"
            "notes notes notes gear gear gear talents talents talents"
            "license license license char-sheet-menu char-sheet-menu char-sheet-menu talents talents talents";
    }

    .char-basic-info { grid-area: char-basic-info; }

    .ability-scores { grid-area: ability-scores; }

    .gear { grid-area: gear; }

    .hp { grid-area: hp; }

    .armor { grid-area: armor; }

    .coins { grid-area: coins; }

    .luck { grid-area: luck; }

    .languages { grid-area: languages; }

    .talents { grid-area: talents; }

    .attacks { grid-area: attacks; }

    .license { grid-area: license; }

    .notes { grid-area: notes; }

</style>