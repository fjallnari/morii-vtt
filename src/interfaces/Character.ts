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
    ability_scores: Record<string, AbilityScore>

    alignment: string
}