<script lang="ts">
    import type { Character } from "../../interfaces/Character";
    import SimpleButton from "../SimpleButton.svelte";
    import Dialog from '@smui/dialog';
    import StepDetailRace from "./StepDetailRace.svelte";

    export let createCharacter: (characterTemplate?: {}) => Promise<void>;
    
    let open: boolean = false;
    let selectedStepIndex: number = 0;
    let characterTemplate: Partial<Character> = {};

    let creationSteps = [
        { name: 'Race', icon: 'account-supervisor', filled_in: false, component: StepDetailRace },
        { name: 'Class', icon: 'arrow-projectile-multiple', filled_in: false },
        { name: 'Ability Scores', icon: 'atom', filled_in: false },
        { name: 'Background', icon: 'sprout', filled_in: false },
        { name: 'Summary', icon: 'clipboard-text', filled_in: false },
    ]

    const closeDialog = () => {
        selectedStepIndex = 0;
        open = false;
    }

</script>

<SimpleButton value='Quick-Create' icon="electric_bolt" type="primary" onClickFn={() => open = true}></SimpleButton>
<Dialog
    bind:open
    fullscreen
    scrimClickAction=""
    escapeKeyAction=""
    aria-labelledby="simple-title"
    surface$style="padding: 1em 1em;"
>
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <h3 id="simple-title">Quick-Create</h3>
    <dialog-content>
        <div class="creation-steps-list">
            {#each creationSteps as step, index}
                <box class="creation-step-item {index === selectedStepIndex ? 'selected': ''}" on:click={() => {selectedStepIndex = index}} tabindex='0'>
                    <img class="step-icon"  
                        src="../static/{step.icon}.svg" 
                        alt="step-icon"
                    >
                    {step.name}
                </box>
            {/each}
        </div>
        <svelte:component this={creationSteps[selectedStepIndex].component} bind:characterTemplate={characterTemplate}/>
        <dialog-buttons class="quick-create-buttons">
            <SimpleButton value='Cancel' icon="close" onClickFn={() => closeDialog()}></SimpleButton>
            <SimpleButton value='Create' icon='create' type='green' onClickFn={() => createCharacter(characterTemplate)}></SimpleButton>
        </dialog-buttons>
    </dialog-content>
</Dialog>

<style>

    dialog-content {
        height: 100%;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr; 
        grid-template-rows: 5fr 5fr 1fr;
        gap: 1em; 
        grid-template-areas: 
            "creation-steps step-detail step-detail step-detail"
            "creation-steps step-detail step-detail step-detail"
            "dialog-buttons dialog-buttons dialog-buttons dialog-buttons";
    }

    dialog-buttons { grid-area: dialog-buttons;
        display: flex;
        justify-content: center;
        gap: 1em;
    }

    :global(dialog-buttons.quick-create-buttons simple-button) {
        max-width: 25%;
    }

    .creation-steps-list { grid-area: creation-steps; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1em;
    }

    .creation-step-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5em;

        font-family: Quicksand;
        font-size: x-large;
        font-weight: 500;
        text-transform: uppercase;
        padding: 0.6em 0.3em;
        cursor: pointer;
        transition: all .2s ease-in-out;
    }

    .creation-step-item:hover {
        transform: scale(1.04);
        background-color: #303036;
    }

    .creation-step-item:active {
        background-color: #4D3E3D;
    }

    .selected {
        transform: scale(1.04) !important;
        background-color: #C78B77 !important;
    }

    .creation-step-item img {
        height: 1em;
        width: 1em;
    }

</style>