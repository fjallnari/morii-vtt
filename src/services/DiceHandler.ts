import { DiceRoll, DiceRoller, NumberGenerator } from '@dice-roller/rpg-dice-roller';
import { RollResultData, SplitRolls } from '../interfaces/RollResultData';
import { getErrorMessage } from '../util/getErrorMessage';

export default class DiceHandler {

    constructor () {
        const engines = NumberGenerator.engines;
        const generator = NumberGenerator.generator;
        // @ts-ignore
        generator.engine = engines.MersenneTwister19937.autoSeed();

        //this.rollDice('/roll 4d4k2');
    }

    public rollDice(messageText: string) {
        const matchedText = /^(?:\/roll|\/r)\040(.*)$/gm.exec(messageText) as RegExpExecArray; // cannot ever be null
        const diceInput = matchedText[1];

        try {
            const rollResult = new DiceRoll(diceInput).toJSON();

            // die types are not yet implemented in RPG Dice Roller
            // see -> https://github.com/dice-roller/rpg-dice-roller/issues/242
            const dieTypes = [... rollResult.notation.matchAll(/d([0-9]+)/gm)].map(regExpMatch => regExpMatch[1]);
            let dieTypeIndex = -1;

            // adds dieType into the split roll obj
            const splitRolls: SplitRolls = rollResult.rolls.map( rollResult => {
                if (rollResult.rolls) {
                    dieTypeIndex += 1;
                    return {
                        rolls: rollResult.rolls,
                        dieType: ~~dieTypes[dieTypeIndex] ?? undefined
                    }
                }
                return rollResult.toString();
            });
            
            return {
                notation: rollResult.notation,
                total: rollResult.total,
                splitRolls: splitRolls
            } as RollResultData;            
        }
        catch (error) {
            // RangeError: qty must be between 1 and 999
            // peg$SyntaxError: Expected "(", "-", "abs", "ceil", ... ) but "u" found.
            // peg$SyntaxError: Expected "(" or [1-9] but "0" found
            return {
                error: getErrorMessage(error)
            }
        }        
    }

}