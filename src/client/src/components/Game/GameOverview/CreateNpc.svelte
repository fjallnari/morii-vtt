<script lang="ts">
    import type GameData from "../../../interfaces/GameData";
    import axios from 'axios';
    import { params } from "svelte-spa-router";
    import SimpleButton from "../../SimpleButton.svelte";
    import GAME_SYSTEMS from "../../../enum/GameSystems";

    export let gameData: GameData;
    export let createMenuEnabled: boolean;

    const createNPC = async (characterTemplate = {}) => {
		try {
            const response = await axios.post('/api/create-npc', {
                campaignID: $params.id,
                characterTemplate: characterTemplate
            });

            const newNpc = response.data.characterInfo;
            gameData.npcs = gameData.npcs.concat([newNpc]);
            createMenuEnabled = false;
		}
		catch (err) {
            console.log(err);
		}
	}
</script>

<div class="create-npc-container">
    <SimpleButton value='Create New' type="green" icon="material-symbols:note-add" onClickFn={createNPC}></SimpleButton>

    {#each GAME_SYSTEMS[gameData.system].creationOptions as creationOption}
        <svelte:component this={creationOption} createCharacter={createNPC} />
    {/each}

    <SimpleButton value='' icon="mdi:close" onClickFn={() => {createMenuEnabled = false}}></SimpleButton>
</div>

<style>
    .create-npc-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5em;
        width: 95%;
    }

    :global(.create-npc-container > simple-button) {
        font-size: 1.5em;
        padding: 0.5em 0.5em !important;
    }

</style>