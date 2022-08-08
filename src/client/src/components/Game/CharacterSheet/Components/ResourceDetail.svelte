<script lang="ts">
    import type { Character, Resource } from "../../../../interfaces/Character";
    import { modifyCharacter } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import { Icon } from '@smui/icon-button';
    import SimpleButton from "../../../SimpleButton.svelte";

    export let resource: Resource;
    export let character: Character;
    let isFlipped: boolean = false;

    const deleteResource = () => {
        // change the item detail
        if (resource.item_id !== '') {
            Object.assign(character.inventory.find(item => item.id === resource.item_id), { resource_id: '', use_as_resource: false });
        }
        character.resources = character.resources.filter(resourceIter => resourceIter.id !== resource.id);
        $modifyCharacter();
    }

    const changeCurrentValue = (diff: number = 0) => {
        resource.current = (~~resource.current + diff).toString();
        // cannot have negative amount of resources
        if (~~resource.current < 0) {
            resource.current = '0';
        }

        // change the amount in the item detail aswell
        if (resource.item_id !== '') {
            Object.assign(character.inventory.find(item => item.id === resource.item_id), { amount: resource.current });
        }

        $modifyCharacter();
    }

</script>

<box class="card {isFlipped ? 'card-flipped' : ''}">
    <div class="resource-item-container">
        <div class="resource-values">
            <InPlaceEdit bind:value={resource.current} editWidth="2rem" editHeight="2rem" on:submit={() => {changeCurrentValue()}}></InPlaceEdit>/
            <InPlaceEdit bind:value={resource.total} editWidth="2rem" editHeight="2rem" on:submit={$modifyCharacter}></InPlaceEdit>
        </div>
        <div class="resource-name">
            <InPlaceEdit bind:value={resource.name} editWidth="4rem" editHeight="2rem" on:submit={$modifyCharacter}></InPlaceEdit>  
        </div>
        <sendable class="flip-card-icon" on:click={() => { isFlipped = true}}>
            <Icon class="material-icons">arrow_left</Icon>
        </sendable>
    </div>
    <div class="back">
        <div class="change-value-buttons">
            <SimpleButton value='-' type="primary" onClickFn={() => {changeCurrentValue(-1)}}></SimpleButton>
            <SimpleButton value='+' type="green" onClickFn={() => {changeCurrentValue(1)}}></SimpleButton>
        </div>
        <SimpleButton value='Delete' type="delete" onClickFn={deleteResource}></SimpleButton>
        <sendable class="flip-card-icon" on:click={() => { isFlipped = false}}>
            <Icon class="material-icons">arrow_left</Icon>
        </sendable>
    </div>
</box>

<style>
    .resource-item-container {
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        grid-template-areas: 
            "resource-values resource-values"
            "resource-name resource-name";
        text-overflow: clip;
        overflow: hidden;
        position: relative;
    }

    .resource-values { grid-area: resource-values; 
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2vw;
    }

    .resource-name { grid-area: resource-name; 
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8vw; 
    }

    .flip-card-icon {
        position: absolute;
        top: calc(50% - 12px);
        left: 0px;
    }

    .card {
        height: 100%;
        max-width: 25%;
        width: 50%;
        transition: transform 1s;
        transform-style: preserve-3d;
    }

    .card-flipped {
        transform: rotateY( 180deg );
        transition: transform 0.5s;
    }

    .resource-item-container,
    .back {
        position: absolute;
        height: 100%;
        width: 100%;
        backface-visibility: hidden;
    }

    .back {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 0.5em;

        transform: rotateY( 180deg );
        background-color: var(--clr-box-bg-light);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    :global(.back > simple-button) {
        width: 80%;
        margin-bottom: 0.4em;
    }

    .change-value-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        width: 80%;
    }

    :global(.change-value-buttons simple-button) {
        width: 50%;
        margin-top: 0.4em;
    }

</style>