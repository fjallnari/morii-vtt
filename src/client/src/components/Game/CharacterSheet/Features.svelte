<script lang="ts">
    import type { Character, Feature } from "../../../interfaces/Character";
    import { modifyCharacter } from "../../../stores";
    import IconButton, { Icon } from '@smui/icon-button';
    import { v4 as uuidv4 } from 'uuid';
    import FeatureDetail from "./FeatureDetail.svelte";
    export let character: Character;
    let currentFilter = 0;

    enum SOURCE_TYPES {
        ALL,
        RACIAL,
        CLASS,
        FEAT,
        BACKGROUND,
        OTHER
    }

    const addNewFeature = () => {
        const featureSkeleton: Feature = {
            id: uuidv4(),
            name: '',
            type: currentFilter === SOURCE_TYPES.ALL ? 0 : currentFilter - 1,
            source_name: '',
            content: ''
        }

        character.features.push(featureSkeleton);
    }

    const isSelectedType = (filteredType: number, profType: number) => {
        return filteredType === SOURCE_TYPES.ALL ? true : profType === filteredType - 1;
    }

</script>

<box class="features-main-container">
    <div class="filter-menu">
        {#each ['all', 'racial', 'class', 'feat', 'background', 'other'] as featureType, index}
            <sendable class="filter-names"
                style="{currentFilter === index ? 'border-bottom: 1px solid #EFA48B; padding-bottom: 0.2em;': ''}"
                on:click={ () => { currentFilter = index;}}
            >
                {featureType}
            </sendable>
        {/each}                
    </div>
    <div class="inside-box-list">
        {#each character.features.filter( feature => isSelectedType(currentFilter, feature.type)) as feature}
            <FeatureDetail feature={feature} character={character}></FeatureDetail>
        {/each}
        <sendable class="add-new-item" on:click={() => { addNewFeature(); $modifyCharacter() }}>
            <Icon class="material-icons">{'add'}</Icon>
        </sendable>
    </div>
    <div class="box-label">
        Features & Traits
    </div>
</box>

<style>
    .features-main-container {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap: 0.5em;

        width: 100%;
        height: 100%;        
    }

    .filter-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.7em;
        padding-top: 0.5em;
    }

    .filter-menu sendable {
        cursor: pointer;
        transition-duration: 500ms;
        transition-property: border; 
        font-family: Athiti;
        text-transform: uppercase;
    }

    .inside-box-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.25em;
        scrollbar-width: thin;
        overflow-y: auto;
    }

    

</style>