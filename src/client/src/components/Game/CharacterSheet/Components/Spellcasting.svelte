<script lang="ts">
    import ABILITY_TAGS from '../../../../enum/AbilityTags';
    import type { Character } from '../../../../interfaces/Character';
    import { getASModifier, modifyCharacter, sendSkillCheck } from '../../../../stores';
    import SimpleButton from '../../../SimpleButton.svelte';
    import Dialog, { Content, Actions } from '@smui/dialog';

    export let character: Character;
    export let addNewSpell: (spellLevel: number, spellTemplate?: any) => void;

    let isFillSpellDialogOpen: boolean = false;
    let isSummaryValid: boolean = true;
    let fillSpellContent: string = '';
    
    // if the field is empty, show zero
    $: spellSaveDC = ['', '---'].includes(character.spell_ability) ? 0 : 8 + $getASModifier(character.spell_ability) + ~~character.prof_bonus + ~~character.spell_save_dc_bonus;
    $: spellAttackBonus = ['', '---'].includes(character.spell_ability) ? 0 : $getASModifier(character.spell_ability) + ~~character.prof_bonus;

    const validateSpellSummary = () => {
        if (!fillSpellContent) {return null}

        const regex = /^(?<name>[a-zA-Z ]+)\n\n.*\n\n(?:(?<level>[0-9]*)[a-z]*-level (?<school>[a-zA-Z ]*)(?<ritual>\(ritual\))*|(?:(?<school_b>[a-zA-Z]*) cantrip))\n\nCasting Time: (?<cast_time>[0-9a-zA-Z ]+)\nRange: (?<range>.+)\nComponents: (?<components>[VSM, ]+)(?:\((?<mat_comp>[a-zA-Z0-9 ]*)\))*\nDuration: (?<duration>[a-zA-Z0-9, ]*)\n\n(?<description>(.|\n)*)$/gm;

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
            is_ritual: ritual === '(ritual)',
            range: range,
            school: school ? school.toLowerCase() : school_b ? school_b.toLowerCase() : '',
            components: {
                verbal: components.includes('V'),
                somatic: components.includes('S'),
                material: components.includes('M'),
                material_content: mat_comp ? mat_comp : ''
            },
            duration: needsConcentration ? duration.split('Concentration, ')[1] : duration,
            concentration: needsConcentration,
            description: splitDescription[0],
            at_higher_levels: splitDescription.length == 2 ? splitDescription[1] : ''
        }
        
        addNewSpell(~~level, spellTemplate);
        $modifyCharacter();
        isFillSpellDialogOpen = false;
        fillSpellContent = '';
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
        <sendable class="box-label" on:click={() => $sendSkillCheck(spellAttackBonus, 'spell attack')}>
            Spell Attack Bonus
        </sendable>
    </box>
    <div class="fill-spell-button">
        <SimpleButton 
            value='' 
            icon='content_paste_go' 
            type='default' 
            onClickFn={() => { fillSpellContent = ''; isSummaryValid = true; isFillSpellDialogOpen = true } }>
        </SimpleButton>
        <Dialog
            bind:open={isFillSpellDialogOpen}
            aria-labelledby="simple-title"
            surface$style="padding: 0.5em 1em; height: 30em; width: 30em;"
        >
            <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
            <h3 id="simple-title">Create spell from text summary</h3>
            <textarea style="height: 100%;" on:change={() => {isSummaryValid = true}} bind:value={fillSpellContent}></textarea>
            <Actions id="dialog-buttons">
                <SimpleButton value='' icon='close' type='default' onClickFn={() => isFillSpellDialogOpen = false}></SimpleButton>
                <SimpleButton 
                    value='{isSummaryValid ? 'Create' : 'Invalid format'}' 
                    icon='create' 
                    type='{isSummaryValid ? 'green' : 'delete'}'  
                    onClickFn={() => createSpellFromSummary()} 
                    disabled={! isSummaryValid}>
                </SimpleButton>
            </Actions>
        </Dialog>
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

    :global(#dialog-buttons) {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }

    :global(#dialog-buttons simple-button) {
        width: 45% !important;
    }


</style>