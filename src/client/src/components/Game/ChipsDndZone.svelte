<script lang="ts">   
    import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

    export let items;
    export let containerWidth = '200vw';

	const flipDurationMs = 300;

	function handleDndConsider(e) {
		items = e.detail.items;
	}
	function handleDndFinalize(e) {
		items = e.detail.items;
	}
</script>

<section style="width:{containerWidth}" use:dndzone={{items, flipDurationMs, dropTargetStyle: {outline: '', 'box-shadow': '0px 0px 0px 2px var(--clr-accent-dark)', 'border-radius': '4px'}}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
	{#each items as item(item.id)}
		<box class='chip' animate:flip="{{duration: flipDurationMs}}">
			{item.name}	
        </box>
	{/each}
</section>


<style>
	section {
        height: 85%;
        display: flex;
        overflow-x: auto;
        gap: 0.25em;
        padding: 4px;
        position: relative;
        align-items: center;
        justify-content: center;
	}

    .chip {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 0.25em;
        font-family: 'Quicksand';
        font-size: 1em;
        padding: 0.3em;
        background-color: var(--clr-box-bg-light);
        max-width: 10%;
    }

</style>