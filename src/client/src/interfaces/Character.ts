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



export interface Character {
    _id: string,
    playerID: string,
    
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


    alignment: string
}