<script lang="ts">
    import type GameData from "../../interfaces/GameData";
    import { selectedCharacter } from "../../stores";

    export let gameData:GameData;

</script>

<div class="characters-container">
    <h3 class="title">Characters</h3>
    <div class="character-list">
        {#each gameData.characters as character}
            <li class="character-item" on:click={() => selectedCharacter.set(character)}>
                <div class="character-tile">
                    <!-- TODO -->
                </div>
                <div class="character-name">
                    {character.name}
                </div>
                <div class="username">
                    {gameData.players.find(player => player._id === character.playerID).username}
                </div>
            </li>
        {/each}
    </div>
</div>


<style>
    .characters-container {  display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 0.3fr 1.7fr;
        gap: 0px 0px;
        grid-auto-flow: row;
        grid-template-areas:
        "title"
        "character-list";
    }

    .character-list { grid-area: character-list;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.75em;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 0em 1em 0em 1em;
    }

    .character-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.2em;

        width: 10em;
        height: 10em;
        cursor: pointer;

        background-color:#252529;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    .character-tile {

    }
    
    .character-name {
        font-family: Quicksand;
        font-size: 1.5em;
    }

    .username {
        font-family: Montserrat;
    }

    .title { grid-area: title;
        font-family: Quicksand;
        font-size: 1.5em;
        font-weight: 100;
        text-transform: uppercase;
    }

</style>