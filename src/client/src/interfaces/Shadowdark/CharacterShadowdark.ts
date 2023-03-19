import type AbilityScores from "../../components/Game/CharacterSheet/Components/AbilityScores.svelte";
import type CharacterGeneric from "../CharacterGeneric";
import type ItemShadowdark from "./ItemShadowdark";
import type ProfShadowdark from "./ProfShadowdark";


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
    death_timer: string,
    coins: Record<string, string>,
    languages: string[],
    proficiencies: ProfShadowdark[],

    // TODO
    attacks: any[],
    gear: ItemShadowdark[],
    talents: any[],
    spells: any[],
    spell_ability: string,
    filled_slots: string,
    total_slots: string,

    ability_scores: Record<string, AbilityScoreShadowdark>,

    notes: string,
    shinies: string,
    foes: string,
    allies: string

}