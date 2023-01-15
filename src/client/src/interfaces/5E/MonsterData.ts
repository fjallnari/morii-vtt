export interface MonsterTrait {
    name?: string,
    subtitle?: string,
    content?: string
    type?: string,
    attack_info?: string,
    attack_dmg?: string
}

export interface MonsterData {
    id: string,
    is_custom?: boolean,
    source?: string,
    name: string,
    meta: string,
    ability_scores: Record<string, string>,
    armor_class: string,
    hit_points: string,
    speed: string,
    saving_throws?: string,
    skills?: string,
    damage_resistances?: string,
    damage_immunities?: string,
    condition_immunities?: string,
    damage_vulnerabilities?: string,
    senses: string,
    languages: string,
    challenge: string,
    traits?: MonsterTrait[],
    actions?: MonsterTrait[],
    reactions?: MonsterTrait[],
    legendary_actions?: MonsterTrait[],
    img_url: string,
}