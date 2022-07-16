export interface NaturalRoll {
    value: number,
    initialValue: number,
    calculationValue: number,
    modifierFlags: string,
    modifiers: string[] | Set<string> | undefined,
    useInTotal: boolean
}

interface NaturalRolls {
    rolls: NaturalRoll[];
    dieType: number | undefined;
}

export type SplitRolls = (string | NaturalRolls)[];

export interface RollResultData {
    notation?: string,
    total?: number,
    splitRolls?: SplitRolls,
    error?: string
}