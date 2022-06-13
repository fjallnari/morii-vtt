<script lang="ts">
    import IconButton, { Icon } from '@smui/icon-button';
    import type { Attack, Character } from '../../../interfaces/Character';
    import { formatModifier, getASModifier, modifyCharacter } from '../../../stores';
    import InPlaceEdit from '../../InPlaceEdit.svelte';
    import { slide, fade } from 'svelte/transition';
    import Select, { Option } from '@smui/select';

    export let attack: Attack;
    export let character: Character;
    let isOpen = false;

    const abilityTags = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
    


</script>


<box class="attack-info">
    <div class="attack-summary">
        <box class="attack-name">
            <InPlaceEdit bind:value={attack.name} editWidth='8em' editHeight='inherit' on:submit={() => $modifyCharacter()}/>
            {#if isOpen}
                <div class="box-label" transition:slide>
                    Attack Name
                </div>
            {/if}
        </box>

        <box class="attack-bonus">
            {$formatModifier(~~$getASModifier(attack.atk_ability) + ~~attack.atk_bonus + (attack.atk_proficiency ? 1 : 0) * ~~character.prof_bonus)}
            {#if isOpen}
                <div class="box-label" transition:slide>
                    ATK
                </div>
            {/if}
        </box>
        <box class="attack-damage">
            1d6 + 1
            {#if isOpen}
                <div class="box-label" transition:slide>
                    Damage
                </div>
            {/if}
        </box>
        <sendable class="attack-menu" on:click={() => { isOpen = !isOpen }}>
            <Icon class="material-icons">{isOpen ? 'menu_open' : 'menu'}</Icon>
        </sendable>
    </div>
    {#if isOpen}
        <div class="details" transition:slide>
            <box class="atk-bonus">
                <line-div>
                    <div class="consistent-in-place-edit">
                        <InPlaceEdit bind:value={attack.atk_ability} editWidth='2em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
                    </div>
                    +
                    <div class="consistent-in-place-edit">
                        <InPlaceEdit bind:value={attack.atk_bonus} editWidth='2em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
                    </div>
                    +
                    <div class="atk-proficiency">
                        <img class="skill-prof-icon" 
                            src="../static/{attack.atk_proficiency ? 'checkbox-marked': 'checkbox-blank-outline'}.svg" 
                            alt="rhombus"
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
        </div>
    {/if}
</box>


<style>
    .attack-summary {
        width: 100%;
        padding: 0.5em 0em;

        display: grid; 
        grid-template-columns: 3fr 1fr 1fr 1fr 0.5fr; 
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
        background-color: #303036;
    }

    div.details {
		padding: 0em 1em 0.5em 1em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.2em;
	}

    div.details > box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.2em;
        padding: 0.2em 0.5em;
        background-color: #303036;
    }

    div.details > box line-div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1em;
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

    .consistent-in-place-edit {
        width: 2em;
        height: 1.5em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>