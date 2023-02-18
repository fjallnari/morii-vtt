<script lang="ts">
    import type { Character5E } from "../../../../interfaces/5E/Character5E";
    import type GameData from "../../../../interfaces/GameData";
    import type MessageData from "../../../../interfaces/MessageData";
    import { socket } from "../../../../stores";
    import { calc5EModifier } from "../../../../util/util";
    import RowBoxWithLabel from "../../../RowBoxWithLabel.svelte";
    import Initiative5E from "./Initiative5E.svelte";

    export let gameData: Omit<GameData, 'characters'> & { characters: Character5E[] };

    $socket.on('chat-message', (messageData: MessageData) => {
        if(messageData.skillCheckInfo?.skillName === 'initiative') {
            const initiativeEntityObj = {
                id: messageData.skillCheckInfo?.entityID,
                name: messageData.skillCheckInfo?.characterName,
                value: messageData.rollResult?.total.toString()
            }

            let originalEntityObj = gameData.initiative.order.find(entity => entity.id === messageData.skillCheckInfo?.entityID);

            if (originalEntityObj) {
                originalEntityObj.value = initiativeEntityObj.value;              
            }
            else {
                gameData.initiative.order = gameData.initiative.order.concat([initiativeEntityObj]);
            }
        }        
    });

    const getPassivePerception = (character: Character5E) => {
        return 10 + calc5EModifier(character.ability_scores['WIS']?.value) + (character.ability_scores['WIS'].skills.find(skill => skill.name === 'perception').proficiency * ~~character.prof_bonus);
    }
</script>

<div class="inner-overview-container">
    <div class='armor-class'>
        <h3>Armor Class</h3>
        <box class='stats-chip-list'>
            {#if gameData.characters.length > 0}
                {#each gameData.characters.sort((a, b) => ~~a.armor_class < ~~b.armor_class ? 1 : -1) as character}
                    <RowBoxWithLabel label={character.name} boxColor='light' valueWidth='1.5em' labelClass='overview-label' valueBoxStyle='ac'>
                        {!character.armor_class || character.armor_class === '' ? '??': character.armor_class}
                    </RowBoxWithLabel>
                {/each}
            {:else}
                <h3>No characters</h3>
            {/if}
        </box>
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
    <div class='initiative'>
        <h3>Initiative</h3>
        <Initiative5E bind:initiative={gameData.initiative}></Initiative5E>
    </div>
</div>

<style>
    .inner-overview-container {
        display: grid;
        grid-template-columns: 1fr 1fr 2fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr;
        gap: 1em;
        height: 100%;
        width: 100%;
        grid-template-areas: 
            "armor-class armor-class initiative"
            "armor-class armor-class initiative"
            "passive-perception passive-perception initiative"
            "passive-perception passive-perception initiative";
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

    h3 {
        font-family: Quicksand;
        font-weight: 100;
        text-transform: uppercase;
    }

    .inner-overview-container  > div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .inner-overview-container  > div > h3 {
        font-size: 1.5em;
    }
</style>