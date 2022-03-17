export default interface DiceRollResult {
    diceInput: string;
    naturalThrows: number[];
    finalSum: number;
    diceSides: number;
    modifierString: string | undefined;
}