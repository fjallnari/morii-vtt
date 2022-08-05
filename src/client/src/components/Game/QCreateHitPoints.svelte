<script lang="ts">
    import type ClassData from "../../interfaces/ClassData";
    import SimpleButton from "../SimpleButton.svelte";

    export let selectedClass: ClassData;

</script>

<div class="hit-points">
    <box class="hit-dice">
        <box-header>
            1d{selectedClass.hp.hit_die} per {selectedClass.name} level
        </box-header>
        <div class="box-main-text">
            {selectedClass.level}d{selectedClass.hp.hit_die}
        </div>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Hit Dice
        </div>
    </box>
    <box class="hp-at-higher-levels">
        <box-header>
            1d{selectedClass.hp.hit_die} (or {~~(selectedClass.hp.hit_die/2) + 1}) + CON mod per {selectedClass.name} level after 1st
        </box-header>
        <div class="box-main-text">1d{selectedClass.hp.hit_die} + ???</div>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Hit Points at Higher Levels
        </div>
    </box>
    <box class="hp-at-1st-level">
        <box-header>
            {selectedClass.hp.hit_die} + CON mod
        </box-header>
        <div class="box-main-text">???</div>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Hit Points at 1st Level
        </div>
    </box>
    <div class="current-hp">
        <box class="current-hp-edit-box">
            <div class="box-main-text">X</div>
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

    .hit-points > box {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    box-header {
        font-family: Quicksand;
        text-transform: none;
        margin-top: 0.2em;
        font-size: 0.6vw;
    }

    .box-main-text {
        margin-bottom: 0em;
        font-weight: var(--semi-bold);
    }

    .hit-dice { grid-area: hit-dice; }

    .hit-dice .box-main-text {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.1em;
    }

    .hp-at-higher-levels { grid-area: hp-at-higher-levels; }
    .hp-at-1st-level { grid-area: hp-at-1st-level; }

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
        margin-bottom: -0.6vw;
    }
</style>