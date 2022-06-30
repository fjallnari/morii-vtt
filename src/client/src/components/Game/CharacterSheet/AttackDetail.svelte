<script lang="ts">
    import IconButton, { Icon } from '@smui/icon-button';
    import type { Attack, Character } from '../../../interfaces/Character';
    import { formatModifier, getASModifier, modifyCharacter, sendSkillCheck } from '../../../stores';
    import InPlaceEdit from '../../InPlaceEdit.svelte';
    import { slide, fade } from 'svelte/transition';
    import ABILITY_TAGS from '../../../enum/AbilityTags';
    import SimpleButton from '../../SimpleButton.svelte';

    export let attack: Attack;
    export let character: Character;
    let isOpen = false;

    const getAttackFormula = () => {
        return $formatModifier(
            (attack.atk_ability !== '---' ? ~~$getASModifier(attack.atk_ability) : 0) + ~~attack.atk_bonus + (attack.atk_proficiency ? 1 : 0) * ~~character.prof_bonus
        );
    }

    //! the duplicate versatile_active is here only for reactivity of the die shown
    // pretty dirty workaround, should replace if something better shows up
    const getDmgDie = (versatile_active = attack.versatile_active) => {
        // considers versatile die
        return versatile_active && attack.versatile_die ? attack.versatile_die : (attack.dmg_die ? attack.dmg_die : 'NdX');
    }

    const getUnbiasedModifier = (abilityTag: string) => {
        return (abilityTag !== '---' ? ~~$getASModifier(abilityTag) : 0);
    } 

    const getDmgModifier = (abilityTag: string) => {
        return getUnbiasedModifier(abilityTag) + ~~attack.dmg_bonus;
    }

    const getDmgFormula = (abilityTag: string = attack.dmg_ability) => {
        const dmgModifier = getDmgModifier(abilityTag);
        return dmgModifier === 0 ? '' : `${$formatModifier(dmgModifier, 'always').split('').join(' ')}`;
    }

    const deleteAttack = () => {
        isOpen = false;
        // changes the 'has_attack' icon near the item if the attack is associated with an item
        if(attack.item_id !== '') {
            Object.assign(character.inventory.find(item => item.id === attack.item_id), { attack_id: '', has_attack: false })
        }
        character.attacks = character.attacks.filter(obj => obj.id !== attack.id);
        $modifyCharacter();
    }


</script>


<box class="attack-info">
    <div class="attack-summary">
        <box class="attack-name">
            <InPlaceEdit bind:value={attack.name} editWidth='8em' editHeight='inherit' on:submit={() => $modifyCharacter()}/>
            {#if isOpen}
                <div class="box-label" transition:slide|local>
                    Attack Name
                </div>
            {/if}
        </box>

        <box class="attack-bonus">
            <sendable on:click={() => $sendSkillCheck(~~getAttackFormula(), `${attack.name.toLowerCase()} | to hit`)}>
                {$formatModifier(getUnbiasedModifier(attack.atk_ability) + ~~attack.atk_bonus + (attack.atk_proficiency ? 1 : 0) * ~~character.prof_bonus)}
            </sendable>
            {#if isOpen}
                <div class="box-label" transition:slide|local>
                    ATK
                </div>
            {/if}
        </box>
        <box class="attack-damage">
            <line-div>
                <sendable class="dmg-formula" 
                    on:click={() => $sendSkillCheck(
                        getDmgModifier(attack.dmg_ability), 
                        `${attack.name.toLowerCase()} | damage${attack.versatile_die ? (attack.versatile_active ? ' | 2-handed': ' | 1-handed') : ''}`, 
                        getDmgDie()
                    )}
                >
                    {`${getDmgDie(attack.versatile_active)} ${getDmgFormula()}`}
                </sendable>
                <justify-filler></justify-filler>
                {#if attack.versatile_die}
                    <img class="skill-prof-icon" 
                        src="../static/{attack.versatile_active ? 'two': 'one'}-handed.svg" 
                        alt="versatile"
                        on:click={() => { attack.versatile_active = !attack.versatile_active; $modifyCharacter() }}
                    >
                {/if}
            </line-div>
            {#if isOpen}
                <div class="box-label" transition:slide|local>
                    Damage
                </div>
            {/if}
        </box>
        <sendable class="attack-menu" on:click={() => { isOpen = !isOpen }}>
            <Icon class="material-icons">{isOpen ? 'menu_open' : 'menu'}</Icon>
        </sendable>
    </div>
    {#if isOpen}
        <div class="details" transition:slide|local>
            <box class="atk-bonus">
                <line-div>
                    <select bind:value={attack.atk_ability} on:change={() => $modifyCharacter()}>
                        <option value="" selected disabled hidden>---</option>
                        {#each ABILITY_TAGS as abilityTag}
                            <option value={abilityTag}>
                                {abilityTag}
                            </option>
                        {/each}
                    </select>
                    +
                    <div class="consistent-in-place-edit">
                        <InPlaceEdit bind:value={attack.atk_bonus} editWidth='2em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
                    </div>
                    +
                    <div class="atk-proficiency">
                        <img class="versatile-icon" 
                            src="../static/{attack.atk_proficiency ? 'checkbox-marked': 'checkbox-blank-outline'}.svg" 
                            alt="atk-prof"
                            on:click={() => { attack.atk_proficiency = !attack.atk_proficiency; $modifyCharacter() }}
                        >
                        <div class="box-label">
                            Proficient
                        </div>
                    </div>
                </line-div>
                <div class="box-label">
                    Attack Bonus
                </div>                
            </box>

            <box class="range">
                <div class="consistent-in-place-edit" style="width: 5em;">
                    <InPlaceEdit bind:value={attack.range} editWidth='5em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
                </div>
                <div class="box-label">
                    Range
                </div> 
            </box>

            <box class="atk-damage">
                <line-div>
                    <div class="consistent-in-place-edit">
                        <InPlaceEdit bind:value={attack.dmg_die} defaultValue='NdX' editWidth='2em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
                    </div>
                    +
                    <select bind:value={attack.dmg_ability} on:change={() => $modifyCharacter()}>
                        <option value="" selected disabled hidden>---</option>
                        {#each ABILITY_TAGS as abilityTag}
                            <option value={abilityTag}>
                                {abilityTag}
                            </option>
                        {/each}
                    </select>
                    +
                    <div class="consistent-in-place-edit">
                        <InPlaceEdit bind:value={attack.dmg_bonus} editWidth='2em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
                    </div>
                </line-div>
                <div class="box-label">
                    Damage Bonus
                </div>                
            </box>

            <box class="damage-type">
                <div class="consistent-in-place-edit" style="width: 5em;">
                    <InPlaceEdit bind:value={attack.dmg_type} editWidth='5em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
                </div>
                <div class="box-label">
                    Type
                </div> 
            </box>

            <box class="versatile">
                <div class="consistent-in-place-edit" style="width: 5em;">
                    <InPlaceEdit bind:value={attack.versatile_die} editWidth='5em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
                </div>
                <div class="box-label">
                    Versatile
                </div> 
            </box>
            <SimpleButton value='Delete' type="delete" onClickFn={deleteAttack}></SimpleButton>
        </div>
    {/if}
</box>


<style>
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    
    .attack-summary {
        width: 100%;
        padding: 0.5em 0em;

        display: grid; 
        grid-template-columns: 2.8fr 1fr 1fr 1fr 0.5fr; 
        grid-template-rows: 1fr; 
        gap: 0.5em 0.5em; 
        grid-template-areas: 
            "attack-name attack-bonus attack-damage attack-damage attack-menu"; 
    }

    .attack-name { grid-area: attack-name;
        margin-left: 0.5em;
    }
    .attack-bonus { grid-area: attack-bonus; }
    .attack-damage { grid-area: attack-damage; }
    .attack-menu { grid-area: attack-menu;
        margin-right: 0.5em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .attack-summary box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.1em;
        padding: 0.2em 0em;
        background-color: var(--secondary-box-background-color);
    }

    div.details {
		padding: 0em 1em 0.5em 1em;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 0.3em;
	}

    div.details > box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.1em;
        padding: 0.2em 0.5em;
        background-color: var(--secondary-box-background-color);
    }

    div.details > box line-div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }

    .attack-damage line-div {
        flex-grow: 1;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }

    .attack-damage line-div .dmg-formula {
        margin-left: auto;
    }

    justify-filler {
        margin-left: auto;
        width: 0;
    }

    .attack-damage line-div img {
        margin-left: -1.7em;
        padding-right: 0.2em;
        display: flex; 
        cursor: pointer;
        width: 2em;     
    } 

    .skill-prof-icon {
        cursor: pointer; 
        height: 1.4em; 
        width: 1.4em;
    }

    .atk-proficiency {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.2em;
    }

    .atk-proficiency img {
        cursor: pointer;
    }

    .consistent-in-place-edit {
        width: 2em;
        height: 1.5em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .range, .versatile {
        flex-grow: 2;
    }

</style>