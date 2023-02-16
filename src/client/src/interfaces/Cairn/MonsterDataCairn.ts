import type MonsterGeneric from "../MonsterGeneric";

export default interface MonsterDataCairn extends MonsterGeneric {
    stats: string,
    description: string,
    hp?: string,
    armor?: string
    str?: string,
    dex?: string,
    wil?: string,
    attacks?: string[],
    special?: string
}