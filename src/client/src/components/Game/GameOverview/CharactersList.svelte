<script lang="ts">
    import type GameData from "../../../interfaces/GameData";
    import { selectedCharacter } from "../../../stores";
    import ClassIcon from "../ClassIcon.svelte";

    export let gameData: GameData;
</script>

<div class="characters-container">
    <h3 class="title">Characters</h3>
    <div class="character-list">
        {#if gameData.characters.length === 0}
            <h3>No characters found</h3>
        {:else}
            {#each gameData.characters as character}
                <li class="character-item" on:click={() => selectedCharacter.set(character)} on:keyup={() => {}}>
                    <ClassIcon characterClasses={character.classes}></ClassIcon>
                    <div class="character-name">
                        {character.name}
                    </div>
                </li>
            {/each}
        {/if}
    </div>
</div>


<style>
    .characters-container { grid-area: characters-list;
        display: grid;
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
        padding: 4px 1em 4px 1em;
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

        background-color:var(--clr-box-bg-normal);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }
    
    .character-name {
        font-family: Quicksand;
        font-size: 1.2em;
    }

    h3 {
        font-family: Quicksand;
        font-weight: 100;
        text-transform: uppercase;
    }

    .title { grid-area: title;
        font-size: 1.5em;
    }

</style>