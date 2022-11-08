<script lang="ts">
    import { formatModifier, getASModifier, modifyCharacter, sendSkillCheck } from '../../../../stores';
    import { slide, fade } from 'svelte/transition';
    import type { Character, Tool } from '../../../../interfaces/Character';
    import InPlaceEdit from '../../../InPlaceEdit.svelte';
    import SimpleButton from '../../../SimpleButton.svelte';
    import ABILITY_TAGS from '../../../../enum/AbilityTags';
    import Icon from '@iconify/svelte';

    export let tool: Tool;
    export let character: Character;
    let isOpen: boolean = false;

    const deleteTool = () => {
        character.tools = character.tools.filter(obj => obj.id !== tool.id);
        $modifyCharacter();
    }

    // arguments are here only because of reactivity
    const getToolFormula = (tool_ability: string = tool.ability, tool_proficiency: number = tool.proficiency, char_prof_bonus: string = character.prof_bonus) => {
        return $formatModifier(
            (tool_ability !== '---' ? ~~$getASModifier(tool_ability) : 0) + (Math.pow(2, tool_proficiency) * 0.5 * ~~char_prof_bonus)
        );
    }

    const sendToolCheck = () => {
        $sendSkillCheck(~~getToolFormula(), `${tool.name.toLowerCase()} [${tool.ability === '' ? '?': tool.ability}]`, character.name);
    }

</script>

<box>
    <div class="tool-summary">
        <sendable class="tool-modifier" on:click={() => sendToolCheck()}>
            {getToolFormula(tool.ability, tool.proficiency, character.prof_bonus)}
        </sendable>
        <div class="tool-name">
            <InPlaceEdit bind:value={tool.name} editWidth='7em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
        </div>
        <sendable class="tool-menu" on:click={() => { isOpen = !isOpen }}>
            <Icon class="big-icon" icon="material-symbols:{isOpen ? 'menu-open-rounded' : 'menu-rounded'}" />
        </sendable>
    </div>
    {#if isOpen}
        <div class="details" transition:slide|local>
            <sendable class="simple-detail-line" on:click={() => { tool.proficiency += 1 + (tool.proficiency === 2 ? -3 : 0); $modifyCharacter(); }}>
                <Icon class="medi-icon" icon="mdi:{['hammer-screwdriver','checkbox-marked','flare'][tool.proficiency]}" />
                <div class="select-ability-label box-label">
                    {['jack of all trades', 'proficient', 'expertise'][tool.proficiency]}
                </div>
            </sendable>
            <div class="simple-detail-line">
                <select bind:value={tool.ability} on:change={() => $modifyCharacter()}>
                    <option value="" selected disabled hidden>---</option>
                    {#each ABILITY_TAGS as abilityTag}
                        <option value={abilityTag}>
                            {abilityTag}
                        </option>
                    {/each}
                </select>
                <div class="select-ability-label box-label">
                    Tool Ability
                </div>
            </div>

            <SimpleButton value='Delete' type="delete" onClickFn={deleteTool}></SimpleButton>
        </div>
    {/if}
</box>


<style>
    box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 95%;
        background-color: var(--clr-box-bg-light);
    }

    .tool-summary {
        display: grid; 
        grid-template-columns: 1fr 5fr 1fr; 
        grid-template-rows: 1fr; 
        gap: 0.1em; 
        grid-template-areas: 
            "tool-modifier tool-name tool-menu";
        width: 100%;
        padding: 0.1em 0em;
    }

    .tool-summary > div, .tool-summary > sendable {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tool-name { grid-area: tool-name; }
    .tool-modifier { grid-area: tool-modifier; 
        font-weight: var(--semi-bold);
    }
    .tool-menu { grid-area: tool-menu; }

    .simple-detail-line {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.3em;
    }

    .select-ability-label {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.details {
		padding: 0.3em 0.5em 0.5em 0.5em;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        flex-wrap: wrap;
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