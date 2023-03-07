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
    import MonstersDragAndDrop from "../MonstersDragAndDrop.svelte";

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
            
            if (newMonster.source !== "srd") {
                monsterChosenObj = newMonster;
                monsterChosenSimple = undefined;
            }
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

    const viewFavoriteMonster = (event) => {
        monsterChosenSimple = undefined;
        monsterChosenObj = event.detail.monster;
    }

    const viewRandomMonster = () => {
        monsterChosenObj = undefined;
        monsterChosenSimple = cairn.monsters_SRD.random();  
    }

    const updateMonsters = async (event) => {
        const updatedMonsters = event.detail.updatedMonsters;
        try {
            await axios.post('/api/update-monsters', {
                campaignID: $params.id,
                updatedMonsters: updatedMonsters
            });

            user.set(Object.assign($user, { 
                gameData: Object.assign($user.gameData, {
                    cairn: Object.assign($user.gameData.cairn, {
                        monsters: updatedMonsters
                    })
                })
            }));
		}
		catch (err) {
            console.log(err);
		}
    }

</script>


<monsters-content>
    <div class="monsters">
        <h3 class="title">Monsters</h3>
        <box class="monster-list">
            {#if $user && $user?.gameData?.cairn.monsters}
                <MonstersDragAndDrop 
                    items={$user?.gameData?.cairn.monsters}
                    on:viewmonster={viewFavoriteMonster}
                    on:updatemonsters={updateMonsters}
                    chosenMonsterID={monsterChosenObj?.id}
                />
            {/if}
            <sendable class="add-new-item" on:click={() => addMonster()} on:keyup={() => {}}>
                <Icon class="big-icon" icon="mdi:add" />
            </sendable>
        </box>
    </div>



    <div class="detail-container">
        <h3 class="title">Monster detail</h3>
        {#if monsterChosenObj}
            <MonsterDetailCairn bind:monster={monsterChosenObj} bind:monsterChosenSimple addMonster={addMonster} />
        {:else}
            <div class="placeholder-no-monster">
                {#if monsterChosenSimple && !monsterChosenObj}
                    <SimpleProgressCircle></SimpleProgressCircle>
                    <div>Loading {monsterChosenSimple.name}...</div>
                {:else}
                    <div>Choose a monster to view or </div>
                    <div class="add-cairn-srd-monster">
                        <Svelecte
                            options={cairn.monsters_SRD}
                            valueAsObject
                            clearable
                            placeholder='All SRD monsters'
                            bind:value={monsterChosenSimple}>
                        </Svelecte>
                    </div>
                    <div class="monster-menu">
                        <SimpleButton value='Add custom monster' icon="mdi:notebook-edit" onClickFn={() => addMonster()}></SimpleButton>
                        <SimpleButton value='View random monster' icon='mdi:dice' type='primary' onClickFn={() => viewRandomMonster()}></SimpleButton>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</monsters-content>

<style>
    monsters-content {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr;
        gap: 1em;
        font-family: Quicksand;
        overflow: hidden;
        grid-template-areas:
            "monster-list monster-list monster-list detail-container detail-container detail-container detail-container"
            "monster-list monster-list monster-list detail-container detail-container detail-container detail-container"
            "monster-list monster-list monster-list detail-container detail-container detail-container detail-container"
            "monster-list monster-list monster-list detail-container detail-container detail-container detail-container"
            "monster-list monster-list monster-list detail-container detail-container detail-container detail-container"
            "monster-list monster-list monster-list detail-container detail-container detail-container detail-container"
            "monster-list monster-list monster-list detail-container detail-container detail-container detail-container"; 
    }

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5em;
    }

    h3 {
        font-family: Quicksand;
        font-weight: 100;
        text-transform: uppercase;
    }

    .monsters { grid-area: monster-list; 
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
    }

    .monster-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        padding: 1em 0.2em 4px 0.2em;
        margin-bottom: 1em;
    }

    .add-cairn-srd-monster { grid-area: add-srd-monster; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0em 2em;
        font-size: 1.2em;
    }

    :global(.add-cairn-srd-monster .svelecte){
        max-height: 2em;
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

    .detail-container { grid-area: detail-container;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .placeholder-no-monster {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
        height: 100%;
        width: 100%;
    }

    :global(.placeholder-no-monster simple-button) {
        width: fit-content;
        padding: 0.2em 1em;
    }

</style>