<script lang="ts">
    import ABILITY_TAGS from '../../../../enum/AbilityTags';
    import type { Character } from '../../../../interfaces/Character';
    import { getASModifier, modifyCharacter, sendSkillCheck } from '../../../../stores';

    export let character: Character;
    
    // if the field is empty, show zero
    $: spellSaveDC = ['', '---'].includes(character.spell_ability) ? 0 : 8 + $getASModifier(character.spell_ability) + ~~character.prof_bonus + ~~character.spell_save_dc_bonus;
    $: spellAttackBonus = ['', '---'].includes(character.spell_ability) ? 0 : $getASModifier(character.spell_ability) + ~~character.prof_bonus;

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
</div>

<style>
    select {
        font-size: 1.5em;
        background-color: var(--primary-box-background-color);
    }
    .spellcasting-container {  display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        gap: 0.5em;
        grid-auto-flow: row;
        grid-template-areas:
            "spellcasting-ability spell-save-dc spell-attack-bonus";
    }

    .spellcasting-container box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .spellcasting-container box .box-main-text {
        font-size: 1.5em;
        font-weight: bold;
    }

    .spellcasting-ability { grid-area: spellcasting-ability; 
    }

    .spell-save-dc { grid-area: spell-save-dc; }

    .spell-attack-bonus { grid-area: spell-attack-bonus; }


</style>