<script lang="ts">
	import {dndzone} from 'svelte-dnd-action';
	const flipDurationMs = 200;
	
	export let items = [];
	
	function handleSort(e) {
		items = e.detail.items;
	}

    const deleteItem = (e) => {
        items = e.detail.items;
        items = [];
    }

</script>

<section use:dndzone={{items, flipDurationMs, dragDisabled: true, dropTargetStyle: {outline: '', 'width': '100%'}}} on:consider={handleSort} on:finalize={deleteItem}>
    <slot></slot>
</section>

<style>
    section {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>