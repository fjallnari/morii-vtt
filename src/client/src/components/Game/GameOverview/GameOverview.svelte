<script lang="ts">
    import type { Character } from "../../../interfaces/Character";
    import type GameData from "../../../interfaces/GameData";
    import type InitiativeEntity from "../../../interfaces/InitiativeEntity";
    import type MessageData from "../../../interfaces/MessageData";
    import { selectedCharacter, socket, user } from "../../../stores";
    import { getASModifier } from "../../../util/util";
    import RowBoxWithLabel from "../../RowBoxWithLabel.svelte";
    import CharacterSheetRouter from "../CharacterSheet/CharacterSheetRouter.svelte";
    import CharactersList from "./CharactersList.svelte";
    import CreateNpc from "./CreateNpc.svelte";
    import Initiative from "./Initiative.svelte";
    import NpcList from "./NpcList.svelte";

    export let gameData: GameData;
    let createMenuEnabled: boolean = false;
    let initiative = {
        topID: '',
        order: [] as InitiativeEntity[]
    };

    $socket.on('change-character', (modifiedCharacter: Character) => {
        const index = gameData.characters.findIndex( char => char._id === modifiedCharacter._id);
        gameData.characters[index] = modifiedCharacter;

        if ($selectedCharacter && $selectedCharacter._id === modifiedCharacter._id) {
            selectedCharacter.set(modifiedCharacter);
        }

    });

    $socket.on('add-character', (newCharacter: Character) => {
        gameData.characters = gameData.characters.concat([newCharacter]);
    });

    $socket.on('delete-character', (deletedCharacterID: string, isNPC: boolean) => {
        if (isNPC) {
            gameData.npcs = gameData.npcs.filter(npc => npc._id !== deletedCharacterID);
        }
        else {
            gameData.characters = gameData.characters.filter(character => character._id !== deletedCharacterID);
        }
        selectedCharacter.set(undefined);
    });

    $socket.on('chat-message', (messageData: MessageData) => {
        if(messageData.skillCheckInfo?.skillName === 'initiative') {
            const initiativeEntityObj = {
                id: messageData.skillCheckInfo?.entityID,
                name: messageData.skillCheckInfo?.characterName,
                value: messageData.rollResult?.total.toString()
            }

            let originalEntityObj = initiative.order.find(entity => entity.id === messageData.skillCheckInfo?.entityID);

            if (originalEntityObj) {
                originalEntityObj.value = initiativeEntityObj.value;              
            }
            else {
                initiative.order = initiative.order.concat([initiativeEntityObj]);
            }
        }        
    });

    const getPassivePerception = (character: Character) => {
        return 10 + getASModifier(character.ability_scores, 'WIS') + (character.ability_scores['WIS'].skills.find(skill => skill.name === 'perception').proficiency * ~~character.prof_bonus);
    }

</script>


{#if $selectedCharacter}
    <CharacterSheetRouter bind:character={$selectedCharacter}></CharacterSheetRouter>
{:else}
    <div class="dashboard-container">
        <CharactersList gameData={gameData}></CharactersList>
        <div class="npcs">
            <h3>NPCs</h3>
            {#if createMenuEnabled}
                <CreateNpc gameData={gameData} bind:createMenuEnabled={createMenuEnabled}></CreateNpc>
            {:else}
                <NpcList gameData={gameData} bind:createMenuEnabled={createMenuEnabled}></NpcList>
            {/if}
        </div>
        <div class='passive-perception'>
            <h3>Passive Perception</h3>
            <box class='stats-chip-list'>
                {#if gameData.characters.length > 0}
                    {#each gameData.characters.sort((a, b) => getPassivePerception(a) < getPassivePerception(b) ? 1 : -1) as character}
                        <RowBoxWithLabel label={character.name} boxColor='light' labelClass='overview-label'>
                            {getPassivePerception(character)}
                        </RowBoxWithLabel>
                    {/each}
                {:else}
                    <h3>No characters</h3>
                {/if}
            </box>
        </div>
        <div class='armor-class'>
            <h3>Armor Class</h3>
            <box class='stats-chip-list'>
                {#if gameData.characters.length > 0}
                    {#each gameData.characters.sort((a, b) => a.armor_class < b.armor_class ? 1 : -1) as character}
                        <RowBoxWithLabel label={character.name} boxColor='light' valueWidth='1.5em' labelClass='overview-label' valueBoxStyle='ac'>
                            {!character.armor_class || character.armor_class === '' ? '??': character.armor_class}
                        </RowBoxWithLabel>
                    {/each}
                {:else}
                    <h3>No characters</h3>
                {/if}
            </box>
        </div>
        <div class='initiative'>
            <h3>Initiative</h3>
            <Initiative bind:initiative></Initiative>   
        </div>
    </div>
{/if}


<style>
    .dashboard-container {
        flex: 5;
        background-color: var(--clr-box-bg-dark);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        display: grid; 
        grid-template-columns: 0.05fr 1fr 0.5fr 0.5fr 1fr 0.05fr; 
        grid-template-rows: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 0.2fr); 
        gap: 1em; 
        grid-template-areas: 
            "characters-list characters-list characters-list characters-list characters-list characters-list"
            ". npcs armor-class armor-class initiative ."
            ". npcs passive-perception passive-perception initiative ."
            ". npcs . . initiative .";
    }

    h3 {
        font-family: Quicksand;
        font-weight: 100;
        text-transform: uppercase;
    }

    .dashboard-container > div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .dashboard-container > div > h3 {
        font-size: 1.5em;
    }

    .npcs { grid-area: npcs; 
        margin: 0em 0em 1em 0em;
    }

    .passive-perception { grid-area: passive-perception; }

    .stats-chip-list { 
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 0.5em;
        width: 100%;
        padding: 0.5em 0em;
        overflow-y: auto;
        scrollbar-width: thin;
    }

    .armor-class { grid-area: armor-class; 
        margin: 0em 0em 1em 0em;
    }

    .initiative { grid-area: initiative; 
        margin: 0em 0em 1em 0em;
    }

</style>