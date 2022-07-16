import { RollResult } from "@dice-roller/rpg-dice-roller/types/results";


interface NaturalRolls {
    rolls: RollResult[];
    dieType: number | undefined;
}

export type SplitRolls = (string | NaturalRolls)[];

export interface RollResultData {
    notation?: string,
    total?: number,
    splitRolls?: SplitRolls,
    error?: string
}