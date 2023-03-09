<script lang="ts">
    import Icon from '@iconify/svelte';
    import { dndzone, SOURCES, TRIGGERS	 } from 'svelte-dnd-action';
    import { flip } from 'svelte/animate';
    import type { MonsterData } from '../../../interfaces/5E/MonsterData';
    import type MonsterDataCairn from '../../../interfaces/Cairn/MonsterDataCairn';
    import { createEventDispatcher } from 'svelte';
    import { getDefaultIfEmpty } from '../../../util/util';

    export let items: (MonsterData | MonsterDataCairn)[];
    export let chosenMonsterID: string;

    const dispatch = createEventDispatcher();
    const flipDurationMs = 200;
    let dragDisabled = true;

    const handleConsider = (e) => {
		const {items: newItems, info: {source, trigger}} = e.detail;
		items = newItems;
		// Ensure dragging is stopped on drag finish via keyboard
		if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
			dragDisabled = true;
		}
	}

    const handleFinalize = (e) => {
		const {items: newItems, info: {source}} = e.detail;
		items = newItems;
		// Ensure dragging is stopped on drag finish via pointer (mouse, touch)
		if (source === SOURCES.POINTER) {
			dragDisabled = true;
		}

        dispatch('updatemonsters', {
            updatedMonsters: items
        });
	}

	const startDrag = (e) => {
		// preventing default to prevent lag on touch devices (because of the browser checking for screen scrolling)
		e.preventDefault();
		dragDisabled = false;
	}

	const handleKeyDown = (e) => {
		if ((e.key === "Enter" || e.key === " ") && dragDisabled) dragDisabled = false;
	}

    function viewFavoriteMonster(monster) {
        dispatch('viewmonster', {
            monster
        });
    }

</script>

<section
    class='favorites-list'
    use:dndzone="{{ items, dragDisabled, flipDurationMs, dropTargetStyle: {padding: '0em', margin: '0em 0.5em', outline: '', 'box-shadow': '0px 0px 0px 2px var(--clr-accent-dark)', 'border-radius': '4px'} }}"
    on:consider="{handleConsider}"
    on:finalize="{handleFinalize}"
>
    {#if items && items.length !== 0}
        {#each items as favMonster (favMonster.id)}
            <box class="fav-monster-item {favMonster.id === chosenMonsterID ? 'selected' : ''}"
                on:click={() => viewFavoriteMonster(favMonster)} on:keyup={() => {}}
                animate:flip="{{ duration: flipDurationMs }}"
            >
                <span class="fav-monster-source">
                    {#if favMonster?.source === "srd"}
                        <Icon class="big-icon" icon="mdi:notebook" />
                    {:else}
                        <Icon class="big-icon" icon="mdi:shape" />
                    {/if}
                </span>
                <span class="fav-monster-name">{getDefaultIfEmpty(favMonster.name, "???")}</span>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <span class="fav-monster-drag handle"
                    tabindex={dragDisabled? 0 : -1} 
                    aria-label="drag-handle"
                    style={dragDisabled ? 'cursor: grab' : 'cursor: grabbing'}
                    on:mousedown={startDrag} 
                    on:touchstart={startDrag}
                    on:keydown={handleKeyDown}
                >
                    <Icon class="big-icon" icon="material-symbols:drag-indicator" />
                </span>
            </box>        
        {/each}
    {:else}
        <p>No saved monsters.</p>
    {/if}
</section>

<style>
    .favorites-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.4em;
        width: inherit;
        height: inherit;
        overflow-y: auto;
        scrollbar-width: thin;
        padding: 0px 0.5em 4px 0.5em;
        overflow-y: auto;
    }

    .fav-monster-item {
        display: grid; 
        grid-template-columns: 1fr 5fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr; 
        gap: 0.5em;
        padding: 0.4em 0em;
        width: 95%;
        cursor: pointer;
        background-color: var(--clr-box-bg-light);
        grid-template-areas: 
            "fav-monster-source fav-monster-name fav-monster-drag"
            "fav-monster-source fav-monster-name fav-monster-drag"
            "fav-monster-source fav-monster-name fav-monster-drag"; 
    }

    .fav-monster-item.selected {
        background-color: var(--clr-accent-dark);
    }

    .fav-monster-item > span {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .fav-monster-drag { grid-area: fav-monster-drag; }

    .fav-monster-name { grid-area: fav-monster-name; 
        font-size: 1.2em;
        overflow: hidden;
    }

    .fav-monster-source { grid-area: fav-monster-source; 
        font-family: Athiti;
        font-weight: var(--semi-bold);
    }

</style>