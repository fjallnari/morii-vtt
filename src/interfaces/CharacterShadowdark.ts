import CharacterGeneric from "./CharacterGeneric";

export interface AbilityScoreShadowdark {
    value: string
}

export interface ProfShadowdark {
    id: string,
    name: string,
    type: number, // index of [OTHER, ARMOR, WEAPON, LANGUAGE],
    content: string
}

export interface SpellShadowdark {
    id: string,
    name: string,
    tier: number,
    range: string,
    duration: string,
    description: string,
    class?: string
}

export interface TalentShadowdark {
    id: string,
    name: string,
    type: number,
    content: string,
}

export interface ItemShadowdark {
    id: string,
    name?: string,
    type: string,
    weight?: string,
    damage?: string,
    armor?: string,
    charges?: string,
    charges_max?: string,
    description?: string,
    attack_id?: string
}

export interface AttackShadowdark {
    id: string,
    name: string,
    type: number
    stat: string, // e.g. STR
    atk_bonus: string,
    range: string,
    damage: string, // e.g. 1d6
    versatile_die?: string,
    versatile_active?: boolean,
    item_id?: string,
    properties: string,
}

export interface CharacterShadowdark extends CharacterGeneric {
    name: string,
    background: string,
    title: string,
    alignment: string,
    deity: string,

    ancestry: string,
    class: string,
    level: string,
    xp: string,

    ac: string,
    hp: string,
    hp_max: string,
    luck: boolean,
    death_timer: string,
    coins: Record<string, string>,

    proficiencies: ProfShadowdark[],
    attacks: AttackShadowdark[],
    gear: ItemShadowdark[],
    talents: TalentShadowdark[],
    
    spells: SpellShadowdark[],
    spell_ability: string,
    spells_known: any,

    filled_slots: string,
    total_slots: string,

    ability_scores: Record<string, AbilityScoreShadowdark>,

    notes: string,
    shinies: string,
    foes: string,
    allies: string
}