<script lang="ts">
    import type { Character5E } from "../../../../interfaces/5E/Character5E";
    import { modifyCharacter } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";
    import HpBar from "./HpBar.svelte";

    export let character: Character5E;
    
    const correctHP = () => {
        character.hp_current = ~~character.hp_current > ~~character.hp_max ? character.hp_max : character.hp_current;
    }

</script>

<div class="hp-double-box">
    <InPlaceEditBox bind:value={character.hp_max} 
        boxLabel="Max" 
        inlineStyle="margin-top: 0.5em;" 
        editWidth="2em" 
        editHeight="2em" 
        onSubmitFce={() => { correctHP(); $modifyCharacter()}}>
    </InPlaceEditBox>
    <InPlaceEditBox bind:value={character.hp_temp} boxLabel="Temp" inlineStyle="margin-bottom: 0.5em;" editWidth="2em" editHeight="2em"></InPlaceEditBox>
</div>
<box class="hp-main-box">
    <HpBar currentHP={~~character.hp_current} maxHP={~~character.hp_max} tempHP={~~character.hp_temp}></HpBar>
    <div class="current-hp-text">
        <InPlaceEdit bind:value={character.hp_current} editWidth="2em" editHeight="2em" on:submit={() => { correctHP(); $modifyCharacter(); }}/>
    </div>
    <div class="box-label hp-footer">
        Hit Points
    </div>
</box>

<style>
    .hp-main-box {
        display: grid; 
        grid-template-columns: 1fr; 
        grid-template-rows: 1fr 1fr; 
        grid-template-areas: 
            "hp-bar"
            "current-hp-text"
            "hp-footer";
        
        margin-left: -2em;
        height: 100%;
        width: 100%;
        position: relative;
    }

    .hp-main-box .current-hp-text {
        grid-area: current-hp-text;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
        font-weight: var(--semi-bold);
    }

    .hp-footer { grid-area: hp-footer;
    }

    .hp-double-box {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        align-items: center;
        height: 100%;
    }

    .hp-double-box :global(box) {
        width: 4em;
        height: 1em;
        margin-right: 2em;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

</style>