<script lang="ts">
    import { nanoid } from "nanoid/non-secure";
    import type { CharacterCairn, ItemCairn } from "../../../../interfaces/Cairn/CharacterCairn";
    import type MessageData from "../../../../interfaces/MessageData";
    import { modifyCharacter, sendSkillCheck, socket, user } from "../../../../stores";
    import SimpleButton from "../../../SimpleButton.svelte";

    const cairn = $user.gameData.cairn;

    export let character: CharacterCairn;

    const getTrait = (traitName: string) => {
        return cairn.traits[traitName].random().toLowerCase();
    }

    let abilityRollID: string = '';
    let statRollID: string = '';

    let stats = [
        { name: 'age', formula: '2d20+10' }, 
        { name: 'HP', formula: '1d6' },
        { name: 'gold', formula: '3d6' }
    ];

    const getRandomArmor = (): ItemCairn | undefined => {
        const armor = [
            ...Array(3).fill(undefined), 
            ...Array(11).fill('Brigandine (1 Armor, bulky)'), 
            ...Array(5).fill('Chainmail (2 Armor, bulky)'), 
            'Plate (3 Armor, bulky)'
        ].random();

        return armor ? { name: armor, type: 'armor', bulky: armor.includes('bulky')} : undefined;
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
            'helmet': { name: 'Helmet (+1 Armor)', type: 'armor' },
            'shield': { name: 'Shield (+1 Armor)', type: 'armor' },
        }

        return [
            ...Array(14).fill([]),
            ...Array(3).fill([helmetShield['helmet']]),
            ...Array(3).fill([helmetShield['shield']]),
            [helmetShield['helmet']].concat(helmetShield['shield'])
        ].random();
    }

    // TODO ~ add spell descriptions
    const getRandomSpellbook = (): ItemCairn => {
        const spellbook = cairn.spellbooks.random();
        return { name: spellbook.name, type: 'spellbook', description: spellbook.description };
    }

    const getRandomItem = (rollTable: string[]) => {
        const item = rollTable.random();
        return { name: item, type: 'item', bulky: item.includes('bulky')}
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

    const rerollCharacter = () => {
        const appearance = `You have a ${getTrait('physique')} physique, ${getTrait('skin')} skin, ${getTrait('hair')} hair, and a ${getTrait('face')} face. You speak in a ${getTrait('speech')} manner and wear ${getTrait('clothing')} clothing. You are ${getTrait('vice')} yet ${getTrait('virtue')}, and are generally regarded as a ${getTrait('reputation')}. You have had the misfortune of being ${getTrait('misfortunes')}.`

        character = Object.assign(character, {
            name: `${cairn.names.female.concat(cairn.names.male).random()} ${cairn.names.surnames.random()}`,
            background: cairn.backgrounds.random(),
            appearance: appearance,
            inventory: getRandomInventory()
        });

        for (const stat of stats) {
            rollStat(stat.name, stat.formula);
        }

        for (const AS in character.ability_scores) {
            rollAbilityScore(AS);
        }

        $modifyCharacter();

    }

    const rollStat = (name: string, formula: string) => {
        statRollID = `${name}~~~${nanoid(16)}`;
        $sendSkillCheck(0, `roll for ${name} | ${formula}`, `${character.name.split(' ')[0]}`, '-', '', statRollID, formula);
    }

    const rollAbilityScore = (tag: string) => {
        abilityRollID = nanoid(16);
        $sendSkillCheck(0, `roll for ${tag} | 3d6`, `${character.name.split(' ')[0]}`, '-', '', `${tag}-${abilityRollID}`, '3d6');
    }

    $socket.on('chat-message', (incomingMessage: MessageData) => {
        if (incomingMessage.messageID) {
            switch (incomingMessage.messageID.split('~~~')[0]) {
                case 'age':
                    character.age = incomingMessage.rollResult.total.toString();
                    break;
                case 'HP':
                    character.hp_max = character.hp = incomingMessage.rollResult.total.toString();
                    break;
                case 'gold':
                    character.coins.gp = incomingMessage.rollResult.total.toString();
                    break;
            }
        }

        const idTag = incomingMessage.messageID.slice(0, 3);
        
        if (Object.keys(character.ability_scores).includes(idTag)){
            character.ability_scores[idTag].current = character.ability_scores[idTag].max = incomingMessage.rollResult.total.toString();
            $modifyCharacter();
            return;
        }
    });


</script>

<line-div>
    <SimpleButton value='Re-roll character' icon="mdi:dice-multiple" iconWidth='1.25em' onClickFn={rerollCharacter}></SimpleButton>
</line-div>