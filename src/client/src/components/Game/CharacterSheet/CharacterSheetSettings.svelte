<script lang="ts">
    import CharacterSheetMenu from "./Components/CharSheetMenu.svelte";
    import { selectedCharacter, user, socket, ownerSocketID, userIDPairs } from "../../../stores";
    import Dialog, { Content, Actions } from '@smui/dialog';
    import { params, replace } from "svelte-spa-router";
    import type UserSimple from "../../../interfaces/UserSimple";
    import SimpleButton from "../../SimpleButton.svelte";
    import ANIMALS from "../../../enum/SVGAnimals";
    import axios from "axios";
    import ClassIcon from "../ClassIcon.svelte";
    import GAME_SYSTEMS from "../../../enum/GameSystems";
    import type CharacterAny from "../../../interfaces/CharacterAny";

    export let character: CharacterAny;

    let isDeleteCharDialogOpen: boolean = false;

    const deleteCharacter = async () => {
        try {
            const isNPC = character.playerID === $user.gameData.owner;
            await axios.post('/api/delete-character', {
                campaignID: $params.id,
                characterID: character._id,
                playerID: character.playerID,
                removerID: $user._id,
                isNPC: isNPC
            });
            
            $socket.emit('delete-character', { ownerSocketID: $ownerSocketID, userSocketID: $userIDPairs[character.playerID], characterID: character._id, isNPC: isNPC });
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
        downloadTextFile(JSON.stringify(characterNoIDs, null, 2), `${character.name ? character.name : 'untitled'}-mvtt.json`);
    }
    

    let playerObj: UserSimple = character.playerID === $user.gameData.owner ? {_id: $user._id, username: $user.username, settings: $user.settings}
        : $user.gameData.players.find( player => player._id === character.playerID);

</script>

<tab-container>
    <div class="settings">
        <div class="settings-tab">
            <h4>Character settings</h4>
            <line-div class="class-decal">
                <ClassIcon characterClasses={character.classes}></ClassIcon>
                <p>{character.name && character.name !== '' ? character.name : '???'}</p>
            </line-div>
            <line-div>
                <div>Created by: </div>
                <div class="player-tag">
                    <pfp style="background-color: #{playerObj.settings.pfpColor};">
                        {@html `${ANIMALS[playerObj.settings.pfpID] ?? ANIMALS['default']}`}
                    </pfp>
                    <div>{playerObj.username}</div>
                </div>
            </line-div>
            <svelte:component this={GAME_SYSTEMS[$user?.gameData?.system].specificSettings} bind:character={character}/>
        </div>
        <div class="settings-tab">
            <SimpleButton value='Export sheet to JSON' icon="mdi:code-json" onClickFn={exportToJSON}></SimpleButton>
            <SimpleButton value='Delete Character' 
                icon="material-symbols:delete-sweep" 
                iconWidth='1.25em' 
                type="delete" 
                onClickFn={() => isDeleteCharDialogOpen = true}>
            </SimpleButton>
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
            <SimpleButton value='No' type='primary' onClickFn={() => isDeleteCharDialogOpen = false}></SimpleButton>
            <SimpleButton value='Yes' onClickFn={() => deleteCharacter()}></SimpleButton>
        </Actions>
    </Dialog>
</tab-container>

<style>
    tab-container {
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
        gap: 1em;
    }

    .settings > div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1em;
    }

    h4 {
        text-transform: uppercase;
        font-size: 2em;
        font-weight: 100;
        font-family: Montserrat;
    }

    :global(.settings-tab line-div) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5em;
    }

    :global(.settings-tab line-div > div) {
        font-family: Athiti;
        text-transform: uppercase;
        font-size: 1.2em;
    }

    .class-decal {
        background-color: var(--clr-box-bg-normal);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        padding: 0em 1em 0em 0em;
    }

    .class-decal p {
        font-size: 1.4em;
    }

    :global(.settings-tab simple-button) {
        font-size: 1.25em;
        padding: 0.5em;
        width: fit-content;
    }

    :global(.mdc-dialog__actions) {
        gap: 0.5em;
    }

    :global(.mdc-dialog__actions > simple-button) {
        max-width: 40%;
    }

    .player-tag {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.3em;
        background-color: var(--clr-box-bg-normal);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        padding: 0.4em;
        font-family: Montserrat;
        text-transform: uppercase;
        font-size: 1.2em;
    }

    .player-tag pfp {
        border-radius: 4px;
        width: 2em;
        height: 2em;
    }

</style>