<script lang="ts">
    import type { Character } from "../../../interfaces/Character";

    export let character: Character;

</script>

<div class="hp-bar">
    <div class="hp-bar-indicator">{`${(~~character.hp_current + ~~character.hp_temp)/~~character.hp_max * 100 >> 0}%`}</div>
    <div class="hp-bar-fill" style="width: {~~character.hp_current/~~character.hp_max * 100 >> 0}%;"></div>
    <div class="hp-bar-temp-fill" style="width: {~~character.hp_temp/~~character.hp_max * 100 >> 0}%;"></div>
</div>

<style>
    .hp-bar {
        grid-area: hp-bar;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        width: 8em;
        height: 2em;
        border: #FCF7F8 0.15em solid;
        border-radius: 4px;
        background-color: none;

        margin-top: auto;
        margin-left: 1.25em;
        margin-right: 1.25em;
    }

    .hp-bar-indicator {
        background-color: transparent;
        position: absolute;
        margin-left: 3em;
        color: #FCF7F8;
        text-align: center;
        font-family: Montserrat;
    }

    .hp-bar-fill {
        height: 100%;
        background-color: #EB8E6F;
    }

    .hp-bar-temp-fill {
        height: 100%;
        background-color: #87BCDE;
    }

</style>