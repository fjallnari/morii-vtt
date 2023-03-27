<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { SpellShadowdark } from "../../../../interfaces/Shadowdark/SpellShadowdark";
    import { modifyCharacter } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import SimpleButton from "../../../SimpleButton.svelte";
    import { tooltip } from "@svelte-plugins/tooltips";

    export let spell: SpellShadowdark;
    export let deleteSpell: (spellToDelete: SpellShadowdark) => void;

</script>

<div class="spell-inner-container">
    <div class="single-line">
        <div class="field-icon" use:tooltip={{content: `Range`, theme: 'dark-tooltip', position: 'bottom'}}>
            <Icon class="medi-icon" icon="mdi:target" />
        </div>
        <InPlaceEdit bind:value={spell.range} editWidth="5rem" editHeight="1.5rem" on:submit={() => $modifyCharacter()}/>
        
        <div class="field-icon" use:tooltip={{content: `Duration`, theme: 'dark-tooltip', position: 'bottom' }}>
            <Icon class="medi-icon" icon="mdi:clock-outline" />
        </div>
        <InPlaceEdit bind:value={spell.duration} editWidth="5rem" editHeight="1.5rem" on:submit={() => $modifyCharacter()}/>
    </div>
    <textarea on:change={() => $modifyCharacter()} bind:value={spell.description}></textarea>
    <SimpleButton value='Delete' type="delete" onClickFn={() => deleteSpell(spell)}></SimpleButton>
</div>

<style>
    .spell-inner-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5em;
    }

    .single-line {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }

    .field-icon {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    textarea {
        height: 10em;
    }

    

</style>