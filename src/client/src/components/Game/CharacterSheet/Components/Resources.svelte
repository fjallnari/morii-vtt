<script lang="ts">
    import type { Character, Resource } from "../../../../interfaces/Character";
    import { modifyCharacter } from '../../../../stores';
    import { Icon } from '@smui/icon-button';
    import { nanoid } from "nanoid/non-secure";
    import { onMount } from "svelte";
    import ResourceDetail from "./ResourceDetail.svelte";
    import { slide, fade } from 'svelte/transition';

    onMount(() => {
        if(!character.resources){
            character.resources = [];
            $modifyCharacter();
        }
	});

    export let character: Character;

    const addNewResource = (totalAmount: string = '') => {
        const resourceSkeleton: Resource = {
            id: nanoid(16),
            name: '',
            current: totalAmount,
            total: totalAmount
        }

        character.resources = character.resources.concat([resourceSkeleton]);
    }



</script>

<div class="resources-main-container" style="{character.resources.length === 0 ? 'flex-direction: column;' : ''}">
    <div class="resources-list">
        {#each character.resources as resource}
            <ResourceDetail bind:resource={resource} bind:character={character}></ResourceDetail>
        {/each}
        {#if character.resources.length < 4}
            <sendable class="add-new-item" on:click={() => { addNewResource(); $modifyCharacter() }}>
                <Icon class="material-icons">{'add'}</Icon>
            </sendable>
        {/if}
    </div>
    {#if character.resources.length === 0}
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Resources
        </div>
    {/if}
</div>

<style>
    .resources-main-container {
        display: flex;
        justify-content: flex-start;
        gap: 0.5em;

        width: 100%;
        height: 100%;
    }
    
    .resources-list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        width: 100%;
    }

</style>