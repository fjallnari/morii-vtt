<script lang="ts">
    import Icon from "@iconify/svelte";
    import { modifyCharacter } from "../stores";

    export let value: number;
    export let blankBox: string = 'mdi:checkbox-blank-outline';
    export let fullBox: string = 'mdi:checkbox-intermediate';
    export let blankBoxLast: string = blankBox;
    export let fullBoxLast: string = fullBox;

</script>

<div class="triple-checkbox">
    {#each Array.from({ length: 3 }, (_, i) => i + 1) as iter_level}
        <sendable on:click={() => { value = iter_level === value ? 0 : iter_level; $modifyCharacter()}}>
            <Icon class="bigger-icon" 
                icon={iter_level > value ? `${iter_level === 3 ? blankBoxLast : blankBox}`: `${iter_level === 3 ? fullBoxLast : fullBox}`}
            />
        </sendable>
    {/each}
</div>

<style>
    .triple-checkbox {
        display: flex;
        gap: 0.2em;
    }
</style>