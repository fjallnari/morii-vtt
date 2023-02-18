<script lang="ts">
    import type InitiativeData from "../../../../interfaces/5E/InitiativeData";
    import { nanoid } from "nanoid/non-secure";
    import { dndzone, SOURCES, TRIGGERS	 } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
    import DeleteInitEntity from "../DeleteInitEntity.svelte";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import { tooltip } from "@svelte-plugins/tooltips";
    import Icon from "@iconify/svelte";
    
    export let initiative: InitiativeData;

    const flipDurationMs = 200;
	let dragDisabled = true;
    let deletedEntities = [];

	$: items = initiative.order; // has to be named this way for svelte-dnd-action

    $: if (deletedEntities.length !== 0) {
        initiative.order = initiative.order.filter(initEntity => initEntity.id !== deletedEntities[0].id);
    }

    const sortInitOrder = () => {
        initiative.order = initiative.order.sort((a, b) => ~~a.value < ~~b.value ? 1 : -1);
        initiative.topID = initiative.order[0]?.id;
    }

    const addNewInitEntity = () => {
        const newInitEntity = {
            id: nanoid(16),
            name: 'NaN',
            value: '0'
        }

        initiative.order = initiative.order.concat([newInitEntity]);
    }

    const clearInitOrder = () => {
        initiative.order = [];
        initiative.topID = undefined;
    }

    const passTurn = () => {
        if (initiative.order.length !== 0) {
            initiative.order = [... initiative.order.slice(1), initiative.order[0]];
        }
    }
	
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


<box class='initiative-container'>
    <section
        class='initiative-list'
        use:dndzone="{{ items, dragDisabled, flipDurationMs, dropTargetStyle: {outline: '', 'box-shadow': '0px 0px 0px 2px var(--clr-accent-dark)', 'border-radius': '4px'} }}"
        on:consider="{handleConsider}"
        on:finalize="{handleFinalize}"
    >
        {#each items as initEntity (initEntity.id)}
            <box class='init-entity-tag' animate:flip="{{ duration: flipDurationMs }}">
                <span class="entity-icon">
                    {#if initEntity.id === initiative.topID}
                        <Icon icon="ic:round-hourglass-top" />
                    {/if}
                </span>
                <span class='entity-name'>
                    <InPlaceEdit bind:value={initEntity.name} editWidth={'8em'} editHeight={'1em'}/>
                </span>

                <span class="entity-value">
                    <InPlaceEdit bind:value={initEntity.value} editWidth={'1.75em'} editHeight={'1em'}/>
                </span>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <span class="entity-drag-handle handle"
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
    </section>
    <box class='initiative-menu{!dragDisabled ? ' delete-mode': ''}'>
        {#if dragDisabled}
            <sendable use:tooltip={{content: 'Clear', theme: 'dark-tooltip'}} class="init-menu-icon" on:click={() => clearInitOrder()} on:keyup={() => {}}>
                <Icon class="big-icon" icon="material-symbols:restart-alt" />
            </sendable>
            <sendable use:tooltip={{content: 'Add new', theme: 'dark-tooltip'}} class="init-menu-icon" on:click={() => addNewInitEntity()} on:keyup={() => {}}>
                <Icon class="big-icon" icon="mdi:add" />
            </sendable>
            <sendable use:tooltip={{content: 'Sort', theme: 'dark-tooltip'}} class="init-menu-icon" on:click={() => sortInitOrder()} on:keyup={() => {}}>
                <Icon class="big-icon" icon="material-symbols:sort" />
            </sendable>
            <sendable use:tooltip={{content: 'Next', theme: 'dark-tooltip'}} class="init-menu-icon" on:click={() => passTurn()} on:keyup={() => {}}>
                <Icon class="big-icon" icon="mdi:arrow-right-bold" />
            </sendable>
        {:else}
            <DeleteInitEntity bind:items={deletedEntities}>
                <div class="delete-item init-menu-icon">
                    <Icon class="big-icon" icon="mdi:delete-outline" />
                </div>
            </DeleteInitEntity>
        {/if}
    </box>
</box>


<style>
    .initiative-container {
        height: 100%;
        min-height: 0;
        width: 100%;
        position: relative;
    }

    .initiative-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5em;
        padding-bottom: 4px;
        margin: 1em 0.5em;
        height: 85%;
        overflow-y: auto;
        scrollbar-width: thin;
    }

    .init-entity-tag {
        /* display: flex;
        justify-content: center;
        align-items: center; */

        display: grid; 
        grid-template-columns: 1fr 6fr 2fr 1fr; 
        grid-template-rows: 1fr; 
        gap: 0.4em; 
        grid-template-areas: 
            "entity-icon entity-name entity-value entity-drag-handle";
        
        width: 90%;
        background-color: var(--clr-box-bg-light);
        font-family: Quicksand;
        font-size: 1.2em;
        padding: 0.5em 0.25em;
    }

    .init-entity-tag:first-child {
        background: linear-gradient(135deg, var(--clr-accent-normal) 20%, var(--clr-box-bg-light) 20%);
    }

    .init-entity-tag span {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .entity-name { grid-area: entity-name; }

    .entity-value { grid-area: entity-value;
        font-weight: var(--semi-bold);
    }

    .entity-icon { grid-area: entity-icon; 
        font-size: 1.25em;
    }
    .entity-drag-handle { grid-area: entity-drag-handle; }

    .initiative-menu {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        width: 100%;
        background-color: var(--clr-box-bg-light);
        height: 10%;
        min-height: 2em;
        top: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.75em;
    }

    .initiative-menu.delete-mode {
        background-color: var(--clr-contrast-normal);
    }

    .delete-item {
        position: relative;
        z-index: 2;
    }

    .init-menu-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.4em;
    }


</style>