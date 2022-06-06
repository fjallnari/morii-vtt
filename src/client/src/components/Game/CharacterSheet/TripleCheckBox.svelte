<script lang="ts">
    import { modifyCharacter } from "../../../stores";

    export let value: number;
    export let blankBox: string = 'checkbox-blank-outline';
    export let fullBox: string = 'checkbox-intermediate';
    export let blankBoxLast: string = blankBox;
    export let fullBoxLast: string = fullBox;

</script>

<div class="triple-checkbox">
    {#each Array.from({ length: 3 }, (_, i) => i + 1) as iter_level}
        <img class="skill-prof-icon"
            src="../static/{iter_level > value ? `${iter_level === 3 ? blankBoxLast : blankBox}`: `${iter_level === 3 ? fullBoxLast : fullBox}`}.svg" 
            alt="checkbox"
            on:click={() => { value = iter_level === value ? 0 : iter_level; $modifyCharacter()}}
        >
    {/each}
</div>

<style>
    .triple-checkbox {
        display: flex;
        gap: 0.2em;
    }

    .skill-prof-icon {
        cursor: pointer;
        width: 1.8em; 
        height: 1.8em;
    }
</style>