<script lang="ts">
    import Dialog from "@smui/dialog/src/Dialog.svelte";
    import Svelecte from "svelecte/src/Svelecte.svelte";
    import type { SpellShadowdark } from "../../../../interfaces/Shadowdark/SpellShadowdark";
    import { user } from "../../../../stores";
    import SimpleButton from "../../../SimpleButton.svelte";
    import SimpleSnackbar from "../../../SimpleSnackbar.svelte";
    import MarkdownBoxText from "../../MarkdownBoxText.svelte";
    import ClassFilterMenu from "./ClassFilterMenu.svelte";

    export let addSpell: (spellTemplate?: Partial<SpellShadowdark>, closeCreateMenu?: boolean) => void;
    export let createMenuEnabled: boolean;

    let newSpellDialogOpen: boolean = false;
    let newSRDSpell: SpellShadowdark = null;
    let statusSnackbar: SimpleSnackbar;
    let lastAddedSpellName = "";

    const getMarkdownSpell = (spell: SpellShadowdark) => {
        if (!spell) return '';

        return `#### ${spell.name}
            \n---
            \n*Tier ${spell.tier}, ${spell.class.toLowerCase()}*
            \n**Duration:** ${spell.duration}
            \n**Range:** ${spell.range}
            \n${spell.description}`;
    }

    const addSRDSpell = (spell: SpellShadowdark) => {
        if (!spell) return;

        addSpell(spell, false);
        lastAddedSpellName = spell.name;
        statusSnackbar.open();
    }

    const closeSpellDialog = () => {
        createMenuEnabled = false;
        newSpellDialogOpen = false;
    }

    let classFilter = 0;
    let filterClasses = [{ name: 'Any' }, { name: 'Wizard' }, { name: 'Priest' }];

</script>

<div class="add-sd-srd-spell">
    <SimpleButton 
        value='Add from SRD'
        customIcon='spell-add'
        iconWidth='1.5em'
        iconHeight='1.5em'
        type='primary'
        onClickFn={() => newSpellDialogOpen = true}
    />

    <Dialog
        bind:open={newSpellDialogOpen}
        surface$style="padding: 1em 2em; height: 35em; width: 30em;"
    >
        <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
        <div class="new-spell-dialog">
            <div class="sd-title">
                <h3>Add SRD spell</h3>
            </div>
            <div class="sd-content">
                <div class="add-srd-spell">
                    <div class="srd-spell-class-filter">
                        <ClassFilterMenu bind:currentFilter={classFilter} options={filterClasses}></ClassFilterMenu>
                    </div>
                    <Svelecte 
                        options={$user.gameData.shadowdark.spells.filter(spell => !classFilter || spell.class === filterClasses[classFilter].name)}
                        valueAsObject
                        placeholder={`${filterClasses[classFilter].name} spells`}
                        bind:value={newSRDSpell}>
                    </Svelecte>
                </div>
                <box class="sd-srd-spell-display">
                    {#if newSRDSpell}
                        <MarkdownBoxText text={getMarkdownSpell(newSRDSpell)}></MarkdownBoxText>
                    {:else}
                        <div class="no-spell-selected">
                            <h4>No spell selected.</h4>
                        </div>
                    {/if}
                </box>
            </div>
            <div class="sd-buttons">
                <SimpleButton 
                    value='' 
                    icon='mdi:close' 
                    iconClass="big-icon" 
                    type='default' 
                    onClickFn={() => closeSpellDialog()}
                />
                <SimpleButton 
                    value='Add spell' 
                    customIcon='spell-add'
                    iconWidth='1.5em'
                    iconHeight='1.5em'
                    type='primary'  
                    onClickFn={() => addSRDSpell(newSRDSpell)}
                />
            </div>
        </div>
    </Dialog>
</div>

<SimpleSnackbar bind:this={statusSnackbar} label="Succesfully added '{lastAddedSpellName}' to your spells."></SimpleSnackbar>

<style>
    .new-spell-dialog {
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr; 
        grid-template-rows: 0.4fr 2.2fr 0.4fr; 
        gap: 1em; 
        grid-template-areas: 
            "sd-title sd-title sd-title"
            "sd-content sd-content sd-content"
            "sd-buttons sd-buttons sd-buttons";
        min-height: 0;
        height: 100%;
    }

    .sd-title { grid-area: sd-title; 
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sd-title h3 {
        color: var(--clr-text);
        font-size: 1.5em;
        font-family: Montserrat;
        text-transform: uppercase;
        font-weight: 400;
        margin: 0.5em;
    }

    .sd-content { grid-area: sd-content;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5em;
        height: 100%;
    }

    .sd-content h4 {
        font-family: Quicksand;
        font-size: large;
        font-weight: 400;
        margin: 0em;
        align-self: center;
    }

    .sd-buttons { grid-area: sd-buttons;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }

    :global(.sd-buttons simple-button) {
        padding: 0.4rem 0em;
    }

    .add-srd-spell {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 0.5em;
        width: 90%;
        margin-bottom: 1em;
    }

    .sd-srd-spell-display {
        background-color: var(--clr-box-bg-normal);
        padding: 0.5em;
    }

    :global(.sd-srd-spell-display h4) {
        font-family: Quicksand;
        font-weight: 100;
        text-transform: uppercase;
        margin: 0.2em;
    }

</style>