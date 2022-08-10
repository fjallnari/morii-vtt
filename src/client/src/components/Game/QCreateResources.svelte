<script lang="ts">
    import type ClassData from "../../interfaces/ClassData";
    import ResourceDetail from './CharacterSheet/Components/ResourceDetail.svelte';
    import { Icon } from '@smui/icon-button';
    import type { ClassResource } from "../../interfaces/ClassData";

    export let selectedClass: ClassData;

    const addResource = () => {
        if (selectedClass.resources.length === 4) {
            return '';
        }

        const resourceSkeleton: ClassResource = {
            name: '',
            current: '',
            total: '',
            type: 'simple'
        }

        selectedClass.resources = selectedClass.resources.concat([resourceSkeleton]);
    }

    const deleteResource = (resource: Partial<ClassResource>) => {
        selectedClass.resources = selectedClass.resources.filter(resourceIter => resourceIter !== resource);
    }

    // looks through the record of levels ( level: total) to find the highest one under or equal to current class level
    // this way we don't have to have all the levels saved, only the ones where the value changes
    const findHighestPossibleTotal = (resource: Partial<ClassResource>) => {
        if ( !resource.levels ) { return '' }

        for (var iterLevel = selectedClass.level; iterLevel >= 1; iterLevel--) {
            if (resource.levels[iterLevel]) {
                return resource.levels[iterLevel];
            }
        }

        return '';
    }

    // dynamic resources
    $: selectedClass.resources = selectedClass.resources.map(resource => {
        const resourceTotal = findHighestPossibleTotal(resource);
        return resource.levels ? Object.assign(resource, { total: resourceTotal, current: resourceTotal }) : resource;
    });

</script>

<div class="class-resources{selectedClass.resources.length === 0 ? ' empty' : ''}">
    <div class="resources-list {selectedClass.resources.length !== 0 && selectedClass.resources.length !== 4 ? ' off-center' : ''}">
        {#each selectedClass.resources as resource}
            <ResourceDetail bind:resource={resource} deleteFce={() => {deleteResource(resource)}}></ResourceDetail>
        {/each}
        {#if selectedClass.resources.length < 4}
            <sendable class="add-new-item" on:click={() => addResource()}>
                <Icon class="material-icons">{'add'}</Icon>
            </sendable>
        {/if}
    </div>
    {#if selectedClass.resources.length === 0}
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Class Resources
        </div>
    {/if}
</div>

<style>
    .class-resources { grid-area: class-resources; 
        display: flex;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
    }

    .class-resources.empty {
        flex-direction: column;
        background-color: var(--clr-box-bg-normal);
        box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
        border-radius: 4px;
    }
    
    .resources-list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 0.5em;
        width: 100%;
        height: 100%;
    }

    :global(.class-resources .resources-list .card) {
        width: 48% !important;
        height: 48% !important;
        max-width: unset !important;
    }

</style>