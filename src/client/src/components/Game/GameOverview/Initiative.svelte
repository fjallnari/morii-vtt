<script lang="ts">
    import type GameData from "../../../interfaces/GameData";
    import { messages } from "../../../stores";
    
    export let gameData: GameData;
</script>


<box class='initiative-container'>
    <div class='initiative-list'>

    </div>
</box>


<style>
    .initiative-container {
        height: 100%;
        width: 100%;
    }

</style>