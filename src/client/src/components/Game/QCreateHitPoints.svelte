<script lang="ts">
    import type ClassData from "../../interfaces/ClassData";
    import BoxWithHeaderToggle from '../BoxWithHeaderToggle.svelte';
    import InPlaceEdit from "../InPlaceEdit.svelte";
    import SimpleButton from "../SimpleButton.svelte";

    export let selectedClass: ClassData;

    $: averageHP = ~~(selectedClass.hp.hit_die/2) + 1;

</script>

<div class="hit-points">

    <BoxWithHeaderToggle 
        label='Hit Dice'
        headerText='1d{selectedClass.hp.hit_die} per {selectedClass.name} level'
        gridArea='hit-dice'
    >
        {selectedClass.level}d{selectedClass.hp.hit_die}
    </BoxWithHeaderToggle>

    <BoxWithHeaderToggle 
        label='Hit Points at Higher Levels'
        headerText='1d{selectedClass.hp.hit_die} (or {averageHP}) + CON mod per {selectedClass.name} level after 1st'
        gridArea='hp-at-higher-levels'
    >
        1d{selectedClass.hp.hit_die} (or {averageHP}) + ???
    </BoxWithHeaderToggle>

    <BoxWithHeaderToggle 
        label='Hit Points at 1st Level' 
        headerText='{selectedClass.hp.hit_die} + CON mod' 
        gridArea='hp-at-1st-level'
    >
        ???
    </BoxWithHeaderToggle>

    <div class="current-hp">
        <box class="current-hp-edit-box">
            <div class="box-main-text">
                <InPlaceEdit bind:value={selectedClass.hp.current} editWidth="3rem" editHeight="3rem" on:submit={() => {}}/>
            </div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Current HP
            </div>
        </box>
        <div class="roll-calc-hp">
            <SimpleButton value='Roll' icon="casino" type='primary' onClickFn={() => {}}></SimpleButton>
            <SimpleButton value='Calc' icon="calculate" type='default' onClickFn={() => {}}></SimpleButton>
        </div>
    </div>     
</div>

<style>
    .hit-points { grid-area: hit-points; 
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        gap: 0.5em; 
        grid-template-areas: 
            "hit-dice hp-at-higher-levels"
            "hp-at-1st-level current-hp"; 
        font-family: Quicksand;
    }

    .current-hp { grid-area: current-hp; 
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        gap: 0.5em; 
        grid-template-areas: 
            "current-hp-edit-box roll-calc-hp"
            "current-hp-edit-box roll-calc-hp";
    }

    .roll-calc-hp { grid-area: roll-calc-hp; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }

    .current-hp-edit-box { grid-area: current-hp-edit-box; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;    
    }

    .current-hp-edit-box .box-main-text {
        font-size: 1.5em;
        margin-bottom: -0.6vw;
    }

</style>