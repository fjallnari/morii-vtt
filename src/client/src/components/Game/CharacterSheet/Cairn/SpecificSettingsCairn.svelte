<script lang="ts">
    import type { CharacterCairn } from "../../../../interfaces/Cairn/CharacterCairn";
    import { modifyCharacter, user } from "../../../../stores";
    import SimpleButton from "../../../SimpleButton.svelte";

    const cairn = $user.gameData.cairn;

    export let character: CharacterCairn;

    const getTrait = (traitName: string) => {
        return cairn.traits[traitName].random().toLowerCase();
    }

    const rerollCharacter = () => {
        
        let newTraits = {};

        for (const trait in character.traits){
            newTraits[trait] = cairn.traits[trait].random()
        }

        const appearance = `You have a ${getTrait('physique')} physique, ${getTrait('skin')} skin, ${getTrait('hair')} hair, and a ${getTrait('face')} face. You speak in a ${getTrait('speech')} manner and wear ${getTrait('clothing')} clothing. You are ${getTrait('vice')} yet ${getTrait('virtue')}, and are generally regarded as a ${getTrait('reputation')}. You have had the misfortune of being ${getTrait('misfortunes')}.`

        character = Object.assign(character, {
            name: `${cairn.names.female.concat(cairn.names.male).random()} ${cairn.names.surnames.random()}`,
            background: cairn.backgrounds.random(),
            traits: newTraits,
            appearance: appearance
        })

        $modifyCharacter;

        // TODO ~ items, ability_scores, hp and other stuff
    }


</script>

<line-div>
    <SimpleButton value='Re-roll character' icon="mdi:dice-multiple" iconWidth='1.25em' onClickFn={rerollCharacter}></SimpleButton>
</line-div>