<script lang="ts">
import ABILITY_TAGS from "../../enum/AbilityTags";

    import type ClassData from "../../interfaces/ClassData";
    import type QuickCreateCharacterParts from "../../interfaces/QuickCreateCharacterParts";
    import type QuickCreateData from "../../interfaces/QuickCreateData";
    import BoxWithHeaderToggle from "../BoxWithHeaderToggle.svelte";
    import BoxWithInfo from "../BoxWithInfo.svelte";
    import MarkdownBoxText from "./MarkdownBoxText.svelte";

    export let characterParts: QuickCreateCharacterParts;
    export let quickCreateData: QuickCreateData;

    let selectedClass: ClassData | undefined = characterParts.class;

    const placeholderBoxes = [
        { label: 'Spellcasting Ability', gridArea: 'spell-ability-info' },
        { label: 'Casting Spells', gridArea: 'casting-info' },
        { label: 'Spells', gridArea: 'spells' },
        { label: 'Spell Save DC', gridArea: 'spell-save-dc' },
        { label: 'Spell Attack Modifier', gridArea: 'spell-attack' },
        { label: 'Ritual Casting', gridArea: 'ritual' },
        { label: 'Spellcasting focus', gridArea: 'spell-focus' }
    ];

    $: proficiencyBonus = selectedClass ? Math.floor((selectedClass.level - 1) / 4) + 2 : 0;

</script>

<spellcasting-detail>
    {#if selectedClass && selectedClass.spellcasting}
        <box class="class-level-slider"></box>
        <box class="spells"></box>

        <box class="spell-ability-info">
            <MarkdownBoxText text={selectedClass.spellcasting.ability_info}></MarkdownBoxText>
            <div class="box-label auto-margin">
                Spellcasting ability
            </div>
        </box>

        <box class='ability'>
            <select class="box-main-text bigger-bold" bind:value={selectedClass.spellcasting.ability}>
                <option value="" selected disabled hidden>---</option>
                {#each ABILITY_TAGS as abilityTag}
                    <option value={abilityTag}>
                        {abilityTag}
                    </option>
                {/each}
            </select>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Spell Ability
            </div>
        </box>

        <box class='spell-save-dc'>
            <div class='box-main-text bigger-bold'>
                {8 + proficiencyBonus + 0}
            </div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Spell save DC
            </div>
        </box>

        <box class='spell-attack'>
            <div class='box-main-text bigger-bold'>
                { new Intl.NumberFormat("en-US", { signDisplay: 'exceptZero' }).format(proficiencyBonus + 0)}
            </div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Spell ATK mod
            </div>
        </box>

        <box class="ritual">
            <MarkdownBoxText text={selectedClass.spellcasting.ritual_casting}></MarkdownBoxText>
            <div class="box-label auto-margin">
                Ritual Casting
            </div>
        </box>

        <box class="spell-focus">
            <MarkdownBoxText text={selectedClass.spellcasting.focus}></MarkdownBoxText>
            <div class="box-label auto-margin">
                Spellcasting Focus
            </div>
        </box>

        <box class="casting-info">
            <MarkdownBoxText text={selectedClass.spellcasting.casting_info}></MarkdownBoxText>
            <div class="box-label auto-margin">
                Casting Spells
            </div>
        </box>
    {:else}
        {#each placeholderBoxes as placeholderBox}
            <box class="{placeholderBox.gridArea} placeholder">
                <div class="box-main-text">X</div>
                <div class="box-justify-filler"></div>
                <div class="box-label">
                    {placeholderBox.label}
                </div>
            </box>
        {/each}
    {/if}
</spellcasting-detail>

<style>
    spellcasting-detail { grid-area: step-detail;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        gap: 0.5em 0.5em; 
        grid-template-areas: 
            "ability spell-save-dc spell-attack casting-info casting-info casting-info casting-info class-level-slider class-level-slider class-level-slider class-level-slider class-level-slider"
            "spell-ability-info spell-ability-info spell-ability-info casting-info casting-info casting-info casting-info spells spells spells spells spells"
            "spell-ability-info spell-ability-info spell-ability-info casting-info casting-info casting-info casting-info spells spells spells spells spells"
            "spell-ability-info spell-ability-info spell-ability-info casting-info casting-info casting-info casting-info spells spells spells spells spells"
            ". . . casting-info casting-info casting-info casting-info spells spells spells spells spells"
            ". . . casting-info casting-info casting-info casting-info spells spells spells spells spells"
            ". . . ritual ritual spell-focus spell-focus spells spells spells spells spells"
            ". . . ritual ritual spell-focus spell-focus spells spells spells spells spells"; 
    }

    spellcasting-detail box {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        align-items: center;
    }

    .spell-ability-info { grid-area: spell-ability-info; }
    .ability { grid-area: ability}
    .class-level-slider { grid-area: class-level-slider; }
    .spells { grid-area: spells; }
    .spell-save-dc { grid-area: spell-save-dc; }
    .spell-attack { grid-area: spell-attack; }
    .ritual { grid-area: ritual;}
    .spell-focus { grid-area: spell-focus; }
    .casting-info { grid-area: casting-info; }

    select {
        background-color: inherit;
    }

    .bigger-bold {
        font-weight: var(--semi-bold);
        font-size: 1.5em;
    }

    .box-label.auto-margin {
        margin-top: auto;
    }

    .placeholder {
        font-size: 1.3em;
        font-weight: var(--semi-bold);
    }

</style>