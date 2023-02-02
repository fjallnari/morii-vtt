<script lang="ts">
    import Dialog from "@smui/dialog/src/Dialog.svelte";
    import axios from "axios";
    import { nanoid } from "nanoid/non-secure";
    import Svelecte from "svelecte/src/Svelecte.svelte";
    import { params } from "svelte-spa-router";
    import type { CharacterCairn, ItemCairn } from "../../../../interfaces/Cairn/CharacterCairn";
    import type { CharacterAny } from "../../../../interfaces/CharacterAny";
    import type MessageData from "../../../../interfaces/MessageData";
    import { modifyCharacter, selectedCharacter, sendSkillCheck, socket, user } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import LoadingCircle from "../../../LoadingCircle.svelte";
    import SimpleButton from "../../../SimpleButton.svelte";
    import SimpleChip from "../../../SimpleChip.svelte";
    import SimpleIconButton from "../../../SimpleIconButton.svelte";
    import SimpleSegmentChoice from "../../../SimpleSegmentChoice.svelte";

    // TODO: replace with actual gear packages
    const MOCK_GEAR: { name: string, items: Partial<ItemCairn>[]}[]  = [
        {
            name: 'Cleric',
            items: [
                {
                    name: 'War Hammer (d10, bulky)'
                    // ...
                },
                {
                    name: 'Chainmail (2 Armor, bulky)',
                    // ...
                },
                {
                    name: 'Gauntlets (+1 Armor)',
                    // ...
                },
                {
                    name: 'Cleansing Blade (d6)',
                    // ...
                },
                {
                    name: 'Holy Symbol',
                    // ...
                },
                {
                    name: 'Cloak of the Order',
                    // ...
                }
            ]
        }
    ]

    const cairn = $user.gameData.cairn;

    export let character: Partial<CharacterCairn> = {};
    export let rerollExistingSheet: boolean = false;
    export let createCharacter: (characterTemplate?: {}) => Promise<void> = async ({}) => {};

    let randomSheetDialogOpen: boolean = false;

    let rollArrayIds: string[] = [];
    let newStats: Partial<CharacterCairn> = {};
    let rollsCount: number = 0;
    let rollsNeeded: number = 6;
    let inProgress: boolean = false;

    let stats = [
        { name: 'age', formula: '2d20+10' },
        { name: 'HP', formula: '1d6' },
        { name: 'gold', formula: '3d6' }
    ];

    let selectedMetaOption = 'All random';
    $: everythingRandom = selectedMetaOption === 'All random';

    let genOptions = {
        name: {
            name: 'Name',
            options: ['random', 'custom'],
            selectedOption: undefined,
            custom: ''
        },
        background: {
            name: 'Background',
            options: ['random', 'custom'],
            selectedOption: undefined,
            custom: ''
        },
        ability_scores: {
            name: 'Ability Scores',
            options: ['random', 'blank'],
            selectedOption: undefined,
        },
        other: {
            name: 'Other (Age, HP, Gold)',
            options: ['random', 'blank'],
            selectedOption: undefined,
        },
        inventory: {
            name: 'Inventory',
            options: ['random', 'gear'],
            selectedOption: undefined,
            gearPackage: undefined
        },
    }

    const getRandomArmor = (): Partial<ItemCairn> | undefined => {
        const armorName = [
            ...Array(3).fill(undefined),
            ...Array(11).fill('Brigandine'),
            ...Array(5).fill('Chainmail'),
            'Plate'
        ].random();

        return cairn.armors[armorName] ?? undefined;
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
        const helmetShield = [
            ...Array(14).fill([]),
            ...Array(3).fill(['Helmet']),
            ...Array(3).fill(['Shield']),
            ['Helmet', 'Shield']
        ].random();

        return helmetShield.map((item: string) => cairn.armors[item]);
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
        return cairn.traits[traitName].random();
    }

    const rerollCharacter = async (sheetTemplate: Partial<CharacterCairn>) => {
        if (inProgress) { return }
        inProgress = true;

        const name = everythingRandom || genOptions.name.selectedOption === 'random' ?
            `${cairn.names.female.concat(cairn.names.male).random()} ${cairn.names.surnames.random()}`: genOptions.name.custom ?? '';
        const background = everythingRandom || genOptions.background.selectedOption === 'random' ? cairn.backgrounds.random() : genOptions.background.custom ?? '';
        const appearance = `You have ${getTrait('physique')} physique, ${getTrait('skin')} skin, ${getTrait('hair')} hair, and ${getTrait('face')} face. You speak in a ${getTrait('speech')} manner and wear ${getTrait('clothing')} clothing. You are ${getTrait('vice')} yet ${getTrait('virtue')}, and are generally regarded as ${getTrait('reputation')}. You have had the misfortune of being ${getTrait('misfortunes')}.`

        const inventory = everythingRandom || genOptions.inventory.selectedOption === 'random' ? getRandomInventory() : genOptions.inventory.gearPackage?.items ?? [];

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
        randomSheetDialogOpen = false;
    }

    const rollStat = (name: string, formula: string) => {
        const customID = nanoid(16);
        rollArrayIds = rollArrayIds.concat([customID]);
        $sendSkillCheck(0, `roll for ${name} | ${formula}`, `${character.name.split(' ')[0]}`, '-', '', customID, formula, name);
    }

    const rollAllStats = async () => {
        rollArrayIds = [];
        rollsCount = 0;
        rollsNeeded = everythingRandom ? 6 : [genOptions.other, genOptions.ability_scores].reduce((acc, option) => acc + (option.selectedOption === 'random' ? 3 : 0), 0);

        if (everythingRandom || genOptions.other.selectedOption === 'random') {
            for (const stat of stats) {
                rollStat(stat.name, stat.formula);
            }
        }

        else if (genOptions.other.selectedOption === 'blank') {
            Object.assign(newStats, {
                age: '',
                hp: '', 
                hp_max: '',
                coins: { 
                    gp: '',
                    sp: '',
                    cp: ''
                }
            });
        }

        if (everythingRandom || genOptions.ability_scores.selectedOption === 'random') {
            Object.assign(newStats, { ability_scores: character.ability_scores } );

            for (const AS in character.ability_scores) {
                rollStat(AS, '3d6');
            }
        }
        else if (genOptions.ability_scores.selectedOption === 'blank') {
            Object.assign(newStats, { ability_scores: character.ability_scores } );

            for (const AS in newStats.ability_scores) {
                newStats.ability_scores[AS] = { current: '', max: ''};
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

    const openRandomSheetDialog = () => {
        selectedMetaOption = 'All random';
        for (const optionKey in genOptions) {
            genOptions[optionKey].selectedOption = undefined;
            genOptions[optionKey].custom = genOptions[optionKey].custom ? '' : undefined;
        }
             
        randomSheetDialogOpen = true;
    }

</script>

<SimpleButton
    value='{rerollExistingSheet ? 'Re-roll character': 'Create random'}'
    icon="mdi:dice-multiple"
    iconWidth='1.25em'
    type='primary'
    onClickFn={() => openRandomSheetDialog()}>
</SimpleButton>

<Dialog
    bind:open={randomSheetDialogOpen}
    surface$style="padding: 1em 2em; height: 40em; width: 32em;"
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
                <div class="meta-choice">
                    <SimpleSegmentChoice options={["All random", "Custom"]} bind:final={selectedMetaOption}></SimpleSegmentChoice>
                </div>
                {#if !everythingRandom}
                    {#each Object.keys(genOptions) as optionKey}
                        <div class="single-choice">
                            <div class="choice-title">
                                <h4>{genOptions[optionKey].name}:</h4>
                            </div>
                            <div class="choice-options">
                                {#if genOptions[optionKey].selectedOption === 'custom'}
                                    <div class="custom-edit" style="min-width: 10em;">
                                        <InPlaceEdit bind:value={genOptions[optionKey].custom} editWidth='10em' editHeight='2em' on:submit={() => {}} />
                                    </div>
                                    <SimpleIconButton icon="mdi:autorenew" width="1.5em" onClickFn={() => genOptions[optionKey].selectedOption = undefined} />
                                {:else if genOptions[optionKey].selectedOption === 'gear'}
                                    <Svelecte 
                                        options={MOCK_GEAR}
                                        valueAsObject
                                        placeholder='Gear Package'
                                        bind:value={genOptions.inventory.gearPackage}
                                    />
                                    <SimpleIconButton icon="mdi:autorenew" width="1.5em" onClickFn={() => genOptions[optionKey].selectedOption = genOptions.inventory.gearPackage = undefined} />
                                {:else}
                                    <SimpleSegmentChoice options={genOptions[optionKey].options} bind:final={genOptions[optionKey].selectedOption} />
                                {/if}
                            </div>
                        </div>
                    {/each}
                    {#if genOptions.inventory.gearPackage}
                        <div class="gear-package-items">
                            {#each genOptions.inventory.gearPackage?.items ?? [] as item}
                                <SimpleChip value={item.name}></SimpleChip>
                            {/each}
                        </div>
                    {/if}
                {:else}
                    <div class="random-gen-rules">
                        
                    </div>
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
        font-family: Quicksand;
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
        align-items: center;
        gap: 0.5em;
        overflow: hidden;
    }

    .rd-content h4 {
        font-family: Quicksand;
        font-size: 1em;
        margin: 0em;
        align-self: center;
        text-transform: uppercase;
        font-weight: var(--semi-bold);
    }

    .meta-choice {
        font-size: 1.1rem;
        margin-bottom: 0.5em;
    }

    .single-choice {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        gap: 1em;
        grid-template-areas:
            "choice-title choice-options";
        width: 100%;
    }

    .choice-title {
        grid-area: choice-title;
        display: flex;
    }

    .choice-options {
        grid-area: choice-options;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .gear-package-items {
        display: flex;
        justify-content: center;
        flex-flow: wrap;
        gap: 0.5em;
        overflow-y: auto;
        scrollbar-width: thin;
        padding-bottom: 4px;
        margin-top: 0.5em;
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
