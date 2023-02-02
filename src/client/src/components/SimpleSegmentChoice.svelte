<script lang="ts">
    import { capitalize } from "../util/util";



    export let options: string[];
    export let final: string;

</script>

<segmented-choice>
    {#each options as option, lineOptionIndex}
        {#if lineOptionIndex !== 0}
            <div class="or-sign">
                {'OR'}
            </div>
        {/if}
        <box class='chip selectable {final === option ? 'selected': ''}' on:click={() => {final = option}} on:keyup={() => {}}>
            {capitalize(option)}
        </box>
    {/each}
</segmented-choice>

<style>
    segmented-choice {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        flex-wrap: wrap;
    }

    .or-sign {
        font-weight: var(--semi-bold);
    }

    .chip {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 0.2em;
        font-size: 1em;
        padding: 0.4em;
        background-color: var(--clr-box-bg-lighter);
        flex-wrap: wrap;
        max-width: 90%;
    }

    .chip.selectable {
        cursor: pointer;
    }

    .chip.selected {
        background-color: var(--clr-accent-dark) !important;
        font-weight: var(--semi-bold);
    }
</style>