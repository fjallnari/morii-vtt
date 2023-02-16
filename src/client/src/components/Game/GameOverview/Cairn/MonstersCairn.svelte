<script lang="ts">
    import Svelecte from "svelecte/src/Svelecte.svelte";
    import axios from "axios";
    import Icon from "@iconify/svelte";
    import { params } from "svelte-spa-router";
    import { user } from "../../../../stores";
    import SimpleButton from "../../../SimpleButton.svelte";
    import SimpleProgressCircle from "../../../SimpleProgressCircle.svelte";
    import type MonsterDataCairn from "../../../../interfaces/Cairn/MonsterDataCairn";
    import type CairnData from "../../../../interfaces/Cairn/CairnData";
    import MonsterDetailCairn from "./MonsterDetailCairn.svelte";

    export let cairn: CairnData;

    let monsterChosenSimple: { id: string, name: string } = undefined;
    let monsterChosenObj: MonsterDataCairn = undefined;

    // returns either array of simple id/name pairs of all monsters, or an array with single detailed monster
    const getMonsterData = async (monsterID: string = '') => {
        try {
            const response = await axios.get(`/api/monsters/cairn/${monsterID}`);
            return response.data;
        }
        catch (err) {
            console.log(err); 
        }
        return [];
    }

    const addMonster = async (monsterTemplate = {}) => {
		try {
            const response = await axios.post('/api/add-monster', {
                campaignID: $params.id,
                monsterTemplate: monsterTemplate
            });            

            const newMonster = response.data.monster;
            user.set(Object.assign($user, { 
                gameData: Object.assign($user.gameData, {
                    cairn: Object.assign($user.gameData.cairn, {
                        monsters: $user.gameData.cairn.monsters.concat([newMonster])
                    })
                })
            }));

            monsterChosenObj = newMonster;
            monsterChosenSimple = undefined;
            return newMonster;
		}
		catch (err) {
            console.log(err);
		}
	}
    
    $: if (monsterChosenSimple && monsterChosenSimple.id !== monsterChosenObj?.id) {
        monsterChosenObj = undefined;
        getMonsterData(monsterChosenSimple.id).then(
            monsterData => monsterChosenObj = monsterData
        );
    }

    $: if (!monsterChosenSimple && !monsterChosenObj?.is_custom) {
        monsterChosenObj = undefined;
    }

    const viewFavoriteMonster = (monsterToView: MonsterDataCairn) => {
        monsterChosenSimple = undefined;
        monsterChosenObj = monsterToView;
    }

    const viewRandomMonster = () => {
        monsterChosenObj = undefined;
        monsterChosenSimple = cairn.monsters_SRD.random();  
    }

</script>


<tab-container>
    <monsters-content>
        <div class="add-srd-monster">
            <h3>Monsters</h3>
            <Svelecte 
                options={cairn.monsters_SRD}
                valueAsObject
                clearable
                placeholder='All SRD monsters'
                bind:value={monsterChosenSimple}>
            </Svelecte>
        </div>

        <div class="monster-menu">
            <SimpleButton value='Add custom' icon="mdi:notebook-edit" onClickFn={() => addMonster()}></SimpleButton>
        </div>

        <div class="favorites">
            <div class="favorites-header">
                <Icon class="big-icon" icon="material-symbols:star-rounded" color="var(--clr-icon-owner)"/>
                <h4>Favorites & Custom</h4>
            </div>
            <div class="favorites-list">
                {#if $user && $user?.gameData?.cairn.monsters && $user?.gameData?.cairn.monsters.length !== 0}
                    {#each $user?.gameData?.cairn.monsters as favMonster}
                        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                        <box class="fav-monster-item {favMonster.id === monsterChosenObj?.id ? 'selected' : ''}"
                            on:click={() => viewFavoriteMonster(favMonster)} on:keyup={() => {}}
                            tabindex="0"
                        >
                            <div class="fav-monster-source">
                                {#if favMonster?.source === "srd"}
                                    <Icon class="big-icon" icon="material-symbols:star-rounded" />
                                {:else}
                                    <Icon class="big-icon" icon="mdi:notebook" />
                                {/if}
                            </div>
                            <div class="fav-monster-name">{favMonster.name}</div>
                            <div class="fav-monster-drag">
                                <Icon class="big-icon" icon="material-symbols:drag-indicator" />
                            </div>
                        </box>
                    {/each}
                {:else}
                    <p>No favorite monsters.</p>
                {/if}
            </div>
        </div>

        {#if monsterChosenObj}
        <MonsterDetailCairn bind:monster={monsterChosenObj} bind:monsterChosenObj={monsterChosenObj} addMonster={addMonster} />
        {:else}
            <div class="placeholder-no-monster">
                {#if monsterChosenSimple && !monsterChosenObj}
                    <SimpleProgressCircle></SimpleProgressCircle>
                    <div>Loading {monsterChosenSimple.name}...</div>
                {:else}
                    <div>Choose a monster to view or </div>
                    <SimpleButton value='View random monster' icon='mdi:dice' type='primary' onClickFn={() => viewRandomMonster()}></SimpleButton>
                {/if}
            </div>
        {/if}
    </monsters-content>
</tab-container>

<style>
    monsters-content {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1.5fr 1fr 1fr 1fr 1fr 1fr;
        gap: 1em;
        overflow: hidden;
        grid-template-areas: 
            "add-srd-monster add-srd-monster add-srd-monster monster-detail monster-detail monster-detail monster-detail"
            "monster-menu monster-menu monster-menu monster-detail monster-detail monster-detail monster-detail"
            "favorites favorites favorites monster-detail monster-detail monster-detail monster-detail"
            "favorites favorites favorites monster-detail monster-detail monster-detail monster-detail"
            "favorites favorites favorites monster-detail monster-detail monster-detail monster-detail"
            "favorites favorites favorites monster-detail monster-detail monster-detail monster-detail"; 
    }

    h3 {
        font-family: Quicksand;
        font-weight: 100;
        text-transform: uppercase;
    }

    .add-srd-monster { grid-area: add-srd-monster; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0em 2em;
        font-size: 1.2em;
    }

    .monster-menu { grid-area: monster-menu; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.4em;
        gap: 0.5em;
    }
    
    :global(.monster-menu > simple-button) {
        width: 90%;
    }

    .favorites { grid-area: favorites; 
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        height: 95%;
        margin-bottom: 4px;
    }

    .favorites-header {
        display: flex; 
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        padding: 0.5em;
    }

    .favorites-header h4 {
        font-weight: var(--semi-bold);
        font-size: 1.2em;
        font-family: Athiti;
        text-transform: uppercase;
        margin: 0;        
    }

    .favorites-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.4em;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        scrollbar-width: thin;
        padding-bottom: 4px;
    }

    .fav-monster-item {
        display: grid; 
        grid-template-columns: 1fr 5fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr; 
        gap: 0.5em;
        padding: 0.4em 0em;
        width: 90%;
        cursor: pointer;
        background-color: var(--clr-box-bg-light);
        grid-template-areas: 
            "fav-monster-source fav-monster-name fav-monster-drag"
            "fav-monster-source fav-monster-name fav-monster-drag"
            "fav-monster-source fav-monster-name fav-monster-drag"; 
    }

    .fav-monster-item.selected {
        background-color: var(--clr-accent-dark);
    }

    .fav-monster-item > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .fav-monster-drag { grid-area: fav-monster-drag; }

    .fav-monster-name { grid-area: fav-monster-name; 
        font-size: 1.2em;
    }

    .fav-monster-source { grid-area: fav-monster-source; 
        font-family: Athiti;
        font-weight: var(--semi-bold);
    }

    .placeholder-no-monster { grid-area: monster-detail;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
        font-family: Athiti;
        font-size: 1.4em;
        font-weight: 400;
    }

    :global(.placeholder-no-monster simple-button) {
        width: fit-content;
        padding: 0.2em 1em;
    }

</style>