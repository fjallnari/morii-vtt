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
    :root {
        --main-hp-color: #BC4B51; /* #A7C284 */
        --main-temp-hp-color: #5B8E7D; /* #87BCDE */
    }

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
        color: #fff;
        text-align: center;
        font-family: Montserrat;
        font-weight: bold;
    }

    .hp-bar-fill {
        height: 100%;
        background-color: var(--main-hp-color)
    }

    .hp-bar-temp-fill {
        height: 100%;
        background-color: var(--main-temp-hp-color);
    }

</style>