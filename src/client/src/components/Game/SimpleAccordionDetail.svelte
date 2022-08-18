<script lang="ts">
    import { Icon } from '@smui/icon-button';
    import InPlaceEdit from '../InPlaceEdit.svelte';
    import SimpleButton from '../SimpleButton.svelte';
    import { fade, slide } from 'svelte/transition';
    import MarkdownBoxText from './MarkdownBoxText.svelte';

    export let value: string = '';
    export let content: string = '';
    export let source: string = '';
    export let icon: string = '';
    export let selectable: boolean = false;
    export let isSelected: boolean = false;
    export let editable: boolean = true;
    export let textareaHeight: string = '10em';
    export let deleteItem: () => void = () => {};
    export let toggleItem: () => void = () => {};

    let isOpen: boolean = false;
    
</script>

<box class="feature-main-container" transition:fade|local style='background-color: {isSelected ? 'var(--clr-accent-dark)' : 'var(--clr-box-bg-light)'};'>
    <div class="feature-summary" style={`grid-template-areas: "feature-${icon || selectable ? 'type' : 'name'} feature-name feature-menu";`}>
        {#if icon}
            <div class="feature-type">
                <img class="feature-type-icon" 
                    src="../static/{icon}.svg" 
                    alt="feature-type-icon"
                >
            </div>
        {/if}
        {#if selectable && isSelected}
            <div class="feature-type selected">
                <Icon class="material-icons">{'check'}</Icon>
            </div>
        {/if}
        <div class="feature-name {selectable ? 'selectable': ''}" on:click={toggleItem}>
            {#if editable}
                <InPlaceEdit bind:value editWidth='18rem' editHeight='1.5rem' on:submit={() => {}}/>
            {:else}
                {value}
            {/if}
        </div>

        <sendable class="feature-menu" on:click={() => { isOpen = !isOpen }}>
            <Icon class="material-icons">{isOpen ? 'menu_open' : 'menu'}</Icon>
        </sendable>
    </div>
    {#if isOpen}
        {#if source}
            <div class="single-detail-line">
                <div class="box-label">
                    Source:
                </div>
                {source}
            </div>
        {/if}
        <div class="details" transition:slide|local>
            {#if editable}
                <textarea style='height: {textareaHeight};' on:change={() => {}} bind:value={content}></textarea>
                <SimpleButton value='Delete' type="delete" onClickFn={() => deleteItem()}></SimpleButton>
            {:else}
                <MarkdownBoxText text={content}></MarkdownBoxText>
            {/if}
        </div>
    {/if}
</box>

<style>
    box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 95%;
    }

    img {
        height: 1.25em;
        width: 1.25em;
    }

    .feature-summary {
        display: grid; 
        grid-template-columns: 1fr 8fr 1fr; 
        grid-template-rows: 2fr; 
        gap: 0.5em;
        padding: 0.5em 0em;
    }

    .feature-type { grid-area: feature-type; }

    .feature-type.selected {
        padding-left: 0.25em;
    }

    .feature-name { grid-area: feature-name; 
        font-size: 1.1em;
        font-weight: 400;
        font-family: Quicksand;
    }

    .feature-name.selectable {
        cursor: pointer;
    }

    .feature-menu { grid-area: feature-menu; }

    .feature-summary > div, .feature-summary > sendable {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.details {
		padding: 0em 0.5em 0.5em 0.5em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.5em;
    }

    .single-detail-line {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.4em;
        font-weight: 400;
        font-family: Quicksand;
    }

    .single-detail-line div {
        font-size: 1em;
    }

</style>