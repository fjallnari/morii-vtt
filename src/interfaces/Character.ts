import { ObjectId } from "mongodb";

interface AbilitySkill {
    name: string,
    proficiency: number,
}


interface AbilityScore {
    name: string,
    value: string,
    saving_throw: boolean,
    skills: AbilitySkill[]
}

export default interface Character {
    _id: ObjectId | string,
    playerID: ObjectId | string,

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

    alignment: string
}