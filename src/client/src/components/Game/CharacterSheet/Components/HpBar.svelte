<script lang="ts">
    import type { Character5E } from "../../../../interfaces/5E/Character5E";

    export let character: Character5E;

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
        width: 80%;
        height: 50%;
        border: 0.15em solid;
        border-radius: 4px;
        margin-top: auto;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        top: 30%;
    }

    .hp-bar-indicator {
        background-color: transparent;
        position: absolute;
        color: var(--clt-text);
        text-align: center;
        font-family: Montserrat;
        font-weight: var(--semi-bold);
        font-weight: var(--semi-bold);
        left: 50%;
        transform: translate(-50%, 0);
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