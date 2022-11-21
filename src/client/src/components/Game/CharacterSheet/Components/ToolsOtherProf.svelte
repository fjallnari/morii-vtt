<script lang="ts">
    import type { Character, OtherProf, Tool } from "../../../../interfaces/Character";
    import { modifyCharacter } from '../../../../stores';
    import OtherProfDetail from "./OtherProfDetail.svelte";
    import { nanoid } from 'nanoid/non-secure';
    import ToolDetail from "./ToolDetail.svelte";
    import Icon from "@iconify/svelte";
    import PROF_TYPES from "../../../../enum/OtherProfTypes";

    export let character: Character;
    let currentFilter = 0;

    const addNewProf = () => {
        const profSkeleton: OtherProf = {
            id: nanoid(16),
            name: '',
            type: currentFilter === 0 ? 0 : currentFilter - 1,
            content: ''
        }

        character.other_profs = character.other_profs.concat([profSkeleton]);
    }

    const addNewTool = () => {
        const toolSkeleton: Tool = {
            id: nanoid(16),
            name: '',
            ability: '',
            proficiency: 1
        }

        character.tools = character.tools.concat([toolSkeleton]);
    }

    const isSelectedType = (filteredType: number, profType: number) => {
        return filteredType === 0 ? true : profType === filteredType - 1;
    }

    const OTHER_PROF_FILTER_ICONS = [{name: "FILTER_OFF", icon: "mdi:filter-off"}, ...PROF_TYPES];

</script>

<div class="tools-other-container">
    <box class="tools inside-box-content">
        <div class="inside-box-list">
            {#each character.tools as tool}
                <ToolDetail bind:tool={tool} bind:character={character}></ToolDetail>
            {/each}
            <sendable class="add-new-item" on:click={() => { addNewTool(); $modifyCharacter() }}>
                <Icon class="big-icon" icon="mdi:add" />
            </sendable>
        </div>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Tools
        </div>
    </box>

    <box class="other-prof inside-box-content">
        <div class="filter-menu">
            {#each OTHER_PROF_FILTER_ICONS as profType, index}
                <sendable class="prof-type-icon"  on:click={() => currentFilter = index } selected={currentFilter === index}>
                    <Icon class="medi-icon" icon={profType.icon} />
                </sendable>
            {/each}                
        </div>
        <div class="inside-box-list">
            {#each character.other_profs.filter( prof => isSelectedType(currentFilter, prof.type)) as other_prof}
                <OtherProfDetail bind:other_prof={other_prof} bind:character={character}></OtherProfDetail>
            {/each}
            <sendable class="add-new-item" on:click={() => { addNewProf(); $modifyCharacter() }}>
                <Icon class="big-icon" icon="mdi:add" />
            </sendable>
        </div>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Other Proficiencies
        </div>
    </box>

</div>


<style>
    sendable {
        transition: border 100ms ease-in;
    }

    sendable[selected="true"] {
        border-bottom: 1px solid var(--clr-accent-normal); 
        padding-bottom: 0.2em;
    }

    .tools-other-container {
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        gap: 0px 0px; 
        grid-template-areas: 
            "tools other-prof"
            "tools other-prof";
        height: 100%;
        gap: 0.5em;
    }

    .tools { grid-area: tools; 
        padding-top: 0.3em;
    }
    .other-prof { grid-area: other-prof; }

    .inside-box-content {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    

    .inside-box-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.25em;
        scrollbar-width: thin;
        overflow-y: auto;
    }

    .filter-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.2em;
        padding: 0.3em;
    }

    .add-new-item {
        padding-top: 0.3em;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #1d1d22;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #757578;
        border: transparent;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #404044;
    }

</style>