<script lang="ts">
    import Icon from '@iconify/svelte';
    import CircularProgress from '@smui/circular-progress/src/CircularProgress.svelte';
    import Dialog from '@smui/dialog';
    import axios from 'axios';
    import type { Character } from '../../interfaces/Character';
    import { getClassIcon } from '../../util/util';
    import SimpleButton from '../SimpleButton.svelte';

    export let createCharacter: (characterTemplate?: {}) => Promise<void>;
    let open: boolean;
    let selectedCharacter: Character = undefined;

    const getUserCharacters = async () => {
        try {
            const response = await axios.get('/api/characters');
            return response.data.characters as Character[];
		}
		catch (err) {
            console.log(err);      
		}
    }

    const copyCharacterSheet = async () => {
        if (!selectedCharacter) return;
        const {_id, playerID, ...characterTemplate} = selectedCharacter;

        await createCharacter(characterTemplate);
        open = false;
    }

    $: if (!open) {
        selectedCharacter = undefined;
    }

</script>

<SimpleButton value='Copy Existing Sheet' icon="material-symbols:file-copy" onClickFn={() => open = true}></SimpleButton>
<Dialog
    bind:open
    fullscreen
    aria-labelledby="simple-title"
    surface$style="padding: 0.5em 1em; width: 35em;"
>
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <h3 id="simple-title">Copy Existing Sheet</h3>
    <dialog-content>
        <characters-list>
            {#await getUserCharacters()}
                <div id="progress-circle"><CircularProgress style="height: 4em; width: 4em;" indeterminate /></div>
            {:then characters}
                {#if !characters || characters.length === 0}
                    <h4>You have no characters.</h4>
                {:else}
                    {#each characters as character}
                        <box class="character-tag" 
                            on:click={() => selectedCharacter = character} 
                            style="{selectedCharacter === character ? 'background-color: var(--clr-box-bg-light);' : ''}"
                            tabindex='0'
                        >
                            <class-icon>
                                <img id="main-class" src="../static/class-icons/{getClassIcon(character.classes)[0]}.svg" alt="class-icon">
                                {#if getClassIcon(character.classes).length > 2}
                                    <img id="multi-class" src="../static/class-icons/{getClassIcon(character.classes)[2]}.svg" alt="class-icon">
                                {/if}
                            </class-icon>
                            <div class="character-tag-name">
                                {character.name ? character.name : '---'}
                            </div>
                            <selected-checkbox>
                                <Icon class="big-icon" 
                                    icon={selectedCharacter === character ?  "mdi:checkbox-multiple-marked" : "mdi:checkbox-blank-outline"}
                                    width='1.5em' height='1.5em'
                                />
                            </selected-checkbox>
                        </box>
                    {/each}
                {/if}                
            {/await}
        </characters-list>
        <dialog-buttons class="copy-existing">
            <SimpleButton value='Cancel' icon="mdi:close" onClickFn={() => open = false}></SimpleButton>
            <SimpleButton value='Copy & Load' icon='mdi:note-plus' type='green' onClickFn={() => copyCharacterSheet()}></SimpleButton>
        </dialog-buttons>
    </dialog-content>
</Dialog>


<style>
    #simple-title {
        font-size: 1.5em;
        font-family: Montserrat;
        text-transform: uppercase;
        font-weight: 400;
    }

    dialog-content {
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 2fr 1fr; 
        gap: 0.5em;
        grid-template-areas: 
            "characters-list characters-list"
            "characters-list characters-list"
            "dialog-buttons dialog-buttons";
        height: 100%;
        max-height: 30em;
    }

    characters-list { grid-area: characters-list;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0.5em;
        overflow-y: auto;
        scrollbar-width: thin;
        height: 100%;
    }

    dialog-buttons { grid-area: dialog-buttons;
        display: flex;
        justify-content: center;
        gap: 0.5em;
    }

    :global(dialog-buttons.copy-existing > simple-button) {
        font-size: 1.5em;
        padding: 0.5em 0.5em !important;
    }

    h4 {
        font-family: Quicksand;
        font-size: large;
        font-weight: 400;
    }

    .character-tag {
        display: grid; 
        grid-template-columns: 1fr 5fr 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: 
            "class-icon name selected-checkbox";
        cursor: pointer;

        transition-duration: 200ms;
        transition-property: color;
    }

    .character-tag:active {
        background-color: #27272B;
        transition-duration: 200ms;
        transition-property: color;        
    }

    .character-tag:hover {
        filter: opacity(0.9);
    }

    class-icon { grid-area: class-icon;
        position: relative;
        border-radius: 25%;
        width: 5em;
        height: 5em;  
    }

    #main-class {
        width: 100%;
        height: 100%;
    }

    #multi-class {
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 3em;
        height: 3em;
    }

    .character-tag-name { grid-area: name;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Quicksand;
        font-size: 1.2em;
    }

    selected-checkbox { grid-area: selected-checkbox;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .checkbox-icon {
        width: 3em;
        height: 3em;
    }

</style>