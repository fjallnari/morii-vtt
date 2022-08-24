<script lang="ts">
    import type QuickCreateCharacterParts from "../../interfaces/QuickCreateCharacterParts";
    import type QuickCreateData from "../../interfaces/QuickCreateData";
    import { formatModifier } from "../../stores";
    import InPlaceEdit from "../InPlaceEdit.svelte";
    import { Icon } from '@smui/icon-button';
    import { getASModifier } from "../../util/util";

    export let characterParts: QuickCreateCharacterParts;
    export let quickCreateData: QuickCreateData;

    interface GenOption {
        name: string,
        genFce: () => number[]
    }

    let asFinalArray: number[] = [];
    let selectedGenOption: GenOption = undefined;

    const asGenOpts: GenOption[] = [
        { name: 'Standard Array', genFce: () => [15, 14, 13, 12, 10, 8], }
    ];

    const selectGenOption = (genOption: GenOption) => {
        if (selectedGenOption === genOption) {
            selectedGenOption = undefined;
            asFinalArray = [];
            return;
        }

        selectedGenOption = genOption;
        asFinalArray = genOption.genFce();
    }

    $: abilityScores = characterParts.ability_scores;

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
                        {$formatModifier(getASModifier(abilityScores, AS))}
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
                        <InPlaceEdit bind:value={abilityScores[AS].base} editWidth="60%" editHeight="60%" on:submit={() => {}}/>
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
                        <InPlaceEdit bind:value={abilityScores[AS].asi_bonus} editWidth="60%" editHeight="60%" on:submit={() => {}}/>
                    </div>
                    <div class="box-justify-filler"></div>
                    <div class="box-label">
                        ASI
                    </div>
                </box>
                <operand>+</operand>
                <box class="other-bonus as-bonus-box">
                    <div class="box-main-text">
                        <InPlaceEdit bind:value={abilityScores[AS].other_bonus} editWidth="60%" editHeight="60%" on:submit={() => {}}/>
                    </div>
                    <div class="box-justify-filler"></div>
                    <div class="box-label">
                        Other
                    </div>
                </box>
            </ability-score-line>
        {/each}
    </div>

    <div class="roll-options">
        <box class="as-gen-opts">
            {#each asGenOpts as genOption}
                <box class='gen-option' on:click={() => {selectGenOption(genOption)}} style='background-color: {selectedGenOption === genOption ? 'var(--clr-accent-dark)': ''}'>
                    <div class="option-selected">
                        <Icon class="material-icons">{selectedGenOption === genOption ? 'keyboard_double_arrow_right': 'fork_right'}</Icon>
                    </div>
                    <div class='option-name'>{genOption.name}</div>
                </box>
            {/each}
        </box>
        <box class="as-array">
            <div class="box-main-text">
                {`[ ${asFinalArray.sort((a,b) => ~~b - ~~a).join(', ')} ]`}
            </div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Base Values Array
            </div>
        </box>
        <box class="assign-array"></box>
    </div>
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
        width: 90%;
        height: calc(100%/6);
    }

    operand {
        font-size: 2em;
    }

    .as-final-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 85%;
    }

    .ability-score-modifier {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 60%;
        width: 60%;
        z-index: 2;
        margin-bottom: -25%;

        font-size: 1.2em;
        font-weight: var(--semi-bold);
        font-family: Quicksand;
        background-color: var(--clr-accent-dark);
    }

    .ability-score-value {
        width: 100%;
        background-color: var(--clr-box-bg-light);
    }

    .ability-score-value :global(.box-main-text) {
        margin-bottom: -25%;
        z-index: 3;
    }

    :global(.as-bonus-box .box-main-text) {
        font-size: 1.2em;
    }

    .as-bonus-box {
        height: 65%;
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .race-bonus {
        background-color: var(--clr-box-bg-light);
    }

    .roll-options { grid-area: roll-options; 
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr; 
        gap: 0.5em 0.5em; 
        grid-template-areas: 
            "as-gen-opts as-gen-opts as-array as-array"
            "as-gen-opts as-gen-opts assign-array assign-array"
            "as-gen-opts as-gen-opts assign-array assign-array"
            "as-gen-opts as-gen-opts assign-array assign-array";
    }

    .as-gen-opts { grid-area: as-gen-opts; 
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        gap: 0.5em;
    }

    .as-gen-opts > .gen-option {
        background-color: var(--clr-box-bg-light);
        width: 90%;
        display: grid; 
        grid-template-columns: 1fr 8fr; 
        grid-template-rows: 2fr; 
        gap: 0.5em;
        grid-template-areas: "option-selected option-name";

        /* display: flex;
        justify-content: center;
        align-items: center; */

        padding: 0.2em 0em;
        font-size: 1.2em;
        cursor: pointer;
    }

    .gen-option > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .option-selected { grid-area: option-selected; }
    .option-name { grid-area: option-name;}

    .as-array { grid-area: as-array; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }

    .as-array .box-main-text {
        font-size: 1.5em;
    }

    .assign-array { grid-area: assign-array; }

    .asi { grid-area: asi; }

</style>