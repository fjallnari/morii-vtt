<script lang="ts">
    import SimpleButton from "../../SimpleButton.svelte";
    import Dialog from '@smui/dialog';
    import SimpleProgressCircle from "../../SimpleProgressCircle.svelte";
    import Svelecte from "svelecte/src/Svelecte.svelte";
    import axios from "axios";
    import type MonsterData from "../../../interfaces/MonsterData";
    import MonsterDetail from "./MonsterDetail.svelte";
    import type MonsterSimple from "../../../interfaces/MonsterSimple";
    import Icon from "@iconify/svelte";
    import { capitalize } from "../../../util/util";

    let open: boolean = false;
    let challengeFilterIndex = undefined;
    let typeFilterIndex = undefined;
    let monsterChosenSimple: MonsterSimple = undefined;
    let monsterChosenObj: MonsterData = undefined;

    const closeDialog = () => {
        monsterChosenSimple = undefined;
        monsterChosenObj = undefined;
        challengeFilterIndex = undefined;
        typeFilterIndex = undefined;
        open = false;
    }

    // returns either array of simple id/name pairs of all monsters, or an array with single detailed monster
    const getMonsterData = async (open: boolean, monsterID: string = '') => {
        if (open) {
            try {
                const response = await axios.get(`/api/monsters/${monsterID}`);
                const { monsters } = response.data;

                return monsters;
            }
            catch (err) {
                console.log(err); 
            }
        }
        return [];
    }
    
    $: if (monsterChosenSimple && monsterChosenSimple?.id !== monsterChosenObj?.id) {
        monsterChosenObj = undefined;
        getMonsterData(open, monsterChosenSimple.id).then(
            response => monsterChosenObj = response[0]
        );
    }

    $: if (!monsterChosenSimple) {
        monsterChosenObj = undefined;
    }

    const getCROptions = (monsterData: MonsterSimple[]) => {
        return ['Any CR', ... Array.from(new Set(monsterData.map(monster => monster.cr))).sort((a, b) => {
            if (a.includes('/') && b.includes('/')) {
                return ~~b.split('/')[1] - ~~a.split('/')[1];
            }
            if (a === '0' || b === '0') {
                return a === '0' ? -1 : 1;
            }
            return ~~a - ~~b;
        })]
    }

    const getCreatureTypes = (monsterData: MonsterSimple[]) => {
        return ['Any Type', ... Array.from(new Set(monsterData.map(monster => capitalize(monster.type))))];
    }

    const viewRandomMonster = (monsterData: MonsterSimple[]) => {
        challengeFilterIndex = undefined;
        typeFilterIndex = undefined;
        monsterChosenSimple = monsterData.random();
    }

</script>

<div class="dialog-open-button">
    <SimpleButton value='Monsters' icon='mdi:duck' type='primary' onClickFn={() => open = true}></SimpleButton>
</div>
<Dialog
    bind:open
    fullscreen
    aria-labelledby="simple-title"
    surface$style="padding: 1em 1em; width: 80vw !important;"
>
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <h3 id="simple-title">Monsters</h3>
    {#await getMonsterData(open)}
        <div id="progress-circle">
            <SimpleProgressCircle/>
            <SimpleButton value="Cancel" icon="mdi:close" onClickFn={() => open = false}></SimpleButton>
        </div>
    {:then monsterData}
        <dialog-content>
            <box class="favorites"></box>
            <div class="add-srd-monster">
                <div class="monster-filter">
                    <Icon class="big-icon" icon="mdi:filter-multiple" />
                    <Svelecte 
                        options={getCROptions(monsterData)}
                        placeholder='CR'
                        bind:value={challengeFilterIndex}>
                    </Svelecte>
                    <Svelecte 
                        options={getCreatureTypes(monsterData)}
                        placeholder='Type'
                        bind:value={typeFilterIndex}>
                    </Svelecte> 
                </div>
                <Svelecte 
                    options={monsterData.filter(monster => {
                        const challengeFilter = challengeFilterIndex ? monster.cr === getCROptions(monsterData)[challengeFilterIndex] : true;
                        const typeFilter = typeFilterIndex ? monster.type === getCreatureTypes(monsterData)[typeFilterIndex].toLowerCase() : true;
                        return challengeFilter && typeFilter
                    })}
                    valueAsObject
                    placeholder='All SRD monsters'
                    bind:value={monsterChosenSimple}>
                </Svelecte>
            </div>
            <div class="monster-menu">
                <SimpleButton value='Import' icon="mdi:file-import" onClickFn={() => {}} disabled></SimpleButton>
                <SimpleButton value='Export' icon="mdi:code-json" onClickFn={() => {}} disabled></SimpleButton>
                <SimpleButton value='Cancel' icon="mdi:close" onClickFn={() => closeDialog()}></SimpleButton>
            </div>
            {#if monsterChosenObj}
                <MonsterDetail bind:monster={monsterChosenObj}></MonsterDetail>
            {:else}
                <div class="placeholder-no-monster">
                    {#if monsterChosenSimple && !monsterChosenObj}
                        <SimpleProgressCircle></SimpleProgressCircle>
                        <div>Loading {monsterChosenSimple.name}...</div>
                    {:else}
                        <div>Choose a monster to view or </div>
                        <SimpleButton value='View random monster' icon='mdi:dice' type='green' onClickFn={() => viewRandomMonster(monsterData)}></SimpleButton>
                    {/if}
                </div>
            {/if}
        </dialog-content>
    {/await}
</Dialog>

<style>
    .dialog-open-button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: 1.4em;
    }

    dialog-content {
        height: calc(80vh - 2.5em);
        font-family: Quicksand;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
        gap: 0.5em;
        grid-template-areas: 
            "favorites favorites monster-detail monster-detail monster-detail monster-detail monster-detail"
            "favorites favorites monster-detail monster-detail monster-detail monster-detail monster-detail"
            "favorites favorites monster-detail monster-detail monster-detail monster-detail monster-detail"
            "add-srd-monster add-srd-monster monster-detail monster-detail monster-detail monster-detail monster-detail"
            "monster-menu monster-menu monster-detail monster-detail monster-detail monster-detail monster-detail"
            "monster-menu monster-menu monster-detail monster-detail monster-detail monster-detail monster-detail"; 
    }

    .favorites { grid-area: favorites; 
        display: flex;
        width: 100%;
        height: 100%;
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

    .add-srd-monster { grid-area: add-srd-monster; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0em 2em;
        font-size: 1.2em;
    }

    .monster-filter {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        position: relative;
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
        width: 30%;
    }

    #progress-circle {
        width: 100%;
        height: calc(80vh - 2.5em);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }

    :global(#progress-circle simple-button) {
        max-width: 5em;
        padding: 0.2em 0.4em;
    }

</style>