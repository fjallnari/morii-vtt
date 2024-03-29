<script lang="ts">
    import BoxWithList from "../../../BoxWithList.svelte";
    import type { CharacterShadowdark } from "../../../../interfaces/Shadowdark/CharacterShadowdark";
    import { convertValueToASMod } from "../../../../util/util";
    import Icon from "@iconify/svelte";
    import SimpleAccordionDetail from "../../SimpleAccordionDetail.svelte";
    import type { SpellShadowdark } from "../../../../interfaces/Shadowdark/SpellShadowdark";
    import { nanoid } from "nanoid/non-secure";
    import { formatModifier, modifyCharacter, sendSkillCheck } from "../../../../stores";
    import ABILITY_TAGS from "../../../../enum/AbilityTags";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import SimpleButton from "../../../SimpleButton.svelte";
    import AddShadowdarkSrdSpell from "./AddShadowdarkSRDSpell.svelte";
    import SpellInnerShadowdark from "./SpellInnerShadowdark.svelte";

    export let character: CharacterShadowdark;
    let currentFilter = 0;
    let createMenuEnabled: boolean = false;

    const SPELL_TIERS = [
        { name: 'I', icon: 'mdi:roman-numeral-1' },
        { name: 'II', icon: 'mdi:roman-numeral-2' },
        { name: 'III', icon: 'mdi:roman-numeral-3' },
        { name: 'IV', icon: 'mdi:roman-numeral-4' },
        { name: 'V', icon: 'mdi:roman-numeral-5' },
    ];

    const addSpell = (spellTemplate: object = {}, closeCreateMenu: boolean = true) => {
        const spellSkeleton: SpellShadowdark = {
            id: nanoid(12),
            name: '',
            tier: currentFilter === 0 ? 1 : currentFilter,
            description: '',
            range: '',
            duration: ''
        }

        character.spells = character.spells.concat([Object.assign(spellSkeleton, spellTemplate ?? {})]);
        if (closeCreateMenu) {
            createMenuEnabled = false;
        }
        $modifyCharacter();
    }

    const deleteSpell = (spellToDelete: SpellShadowdark) => {
        character.spells = character.spells.filter(obj => obj.id !== spellToDelete.id);
        $modifyCharacter();
    }

    const isSelectedTier = (filteredTier: number, spellTier: number) => {
        return filteredTier === 0 ? true : spellTier === filteredTier;
    }

    $: spellAttackBonus = convertValueToASMod(character?.ability_scores[character?.spell_ability]?.value);
    $: normalizedLevel = ~~character.level - 1 > 9 ? 9 : ~~character.level - 1 < 0 ? 0 : ~~character.level - 1;
    $: displaySpellTier = currentFilter === 0 ? 1 : currentFilter;

</script>

<div class="spells-container">
    {#if createMenuEnabled}
        <div class="add-sd-spell-container">
            <h3>Spells</h3>
            <SimpleButton value={`Create New (Tier ${displaySpellTier})`} type="green" icon="mdi:shape-plus" onClickFn={addSpell}></SimpleButton>
            <AddShadowdarkSrdSpell addSpell={addSpell} bind:createMenuEnabled></AddShadowdarkSrdSpell>
            <SimpleButton value='' icon="mdi:close" onClickFn={() => createMenuEnabled = false}></SimpleButton>
        </div>
    {:else}
        <BoxWithList label='Spells' gridClass='spells' addNewListItem={() => createMenuEnabled = true}>
            <div class="filter-menu" slot='filter-menu'>
                {#each [{ name: 'FILTER_OFF', icon: 'mdi:filter-off' }, ...SPELL_TIERS] as tierFilter, index}
                    <sendable class="spell-type-icon"
                        on:click={() => currentFilter = index } selected={currentFilter === index} on:keyup={() => {}}
                    >
                        <Icon class={`${index === 0 ? 'medi': 'big'}-icon`} icon={tierFilter.icon} />
                    </sendable>
                {/each}
            </div>
            <div class="spell-list" slot='list'>
                {#each character.spells.filter( spell => isSelectedTier(currentFilter, spell.tier)) as spell}
                    <SimpleAccordionDetail
                        bind:value={spell.name}
                        icon={SPELL_TIERS[spell.tier - 1]?.icon}
                        editWidth='10rem'
                        padding='0.3em 0em'
                        iconClass='big-icon'
                        useCustomComponent
                        deleteItem={() => deleteSpell(spell)}
                        onSubmitFn={() => $modifyCharacter()}
                    >
                        <span slot="custom-component" class="spell-details">
                            <SpellInnerShadowdark bind:spell={spell} deleteSpell={deleteSpell}></SpellInnerShadowdark>
                        </span>
                    </SimpleAccordionDetail>
                {/each}
            </div>
        </BoxWithList>
    {/if}

    <box class="spell-ability">
        <select class="box-main-text bigger" bind:value={character.spell_ability} on:change={() => $modifyCharacter()}>
            <option value="" selected disabled hidden>---</option>
            {#each ABILITY_TAGS as abilityTag}
                <option value={abilityTag}>
                    {abilityTag}
                </option>
            {/each}
        </select>
        
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Spell ability
        </div>
    </box>

    <box class="spell-mod">
        <div class="box-main-text bigger">
            {$formatModifier(spellAttackBonus)}   
        </div>
        <div class="box-justify-filler"></div>
        <sendable class="box-label" on:click={() => $sendSkillCheck(spellAttackBonus, 'spell attack', character.name)} on:keyup={() => {}}>
            Spell Atk
        </sendable>
    </box>

    <box class="spells-known">
        <div class="box-main-text max-width">
            <div class="spell-tiers">
                {#each SPELL_TIERS as _, index}
                    <div class="spell-tier">
                        <div class="spell-tier-icon">
                            <Icon class="big-icon" icon={SPELL_TIERS[index]?.icon} />
                        </div>
                        <div class="spell-tier-edit">
                            <InPlaceEdit
                                bind:value={character.spells_known[normalizedLevel][index]}
                                editWidth="1.5em"
                                editHeight="1.5em"
                                on:submit={() => $modifyCharacter()}
                            />
                        </div>
                    </div>  
                {/each}
            </div>
        </div>
        <div class="box-justify-filler"></div>
        <div class="box-label" on:click={() => {}} on:keyup={() => {}}>
            Spells known
        </div>
    </box>
</div>

<style>
    .spells-container { grid-area: spells;
        display: grid;
        grid-template-columns: 2.5fr 1fr;
        grid-template-rows: 1fr 1fr 3fr;
        gap: 0.5em;
        grid-auto-flow: row;
        grid-template-areas:
            "spells spell-ability"
            "spells spell-mod"
            "spells spells-known";
    }

    .add-sd-spell-container { grid-area: spells;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-self: center;
        gap: 0.5em;
        width: 95%;
        height: 100%;
    }

    .add-sd-spell-container h3 {
        font-size: 1.5em;
        font-family: Quicksand;
        font-weight: 100;
        text-transform: uppercase;
    }

    :global(.add-sd-spell-container simple-button) {
        padding: 0.4em 0em;
        font-size: 1.2em;
    }

    .spell-ability { grid-area: spell-ability; }

    .spell-mod { grid-area: spell-mod; }

    .spell-ability, .spell-mod, .spells-known {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .box-main-text.bigger {
        font-size: 1.5em;
    }

    select {
        font-size: 1.5em;
        background-color: var(--clr-box-bg-normal);
    }

    .spells-known { grid-area: spells-known; }

    .box-main-text.max-width {
        width: 100%;
    }

    .spell-tiers {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.25em;
        font-size: 1.1em;
    }

    .spell-tier {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        gap: 0.5em;
        width: 60%;
        grid-auto-flow: row;
        grid-template-areas:
            "spell-tier-icon spell-tier-edit";
    }

    .spell-tier > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .spell-tier-icon { grid-area: spell-tier-icon; }
    .spell-tier-edit { grid-area: spell-tier-edit; }
    

    .spell-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.3em;
    }

    .filter-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.2em;
        padding: 0.3em;
        margin-bottom: 0.2em;
    }

    sendable {
        transition: border 100ms ease-in;
    }

    sendable[selected="true"] {
        border-bottom: 1px solid var(--clr-accent-normal); 
        padding-bottom: 0.2em;
    }

</style>