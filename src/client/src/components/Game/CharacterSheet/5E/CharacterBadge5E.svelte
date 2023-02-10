<script lang="ts">
    import type { Character5E } from "../../../../interfaces/5E/Character5E";
    import { user } from "../../../../stores";
    import ClassIcon from "../../ClassIcon.svelte";

    export let character: Character5E;

</script>

<character-badge>
    <ClassIcon characterClasses={character.classes}></ClassIcon>
    <div class="character-name">
        {character.name}
    </div>
    <div class="player-name">
        {$user?.gameData?.players.find(player => player._id === character.playerID)?.username}
    </div>
</character-badge>

<style>
    character-badge {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.2em;
        width: 100%;
        height: 100%;
        font-family: Quicksand;
    }

    .character-name {
        font-size: 1.2em;
    }

    .player-name {
        color: var(--clr-accent-light);
    }


</style>