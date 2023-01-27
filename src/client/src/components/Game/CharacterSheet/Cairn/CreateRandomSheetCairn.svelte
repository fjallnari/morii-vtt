<script lang="ts">
    import Dialog from "@smui/dialog/src/Dialog.svelte";
    import axios from "axios";
    import { nanoid } from "nanoid/non-secure";
    import { params } from "svelte-spa-router";
    import type { CharacterCairn, ItemCairn } from "../../../../interfaces/Cairn/CharacterCairn";
    import type { CharacterAny } from "../../../../interfaces/CharacterAny";
    import type MessageData from "../../../../interfaces/MessageData";
    import { modifyCharacter, selectedCharacter, sendSkillCheck, socket, user } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import LoadingCircle from "../../../LoadingCircle.svelte";
    import SimpleButton from "../../../SimpleButton.svelte";
    import SimpleToggle from "../../../SimpleToggle.svelte";

    const cairn = $user.gameData.cairn;

    export let character: Partial<CharacterCairn> = {};
    export let rerollExistingSheet: boolean = false;
    export let createCharacter: (characterTemplate?: {}) => Promise<void> = async ({}) => {};

    let randomSheetDialogOpen: boolean = false;

    let rollArrayIds: string[] = [];
    let newStats: Partial<CharacterCairn> = {};
    let rollsCount: number = 0;
    let rollsNeeded = 6;
    let inProgress = false;

    let stats = [
        { name: 'age', formula: '2d20+10' }, 
        { name: 'HP', formula: '1d6' },
        { name: 'gold', formula: '3d6' }
    ];

    let rollOptions = {
        everything: true,
        subOptions: {
            name: {
                name: 'Name',
                rollEnabled: false,
                custom: ''
            },
            background: {
                name: 'Background',
                rollEnabled: false,
                custom: ''
            },
            ability_scores: {
                name: 'Ability Scores',
                rollEnabled: false,
            },
            other: {
                name: 'Other (Age, HP, Gold)',
                rollEnabled: false,
            },
        }
    }

    const getRandomArmor = (): ItemCairn | undefined => {
        const armor = [
            ...Array(3).fill(undefined), 
            ...Array(11).fill('Brigandine (1 Armor, bulky)'), 
            ...Array(5).fill('Chainmail (2 Armor, bulky)'), 
            'Plate (3 Armor, bulky)'
        ].random();

        return armor ? { name: armor, type: 'armor', bulky: armor.includes('bulky'), armor: armor.match(/[0-9] Armor/g)[0].split(' ')[0]} : undefined;
    }

    const getRandomWeapon = () => {
        const weapon = [
            ...Array(5).fill(['Dagger (d6 damage)', 'Cudgel (d6 damage)', 'Staff (d6 damage)'].random()),
            ...Array(9).fill(['Sword (d8 damage)', 'Mace (d8 damage)', 'Axe (d8 damage)'].random()),
            ...Array(5).fill(['Longbow (d8 damage, bulky)', 'Crossbow (d8 damage, bulky)', 'Sling (d4 damage)'].random()),
            ['Halberd (d10 damage, bulky)', 'War Hammer (d10 damage, bulky)', 'Battleaxe (d10 damage, bulky)'].random()
        ].random();
        return { name: weapon.split('(')[0].trim(), type: 'weapon', bulky: weapon.includes('bulky'), damage: weapon.match(/d[0-9]+/g)[0] };
    }

    const getHelmetShield = (): ItemCairn[] => {
        const helmetShield = {
            'helmet': { name: 'Helmet (+1 Armor)', type: 'armor', armor: '1' },
            'shield': { name: 'Shield (+1 Armor)', type: 'armor', armor: '1' },
        }

        return [
            ...Array(14).fill([]),
            ...Array(3).fill([helmetShield['helmet']]),
            ...Array(3).fill([helmetShield['shield']]),
            [helmetShield['helmet']].concat(helmetShield['shield'])
        ].random();
    }

    const getRandomSpellbook = (): ItemCairn => {
        const spellbook = cairn.spellbooks.random();
        return { name: spellbook.name, type: 'spellbook', description: spellbook.description };
    }

    const getRandomItem = (rollTable: string[]) => {
        const item = rollTable.random();
        return { name: item, type: 'item', bulky: item.includes('bulky'), stacks: item.includes('stacks')}
    }

    const getBonusItem = () => {
        return [
            ... Array(5).fill(getRandomItem(cairn.tools.concat(cairn.trinkets))),
            ... Array(8).fill(getRandomItem(cairn.gear)),
            ... Array(4).fill([getRandomArmor(), getRandomWeapon()].random()),
            ... Array(3).fill(getRandomSpellbook())
        ].random();
    }

    const getRandomInventory = (): ItemCairn[] =>  {
        let items: ItemCairn[] | undefined = [
            { name: 'Torch', type: 'item' }, 
            { name: 'Three days’ rations', type: 'item'},
            getRandomArmor(),
            getRandomWeapon(),
            ... getHelmetShield(),
            ... ['gear', 'tools', 'trinkets'].map(itemCategory => getRandomItem(cairn[itemCategory])),
            getBonusItem()
        ].filter(item => item);
        return items;
    }

    const getTrait = (traitName: string) => {
        return cairn.traits[traitName].random().toLowerCase();
    }

    const rerollCharacter = async (sheetTemplate: Partial<CharacterCairn>) => {
        if (inProgress) { return }
        inProgress = true;

        const name = rollOptions.everything || rollOptions.subOptions.name.rollEnabled ? 
            `${cairn.names.female.concat(cairn.names.male).random()} ${cairn.names.surnames.random()}`: rollOptions.subOptions.name.custom;
        const background = rollOptions.everything || rollOptions.subOptions.background.rollEnabled ? cairn.backgrounds.random() : rollOptions.subOptions.background.custom;
        const appearance = `You have a ${getTrait('physique')} physique, ${getTrait('skin')} skin, ${getTrait('hair')} hair, and a ${getTrait('face')} face. You speak in a ${getTrait('speech')} manner and wear ${getTrait('clothing')} clothing. You are ${getTrait('vice')} yet ${getTrait('virtue')}, and are generally regarded as a ${getTrait('reputation')}. You have had the misfortune of being ${getTrait('misfortunes')}.`
        const inventory = getRandomInventory();

        if (!rerollExistingSheet) {
            character = sheetTemplate ?? {};
        }

        character = Object.assign(character, {
            name: name,
            background: background,
            appearance: appearance,
            inventory: inventory,
            deprived: false,
            armor: inventory.reduce(
                (acc, item) => acc + (item.armor ? ~~item.armor : 0),
                0
            ).toString(),
        });

        // this is split so the new character name updates before stats are rolled
        character = Object.assign(character, {
            ... await rollAllStats()
        });

        if (!rerollExistingSheet) {
            createCharacter(character);
        }

        else {
            selectedCharacter.set(character as CharacterAny);
            $modifyCharacter();
        }
        inProgress = false;
        randomSheetDialogOpen = true;
    }

    const rollStat = (name: string, formula: string) => {
        const customID = nanoid(16);
        rollArrayIds = rollArrayIds.concat([customID]);
        $sendSkillCheck(0, `roll for ${name} | ${formula}`, `${character.name.split(' ')[0]}`, '-', '', customID, formula, name);
    }

    const rollAllStats = async () => {
        rollArrayIds = [];
        rollsCount = 0;
        rollsNeeded = rollOptions.everything ? 6 : [rollOptions.subOptions.other, rollOptions.subOptions.ability_scores].reduce((acc, option) => acc + (option.rollEnabled ? 3 : 0), 0);

        if (rollOptions.everything || rollOptions.subOptions.other.rollEnabled) {
            for (const stat of stats) {
                rollStat(stat.name, stat.formula);
            }
        }

        if (rollOptions.everything || rollOptions.subOptions.ability_scores.rollEnabled) {
            Object.assign(newStats, { ability_scores: character.ability_scores } );

            for (const AS in character.ability_scores) {
                rollStat(AS, '3d6');
            }
        }

        return await circleCheck() as object;
    }

    /**
     * Checks if the asFinalArray was filled, if not recursively calls itself
     * If the limit is reached it resolves with blank array just so it doesn't loop till eternity
    */
    const circleCheck = async (recursionLayer = 0, checkRecursionLimit = 20) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (rollsCount >= rollsNeeded) {
                    resolve(newStats);
                }
                else {
                    if (recursionLayer < checkRecursionLimit) {
                        recursionLayer += 1;
                        circleCheck();
                    }
                    else {
                        resolve({});         
                    }
                }
            }, 200);
        });
    };

    $socket.on('chat-message', (incomingMessage: MessageData) => {
        if (rollArrayIds.includes(incomingMessage.messageID)) {
            const rollResult = incomingMessage.rollResult.total.toString();
            const flag = incomingMessage.skillCheckInfo.flag;

            switch (flag) {
                case 'age':
                    Object.assign(newStats, { age: rollResult });
                    break;
                case 'HP':
                    Object.assign(newStats, { hp: rollResult, hp_max: rollResult});
                    break;
                case 'gold':
                    Object.assign(newStats, { coins: {
                        gp: rollResult,
                        sp: '',
                        cp: ''
                    }});
                    break;
            }

            if (Object.keys(character.ability_scores).includes(flag)) {
                newStats.ability_scores[flag].current = character.ability_scores[flag].max = rollResult;
            }

            rollsCount += 1;
        }       
    });

    const getSheetTemplate = async () => {
        if (!rerollExistingSheet) {
            try {
                const response = await axios.get(`/api/character-skeleton/${$params.id}`);
                return response.data.characterSkeleton;
            }
            catch (err){
                return {};
            }
        }

        return {};
    }

</script>

<SimpleButton 
    value='{rerollExistingSheet ? 'Re-roll character': 'Create random'}' 
    icon="mdi:dice-multiple" 
    iconWidth='1.25em'
    type='primary'
    onClickFn={() => {randomSheetDialogOpen = true}}>
</SimpleButton>

<Dialog
    bind:open={randomSheetDialogOpen}
    surface$style="padding: 1em 2em; height: 35em; width: 30em;"
>
    {#await getSheetTemplate()}
        <div class="loading-container">
            <LoadingCircle/>
            <SimpleButton value="Cancel" icon="mdi:close" onClickFn={() => randomSheetDialogOpen = false}></SimpleButton>
        </div>
    {:then sheetTemplate}
        <div class="random-character-dialog">
            <div class="rd-title">
                <h3>Create random character</h3>
            </div>
            <dialog-content class="rd-content">
                <line-div>
                    <SimpleToggle bind:checked={rollOptions.everything}></SimpleToggle>
                    <h4>Roll for everything</h4>
                </line-div>
                {#if !rollOptions.everything}
                    {#each Object.keys(rollOptions.subOptions) as subOption}
                        <line-div>
                            <div class="sub-option-padding"></div>
                            <SimpleToggle bind:checked={rollOptions.subOptions[subOption].rollEnabled}></SimpleToggle>
                            <h4>{rollOptions.subOptions[subOption].name}</h4>
                            {#if !rollOptions.subOptions[subOption].rollEnabled && typeof rollOptions.subOptions[subOption].custom === 'string'}
                                <div class="custom-option">
                                    <div class="option-delimiter">:</div>
                                    <InPlaceEdit bind:value={rollOptions.subOptions[subOption].custom} editWidth='10em' editHeight='2em' on:submit={() => {}}/>
                                </div>
                            {/if}
                        </line-div>
                    {/each}
                {/if}
            </dialog-content>
            <div class="rd-buttons">
                <SimpleButton 
                    value='Cancel' 
                    icon="mdi:cancel" 
                    iconWidth='1.25em'
                    onClickFn={() => randomSheetDialogOpen = false}>
                </SimpleButton>
                <SimpleButton 
                    value='Create' 
                    icon="mdi:create"
                    type="primary"
                    iconWidth='1.25em'
                    onClickFn={() => rerollCharacter(sheetTemplate)}>
                </SimpleButton> 
            </div>
        </div>
    {/await}
</Dialog>

<style>

    .random-character-dialog {
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr; 
        grid-template-rows: 0.4fr 2.2fr 0.4fr; 
        gap: 1em; 
        grid-template-areas: 
            "rd-title rd-title rd-title"
            "rd-content rd-content rd-content"
            "rd-buttons rd-buttons rd-buttons";
        min-height: 0;
        height: 100%;
    }

    .random-character-dialog > div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }

    .rd-title { grid-area: rd-title; }

    .rd-title h3 {
        color: var(--clr-text);
        font-size: 1.5em;
        font-family: Montserrat;
        text-transform: uppercase;
        font-weight: 400;
        margin: 0.5em;
    }

    .rd-content { grid-area: rd-content; 
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: baseline;
        gap: 0.5em;
        overflow: hidden;
    }

    .rd-content h4 {
        font-family: Athiti;
        font-size: 1.1em;
        font-weight: 400;
        margin: 0em;
        align-self: center;
        text-transform: uppercase;
    }
    
    .rd-content .custom-option {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25em;
        font-family: Quicksand;
    }

    line-div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5em;
    }

    .sub-option-padding {
        padding-right: 1rem;
    }

    .option-delimiter {
        margin-left: -0.4em;
        font-weight: var(--semi-bold);
    }

    :global(.rd-buttons simple-button) {
        padding: 0.4rem 0em;
    }

    .rd-buttons { grid-area: rd-buttons; 
        gap: 1em;
    }

    .loading-container {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1em;
    }

    :global(.loading-container > simple-button) {
        max-width: 5em;
        padding: 0.2em 0.4em;
    }
        
</style>