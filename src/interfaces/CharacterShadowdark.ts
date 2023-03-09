import CharacterGeneric from "./CharacterGeneric";

export interface AbilityScoreShadowdark {
    value: string
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
    coins: Record<string, string>,
    notes: string,
    languages: string[],

    ability_scores: Record<string, AbilityScoreShadowdark>,
}