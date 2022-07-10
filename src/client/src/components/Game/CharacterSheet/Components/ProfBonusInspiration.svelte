<script lang="ts">
    import type { Character } from "../../../../interfaces/Character";
    import { modifyCharacter } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import { Icon } from '@smui/icon-button';

    export let character: Character;

</script>

<div class="row-box-with-label">
    <box class="row-box-value">
        <InPlaceEdit bind:value={character.prof_bonus} editWidth="2em" editHeight="2em" on:submit={() => $modifyCharacter()}/>
    </box>
    <box class="row-box-label">
        Proficiency Bonus    
    </box>
</div>
<div class="row-box-with-label">
    <!-- inverts inspiration value on click -->
    <box class="row-box-value" style="cursor: pointer;" on:click={() => { character.inspiration = !character.inspiration; $modifyCharacter() }}>
        <Icon class="material-icons">{character.inspiration ? 'auto_awesome': ''}</Icon>
    </box>
    <box class="row-box-label">
        Inspiration    
    </box>
</div>

<style>
    .row-box-with-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .row-box-value {
        display: flex;
        width: 2em;
        height: 2em;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
        font-weight: bold;
        font-family: Quicksand;
        z-index: 2;
    }

    .row-box-label {
        padding: 0.5em;
        text-transform: uppercase;
        font-family: Athiti;
        margin-left: -5px;
        z-index: 1;
        padding-left: 15px;
        padding-right: 0.75em;
    }

</style>