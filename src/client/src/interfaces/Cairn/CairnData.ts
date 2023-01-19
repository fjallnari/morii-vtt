import type { ItemCairn } from "./CharacterCairn"

export default interface CairnData {
    gear: string[],
    tools: string[],
    trinkets: string[],
    spellbooks: Partial<ItemCairn>[],
    backgrounds: string[],
    scars: { 
        name: string, 
        description: string 
    }[],
    names: {
        male: string[],
        female: string[],
        surnames: string[]
    },
    traits: {
        physique: string[],
        skin: string[],
        hair: string[],
        face: string[],
        speech: string[],
        clothing: string[],
        virtue: string[],
        vice: string[],
        reputation: string[],
        misfortunes: string[],
    },
    rules_basic: string,
    rules_combat: string
}