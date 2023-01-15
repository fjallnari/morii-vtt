<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { Character5E, Resource } from "../../../../interfaces/5E/Character5E";
    import { modifyCharacter } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import SimpleButton from "../../../SimpleButton.svelte";

    export let resource: Partial<Resource>;
    export let character: Character5E = undefined;
    export let deleteFce: (resource: Partial<Resource>) => void;

    let isFlipped: boolean = false;

    $: modifyCharacterFce = character ? $modifyCharacter : () => {};

    const changeCurrentValue = (diff: number = 0) => {
        resource.current = (~~resource.current + diff).toString();
        // cannot have negative amount of resources
        if (~~resource.current < 0) {
            resource.current = '0';
        }

        // change the amount in the item detail aswell
        if (character && resource.item_id) {
            Object.assign(character.inventory.find(item => item.id === resource.item_id), { amount: resource.current });
        }

        modifyCharacterFce();
    }

    const changeResourceType = () => {
        resource.type = resource.type && resource.type === 'simple' ? 'complex' : 'simple';

        modifyCharacterFce();
    }

</script>

<box class="card{isFlipped ? ' card-flipped' : ''}">
    <div class="resource-item-container">
        <div class="resource-values">
            {#if resource.type && resource.type === 'simple'}
                <InPlaceEdit bind:value={resource.total} editWidth="5rem" editHeight="2rem" on:submit={modifyCharacterFce}></InPlaceEdit>
            {:else}
                <InPlaceEdit bind:value={resource.current} editWidth="2rem" editHeight="2rem" on:submit={() => {changeCurrentValue()}}></InPlaceEdit>/
                <InPlaceEdit bind:value={resource.total} editWidth="2rem" editHeight="2rem" on:submit={modifyCharacterFce}></InPlaceEdit>
            {/if}
        </div>
        <div class="resource-name">
            <InPlaceEdit bind:value={resource.name} editWidth="5rem" editHeight="2rem" on:submit={modifyCharacterFce}></InPlaceEdit>  
        </div>
        <sendable class="flip-card-icon" on:click={() => { isFlipped = true}} on:keyup={() => {}}>
            <Icon class="big-icon" icon="material-symbols:arrow-left-rounded" />
        </sendable>
    </div>
    <div class="back">
        <sendable class="change-resource-type" on:click={changeResourceType} on:keyup={() => {}}>
            <Icon class="resource-type-icon big-icon" icon="{resource.type && resource.type === 'simple' ? 'mdi:alpha-a' : 'mdi:ab-testing'}" />
            <div class="change-resource-type-label box-label">
                {resource.type ?? 'complex'}
            </div>
        </sendable>
        <SimpleButton value='Delete' type="delete" onClickFn={() => deleteFce(resource)}></SimpleButton>
        <sendable class="flip-card-icon" on:click={() => { isFlipped = false}} on:keyup={() => {}}>
            <Icon class="big-icon" icon="material-symbols:arrow-left-rounded" />
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
        padding: 0em 0.4em;
    }

    .flip-card-icon {
        position: absolute;
        font-size: 1.5em;
        left: 12%;
        top: 50%;
        transform: translate(-50%,-50%);
        font-size: 1.5em;
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
        justify-content: center;
        gap: 1em;

        transform: rotateY( 180deg );
        background-color: var(--clr-box-bg-light);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    :global(.back > simple-button) {
        width: 80%;
        margin-bottom: 0.4em;
    }

    .change-resource-type {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.2em;
        cursor: pointer; 
    }

    .change-resource-type-label {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1em !important;
    }

</style>