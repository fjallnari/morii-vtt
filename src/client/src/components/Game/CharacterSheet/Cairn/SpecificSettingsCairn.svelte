<script lang="ts">
    import { nanoid } from "nanoid/non-secure";
    import type { CharacterCairn } from "../../../../interfaces/Cairn/CharacterCairn";
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
    ]

    const rerollCharacter = () => {
        const appearance = `You have a ${getTrait('physique')} physique, ${getTrait('skin')} skin, ${getTrait('hair')} hair, and a ${getTrait('face')} face. You speak in a ${getTrait('speech')} manner and wear ${getTrait('clothing')} clothing. You are ${getTrait('vice')} yet ${getTrait('virtue')}, and are generally regarded as a ${getTrait('reputation')}. You have had the misfortune of being ${getTrait('misfortunes')}.`

        character = Object.assign(character, {
            name: `${cairn.names.female.concat(cairn.names.male).random()} ${cairn.names.surnames.random()}`,
            background: cairn.backgrounds.random(),
            appearance: appearance
        });

        for (const stat of stats) {
            rollStat(stat.name, stat.formula);
        }

        for (const AS in character.ability_scores) {
            rollAbilityScore(AS);
        }

        $modifyCharacter();

        // TODO ~ items
    }

    const rollStat = (name: string, formula: string) => {
        statRollID = `${name}~~~${nanoid(16)}`;
        $sendSkillCheck(0, `Roll for ${name} ~ ${formula}`, `${character.name.split(' ')[0]}`, '-', '', statRollID, formula);
    }

    const rollAbilityScore = (tag: string) => {
        abilityRollID = nanoid(16);
        $sendSkillCheck(0, `Roll for ${tag} ~ 3d6`, `${character.name.split(' ')[0]}`, '-', '', `${tag}-${abilityRollID}`, '3d6');
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