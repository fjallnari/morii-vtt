export interface AbilitySkill {
    name: string,
    proficiency: number,
}


export interface AbilityScore {
    name: string,
    value: string,
    saving_throw: boolean,
    skills: AbilitySkill[]
}

export interface Attack {
    id: string,
    name: string,
    atk_ability: string, // e.g. STR
    atk_bonus: string,
    atk_proficiency: boolean,
    range: string,
    dmg_die: string, // e.g. 1d6
    dmg_ability: string, // e.g. STR
    dmg_bonus: string,
    dmg_type: string, // e.g. Slashing
    versatile_die: string,
    versatile_active: boolean,
    item_id?: string,
    weapon_type?: string // 'Simple weapons || Martial weapons
    //// properties: number[] // only property ids are saved, e.g. 0 ~ Ammunition
}

export interface Item {
    id: string,
    name: string,
    is_equipped: boolean,
    amount: string,
    has_weight: boolean,
    weight?: string,
    has_attack: boolean,
    attack_id?: string,
    want_tooltip: boolean,
    tooltip?: string,
    use_as_resource: boolean,
    resource_id?: string
}

export interface OtherProf {
    id: string,
    name: string,
    type: number, // index of [OTHER, ARMOR, WEAPON, LANGUAGE, INSTRUMENT]
    content: string
}

export interface Tool {
    id: string,
    name: string,
    ability: string, // e.g. STR
    proficiency: number // 0 ~ jack of all trades, 1 ~ proficient, 2 ~ expertise; ( 2^n * 1/2 )
}

export interface Resource {
    id: string,
    name: string,
    type?: 'simple' | 'complex',
    total: string,
    current: string,
    item_id?: string
}

export interface Feature {
    id: string,
    name: string,
    type: number, // e.g. 0 ~ racial, 1 ~ class, 2 ~ feat, 3 ~ other
    source: string, // e.g. Kalashtar
    content: string,
}

export interface SpellsByLevel {
    slots_total: string,
    slots_current: string,
    spells: Spell[]
}

export interface Spell {
    id: string,
    name: string,
    level: number,
    is_prepared: boolean,
    casting_time: string,
    ritual: boolean,
    range: string,
    school: string,
    components: {
        verbal: boolean,
        somatic: boolean,
        material: boolean,
        materials_needed: string
    },
    duration: string,
    concentration: boolean,
    description: string,
    higher_levels: string
}

export interface CharacterSettings {
    use_encumbrance: boolean,
    use_spell_components: boolean
}

export interface Character {
    _id: string,
    playerID: string,
    system: string,

    // core tab    
    name: string,
    classes: string,
    xp: string,
    subclass: string,
    race: string,
    background: string,
    prof_bonus: string,
    inspiration: boolean,
    ability_scores: Record<string, AbilityScore>,
    initiative_bonus: string,
    armor_class: string,
    speed_max: string,
    speed_bonus: number,
    exhaustion: number,
    hp_max: string,
    hp_current: string,
    hp_temp: string,
    death_save_success: number,
    death_save_failure: number,
    hd_total: string,
    hd_current: Record<string, string>,
    attacks: Attack[],
    coins: Record<string, string>,
    inventory: Item[],
    other_profs: OtherProf[],
    tools: Tool[],
    resources: Resource[],
    features: Feature[],

    // bio tab
    age: string,
    height: string,
    weight: string,
    eyes: string,
    skin: string,
    hair: string,    
    alignment: string,
    appearance: string,
    backstory: string,
    person_traits: string,
    ideals: string,
    bonds: string,
    flaws: string,
    treasure: string,
    allies: string,
    enemies: string,
    other_notes: string,

    // spells
    spell_ability: string,
    spell_save_dc_bonus: string,
    spells_by_level: Record<number, SpellsByLevel>,
    settings: CharacterSettings
}