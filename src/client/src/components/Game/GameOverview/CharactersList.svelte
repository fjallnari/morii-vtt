<script lang="ts">
    import GAME_SYSTEMS from "../../../enum/GameSystems";
    import type GameData from "../../../interfaces/GameData";
    import { selectedCharacter, user } from "../../../stores";
    import CreateInviteCode from "../../Campaign/CreateInviteCode.svelte";
    import CharacterBadge5E from "./5E/CharacterBadge5E.svelte";

    export let gameData: GameData;
</script>

<div class="characters-container">
    <h3 class="title">Characters</h3>
    <div class="character-list">
        {#if gameData.players.length === 0}
            <div class="invite-container">
                <CreateInviteCode invite={$user?.gameData?.invite} inGameInvite></CreateInviteCode>
                <h3>There are currently no players in this campaign.</h3>
            </div>
        {:else if gameData.characters.length === 0}
            <h3>No player characters found</h3>
        {:else}
            {#each gameData.characters as character}
                <div class="character-badge-box" on:click={() => selectedCharacter.set(character)} on:keyup={() => {}}>
                    <svelte:component 
                        this={GAME_SYSTEMS[gameData.system].characterBadge ?? CharacterBadge5E}
                        bind:character={character}
                    />
                </div>
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

    .character-badge-box {
        width: 10em;
        height: 10em;
        cursor: pointer;

        background-color:var(--clr-box-bg-normal);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    h3 {
        font-family: Quicksand;
        font-weight: 100;
        text-transform: uppercase;
    }

    .title { grid-area: title;
        font-size: 1.5em;
    }

    .invite-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

</style>