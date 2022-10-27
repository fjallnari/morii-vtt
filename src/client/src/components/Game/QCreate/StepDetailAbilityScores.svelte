<script lang="ts">
    import type QuickCreateCharacterParts from "../../../interfaces/QuickCreateCharacterParts";
    import type QuickCreateData from "../../../interfaces/QuickCreateData";
    import { formatModifier, isMessagePublic, sendSkillCheck, socket } from "../../../stores";
    import InPlaceEdit from "../../InPlaceEdit.svelte";
    import { findHighestPossibleValue, getASModifier, getRandomIndex } from "../../../util/util";
    import ChipsDndZone from ".././ChipsDndZone.svelte";
    import type MessageData from "../../../interfaces/MessageData";
    import { nanoid } from "nanoid/non-secure";
    import IconButton, { Icon } from '@smui/icon-button';
    import BoxWithList from "../../BoxWithList.svelte";
    import SimpleAccordionDetail from ".././SimpleAccordionDetail.svelte";
    import MarkdownBoxText from ".././MarkdownBoxText.svelte";
    import type { QCAbilityScores } from "../../../interfaces/QCAbilityScores";

    export let characterParts: QuickCreateCharacterParts;
    export let quickCreateData: QuickCreateData;
    export let isCompleted: boolean;

    interface GenOption {
        name: string,
        genFce: () => Promise<number[]>
    }

    let rollArrayIds: string[] = [];
    let selectedGenOption: GenOption = undefined;
    let selectedAssignOption = undefined;

    $: abilityScores = characterParts.ability_scores;
    $: genInfo = characterParts.as_gen_info;

    $ : isCompleted = abilityScores 
        && abilityScores !== undefined
        && Object.keys(abilityScores).every(AS => abilityScores[AS].base !== '');

    const asGenOpts: GenOption[] = [
        { name: 'Standard Array', genFce: async () => [15, 14, 13, 12, 10, 8] },
        { name: 'Custom Array', genFce: async () => {
            try {
                return JSON.parse("[" + genInfo.customField + "]");
            }
            catch {
                return [];
            }
        }},
        { name: 'Roll 4d6kh3', genFce: async () => rollASArray('4d6kh3') },
        { name: 'Roll 3d6', genFce: async () => rollASArray('3d6') },
        { name: 'Custom Roll', genFce: async () => rollASArray(genInfo.customField) },
    ];

    const asAssignOpts = [
        { name: 'Assign randomly', assignFce: () => assignRandom() },
        { name: 'Use custom priority', assignFce: () => assignCustomPrio() },
        { name: 'Auto-assign', assignFce: () => assignAuto() },
    ];

    const selectGenOption = async (genOption: GenOption) => {
        if (selectedGenOption === genOption) {
            selectedGenOption = undefined;
            genInfo.baseArray = [];
            return;
        }

        selectedGenOption = genOption;
        genInfo.baseArray = await genOption.genFce();
    }

    const selectAssignOption = (assignOption) => {
        if (selectedAssignOption === assignOption) {
            selectedAssignOption = undefined;

            Object.keys(abilityScores).forEach(AS => {
                abilityScores[AS].base = '';
            });

            return;
        }

        selectedAssignOption = assignOption;
        assignOption.assignFce();
    }

    const assignRandom = () => {
        if (!genInfo.baseArray || genInfo.baseArray.length === 0) { 
            return; 
        }

        let finalArrayCopy = [... genInfo.baseArray];

        Object.keys(abilityScores).forEach(AS => {
            const randomIndex = getRandomIndex(finalArrayCopy.length);
            abilityScores[AS].base = finalArrayCopy[randomIndex]?.toString() ?? 'ERR';
            finalArrayCopy.splice(randomIndex, 1);    
        });
    };

    const assignCustomPrio = () => {
        
        if (!genInfo.baseArray || genInfo.baseArray.length === 0) { 
            return; 
        }

        const sortedValuesArr = genInfo.baseArray.sort((a,b) => ~~b - ~~a);
        
        genInfo.customAssignPrio.forEach((tag, index) => {
            abilityScores[tag.name].base = sortedValuesArr[index]?.toString() ?? 'ERR';
        });
    }

    const assignAuto = () => {
        if (!genInfo.baseArray || genInfo.baseArray.length === 0 || !characterParts.class) { 
            return; 
        }

        const sortedValuesArr = genInfo.baseArray.sort((a,b) => ~~b - ~~a);

        characterParts.class.as_prio.forEach((tag, index) => {
            abilityScores[tag].base = sortedValuesArr[index]?.toString() ?? 'ERR';
        });        
    }

    /**
     * Checks if the asFinalArray was filled, if not recursively calls itself
     * If the limit is reached it resolves with blank array just so it doesn't loop till eternity
     */
    const circleCheck = async (recursionLayer = 0, checkRecursionLimit = 20) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (genInfo.baseArray.length === 6) {
                    resolve(genInfo.baseArray);
                }
                else {
                    if (recursionLayer < checkRecursionLimit) {
                        recursionLayer += 1;
                        circleCheck();
                    }
                    else {
                        resolve([]);         
                    }
                }
            }, 200);
        });
    };

    const rollASArray = async (formula: string = '4d6kh3') => {
        if (!formula || formula.trim() === '') { return [] };

        genInfo.baseArray = [];
        rollArrayIds = [];

        let rollBatchID = nanoid(6);

        for (let i = 0; i < 6; i++) {
            const newCustomID = nanoid(16);
            rollArrayIds = rollArrayIds.concat([newCustomID]);
            $sendSkillCheck(0, `[${rollBatchID}] Roll stats ~ ${formula}`, !characterParts.name || characterParts.name === '' ? 'Q-Create' : characterParts.name, '-', formula, newCustomID);
        }

        return await circleCheck() as number[];
    }

    $socket.on('chat-message', (incomingMessage: MessageData) => {
        if (rollArrayIds.includes(incomingMessage.messageID)){
            genInfo.baseArray = genInfo.baseArray.concat([incomingMessage.rollResult.total]);
        }       
    });    

    $: Object.keys(abilityScores).forEach(AS => {
        let charASObj = abilityScores[AS];
        charASObj.value = (~~charASObj.base + ~~characterParts.race?.as_increase[AS] + ~~charASObj.asi_bonus + ~~charASObj.other_bonus).toString();
    });

    const addFeat = () => {
        genInfo.feats = genInfo.feats.concat([{ name: '', content: '' }]); 
    }

    const deleteFeat = (feat) => {
        genInfo.feats = genInfo.feats.filter((featIter) => featIter !== feat);
    }

    // _ is there for reactivity
    const changeASIBonus = (_: QCAbilityScores, tag: string, delta: number) => {
        abilityScores[tag].asi_bonus = (~~abilityScores[tag].asi_bonus + delta).toString();
    }

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
                    <div class='asi-bonus-buttons'>
                        <sendable on:click={changeASIBonus(abilityScores, AS, 1)}>
                            <Icon class="material-icons">keyboard_double_arrow_up</Icon>
                        </sendable>
                        <sendable on:click={changeASIBonus(abilityScores, AS, -1)}>
                            <Icon class="material-icons">keyboard_double_arrow_down</Icon> 
                        </sendable>
                    </div>
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
            <div class='custom-gen-field'>
                <div>Custom: </div>
                <InPlaceEdit bind:value={genInfo.customField} editWidth="10rem" editHeight="1.5rem" on:submit={() => {}}/>
            </div>
            <div class='roll-visibility'>
                <div>{$isMessagePublic ? 'Public roll': 'Secret roll'}</div>
                <IconButton toggle bind:pressed={$isMessagePublic}>
                    <Icon class="material-icons" style="font-size: xx-large;" on>visibility</Icon>
                    <Icon class="material-icons" style="font-size: xx-large;">visibility_off</Icon>
                </IconButton>
            </div>
        </box>
        <box class="as-array">
            <div class="box-main-text">
                {`[ ${genInfo.baseArray.sort((a,b) => ~~b - ~~a).join(', ')} ]`}
            </div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Base Values Array
            </div>
        </box>
        <box class="assign-array as-gen-opts">
            {#each asAssignOpts as assignOpt}
                <box class='gen-option' on:click={() => {selectAssignOption(assignOpt)}} style='background-color: {selectedAssignOption === assignOpt ? 'var(--clr-accent-dark)': ''}'>
                    <div class="option-selected">
                        <Icon class="material-icons">{selectedAssignOption === assignOpt ? 'keyboard_double_arrow_right': 'fork_right'}</Icon>
                    </div>
                    <div class='option-name'>{assignOpt.name}</div>
                </box>
            {/each}
        </box>
        <box class='custom-prio'>
            <div class="custom-prio-chips box-main-text">
                <ChipsDndZone bind:items={genInfo.customAssignPrio} containerWidth='100%'></ChipsDndZone>
            </div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Custom priority (High to low)
            </div>
        </box>
    </div>
    <div class="asi">
        <div class="asi-available row-box-with-label">
            <box class="row-box-value">
                {characterParts.class ? findHighestPossibleValue(characterParts.class.asi, characterParts.class.level, '0') : 'X'}
            </box>
            <box class="row-box-label">
                ASI Available  
            </box>
        </div>

        <box class="asi-info">
            <MarkdownBoxText text={genInfo.asiInfo}></MarkdownBoxText>
            <div class="box-label auto-margin">
                Ability Score Improvement
            </div>
        </box>

        <BoxWithList label='Feats' inlineStyle='grid-area: feats;' addNewListItem={addFeat} isModifyDisabled>
            <div class="feats-list" slot='list'>
                {#each genInfo.feats as feat, index}
                    <SimpleAccordionDetail 
                        bind:value={feat.name} 
                        bind:content={feat.content}
                        icon='arm-flex'
                        editWidth='8rem'
                        deleteItem={() => deleteFeat(feat)}>
                    </SimpleAccordionDetail>
                {/each}
            </div>
        </BoxWithList>
    </div>
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
            "as-gen-opts as-gen-opts custom-prio custom-prio";
    }

    .as-gen-opts { grid-area: as-gen-opts; 
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.4em;
        padding-top: 0.5em;
        overflow-y: auto;
        font-family: Athiti;
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

    .asi-bonus {
        position: relative;
    }

    .asi-bonus-buttons {
        position: absolute;
        top: calc(100%/2 - 28px);
        right: 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .custom-gen-field {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 1.2em;
        gap: 0.5em;
    }

    .roll-visibility {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 1.2em;
        gap: 0.25em;
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

    .custom-prio { grid-area: custom-prio; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .custom-prio > .custom-prio-chips {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
    }

    .asi { grid-area: asi;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr; 
        gap: 0.5em 0.5em; 
        grid-template-areas: 
            "asi-available asi-available asi-available asi-available feats feats feats feats"
            "asi-info asi-info asi-info asi-info feats feats feats feats"
            "asi-info asi-info asi-info asi-info feats feats feats feats"
            "asi-info asi-info asi-info asi-info feats feats feats feats"
            "asi-info asi-info asi-info asi-info feats feats feats feats"
            "asi-info asi-info asi-info asi-info feats feats feats feats"; 
    }

    .feats-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.25em;
    }

    .asi-available { grid-area: asi-available; }

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
        font-weight: var(--semi-bold);
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

    .asi-info { grid-area: asi-info; 
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;    
    }

    .box-label.auto-margin {
        margin-top: auto;
    }

</style>