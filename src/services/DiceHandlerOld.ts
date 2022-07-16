import { Chance } from 'chance';

type RollNotationRegexGroups = { groups: { diceCount: string, diceSides: string, operator: string, modifier:string } } | null;

export default class DiceHandlerOld {
    private random: Chance.Chance;
    private validationRegexp: RegExp;

    constructor () {
        this.random = new Chance();
        // non-capturing group for prefix; two capturing groups for dice count and no. of sides; then the modifier part
        // not ideal, might want to replace if more advanced dice rolling commands are needed
        this.validationRegexp = /(?:^\/roll|^\/r)\040(?<diceCount>[0-9]*)d(?<diceSides>[0-9]+)(?:\040*(?<operator>\+|-)\040*(?<modifier>[0-9]+))?/;
    }

    // validates the notation first, if it succeeds it rolls
    public rollDice (diceInput: string) {
        // not an ideal typesafe solution, see -> https://github.com/microsoft/TypeScript/issues/32098
        const matchedNotation: RollNotationRegexGroups = diceInput.match(this.validationRegexp) as any;
        const matchedGroups = matchedNotation?.groups;

        if (! matchedGroups) {
            return undefined;
        }
        
        const { diceCount, diceSides, operator, modifier } = matchedGroups;

        if (! diceSides || diceSides === '0') {
            return undefined;
        }

        // creates empty array with the size equal to diceCount (or 1 if e.g. '/r d20' is called), then fills it with random dice throws
        const naturalThrows = [...Array(diceCount ? ~~diceCount : 1)].map(_ => this.random.natural( { min: 1, max: diceSides }));

        // either the actual number, or its negative version
        const integerModifier = operator === '+' ? ~~modifier : ~~modifier * -1;

        // sums all naturalThrows and then adds the modifier 
        const finalSum = naturalThrows.reduce((a, b) => a + b, 0) + integerModifier;

        // diceInput without the command
        return { 
            diceInput: diceInput.split(' ').slice(1).join(' '), 
            naturalThrows: naturalThrows, 
            finalSum: finalSum,
            diceSides: ~~diceSides,
            modifierString: operator ? `${operator} ${modifier}` : undefined
        };
    }

}