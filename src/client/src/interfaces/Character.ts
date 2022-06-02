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
    ability_scores: Record<string, AbilityScore>

    alignment: string
}