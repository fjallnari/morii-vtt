<script lang="ts">

    import type { Character } from '../../../interfaces/Character';
    import type GameData from '../../../interfaces/GameData';
    import { selectedCharacter } from '../../../stores';
    import BoxWithList from '../../BoxWithList.svelte';

    export let gameData: GameData;
    export let getClassIcon: (character: Character) => string;
    export let createMenuEnabled: boolean;



</script>

<BoxWithList label={''} addNewListItem={() => createMenuEnabled = true} isModifyDisabled>
    <div class="npc-list" slot='list'>
        {#each gameData.npcs as npc}
            <box class="npc-main-container" on:click={() => selectedCharacter.set(npc)}>
                <img class="npc-class-icon" src="../static/class-icons/{getClassIcon(npc)}.svg" alt="class-icon">
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

    img {
        border-radius: 25%;
        width: 5em;
        height: 5em;
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

    .npc-class-icon { grid-area: npc-class-icon; }
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