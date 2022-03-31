<script lang="ts">
    import type Campaign from "../../interfaces/Campaign";
    import type GameData from "../../interfaces/GameData";

    export let gameData: GameData;

</script>

<div class="character-sheet-box">
    <h1>Character sheet</h1>
    <p>{gameData.character ? 'Show char sheet': 'No character in this campaign'}</p>
</div>

<style>
    .character-sheet-box {
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        height: inherit;
        background-color: #212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        flex-grow: 5;
    }

</style>