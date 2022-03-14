import { Chance } from 'chance';


export default class DiceHandler {
    private random: Chance.Chance;
    private validationRegexp: RegExp;

    constructor () {
        this.random = new Chance();
        // non-capturing group for prefix; two capturing groups for dice count and no. of sides
        // not ideal, might want to replace if more advanced dice rolling commands are needed
        this.validationRegexp = /(?:^\/roll|^\/r)\040(?<diceCount>[0-9]*)d(?<diceSides>[0-9]+)/;
    }

    // validates the notation first, if it succeeds it rolls
    public rollDice (diceInput: string) {
        const matchedNotation = diceInput.match(this.validationRegexp);
        const diceCount = matchedNotation?.groups?.diceCount;
        const diceSides = matchedNotation?.groups?.diceSides;

        if (! diceSides || diceSides === '0') {
            return {};
        }

        // creates empty array with the size equal to diceCount (or 1 if e.g. '/r d20' is called), then fills it with random dice throws
        const naturalThrows = [...Array(diceCount ? ~~diceCount : 1)].map(_ => this.random.natural( { min: 1, max: diceSides }));

        return { diceInput: diceInput, naturalThrows: naturalThrows, finalSum: naturalThrows.reduce((a, b) => a + b, 0)};
    }

}