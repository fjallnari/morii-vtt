<script lang="ts">
    import { slide, fade } from 'svelte/transition';
    import { messageMode, modifyCharacter, ownerSocketID, socket, user } from '../../../../stores';
    import { params } from "svelte-spa-router";
    import type { Character5E, Spell } from '../../../../interfaces/5E/Character5E';
    import InPlaceEdit from '../../../InPlaceEdit.svelte';
    import SimpleButton from '../../../SimpleButton.svelte';
    import Icon from '@iconify/svelte';

    export let spell: Partial<Spell>;
    export let character: Character5E = undefined;
    export let deleteSpellFce: () => void;

    let isOpen: boolean = false;

    const MAGIC_SCHOOLS = [ 'abjuration', 'conjuration', 'divination', 'enchantment', 'evocation', 'illusion', 'necromancy', 'transmutation'];

    $: modifyCharacterFce = character ? $modifyCharacter : () => {};

    // from https://gist.github.com/jlbruno/1535691/db35b4f3af3dcbb42babc01541410f291a8e8fac
    const numToOrdinal = (num: number) => {
        var s = ["th", "st", "nd", "rd"];
        var v = num % 100;
        return num + ( s[(v-20) % 10] || s[v] || s[0]);
    }

    const getMarkdownSpell = () => {
        const spellSubtitle = spell.level === 0 ? `${spell.school} cantrip` : `${numToOrdinal(spell.level)}-level ${spell.school.toLowerCase()}`;
        // yeah, might want to use better system for storing components honestly
        const componentsStr = [spell.components.verbal, spell.components.somatic, spell.components.material].map( 
            (comp, index) => comp ? ['V', 'S', 'M'][index] : '').filter( e => e !== '').join(', ');
        
        const higherLevelsStr = spell.higher_levels !== '' ? `\n\n**At Higher Levels.** ${spell.higher_levels}` : '';

        return `#### ${spell.name}\n*${spellSubtitle}${spell.ritual ? ' (ritual)': ''}*
            \n**Casting time:** ${spell.casting_time}  
            **Range:** ${spell.range}  
            **Components:** ${componentsStr} ${spell.components.material ? `(${spell.components.materials_needed})` : ''}  
            **Duration:** ${spell.concentration ? 'Concentration, up to ': ''} ${spell.duration}  
            \n\n${spell.description}
            ${higherLevelsStr}
        `
    }

    const sendSpell = () => {
        $socket.emit('chat-message', {
            senderInfo: {
                _id: $user._id, 
                username: $user.username,
                settings: $user.settings,
            }, 
            messageText: getMarkdownSpell(),
            skillCheckInfo: {
                characterName: character.name,
                skillName: ''
            },
            gameID: $params.id,
            ownerSocketID: $ownerSocketID,
            messageMode: $messageMode
        });
    }

</script>

<box class="spell-main-container">
    <div class="spell-summary" style='grid-template-areas: "{spell.level === 0 ? 'spell-name': 'spell-prepared'} spell-name {character ? 'spell-send' : 'spell-name'} spell-menu"'>
        {#if spell.level != 0}
            <div class="spell-prepared">
                <sendable on:click={() => { spell.is_prepared = !spell.is_prepared; modifyCharacterFce(); }} on:keyup={() => {}}>
                    <Icon class="big-icon" icon="mdi:{spell.is_prepared ? 'rhombus': 'rhombus-outline'}"/>
                </sendable>
            </div>
        {/if}

        <div class="spell-name">
            <InPlaceEdit bind:value={spell.name} editWidth='15rem' editHeight='1.3rem' on:submit={() => modifyCharacterFce()}/>
        </div>

        {#if character}        
            <sendable class="spell-send" on:click={() => sendSpell()} on:keyup={() => {}}>
                <Icon class="big-icon" icon="material-symbols:send-rounded" />
            </sendable>
        {/if}

        <sendable class="spell-menu" on:click={() => { isOpen = !isOpen }} on:keyup={() => {}}>
            <Icon class="big-icon" icon="material-symbols:{isOpen ? 'menu-open-rounded' : 'menu-rounded'}" />
        </sendable>
    </div>
    {#if isOpen}
        <div class="details" transition:slide|local>
            <div class="single-detail-line">
                <div class="box-label">
                    Casting Time:
                </div>
                <InPlaceEdit bind:value={spell.casting_time} editWidth='5rem' editHeight='1.3rem' on:submit={() => modifyCharacterFce()}/>
                |
                <div class="box-label">
                    Ritual:
                </div>
                <sendable on:click={() => { spell.ritual = !spell.ritual; modifyCharacterFce(); }} on:keyup={() => {}}>
                    <Icon class="big-icon" icon="{spell.ritual ? 'mdi:checkbox-marked': 'mdi:checkbox-blank-outline'}"/>
                </sendable> 
            </div>
            <div class="single-detail-line">
                <div class="box-label">
                    Range:
                </div>
                <InPlaceEdit bind:value={spell.range} editWidth='5rem' editHeight='1.3rem' on:submit={() => modifyCharacterFce()}/>
                |
                <div class="box-label">
                    School:
                </div>
                <select bind:value={spell.school} on:change={() => modifyCharacterFce()}>
                    <option value="" selected disabled hidden>---</option>
                    {#each MAGIC_SCHOOLS as school}
                        <option value={school}>
                            {school.charAt(0).toUpperCase() + school.slice(1)}
                        </option>
                    {/each}
                </select>
            </div>
            <!-- can be switched on and off in settings -->
            {#if !character || (character && character.settings.use_spell_components)}
                <div class="single-detail-line">
                    <div class="box-label">
                        Components:
                    </div>
                    <div class="spell-component">
                        <sendable on:click={() => { spell.components.verbal = !spell.components.verbal; modifyCharacterFce(); }} on:keyup={() => {}}>
                            <Icon class="big-icon" icon="mdi:{spell.components.verbal ? 'checkbox-marked': 'checkbox-blank-outline'}"/>
                        </sendable>
                        V
                    </div>
                    <div class="spell-component">
                        <sendable on:click={() => { spell.components.somatic = !spell.components.somatic; modifyCharacterFce(); }} on:keyup={() => {}}>
                            <Icon class="big-icon" icon="mdi:{spell.components.somatic ? 'checkbox-marked': 'checkbox-blank-outline'}"/>
                        </sendable>
                        S
                    </div>
                    <div class="spell-component">
                        <sendable on:click={() => { spell.components.material = !spell.components.material; modifyCharacterFce(); }} on:keyup={() => {}}>
                            <Icon class="big-icon" icon="mdi:{spell.components.material ? 'checkbox-marked': 'checkbox-blank-outline'}"/>
                        </sendable>
                        M
                    </div>
                </div>
                {#if spell.components.material}
                    <div class="single-detail-line">
                        <div class="box-label">
                            Material:
                        </div>
                        <InPlaceEdit bind:value={spell.components.materials_needed} editWidth='10rem' editHeight='1.3rem' on:submit={() => modifyCharacterFce()}/> 
                    </div>
                {/if}
            {/if}
            <div class="single-detail-line">
                <div class="box-label">
                    Duration:
                </div>
                <InPlaceEdit bind:value={spell.duration} editWidth='5rem' editHeight='1.3rem' on:submit={() => modifyCharacterFce()}/>
                |
                <div class="box-label">
                    Concentration:
                </div>
                <sendable on:click={() => { spell.concentration = !spell.concentration; modifyCharacterFce(); }} on:keyup={() => {}}>
                    <Icon class="big-icon" icon="mdi:{spell.concentration ? 'checkbox-marked': 'checkbox-blank-outline'}"/>
                </sendable>
            </div>
            <textarea on:change={() => modifyCharacterFce()} bind:value={spell.description}></textarea>
            <div class="single-detail-line">
                <div class="box-label">
                    At higher levels:
                </div>
            </div>
            <textarea style="height: 7em;" on:change={() => modifyCharacterFce()} bind:value={spell.higher_levels}></textarea>
            <SimpleButton value='Delete' type="delete" onClickFn={deleteSpellFce}></SimpleButton>
        </div>
    {/if}
</box>

<style>
    box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: var(--clr-box-bg-light);
    }

    textarea {
        height: 10em;
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
        overflow-wrap: anywhere;
    }

    .single-detail-line {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.4em;
    }

    .single-detail-line div {
        font-size: 1em;
        white-space: nowrap;
    }

    .spell-component {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.15em;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #1d1d22;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #757578;
        border: transparent;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #404044;
    }

</style>