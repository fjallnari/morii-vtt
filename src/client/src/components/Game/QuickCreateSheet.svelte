<script lang="ts">
    import type { Character } from "../../interfaces/Character";
    import SimpleButton from "../SimpleButton.svelte";
    import Dialog from '@smui/dialog';
    import CircularProgress from '@smui/circular-progress';
    import axios from "axios";
    import type QuickCreateData from "../../interfaces/QuickCreateData";
    import { Icon } from '@smui/button';
    import type QuickCreateCharacterParts from "../../interfaces/QuickCreateCharacterParts";
    import StepDetailRace from "./StepDetailRace.svelte";
    import StepDetailClass from "./StepDetailClass.svelte";
    import StepDetailSpellcasting from "./StepDetailSpellcasting.svelte";

    export let createCharacter: (characterTemplate?: {}) => Promise<void>;
    
    let open: boolean = true;
    let selectedStepIndex: number = 0;
    let characterTemplate: Partial<Character> = {};
    let characterParts: Partial<QuickCreateCharacterParts> = {};

    let creationSteps = [
        { name: 'Race', icon: 'account-supervisor', filled_in: false, component: StepDetailRace },
        { name: 'Class', icon: 'arrow-projectile-multiple', filled_in: false, component: StepDetailClass },
        { name: 'Spellcasting', icon: 'fire', filled_in: false, component: StepDetailSpellcasting },
        { name: 'Ability Scores', icon: 'counter', filled_in: false },
        { name: 'Background', icon: 'sprout', filled_in: false },
        { name: 'Summary', icon: 'clipboard-text', filled_in: false },
    ]

    const closeDialog = () => {
        characterParts = {};
        selectedStepIndex = 0;
        open = false;
    }
    
    // open is here just so the quick create fully resets for each open of the dialog
    // quick and dirty way to trigger the reactivity
    const loadQuickCreateData = async (open: boolean) => {
        try {
            const response = await axios.get('/api/quick-create-data');
            const { characterSkeleton, ...quickCreateData } = response.data;

            characterTemplate = characterSkeleton;
            return quickCreateData as QuickCreateData;
		}
		catch (err) {
            console.log(err); 
		}
    }

    const assembleCharacterSheet = () => {
        // TODO: process character sheet
        console.log(characterParts);
                
        createCharacter(characterTemplate);
    }

    $ : characterParts.spellcasting = characterParts.class && typeof characterParts.class.spellcasting !== 'undefined';

</script>

<SimpleButton value='Quick-Create' icon="electric_bolt" type="primary" onClickFn={() => open = true}></SimpleButton>
<Dialog
    bind:open
    fullscreen
    scrimClickAction=""
    escapeKeyAction=""
    aria-labelledby="simple-title"
    surface$style="padding: 1em 1em; width: 80vw !important;"
>
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <h3 id="simple-title">Quick-Create</h3>
    {#await loadQuickCreateData(open)}
        <div id="progress-circle"><CircularProgress style="height: 4em; width: 4em;" indeterminate /></div>
    {:then quickCreateData}
        <dialog-content>
            <div class="creation-steps-list">
                {#each creationSteps as step, index}
                    <box class="creation-step-item {index === selectedStepIndex ? 'selected': ''}" on:click={() => {selectedStepIndex = index}} tabindex='0'>
                        <img class="step-icon"  
                            src="../static/{step.icon}.svg" 
                            alt="step-icon"
                        >
                        {step.name}
                        {#if characterParts[`${step.name.toLowerCase()}`]}
                            <Icon id="filled-in-icon" class="material-icons">done</Icon>
                        {/if}
                    </box>
                {/each}
            </div>

            <svelte:component 
                this={creationSteps[selectedStepIndex].component}
                quickCreateData={quickCreateData}
                bind:characterParts={characterParts}
            />

            <dialog-buttons class="quick-create-buttons">
                <SimpleButton value='Cancel' icon="close" onClickFn={() => closeDialog()}></SimpleButton>
                <SimpleButton value='Create' icon='create' type='green' onClickFn={() => assembleCharacterSheet()}></SimpleButton>
            </dialog-buttons>
        </dialog-content>
    {/await}
</Dialog>

<style>

    dialog-content {
        height: calc(80vh - 2.5em);
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr; 
        grid-template-rows: 5fr 5fr 1fr;
        gap: 1em; 
        grid-template-areas: 
            "creation-steps step-detail step-detail step-detail"
            "creation-steps step-detail step-detail step-detail"
            "dialog-buttons dialog-buttons dialog-buttons dialog-buttons";
        font-family: Quicksand;
    }

    dialog-buttons { grid-area: dialog-buttons;
        display: flex;
        justify-content: center;
        gap: 1em;
    }

    :global(dialog-buttons.quick-create-buttons simple-button) {
        max-width: 25%;
        font-size: 1.5em;
        padding: 0.5em 0.5em !important;
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
        background-color: var(--clr-box-bg-light);
    }

    .creation-step-item:active {
        background-color: var(--clr-accent-darker);
    }

    .selected {
        transform: scale(1.04) !important;
        background-color: var(--clr-accent-dark) !important;
    }

    .creation-step-item img {
        height: 1em;
        width: 1em;
    }

</style>