<script lang="ts">
    import type { CharacterCairn } from "../../../../interfaces/Cairn/CharacterCairn";
    import type GameData from "../../../../interfaces/GameData";
    import MonstersCairn from "./MonstersCairn.svelte";


    export let gameData: Omit<GameData, 'characters'> & { characters: CharacterCairn[] };

</script>

<div class="inner-overview-container">
    <div class="monsters">
        <MonstersCairn cairn={gameData.cairn}></MonstersCairn>
    </div>
</div>

<style>
    .inner-overview-container { display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        gap: 1em;
        height: 100%;
        width: 100%;
        grid-auto-flow: row;
        grid-template-areas:
            "monsters monsters"
            "monsters monsters"
            "monsters monsters"
            "monsters monsters";
    }

    h3 {
        font-family: Quicksand;
        font-weight: 100;
        text-transform: uppercase;
        font-size: 1.5em;
    }

    .monsters { grid-area: monsters; }

</style>