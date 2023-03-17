<script lang="ts">
    import { modifyCharacter } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import HpBar from "./HpBar.svelte";

    export let currentHP: string;
    export let maxHP: string;
    export let tempHP: string = '0';
    export let label: string = 'Hit Points';
    export let showHPBar = true;

    const correctHP = () => {
        currentHP = ~~currentHP > ~~maxHP ? maxHP : currentHP;
        $modifyCharacter('hp');
    }
    
</script>


<box class="hp-main-box" style={`grid-template-areas: "${showHPBar ? "hp-bar": "current-hp-text"}" "current-hp-text" "hp-footer";`}>
    {#if showHPBar}
        <HpBar currentHP={~~currentHP} maxHP={~~maxHP} tempHP={~~tempHP}></HpBar>
    {/if}
    <div class="current-hp-text" style={`font-size: ${showHPBar ? "1.5em": "2em"};`}>
        <InPlaceEdit bind:value={currentHP} editWidth="3rem" editHeight="3rem" on:submit={() => correctHP()}/>
        /<InPlaceEdit bind:value={maxHP} editWidth="3rem" editHeight="3rem" on:submit={() => correctHP()}/>
    </div>
    <div class="box-label hp-footer">
        {label}
    </div>
</box>

<style>
    .hp-main-box {
        display: grid; 
        grid-template-columns: 1fr; 
        grid-template-rows: 1fr 1fr;

        height: 100%;
        width: 100%;
        position: relative;
    }

    .hp-main-box .current-hp-text {
        grid-area: current-hp-text;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: var(--semi-bold);
    }

    .hp-footer { grid-area: hp-footer;}
</style>