<script lang="ts">
    import type GameData from "../../../interfaces/GameData";
    import { Icon } from '@smui/icon-button';
    import type InitiativeData from "../../../interfaces/InitiativeData";
    
    export let gameData: GameData;
    export let initiative: InitiativeData;

    const sortInitOrder = () => {
        initiative.order = initiative.order.sort((a, b) => ~~a.value < ~~b.value ? 1 : -1);
        initiative.topID = initiative.order[0]?.id;
    }

    const addNewInitEntity = () => {

    }

    const clearInitOrder = () => {

    }

    const passTurn = () => {
        if (initiative.order.length !== 0) {
            initiative.order = [... initiative.order.slice(1), initiative.order[0]];
        }
    }

</script>


<box class='initiative-container'>
    <div class='initiative-list'>
        {#each initiative.order as initEntity}
            <box class='init-entity-tag{initEntity.id === initiative.topID ? ' top': ''}'>
                {`${initEntity.name} ~ ${initEntity.value}`}
            </box>
        {/each}
    </div>
    <box class='initiative-menu'>
        <sendable class="init-menu-icon" on:click={() => {}}>
            <Icon class="material-icons">{'delete'}</Icon>
        </sendable>
        <sendable class="init-menu-icon" on:click={() => {}}>
            <Icon class="material-icons">{'redo'}</Icon>
        </sendable>
        <sendable class="init-menu-icon" on:click={() => {}}>
            <Icon class="material-icons">{'add'}</Icon>
        </sendable>
        <sendable class="init-menu-icon" on:click={() => sortInitOrder()}>
            <Icon class="material-icons">{'sort'}</Icon>
        </sendable>
        <sendable class="init-menu-icon" on:click={() => passTurn()}>
            <Icon class="material-icons">{'forward'}</Icon>
        </sendable>
    </box>
</box>


<style>
    .initiative-container {
        height: 100%;
        width: 100%;
        position: relative;
    }

    .initiative-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5em;
        margin-top: 1em;
        height: 85%;
        overflow-y: auto;
        scrollbar-width: thin;
    }

    .init-entity-tag {
        width: 90%;
        background-color: var(--clr-box-bg-light);
        font-family: Quicksand;
        font-size: 1.2em;
        padding: 0.5em 0.25em;
    }

    .init-entity-tag.top {
        background: linear-gradient(135deg, var(--clr-accent-normal) 20%, var(--clr-box-bg-light) 20%);
    }

    .initiative-menu {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        width: 100%;
        background-color: var(--clr-box-bg-light);
        height: 10%;
        top: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.75em;
    }

    .init-menu-icon {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(.init-menu-icon > .material-icons) {
        font-size: 2em;
    }

</style>