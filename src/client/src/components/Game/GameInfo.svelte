<script lang="ts">
    import { push, replace } from "svelte-spa-router";
    import type GameData from "../../interfaces/GameData";
    import { selectedCharacter, selectedGameTab, user } from '../../stores';
    import SimpleIconButton from '../SimpleIconButton.svelte';
    import { Tooltip } from "@svelte-plugins/tooltips";
    import type GameTab from "../../interfaces/GameTab";
    import GAME_SYSTEMS from "../../enum/GameSystems";

    export let gameData: GameData;

    const leaveGame = () => {
        selectGameTab();
        replace('/');
    }

    const selectGameTab = (tabName: string = 'default') => {
        selectedGameTab.set(tabName);
        selectedCharacter.set(undefined);        
    }


    const filterTabs = (tab: GameTab) => {
        const accessGroup = $user && $user._id === gameData.owner ? 'owner': 'player';
        return tab.access === 'any' || tab.access === accessGroup;
    }

    $: gameTabs = GAME_SYSTEMS[gameData.system]?.gameTabs?.filter(tab => filterTabs(tab)) ?? [];

</script>

<div class="game-info">
    <h3>{gameData ? gameData.name : '_'}</h3>
    <div class="icon-bar">
        {#each gameTabs as tab}
            <Tooltip 
                content={tab.tooltip}
                theme="blurred"
                position='bottom'
            >
                <SimpleIconButton icon={tab.icon} color={tab.color} onClickFn={() => selectGameTab(tab.id)}></SimpleIconButton>
            </Tooltip>
        {/each}
        <Tooltip 
            content="Campaigns"
            theme="blurred" 
            position='bottom'
        >
            <SimpleIconButton icon='mdi:logout' color='#EFA48B' onClickFn={() => leaveGame()}></SimpleIconButton>
        </Tooltip>
    </div>
</div>

<style>
    .game-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: var(--clr-box-bg-dark);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    .game-info h3 {
        text-transform: uppercase;
        font-size: 1.5em;
        font-weight: 100;
        font-family: Montserrat;
        width: 15rem;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-left: 1em;
        margin: 0.5em 0em;
        white-space: nowrap;
    }

    .game-info .icon-bar {
        display: flex;
        gap: 1em;
        padding-right: 1em;
    }

</style>