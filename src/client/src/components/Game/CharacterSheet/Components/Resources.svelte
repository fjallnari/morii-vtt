<script lang="ts">
    import type { Character, Resource } from "../../../../interfaces/Character";
    import { addNewResource, modifyCharacter } from '../../../../stores';
    import { Icon } from '@smui/icon-button';
    import { nanoid } from "nanoid/non-secure";
    import ResourceDetail from "./ResourceDetail.svelte";

    export let character: Character;

    addNewResource.set((customName: string = '', customAmount: string = '', itemID: string = '') => {
        if (character.resources.length === 4) {
            return '';
        }
        
        const resourceSkeleton: Resource = {
            id: nanoid(16),
            name: customName,
            current: customAmount,
            total: customAmount,
            item_id: itemID
        }

        character.resources = character.resources.concat([resourceSkeleton]);
        return resourceSkeleton.id;
    });

    const deleteResource = (resource: Partial<Resource>) => {
        // change the item detail
        if (character && resource.item_id) {
            Object.assign(character.inventory.find(item => item.id === resource.item_id), { resource_id: '', use_as_resource: false });
        }

        character.resources = character.resources.filter(resourceIter => resourceIter.id !== resource.id);

        $modifyCharacter();
    }

</script>

<div class="resources-main-container" style="{character.resources.length === 0 ? 'flex-direction: column;' : ''}">
    <div class="resources-list {character.resources.length !== 0 && character.resources.length < 4 ? ' off-center' : ''}">
        {#each character.resources as resource}
            <ResourceDetail bind:resource={resource} bind:character={character} deleteFce={deleteResource}></ResourceDetail>
        {/each}
        {#if character.resources.length < 4}
            <sendable class="add-new-item" on:click={() => { $addNewResource(); $modifyCharacter() }}>
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

    .resources-list.off-center:first-child {
        margin-left: calc(0.5em + 24px);
    }

</style>