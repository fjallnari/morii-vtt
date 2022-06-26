<script lang="ts">
    import type { Character, Spell } from "../../../interfaces/Character";
    import InPlaceEdit from "../../InPlaceEdit.svelte";
    import { Icon } from '@smui/icon-button';
    import { slide, fade } from 'svelte/transition';
    import { modifyCharacter } from "../../../stores";

    export let spell: Spell;
    export let character: Character;
    let isOpen: boolean = false;

    const deleteSpell = () => {
        character.spells_by_level[spell.level].spells = character.spells_by_level[spell.level].spells.filter(obj => obj.id !== spell.id);
        $modifyCharacter();
    }

</script>

<box class="spell-main-container">
    <div class="spell-summary" style='grid-template-areas: "{spell.level === 0 ? 'spell-name': 'spell-prepared'} spell-name spell-send spell-menu"'>
        {#if spell.level != 0}
            <div class="spell-prepared">
                <img
                    src="../static/rhombus{spell.is_prepared ? '' : '-outline'}.svg" 
                    alt="rhombus"
                    on:click={() => { spell.is_prepared = !spell.is_prepared; $modifyCharacter() }}
                >
            </div>
        {/if}

        <div class="spell-name">
            <InPlaceEdit bind:value={spell.name} editWidth='15rem' editHeight='1.3rem' on:submit={() => $modifyCharacter()}/>
        </div>
        
        <sendable class="spell-send" on:click={() => {}}>
            <Icon class="material-icons" style="font-size: 1.4em;">{'send'}</Icon>
        </sendable>

        <sendable class="spell-menu" on:click={() => { isOpen = !isOpen }}>
            <Icon class="material-icons">{isOpen ? 'menu_open' : 'menu'}</Icon>
        </sendable>
    </div>
    {#if isOpen}
        <div class="details" transition:slide>
            <delete-button on:click={() => deleteSpell()}>Delete</delete-button>
        </div>
    {/if}
</box>

<style>
    box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: var(--secondary-box-background-color);
    }

    img {
        cursor: pointer; 
        height: 1.5em;
        width: 1.5em;
    }

    .spell-summary {
        display: grid; 
        grid-template-columns: 1fr 8fr 1fr 1fr; 
        grid-template-rows: 2fr; 
        gap: 0.5em;
        padding: 0.2em 0em;
    }

    .spell-prepared { grid-area: spell-prepared;  
    }

    .spell-name { grid-area: spell-name; 
        font-size: 1.1em;
    }

    .spell-send { grid-area: spell-send; }

    .spell-menu { grid-area: spell-menu; }

    .spell-summary > div, .spell-summary > sendable {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.details {
		padding: 0.5em 0.5em 0.5em 0.5em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.5em;
    }

</style>