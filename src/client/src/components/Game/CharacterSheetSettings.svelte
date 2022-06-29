<script lang="ts">
    import type { Character } from "../../interfaces/Character";
    import CharacterSheetMenu from "./CharacterSheetMenu.svelte";
    import { modifyCharacter, selectedCharacter } from "../../stores";
    import Button, { Label, Icon } from '@smui/button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import { params, push, replace } from "svelte-spa-router";
    import { accessToken, user, socket } from '../../stores';
    import axios from "axios";

    export let character: Character;

    let isDeleteCharDialogOpen: boolean = false;

    const deleteCharacter = async () => {
        try {
            const response = await axios.post('/api/delete-character', {
                campaignID: $params.id,
                characterID: character._id,
            });

            $socket.emit('delete-character', { modifierID: $user._id, roomID: $params.id, character: character });
            selectedCharacter.set(undefined);
            character = undefined;
		}
		catch {
            replace('/');
		}
    }
    
    // from https://stackoverflow.com/a/50772599/13222140
    const downloadTextFile = (text: string, name: string) => {
        const a = document.createElement('a');
        const type = name.split(".").pop();
        a.href = URL.createObjectURL( new Blob([text], { type:`text/${type === "txt" ? "plain" : type}` }) );
        a.download = name;
        a.click();
    }

    const exportToJSON = () => {
        const characterNoIDs = (({ _id, playerID, ...other }) => other)(character);
        downloadTextFile(JSON.stringify(characterNoIDs, null, 2), `${character.name ? character.name : 'untitled'}-msvtt.json`);
    }

</script>

<tab-container>
    <div class="settings">
        <div class="settings-tab">
            <h4>General</h4>
            <line-div>
                <div>Show Encumbrance</div>
                <img class="use-encumbrance-icon" 
                    src="../static/{character.settings.use_encumbrance ? 'checkbox-marked': 'checkbox-blank-outline'}.svg" 
                    alt="checkbox-icon"
                    on:click={() => { character.settings.use_encumbrance = !character.settings.use_encumbrance; $modifyCharacter(); }}
                >
            </line-div>
            <line-div>
                <div>Show Spell Components</div>
                <img class="use-encumbrance-icon" 
                    src="../static/{character.settings.use_spell_components ? 'checkbox-marked': 'checkbox-blank-outline'}.svg" 
                    alt="checkbox-icon"
                    on:click={() => { character.settings.use_spell_components = !character.settings.use_spell_components; $modifyCharacter(); }}
                >
            </line-div>
        </div>
        <div class="settings-tab">
            <h4>CRUD Settings</h4>
            <delete-button id="export-button" on:click={() => exportToJSON()}>
                <Icon class="material-icons">data_object</Icon>
                Export sheet to JSON
            </delete-button>
            <delete-button on:click={() => isDeleteCharDialogOpen = true}>
                <Icon class="material-icons">delete_sweep</Icon>
                Delete Character
            </delete-button>
        </div>
    </div>
    <CharacterSheetMenu></CharacterSheetMenu>
    <Dialog
        bind:open={isDeleteCharDialogOpen}
        aria-labelledby="simple-title"
        aria-describedby="simple-content"
    >
        <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
        <h3 id="simple-title">Delete character</h3>
        <Content>Are you sure you want to delete <strong>{character.name}</strong>?<br><em>This is irreversible.</em></Content>
        <Actions>
            <Button variant="raised" on:click={() => isDeleteCharDialogOpen = false}>
                <Label>No</Label>
            </Button>
            <Button color="secondary" on:click={() => deleteCharacter()}>
                <Label>Yes</Label>
            </Button>
        </Actions>
    </Dialog>
</tab-container>

<style>
    tab-container {
        height: inherit;
        flex: 5;

        background-color: #212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        
        font-weight: 100;
        font-family: Quicksand;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr; 
        gap: 0px 0px; 
        grid-template-areas: 
            "settings settings settings"
            "settings settings settings"
            "settings settings settings"
            "settings settings settings"
            "settings settings settings"
            "settings settings settings"
            "settings settings settings"
            ". char-sheet-menu ."; 
    }
    
    .settings { grid-area: settings; 
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 2em;
    }

    .settings > div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1em;
    }

    line-div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5em;
    }

    line-div div {
        font-family: Athiti;
        text-transform: uppercase;
        font-size: 1.2em;
    }

    img {
        cursor: pointer; 
        height: 1.5rem;
        width: 1.5rem;
    }

    h4 {
        color: #FCF7F8;
        text-transform: uppercase;
        font-size: 2em;
        font-weight: 100;
        font-family: Montserrat;
    }

    delete-button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        font-size: 1.25em;
        padding: 0.5em 0em;
    }

    #export-button {
        background-color: var(--secondary-box-background-color);
    }

</style>