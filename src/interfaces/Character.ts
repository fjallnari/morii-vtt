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
    properties: number[] // only property ids are saved, e.g. 0 ~ Ammunition
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
    hd_total: string,
    hd_current: Record<string, string>,
    attacks: Attack[]

    alignment: string
}