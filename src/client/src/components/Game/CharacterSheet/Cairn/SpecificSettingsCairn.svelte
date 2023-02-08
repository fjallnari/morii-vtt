<script lang="ts">
    import type { CharacterCairn, ItemCairn } from "../../../../interfaces/Cairn/CharacterCairn";
    import CreateRandomSheetCairn from "./CreateRandomSheetCairn.svelte";
    import CopyToClipboard from 'svelte-copy-to-clipboard';
    import SimpleButton from "../../../SimpleButton.svelte";
    import SimpleSnackbar from "../../../SimpleSnackbar.svelte";
    import Icon from "@iconify/svelte";
    import { modifyCharacter } from "../../../../stores";

    let copySnackbar: SimpleSnackbar;

    export let character: CharacterCairn;

    const getASCIIITem = (item: ItemCairn) => {
        return `${item.name} | ${item.type}${item.damage ? ` | ${item.damage}` : ''}${item.armor ? ` | ${item.armor} armor` : ''}${item.bulky ? ' | bulky' : item.stacks ? ' | stacks' : item.slotless ? ' | slotless': ''}`
    }

    const getASCIICharacter = () => {
        return `
${character.name}
==============
Background :: ${character.background}
= Stats =
STR :: ${character.ability_scores['STR'].current}/${character.ability_scores['STR'].max}
DEX :: ${character.ability_scores['DEX'].current}/${character.ability_scores['DEX'].max}
WIL :: ${character.ability_scores['WIL'].current}/${character.ability_scores['WIL'].max}
HP  :: ${character.hp}/${character.hp_max}
Armor :: ${character.armor}
GP :: ${character.coins['gp']}
= Equipment =
${character.inventory.map((item, index) => {
    return `${index + 1}. ${getASCIIITem(item)}`
}).join('\n')}
`
    }

</script>

<line-div class="cairn-settings">
    <line-div>
        <div>Manual over-encumbrance</div>
        <sendable on:click={() => { character.manual_encumbrance = !character.manual_encumbrance; $modifyCharacter(); }} on:keyup={() => {}}>
            <Icon class="big-icon" icon="mdi:{character.manual_encumbrance ? 'checkbox-marked': 'checkbox-blank-outline'}" />
        </sendable>
    </line-div>
    <CreateRandomSheetCairn bind:character={character} rerollExistingSheet={true}></CreateRandomSheetCairn>
    <CopyToClipboard text={getASCIICharacter()} let:copy on:copy={() => copySnackbar.open("success")}>
        <SimpleButton value="Copy ASCII character" icon="mdi:content-copy" iconWidth='1em' type="default" onClickFn={() => copy()}></SimpleButton>
    </CopyToClipboard>
    <SimpleSnackbar bind:this={copySnackbar} label="ASCII character was copied to clipboard!"></SimpleSnackbar>
</line-div>

<style>
    .cairn-settings {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
</style>

