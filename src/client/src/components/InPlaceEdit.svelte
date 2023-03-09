<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte'
    import { getDefaultIfEmpty, isTextNonEmpty } from '../util/util';

    export let value: any = '', required = true, editWidth: string = 'inherit', editHeight: string = 'inherit', defaultValue: string = '---', valueFontSize = '1em';

    const dispatch = createEventDispatcher();
    let editing = false, original: string;

    onMount(() => {
        original = value;
    })

    const edit = () => {
        editing = true;
        original = value;
    }

    const submit = () => {
        if (value !== original) {
            dispatch('submit', value);
        }
            
        editing = false;
    }

    const keydown = (event) => {
        if (event.key == 'Escape') {
            event.preventDefault();
            value = original;
            editing = false;
        }
    }
    
    const focus = (element) => {
        element.focus();
    }

    $: if (typeof value === 'number') {
        value = value.toString();
    }

</script>

{#if editing}
    <form on:submit|preventDefault={submit} on:keydown={keydown}>
        <input style="width: {editWidth}; height: {editHeight}; font-size: {valueFontSize};" bind:value on:blur={submit} {required} use:focus/>
    </form>
{:else}
    <div class="text-display{isTextNonEmpty(value) ? '' : ' placeholder'}" style="font-size: {valueFontSize};" on:click={() => edit()} on:keyup={() => {}}>
        {getDefaultIfEmpty(value, defaultValue)}
    </div>
{/if}

  
<style>
    input {
        border: none;
        background: none;
        font-size: inherit;
        color: inherit;
        font-family: Quicksand;
        font-weight: inherit;
        text-align: inherit;
        box-shadow: none;
        width: inherit;
        max-width: inherit;
        outline: solid 1.5px var(--clr-accent-normal);
        border-radius: 4px;
    }

    .text-display {
        border: 1px solid transparent;
    }

    .text-display.placeholder {
        color: #8e8e8e;
    }

</style>