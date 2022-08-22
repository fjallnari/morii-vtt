<script lang="ts">
    import type { AbilitySkill, Character } from "../../../../interfaces/Character";
    import { formatModifier, getASModifier, modifyCharacter, sendSkillCheck } from "../../../../stores";
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";

    export let character: Character;

    const getSkill = (AS: string, skillName: string) => {
        return character.ability_scores[AS].skills.find(skill => skill.name === skillName);
    }

    const getSkillModifier = (AS: string, skill: AbilitySkill) => {
        return $getASModifier(AS) + (skill.proficiency * ~~character.prof_bonus);
    }

    const getSavingThrowModifier = (AS: string) => {
        return $getASModifier(AS) + (character.ability_scores[AS].saving_throw ? ~~character.prof_bonus : 0);
    }

    
    $: weight_of_items = character.inventory.filter(item => item.has_weight).reduce((sum, item) => sum + ~~item.weight, 0);
    $: carrying_capacity = ~~character.ability_scores['STR'].value * 15;
</script>

{#each Object.keys(character.ability_scores) as AS}
    <div class="ability-score-container">
        <div class="ability-score-info">
            <box class="ability-score-modifier">
                {$formatModifier($getASModifier(AS))}
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
                <img class="skill-prof-icon" 
                    src="../static/rhombus{character.ability_scores[AS].saving_throw ? '' : '-outline'}.svg" 
                    alt="rhombus"
                    on:click={() => { character.ability_scores[AS].saving_throw = !character.ability_scores[AS].saving_throw; $modifyCharacter() }}
                >
                <mod>
                    {$formatModifier(getSavingThrowModifier(AS))}
                </mod>
                <sendable on:click={() => { $sendSkillCheck(getSavingThrowModifier(AS), `${AS} saving throw`) }}>{AS} saving throws<br></sendable>
            </div>
            {#each character.ability_scores[AS].skills as skill}
                <div class="skill-field">
                    <!-- cycles through proficiency values 0, 1 and 2 -->
                    <img class="skill-prof-icon" 
                        src="../static/{['checkbox-blank-outline', 'checkbox-marked', 'flare'][skill.proficiency]}.svg" 
                        alt="checkbox"
                        on:click={() => { skill.proficiency += 1 + (skill.proficiency === 2 ? -3 : 0); $modifyCharacter() }}
                    >
                    <mod>{$formatModifier(getSkillModifier(AS, skill))}</mod>
                    <sendable on:click={() => { $sendSkillCheck(getSkillModifier(AS, skill), skill.name) }}>{skill.name}<br></sendable>
                </div>
            {/each}
        </div>
        {#if AS === 'WIS'}
            <box class="additional-skill-box">
                <div class="box-with-label">
                    <div class="box-main-text">
                        {10 + getSkillModifier('WIS', character.ability_scores['WIS'].skills.find(skill => skill.name === 'perception'))}
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
                        {$formatModifier($getASModifier('DEX') + ~~character.initiative_bonus)}
                    </div>
                    <div class="box-justify-filler"></div>
                    <sendable class="box-label" on:click={() => $sendSkillCheck(($getASModifier('DEX') + ~~character.initiative_bonus), `initiative`)}>
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
        cursor: pointer; 
        height: 1.4em; 
        width: 1.4em;
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