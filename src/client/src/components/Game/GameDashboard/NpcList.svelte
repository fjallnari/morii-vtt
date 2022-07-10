<script lang="ts">

    import type { Character } from '../../../interfaces/Character';
    import type GameData from '../../../interfaces/GameData';
    import { selectedCharacter } from '../../../stores';
    import BoxWithList from '../../BoxWithList.svelte';

    export let gameData: GameData;
    export let getClassIcon: (character: Character) => string[];
    export let createMenuEnabled: boolean;



</script>

<BoxWithList label={''} addNewListItem={() => createMenuEnabled = true} isModifyDisabled>
    <div class="npc-list" slot='list'>
        {#each gameData.npcs as npc}
            <box class="npc-main-container" on:click={() => selectedCharacter.set(npc)}>
                <class-icon>
                    <img id="main-class" src="../static/class-icons/{getClassIcon(npc)[0]}.svg" alt="class-icon">
                    {#if getClassIcon(npc).length > 2}
                        <img id="multi-class" src="../static/class-icons/{getClassIcon(npc)[2]}.svg" alt="class-icon">
                    {/if}
                </class-icon>
                <div class="npc-name">
                    {npc.name ? npc.name : '---'}
                </div>
            </box>
        {/each}  
    </div>
</BoxWithList>

<style>
    box {
        background-color: var(--secondary-box-background-color);
    }

    .npc-list {
        width: 95%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0.5em;
    }

    .npc-main-container {
        display: grid; 
        grid-template-columns: 0.1fr 5fr; 
        grid-template-rows: 1fr;
        grid-template-areas: 
            "npc-class-icon npc-name";
        cursor: pointer;
    }

    class-icon{ grid-area: npc-class-icon;
        position: relative;
        border-radius: 25%;
        width: 5em;
        height: 5em;  
    }

    #main-class {
        width: 100%;
        height: 100%;
    }

    #multi-class {
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 3em;
        height: 3em;
    }

    .npc-name { grid-area: npc-name;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Quicksand;
        font-size: 1.2em;
    }

    :global(.npcs .inside-box-content) {
        scrollbar-width: thin;
        overflow-y: auto;
        justify-content: flex-start;
    }

</style>