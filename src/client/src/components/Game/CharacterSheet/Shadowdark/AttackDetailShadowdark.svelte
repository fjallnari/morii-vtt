<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { AttackShadowdark } from "../../../../interfaces/Shadowdark/AttackShadowdark";
    import { formatModifier, modifyCharacter, sendSkillCheck } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import { slide } from "svelte/transition";
    import ABILITY_TAGS from "../../../../enum/AbilityTags";
    import type { CharacterShadowdark } from "../../../../interfaces/Shadowdark/CharacterShadowdark";
    import { convertValueToASMod } from "../../../../util/util";

    export let attack: AttackShadowdark;
    export let character: CharacterShadowdark; // readonly
    export let deleteAttack: (attack: AttackShadowdark) => void = () => {};
    export let onSubmitFn: () => void = $modifyCharacter;

    let editOpen: boolean = false;

    const ATTACK_TYPES = [
        { name: 'MELEE', icon: 'mdi:sword' },
        { name: 'RANGED', icon: 'mdi:bow-arrow' },
        { name: 'SPELL', icon: 'mdi:fire' },
    ];

    const rollToHit = () => {
        $sendSkillCheck(
            convertValueToASMod(character.ability_scores[attack?.stat]?.value) + ~~attack.atk_bonus, 
            `${attack.name.toLowerCase()} | to hit`, 
            character.name
        );
    }

    const rollDamage = () => {
        if (attack.damage && attack.damage !== '') {
            $sendSkillCheck(0, `${attack.name.toLowerCase()} | damage (${attack.damage})`, `${character.name}`, '-', '', '', attack.damage);
        }
    }

</script>

<div class="attack-container">
    <box class="summary-container">
        <div class="attack-type">
            <Icon class="medi-icon" icon={ATTACK_TYPES[attack.type ?? 0].icon} />
        </div>
        <div class="attack-damage">
            <sendable on:click={() => rollDamage()} on:keyup={() => {}}>
                <div>{attack.damage && attack.damage !== '' ? attack.damage : 'd?'}</div>
            </sendable>
        </div>
        <div class="attack-to-hit">
            <sendable on:click={() => rollToHit()} on:keyup={() => {}}>
                <strong>{$formatModifier(convertValueToASMod(character.ability_scores[attack?.stat]?.value) + ~~attack.atk_bonus)}</strong>
            </sendable>
        </div>
        <div class="attack-name">
            <InPlaceEdit bind:value={attack.name} editWidth="7.5rem" editHeight="1.5rem" on:submit={() => onSubmitFn()}/>
        </div>
        <div class="attack-edit">
            <sendable on:click={() => editOpen = !editOpen} on:keyup={() => {}}>
                <Icon class="medi-icon" icon="mdi:edit" />
            </sendable>
        </div>
        <div class="attack-delete">
            <sendable on:click={() => deleteAttack(attack)} on:keyup={() => {}}>
                <Icon class="medi-icon" icon="mdi:close" />
            </sendable>
        </div>
    </box>
    {#if editOpen}
        <box class="edit-container" transition:slide|local>
            <div class="single-detail-line">
                <div class="line-title">Type:</div>
                <select bind:value={attack.type} on:change={() => $modifyCharacter()}>
                    <option value="" selected disabled hidden>---</option>
                    {#each ATTACK_TYPES as attackType, index}
                        <option value={index}>
                            {attackType.name}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="single-detail-line">
                <div class="line-title">Stat:</div>
                <select bind:value={attack.stat} on:change={() => $modifyCharacter()}>
                    <option value="" selected disabled hidden>---</option>
                    {#each ABILITY_TAGS as abilityTag}
                        <option value={abilityTag}>
                            {abilityTag}
                        </option>
                    {/each}
                </select>
                <div class="line-title">Bonus:</div>
                <InPlaceEdit bind:value={attack.atk_bonus} editWidth="2rem" editHeight="1.5rem" on:submit={() => onSubmitFn()}/>
            </div>
            <div class="single-detail-line">
                <div class="line-title">Damage:</div>
                <InPlaceEdit bind:value={attack.damage} editWidth="3rem" editHeight="1.5rem" on:submit={() => onSubmitFn()}/>
                <div class="line-title">Range:</div>
                <InPlaceEdit bind:value={attack.range} editWidth="3rem" editHeight="1.5rem" on:submit={() => onSubmitFn()}/>
            </div>
        </box>
    {/if}
</div>

<style>
    box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 95%;
    }

    .attack-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .summary-container {  display: grid;
        grid-template-columns: 1fr 1fr 1fr minmax(0, 20fr) 1fr 1fr;
        grid-template-rows: 2fr;
        gap: 0.5em;
        padding: 0.3em 0em;
        z-index: 2;
        grid-auto-flow: row;
        background-color: var(--clr-box-bg-light);
        grid-template-areas:
            "attack-type attack-damage attack-to-hit attack-name attack-edit attack-delete";
    }

    .summary-container > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .attack-type { grid-area: attack-type; 
        padding-left: 0.5em;
    }

    .attack-damage { grid-area: attack-damage; }

    .attack-to-hit { grid-area: attack-to-hit; }

    .attack-name { grid-area: attack-name; }

    .attack-edit { grid-area: attack-edit; }

    .attack-delete { grid-area: attack-delete; 
        padding-right: 0.5em;
    }

    .edit-container {
        display: flex;
        width: 90%;
        background-color: var(--clr-box-bg-light);
        padding: 0.75em 0em 0.25em 0em;
        margin-top: -0.5em;
    }

    .single-detail-line {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        font-weight: 400;
        font-family: Quicksand;
        padding: 0.2em;
    }

    .single-detail-line div {
        font-size: 1em;
    }

    .line-title {
        font-family: Athiti;
        font-weight: var(--semi-bold);
    }


</style>