import type AbilityScores from "../../components/Game/CharacterSheet/Components/AbilityScores.svelte";
import type CharacterGeneric from "../CharacterGeneric";
import type { AttackShadowdark } from "./AttackShadowdark";
import type ItemShadowdark from "./ItemShadowdark";
import type ProfShadowdark from "./ProfShadowdark";
import type { SpellShadowdark } from "./SpellShadowdark";
import type TalentShadowdark from "./TalentShadowdark";


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
    filled_slots: string,
    total_slots: string,

    proficiencies: ProfShadowdark[],
    attacks: AttackShadowdark[],
    gear: ItemShadowdark[],
    talents: TalentShadowdark[],

    spells: SpellShadowdark[],
    spell_ability: string,
    spells_known: any,

    ability_scores: Record<string, AbilityScoreShadowdark>,

    notes: string,
    shinies: string,
    foes: string,
    allies: string

}