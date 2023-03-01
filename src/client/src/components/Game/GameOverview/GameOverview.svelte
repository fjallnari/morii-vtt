<script lang="ts">
    import axios from "axios";
    import { params } from "svelte-spa-router";
    import GAME_SYSTEMS from "../../../enum/GameSystems";
    import type GameData from "../../../interfaces/GameData";
    import { user } from "../../../stores";
    import CharactersList from "./CharactersList.svelte";
    import CreateNpc from "./CreateNpc.svelte";
    import NpcList from "./NpcList.svelte";

    export let gameData: GameData;

    let createMenuEnabled: boolean = gameData?.npcs?.length === 0 ? true : false;

    const updateNpcs = async (event) => {
        const updatedNpcs = event.detail.updatedNpcs;
        try {
            await axios.post('/api/update-npcs', {
                campaignID: $params.id,
                updatedNpcs
            });

            user.set(Object.assign($user, { 
                gameData: Object.assign($user.gameData, {
                    npcs: updatedNpcs
                })
            }));
		}
		catch (err) {
            console.log(err);
		}
    }

</script>


<div class="overview-container">
    <CharactersList gameData={gameData}></CharactersList>
    <div class="npcs">
        <h3>NPCs</h3>
        {#if createMenuEnabled}
            <CreateNpc gameData={gameData} bind:createMenuEnabled={createMenuEnabled}></CreateNpc>
        {:else}
            <NpcList
                bind:gameData={gameData}
                bind:createMenuEnabled={createMenuEnabled}
                on:updatenpcs={updateNpcs}
            />
        {/if}
    </div>
    <div class="inner-views">
        <svelte:component this={GAME_SYSTEMS[gameData.system].innerOverview} bind:gameData={gameData} />  
    </div>
</div>


<style>
    .overview-container {
        flex: 5;
        background-color: var(--clr-box-bg-dark);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        display: grid; 
        grid-template-columns: 0.05fr 1fr 0.5fr 0.5fr 1fr 0.05fr; 
        grid-template-rows: minmax(0, 3fr) minmax(0, 2.5fr) minmax(0, 0.5fr) minmax(0, 2.5fr) minmax(0, 0.5fr); 
        gap: 1em; 
        grid-template-areas: 
            "characters-list characters-list characters-list characters-list characters-list characters-list"
            ". npcs inner-views inner-views inner-views ."
            ". npcs inner-views inner-views inner-views ."
            ". npcs inner-views inner-views inner-views ."
            ". npcs inner-views inner-views inner-views .";
    }

    h3 {
        font-family: Quicksand;
        font-weight: 100;
        text-transform: uppercase;
    }

    .overview-container > div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .overview-container > div > h3 {
        font-size: 1.5em;
    }

    .inner-views { grid-area: inner-views;
        
    }

    .npcs { grid-area: npcs;
        margin: 0em 0em 1em 0em;        
    }

</style>