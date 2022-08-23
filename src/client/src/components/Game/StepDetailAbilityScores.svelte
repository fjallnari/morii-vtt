<script lang="ts">
    import type QuickCreateCharacterParts from "../../interfaces/QuickCreateCharacterParts";
    import type QuickCreateData from "../../interfaces/QuickCreateData";
    import { formatModifier } from "../../stores";
    import InPlaceEdit from "../InPlaceEdit.svelte";

    export let characterParts: QuickCreateCharacterParts;
    export let quickCreateData: QuickCreateData;

    $: abilityScores = characterParts.ability_scores; 

    const getASModifier = ((AS: string) => {
        return (~~(abilityScores[AS] ? abilityScores[AS].value : 0) - 10) / 2 >> 0;
    });

    $: Object.keys(abilityScores).forEach(AS => {
        let charASObj = abilityScores[AS];
        charASObj.value = (~~charASObj.base + ~~characterParts.race?.as_increase[AS] + ~~charASObj.asi_bonus + ~~charASObj.other_bonus).toString();
    });

</script>


<qc-ability-scores>
    <div class="ability-scores">
        {#each Object.keys(abilityScores) as AS}
            <ability-score-line>
                <div class="as-final-info">
                    <box class="ability-score-modifier">
                        {$formatModifier(getASModifier(AS))}
                    </box>
    
                    <box class="ability-score-value box-with-label">
                        <div class="box-main-text">
                            {abilityScores[AS].value}
                        </div>
                        <div class="box-justify-filler"></div>
                        <div class="box-label">
                            {abilityScores[AS].name}
                        </div>
                    </box>
                </div>
                <operand>=</operand>
                <box class="base-as as-bonus-box">
                    <div class="box-main-text">
                        <InPlaceEdit bind:value={abilityScores[AS].base} editWidth="3rem" editHeight="3rem" on:submit={() => {}}/>
                    </div>
                    <div class="box-justify-filler"></div>
                    <div class="box-label">
                        Base
                    </div>
                </box>
                <operand>+</operand>
                <box class="race-bonus as-bonus-box" style='background-color: {~~characterParts.race?.as_increase[AS] ? 'var(--clr-accent-normal)' : 'var(--clr-box-bg-light)'};'>
                    <div class="box-main-text">
                        {~~characterParts.race?.as_increase[AS]}
                    </div>
                    <div class="box-justify-filler"></div>
                    <div class="box-label">
                        Race Bonus
                    </div>
                </box>
                <operand>+</operand>
                <box class="asi-bonus as-bonus-box">
                    <div class="box-main-text">
                        <InPlaceEdit bind:value={abilityScores[AS].asi_bonus} editWidth="3rem" editHeight="3rem" on:submit={() => {}}/>
                    </div>
                    <div class="box-justify-filler"></div>
                    <div class="box-label">
                        ASI
                    </div>
                </box>
                <operand>+</operand>
                <box class="other-bonus as-bonus-box">
                    <div class="box-main-text">
                        <InPlaceEdit bind:value={abilityScores[AS].other_bonus} editWidth="3rem" editHeight="3rem" on:submit={() => {}}/>
                    </div>
                    <div class="box-justify-filler"></div>
                    <div class="box-label">
                        Other Bonus
                    </div>
                </box>
            </ability-score-line>
        {/each}
    </div>
    <box class="roll-options"></box>
    <box class="asi"></box>
</qc-ability-scores>

<style>
    qc-ability-scores { grid-area: step-detail;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        gap: 0.5em 0.5em; 
        grid-template-areas: 
            "ability-scores ability-scores ability-scores ability-scores ability-scores roll-options roll-options roll-options roll-options roll-options"
            "ability-scores ability-scores ability-scores ability-scores ability-scores roll-options roll-options roll-options roll-options roll-options"
            "ability-scores ability-scores ability-scores ability-scores ability-scores roll-options roll-options roll-options roll-options roll-options"
            "ability-scores ability-scores ability-scores ability-scores ability-scores roll-options roll-options roll-options roll-options roll-options"
            "ability-scores ability-scores ability-scores ability-scores ability-scores asi asi asi asi asi"
            "ability-scores ability-scores ability-scores ability-scores ability-scores asi asi asi asi asi"
            "ability-scores ability-scores ability-scores ability-scores ability-scores asi asi asi asi asi"
            "ability-scores ability-scores ability-scores ability-scores ability-scores asi asi asi asi asi"; 
    }

    .ability-scores { grid-area: ability-scores; 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        gap: 0.2em;    
    }

    ability-score-line {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        gap: 0.5em;
    }

    operand {
        font-size: 2em;
    }

    .as-final-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .ability-score-modifier {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 2.5em;
        width: 2.5em;
        z-index: 2;
        margin-bottom: -1.2em;

        font-size: 1.2em;
        font-weight: var(--semi-bold);
        font-family: Quicksand;
        background-color: var(--clr-accent-dark);
    }

    .ability-score-value {
        width: 5em;
        height: 5em;
        background-color: var(--clr-box-bg-light);
    }

    .ability-score-value :global(.box-main-text) {
        margin-bottom: -1.5em
    }

    :global(.as-bonus-box .box-main-text) {
        font-size: 1.2em;
    }

    .as-bonus-box {
        width: 5em;
        height: 5em;
        display: flex;
        flex-direction: column;
    }

    .race-bonus {
        background-color: var(--clr-box-bg-light);
    }

    .roll-options { grid-area: roll-options; }
    .asi { grid-area: asi; }

</style>