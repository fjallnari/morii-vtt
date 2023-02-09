<script lang="ts">
    import type { Character5E } from "../../../../interfaces/5E/Character5E";
    import ClassIcon from "../../ClassIcon.svelte";

    export let character: Character5E;

</script>

<character-badge>
    <ClassIcon characterClasses={character.classes}></ClassIcon>
    <div class="character-name">
        {character.name}
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
    }

    .character-name {
        font-family: Quicksand;
        font-size: 1.2em;
    }


</style>