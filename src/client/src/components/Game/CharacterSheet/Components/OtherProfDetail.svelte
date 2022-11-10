<script lang="ts">
    import { modifyCharacter } from '../../../../stores';
    import { slide, fade } from 'svelte/transition';
    import type { Character, OtherProf } from '../../../../interfaces/Character';
    import InPlaceEdit from '../../../InPlaceEdit.svelte';
    import SimpleButton from '../../../SimpleButton.svelte';
    import Icon from '@iconify/svelte';

    export let other_prof: OtherProf;
    export let character: Character;
    let isOpen: boolean = false;

    const profTypes = [
        { name: 'OTHER', icon: 'mdi:atom' },
        { name: 'ARMOR', icon: 'mdi:shield-half-full' },
        { name: 'WEAPON', icon: 'mdi:sword' },
        { name: 'LANGUAGE', icon: 'mdi:translate' },
        { name: 'INSTRUMENT', icon: 'mdi:music' }
    ];

    const deleteProf = () => {
        character.other_profs = character.other_profs.filter(obj => obj.id !== other_prof.id);
        $modifyCharacter();
    }


</script>

<box class="prof-main-container">
    <div class="prof-summary">
        <sendable class="prof-type" on:click={() => { other_prof.type += 1 + (other_prof.type === 4 ? -5 : 0); $modifyCharacter(); }}>
            <Icon icon={profTypes[other_prof.type]?.icon} />
        </sendable>
        <div class="prof-name">
            <InPlaceEdit bind:value={other_prof.name} editWidth='6em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
        </div>
        <sendable class="prof-menu" on:click={() => { isOpen = !isOpen }}>
            <Icon class="big-icon" icon="material-symbols:{isOpen ? 'menu-open-rounded' : 'menu-rounded'}" />
        </sendable>
    </div>
    {#if isOpen}
        <div class="details" transition:slide|local>
            <textarea on:change={() => $modifyCharacter()} bind:value={other_prof.content}></textarea>
            <SimpleButton value='Delete' type="delete" onClickFn={deleteProf}></SimpleButton>
        </div>
    {/if}
</box>

<style>
    box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 95%;
        background-color: var(--clr-box-bg-light);
    }

    .prof-summary {
        display: grid; 
        grid-template-columns: 1fr 3fr 1fr; 
        grid-template-rows: 1fr; 
        gap: 0.5em; 
        grid-template-areas: 
            "prof-type prof-name prof-menu";

        width: 100%;
        padding: 0.1em 0em;
    }

    .prof-summary > div, .prof-summary > sendable {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .prof-name { grid-area: prof-name; }

    .prof-type { grid-area: prof-type; 
        cursor: pointer; 
        font-size: 1.25em;
    }
    
    .prof-menu { grid-area: prof-menu; }

    div.details {
		padding: 0em 0.5em 0.5em 0.5em;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 0.5em;
    }

    textarea {
        height: 4em;
        padding: 0.2em;
        line-height: 1.2em;
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