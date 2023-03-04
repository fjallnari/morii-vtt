import { CharacterShadowdark } from "../../interfaces/CharacterShadowdark";

export const SKELETON_SD: Omit<CharacterShadowdark, '_id' | 'playerID' | 'system'>  = {
    name: "",
    background: "",
    title: "",
    alignment: "",
    deity: "",
    luck: false,

    ancestry: "",
    class: "",
    level: "",
    xp: "",

    ac: "",
    hp: "",
    hp_max: "",

    ability_scores: { 
        'STR': {
            value: '',
        },
        'DEX': {
            value: '',
        },
        'CON': {
            value: '',
        },
        'INT': {
            value: '',
        },
        'WIS': {
            value: '',
        },
        'CHA': {
            value: '',
        },
    }
}