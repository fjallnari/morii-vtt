<script lang="ts">
    import { nanoid } from "nanoid/non-secure";
    import type ClassData from "../../../interfaces/ClassData";
    import type MessageData from "../../../interfaces/MessageData";
    import type { QCAbilityScores } from "../../../interfaces/QCAbilityScores";
    import { sendSkillCheck, socket, formatModifier } from "../../../stores";
    import { getASModifier } from "../../../util/util";
    import BoxWithHeaderToggle from "../../BoxWithHeaderToggle.svelte";
    import InPlaceEdit from "../../InPlaceEdit.svelte";
    import SimpleButton from "../../SimpleButton.svelte";

    export let selectedClass: ClassData;
    export let abilityScores: QCAbilityScores;

    $: modCON = getASModifier(abilityScores, 'CON');
    $: averageHPPerLevel = ~~(~~selectedClass.hp.hit_die/2) + 1;
    $: level1HP = ~~selectedClass.hp.hit_die + modCON;

    let hpRollID = '---';

    const getAverageHP = () => {
        // HP at first level + (average hp per level + CON mod) * (level - 1)
        selectedClass.hp.current = (level1HP + (averageHPPerLevel + modCON) * (selectedClass.level - 1)).toString();
    }

    const rollForHP = () => {
        if (selectedClass.level === 1) {
            selectedClass.hp.current = level1HP.toString();
            return;
        }

        // HP at first level + (hit die per level + CON mod) * (level - 1)
        const formula = `${level1HP}+${(selectedClass.level - 1)}d${selectedClass.hp.hit_die}+${(selectedClass.level - 1) * modCON}`

        hpRollID = nanoid(16);
        $sendSkillCheck(0, `Roll for HP ~ Level ${selectedClass.level} ${selectedClass.name} ~ ${formula}`, 'Q-Create', '-', formula, hpRollID);
    }

    $socket.on('chat-message', (incomingMessage: MessageData) => {
        if (incomingMessage.messageID === hpRollID){
            selectedClass.hp.current = incomingMessage.rollResult.total.toString();
        }
    });

</script>

<div class="hit-points">
    <BoxWithHeaderToggle 
        label='Hit Dice'
        headerText='1d{selectedClass.hp.hit_die} per {selectedClass.name} level'
        gridArea='hit-dice'
    >
        {selectedClass.level}d<InPlaceEdit bind:value={selectedClass.hp.hit_die} editWidth="2rem" editHeight="2rem"/>
    </BoxWithHeaderToggle>

    <BoxWithHeaderToggle 
        label='Hit Points at Higher Levels'
        headerText='1d{selectedClass.hp.hit_die} (or {averageHPPerLevel}) + CON mod per {selectedClass.name} level after 1st'
        gridArea='hp-at-higher-levels'
    >
        1d{selectedClass.hp.hit_die} (or {averageHPPerLevel}) {$formatModifier(modCON).split('').join(' ')}
    </BoxWithHeaderToggle>

    <BoxWithHeaderToggle 
        label='Hit Points at 1st Level' 
        headerText='{selectedClass.hp.hit_die} + CON mod' 
        gridArea='hp-at-1st-level'
    >
        {level1HP}
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
            <SimpleButton value='Roll' icon="casino" type='primary' onClickFn={() => rollForHP()}></SimpleButton>
            <SimpleButton value='AVG' icon="calculate" type='primary' onClickFn={() => getAverageHP()}></SimpleButton>
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