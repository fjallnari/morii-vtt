<script lang="ts">
    export let currentHP: number;
    export let maxHP: number;
    export let tempHP: number = 0;

</script>

<div class="hp-bar">
    <div class="hp-bar-indicator">{`${(currentHP + tempHP)/maxHP * 100 >> 0}%`}</div>
    <div class="hp-bar-fill" style="width: {currentHP/maxHP * 100 >> 0}%;"></div>
    <div class="hp-bar-temp-fill" style="width: {tempHP/maxHP * 100 >> 0}%;"></div>
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