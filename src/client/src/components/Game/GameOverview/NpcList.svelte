<script lang="ts">
    import Icon from '@iconify/svelte';
    import { createEventDispatcher } from 'svelte';
    import { dndzone, SOURCES, TRIGGERS	 } from 'svelte-dnd-action';
    import { flip } from 'svelte/animate';
    import type GameData from '../../../interfaces/GameData';
    import { selectedCharacter, user } from '../../../stores';
    import { getClassIcon } from '../../../util/util';

    export let gameData: GameData;
    export let createMenuEnabled: boolean;

    $: items = gameData.npcs.map(npc => Object.assign(npc, {id: npc._id}));

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

        dispatch('updatenpcs', {
            updatedNpcs: items
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

</script>


<box class="npcs-list-container">
    <section
        class='npc-list'
        use:dndzone="{{ 
            items, 
            dragDisabled,
            type: "npc",
            flipDurationMs,
            dropTargetStyle: {
                padding: '0em',
                margin: '0em', 
                outline: '', 
                'box-shadow': '0px 0px 0px 2px var(--clr-accent-dark)', 
                'border-radius': '4px'
            }
        }}"
        on:consider="{handleConsider}"
        on:finalize="{handleFinalize}"
        >
        {#if items && items.length !== 0}
            {#each items as npc (npc.id)}
                <box class="npc-item"
                    on:click={() => selectedCharacter.set(npc)} on:keyup={() => {}}
                    animate:flip="{{ duration: flipDurationMs }}"
                >
                    <span class="npc-icon">
                        <img id="main-class" src="../static/class-icons/{getClassIcon(npc?.classes ?? npc?.class, gameData.system)[0]}.svg" alt="class-icon">
                    </span>
                    <span class="npc-name">{npc.name && npc.name != "" ? npc.name : "???"}</span>
                    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                    <span class="npc-drag handle"
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
            <p>No npcs.</p>
        {/if}
    </section>
    <sendable class="add-new-item" on:click={() => createMenuEnabled = true} on:keyup={() => {}}>
        <Icon class="big-icon" icon="mdi:add" />
    </sendable>
</box>


<style>

    .npcs-list-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        padding: 1em 0.2em 4px 0.2em;
        font-family: Quicksand;
    }

    .npc-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.4em;
        width: inherit;
        height: inherit;
        overflow-y: auto;
    }

    .npc-item {
        display: grid; 
        grid-template-columns: 1fr 5fr 1fr;
        gap: 0.5em;
        width: 95%;
        cursor: pointer;
        background-color: var(--clr-box-bg-light);
        grid-template-areas: 
            "npc-icon npc-name npc-drag";
    }

    .npc-item > span {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .npc-drag { grid-area: npc-drag; }

    .npc-name { grid-area: npc-name; 
        font-size: 1.2em;
    }

    .npc-icon { grid-area: npc-icon;
        font-family: Athiti;
        font-weight: var(--semi-bold);
        max-width: 2.5em;
    }

</style>