<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { AbilitySkill, Character5E } from "../../../../interfaces/5E/Character5E";
    import { formatModifier, modifyCharacter, sendSkillCheck } from "../../../../stores";
    import { calc5EModifier } from "../../../../util/util";
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";

    export let character: Character5E;

    const getSkill = (AS: string, skillName: string) => {
        return character.ability_scores[AS].skills.find(skill => skill.name === skillName);
    }

    const getSkillModifier = (AS: string, skill: AbilitySkill) => {
        return calc5EModifier(character.ability_scores[AS]?.value) + (skill.proficiency * ~~character.prof_bonus);
    }

    const getSavingThrowModifier = (AS: string) => {
        return calc5EModifier(character.ability_scores[AS]?.value) + (character.ability_scores[AS].saving_throw ? ~~character.prof_bonus : 0);
    }

    
    $: weight_of_items = character.inventory.filter(item => item.has_weight).reduce((sum, item) => sum + ~~item.weight, 0);
    $: carrying_capacity = ~~character.ability_scores['STR'].value * 15;
    $: passive_perception = 10 + getSkillModifier('WIS', character.ability_scores['WIS'].skills.find(skill => skill.name === 'perception'));
</script>

{#each Object.keys(character.ability_scores) as AS}
    <div class="ability-score-container">
        <div class="ability-score-info">
            <box class="ability-score-modifier">
                {$formatModifier(calc5EModifier(character.ability_scores[AS]?.value))}
            </box>

            <div class="ability-score-value">
                <InPlaceEditBox 
                    bind:value={character.ability_scores[AS].value}
                    boxLabel={character.ability_scores[AS].name}
                    inlineStyle="flex-grow: 2;" 
                    editWidth="2em">
                </InPlaceEditBox>
            </div>
        </div>

        <div class="skills">
            <div class="skill-field">
                <sendable class="skill-prof-icon" 
                    on:click={() => { character.ability_scores[AS].saving_throw = !character.ability_scores[AS].saving_throw; $modifyCharacter() }} on:keyup={() => {}}
                >
                    <Icon icon="mdi:rhombus{character.ability_scores[AS].saving_throw ? '' : '-outline'}" />
                </sendable>
                <mod>
                    {$formatModifier(getSavingThrowModifier(AS))}
                </mod>
                <sendable on:click={() => { $sendSkillCheck(getSavingThrowModifier(AS), `${AS} saving throw`, character.name) }} on:keyup={() => {}}>{AS} saving throws<br></sendable>
            </div>
            {#each character.ability_scores[AS].skills as skill}
                <div class="skill-field">
                    <!-- cycles through proficiency values 0, 1 and 2 -->
                    <sendable class="skill-prof-icon" on:click={() => { skill.proficiency += 1 + (skill.proficiency === 2 ? -3 : 0); $modifyCharacter() }} on:keyup={() => {}}>
                        <Icon icon="mdi:{['checkbox-blank-outline', 'checkbox-marked', 'flare'][skill.proficiency]}" />
                    </sendable>
                    <mod>{$formatModifier(getSkillModifier(AS, skill))}</mod>
                    <sendable on:click={() => { $sendSkillCheck(getSkillModifier(AS, skill), skill.name, character.name) }} on:keyup={() => {}}>{skill.name}<br></sendable>
                </div>
            {/each}
        </div>
        {#if AS === 'WIS'}
            <box class="additional-skill-box">
                <div class="box-with-label">
                    <div class="box-main-text">
                        {passive_perception}
                    </div>
                    <div class="box-justify-filler"></div>
                    <div class="box-label">
                        Passive Perception
                    </div>
                </div>
            </box>
        {:else if AS === 'DEX'}
            <box class="additional-skill-box">
                <div class="box-with-label">
                    <div class="box-main-text">
                        {$formatModifier(calc5EModifier(character.ability_scores['DEX']?.value) + ~~character.initiative_bonus)}
                    </div>
                    <div class="box-justify-filler"></div>
                    <sendable class="box-label" 
                        on:click={() => $sendSkillCheck(
                            calc5EModifier(character.ability_scores['DEX']?.value) + ~~character.initiative_bonus, 
                            `initiative`, 
                            character.name,
                            character._id)
                        }
                        on:keyup={() => {}}
                    >
                        Initiative
                    </sendable>
                </div>
            </box>
        {:else if AS === 'STR' && character.settings.use_encumbrance}
        <box class="additional-skill-box">
            <div class="box-with-label">
                <div class="box-main-text" style="{weight_of_items > carrying_capacity ? 'color: #BC4B51' : ''}">
                    {weight_of_items}/{carrying_capacity}
                </div>
                <div class="box-justify-filler"></div>
                <div class="box-label">
                    Carrying Capacity
                </div>
            </div>
        </box>
        {/if}
    </div>
{/each}

<style>
    .ability-score-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 90%;
        gap: 0.5em;
    }

    .ability-score-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .ability-score-modifier {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 2.5em;
        width: 2.5em;
        z-index: 2;
        margin-bottom: -1.2em;

        font-size: 1.2em;
        font-weight: var(--semi-bold);
        font-family: Quicksand;
    }

    .ability-score-value {
        width: 5em;
        height: 5em;
    }

    .ability-score-value :global(.box-main-text) {
        margin-bottom: -1.5em
    }

    .skills {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        text-align: center;
        width: inherit;
        height: 100%;
        font-family: Quicksand;
        font-size: 1em;
        text-transform: capitalize;
    }

    .skill-field {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .skill-prof-icon {
        font-size: 1.4em;
    }

    .additional-skill-box {
        padding: 0.4em;
        margin-right: -2em;
    }

    .additional-skill-box .box-main-text {
        font-weight: var(--semi-bold);
        font-size: 1.2em;
        padding-bottom: 0.8em;
    }

</style>