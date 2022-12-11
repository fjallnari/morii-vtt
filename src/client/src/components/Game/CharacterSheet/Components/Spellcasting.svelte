<script lang="ts">
    import ABILITY_TAGS from '../../../../enum/AbilityTags';
    import type { Character } from '../../../../interfaces/Character';
    import { getASModifier, modifyCharacter, sendSkillCheck } from '../../../../stores';
    import SimpleButton from '../../../SimpleButton.svelte';
    import Dialog from '@smui/dialog';
    import Svelecte from 'svelecte/src/Svelecte.svelte';
    import LoadingCircle from '../../../LoadingCircle.svelte';
    import axios from 'axios';
    import SimpleSnackbar from '../../../SimpleSnackbar.svelte';

    export let character: Character;
    export let addNewSpell: (spellLevel: number, spellTemplate?: any) => void;


    let statusSnackbar: SimpleSnackbar;
    let newSpellDialogOpen: boolean = false;
    let isSummaryValid: boolean = true;
    let fillSpellContent: string = '';
    let newSRDSpell = undefined;
    let lastAddedSpellName = "";
    
    // if the field is empty, show zero
    $: spellSaveDC = ['', '---'].includes(character.spell_ability) ? 0 : 8 + $getASModifier(character.spell_ability) + ~~character.prof_bonus + ~~character.spell_save_dc_bonus;
    $: spellAttackBonus = ['', '---'].includes(character.spell_ability) ? 0 : $getASModifier(character.spell_ability) + ~~character.prof_bonus;

    const validateSpellSummary = () => {
        if (!fillSpellContent) {return null}

        const regex = /^(?<name>[a-zA-Z ]+)\n\n.*\n\n(?:(?<level>[0-9]*)[a-z]*-level (?<school>[a-zA-Z ]*)(?<ritual>\(ritual\))*|(?:(?<school_b>[a-zA-Z]*) cantrip))\n\nCasting Time: (?<cast_time>[0-9a-zA-Z ]+)\nRange: (?<range>.+)\nComponents: (?<components>[VSM, ]+)(?:\((?<mat_comp>[a-zA-Z0-9 ,]*)\))*\nDuration: (?<duration>[a-zA-Z0-9, ]*)\n\n(?<description>(.|\n)*)$/gm;

        return regex.exec(fillSpellContent);
    }

    const createSpellFromSummary = () => {
        const matchedGroups = validateSpellSummary();
        if (matchedGroups === null) {
            isSummaryValid = false;
            return;
        }
        
        const { groups: { name, level, school, school_b, ritual, cast_time, range, components, mat_comp, duration, description }} = matchedGroups;        

        const splitDescription = description.split('\n\nAt Higher Levels. ');
        const needsConcentration = duration.includes('Concentration');

        const spellTemplate = {
            name: name,
            level: ~~level,
            casting_time: cast_time,
            ritual: ritual === '(ritual)',
            range: range,
            school: school ? school.toLowerCase() : school_b ? school_b.toLowerCase() : '',
            components: {
                verbal: components.includes('V'),
                somatic: components.includes('S'),
                material: components.includes('M'),
                materials_needed: mat_comp ? mat_comp : ''
            },
            duration: needsConcentration ? duration.split('Concentration, ')[1] : duration,
            concentration: needsConcentration,
            description: splitDescription[0],
            higher_levels: splitDescription.length == 2 ? splitDescription[1] : ''
        }
        
        addNewSpell(~~level, spellTemplate);
        $modifyCharacter();
        newSpellDialogOpen = false;
        fillSpellContent = '';
    }

    const getSRDSPells = async () => {
		try {
			const response = await axios.get(`/api/spells`);
			return response.data.spells;
		}
		catch (err) {}
	}

    $: if (newSRDSpell) {
        lastAddedSpellName = newSRDSpell?.name ?? '???';
        addNewSpell(~~newSRDSpell.level, Object.assign(newSRDSpell, { 
            level: ~~newSRDSpell.level, 
            concentration: newSRDSpell.duration.includes('Concentration'),
            components: Object.assign(newSRDSpell.components, { materials_needed: newSRDSpell.components.material ? newSRDSpell.components.materials_needed.toString() : '' })
        }));
        $modifyCharacter();
        statusSnackbar.open("success");
        newSRDSpell = undefined;
    }

</script>

<div class="spellcasting-container">
    <box class="spellcasting-ability">
        <select class="box-main-text" bind:value={character.spell_ability} on:change={() => $modifyCharacter()}>
            <option value="" selected disabled hidden>---</option>
            {#each ABILITY_TAGS as abilityTag}
                <option value={abilityTag}>
                    {abilityTag}
                </option>
            {/each}
        </select>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Spellcasting Ability
        </div>
    </box>
    <box class="spell-save-dc">
        <div class="box-main-text">
            {spellSaveDC}        
        </div>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Spell Save DC
        </div>
    </box>
    <box class="spell-attack-bonus">
        <div class="box-main-text">
            {spellAttackBonus}
        </div>    
        <div class="box-justify-filler"></div>
        <sendable class="box-label" on:click={() => $sendSkillCheck(spellAttackBonus, 'spell attack', character.name)} on:keyup={() => {}}>
            Spell Attack Bonus
        </sendable>
    </box>
    <div class="fill-spell-button">
        <SimpleButton 
            value='' 
            customIcon='spell-add'
            type='primary' 
            onClickFn={() => { newSpellDialogOpen = true } }>
        </SimpleButton>

        <Dialog
            bind:open={newSpellDialogOpen}
            surface$style="padding: 1em 2em; height: 35em; width: 30em;"
        >
            {#await getSRDSPells()}
                <div class="loading-container">
                    <LoadingCircle/>
                    <SimpleButton value="Cancel" icon="mdi:close" onClickFn={() => newSpellDialogOpen = false}></SimpleButton>
                </div>
            {:then srdSpells}
            <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
                <div class="new-spell-dialog">
                    <div class="sd-title">
                        <h3>Add new spell</h3>
                    </div>
                    <div class="sd-content">
                        <div class="add-srd-spell">
                            <h4>Add SRD Spell:</h4>
                            <Svelecte 
                                options={srdSpells}
                                valueAsObject
                                placeholder='All SRD spells'
                                bind:value={newSRDSpell}>
                            </Svelecte>
                        </div>
                        <h4><span style="color: var(--clr-accent-light);">OR</span> Paste & Create spell from wiki summary:</h4>
                        <textarea style="height: 100%;" on:change={() => {isSummaryValid = true}} bind:value={fillSpellContent}></textarea>
                    </div>
                    <div class="sd-buttons">
                        <SimpleButton value='' icon='mdi:close' iconClass="big-icon" type='default' onClickFn={() => newSpellDialogOpen = false}></SimpleButton>
                        <SimpleButton 
                            value='{isSummaryValid ? 'Create' : 'Invalid format'}' 
                            icon='mdi:create'
                            iconClass="big-icon"
                            type='{isSummaryValid ? 'green' : 'delete'}'  
                            onClickFn={() => createSpellFromSummary()} 
                            disabled={! isSummaryValid}>
                        </SimpleButton>
                    </div>
                </div>
            {/await}
        </Dialog>

        <SimpleSnackbar bind:this={statusSnackbar} label="Succesfully added '{lastAddedSpellName}' to your spells."></SimpleSnackbar>
    </div>
</div>

<style>
    select {
        font-size: 1.5em;
        background-color: var(--clr-box-bg-normal);
    }
    .spellcasting-container {  display: grid;
        grid-template-columns: 1fr 1fr 1fr 0.5fr;
        grid-template-rows: 1fr;
        gap: 0.5em;
        grid-auto-flow: row;
        grid-template-areas:
            "spellcasting-ability spell-save-dc spell-attack-bonus fill-spell-button";
    }

    .spellcasting-container box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .spellcasting-container box .box-main-text {
        font-size: 1.5em;
        font-weight: var(--semi-bold);
    }

    .spellcasting-ability { grid-area: spellcasting-ability; 
    }

    .spell-save-dc { grid-area: spell-save-dc; }

    .spell-attack-bonus { grid-area: spell-attack-bonus; }

    .fill-spell-button { grid-area: fill-spell-button;
        display: flex;
    }

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

    .new-spell-dialog > div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }

    .sd-title { grid-area: sd-title; }

    .sd-title h3 {
        color: var(--clr-text);
        font-size: 1.5em;
        font-family: Montserrat;
        text-transform: uppercase;
        font-weight: 400;
        margin: 0.5em;
    }

    .sd-content { grid-area: sd-content; 
        flex-direction: column;
    }

    .sd-content h4 {
        font-family: Quicksand;
        font-size: large;
        font-weight: 400;
        margin: 0em;
        align-self: center;
    }

    .sd-buttons { grid-area: sd-buttons; 
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

    .loading-container {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1em;
    }

    :global(.loading-container > simple-button) {
        max-width: 5em;
        padding: 0.2em 0.4em;
    }

</style>