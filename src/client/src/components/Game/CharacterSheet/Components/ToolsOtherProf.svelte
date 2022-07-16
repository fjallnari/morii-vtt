<script lang="ts">
    import type { Character, OtherProf, Tool } from "../../../../interfaces/Character";
    import { modifyCharacter } from '../../../../stores';
    import { Icon } from '@smui/icon-button';
    import OtherProfDetail from "./OtherProfDetail.svelte";
    import { nanoid } from 'nanoid/non-secure';
    import ToolDetail from "./ToolDetail.svelte";

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


</script>

<div class="tools-other-container">
    <box class="tools inside-box-content">
        <div class="inside-box-list">
            {#each character.tools as tool}
                <ToolDetail bind:tool={tool} bind:character={character}></ToolDetail>
            {/each}
            <sendable class="add-new-item" on:click={() => { addNewTool(); $modifyCharacter() }}>
                <Icon class="material-icons">{'add'}</Icon>
            </sendable>
        </div>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Tools
        </div>
    </box>

    <box class="other-prof inside-box-content">
        <div class="filter-menu">
            {#each ['filter-off', 'atom', 'shield-half-full', 'sword', 'translate', 'music'] as profType, index}
                <img class="prof-type-icon" 
                    src="../static/{profType}.svg"
                    alt="prof-type-icon"
                    style="{currentFilter === index ? 'border-bottom: 1px solid #EFA48B; padding-bottom: 0.2em;': ''}"
                    on:click={ () => { currentFilter = index;}}
                >
            {/each}                
        </div>
        <div class="inside-box-list">
            {#each character.other_profs.filter( prof => isSelectedType(currentFilter, prof.type)) as other_prof}
                <OtherProfDetail bind:other_prof={other_prof} bind:character={character}></OtherProfDetail>
            {/each}
            <sendable class="add-new-item" on:click={() => { addNewProf(); $modifyCharacter() }}>
                <Icon class="material-icons">{'add'}</Icon>
            </sendable>
        </div>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Other Proficiencies
        </div>
    </box>

</div>


<style>
    img {
        cursor: pointer; 
        height: 1.25em;
        width: 1.25em;
        transition-duration: 200ms;
        transition-property: border;
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