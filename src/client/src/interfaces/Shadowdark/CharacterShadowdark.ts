import type AbilityScores from "../../components/Game/CharacterSheet/Components/AbilityScores.svelte";
import type CharacterGeneric from "../CharacterGeneric";


export interface AbilityScoreShadowdark {
    value: string
}

export interface CharacterShadowdark extends CharacterGeneric {
    name: string,
    background: string,
    title: string,
    alignment: string,
    deity: string,
    luck: boolean,

    ancestry: string,
    class: string,
    level: string,
    xp: string,

    ac: string,
    hp: string,
    hp_max: string,

    ability_scores: Record<string, AbilityScoreShadowdark>,

    
}