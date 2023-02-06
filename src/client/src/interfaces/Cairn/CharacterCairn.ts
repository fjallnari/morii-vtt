import type CharacterGeneric from "../CharacterGeneric";

export interface AbilityScoreCairn {
    current: string,
    max: string
}

export interface CharacterTraitsCairn {
    physique: string,
    skin: string,
    hair: string,
    face: string,
    speech: string,
    clothing: string,
    virtue: string,
    vice: string,
    reputation: string,
    misfortunes: string,
}

export interface ItemCairn {
    name?: string,
    type: string,
    bulky?: boolean,
    stacks?: boolean,
    slotless?: boolean,
    damage?: string,
    armor?: string,
    charges?: string,
    charges_max?: string,
    description?: string,
}

export interface CharacterCairn extends CharacterGeneric {
    name: string,
    background: string,
    age: string,

    armor: string,
    hp: string,
    hp_max: string,
    deprived: boolean,

    appearance: string,
    ability_scores: Record<string, AbilityScoreCairn>,
    coins: Record<string, string>,
    notes: string,
    slots: string,
    inventory: ItemCairn[]
}
