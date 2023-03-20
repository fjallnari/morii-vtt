import { CharacterShadowdark } from "../../interfaces/CharacterShadowdark";

export const SKELETON_SD: Omit<CharacterShadowdark, '_id' | 'playerID' | 'system'>  = {
    name: "",
    background: "",
    title: "",
    alignment: "",
    deity: "",
    luck: false,
    death_timer: "",

    ancestry: "",
    class: "",
    level: "",
    xp: "",

    ac: "",
    hp: "",
    hp_max: "",
    coins: {
        gp: '',
        sp: '',
        cp: '',
    },
    filled_slots: "",
    total_slots: "",

    proficiencies: [],
    attacks: [],
    gear: [],
    talents: [],

    spells: [],
    spell_ability: "",
    spells_known: [ [], [], [], [], [], [], [], [], [], [] ],
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
    },
    notes: '',
    shinies: '',
    foes: '',
    allies: ''
}

/* PRIEST: 
[ 
    [ '2' ],
    [ '3' ],
    [ '3', '1' ],
    [ '3', '2' ],
    [ '3', '2', '1' ],
    [ '3', '2', '2' ], 
    [ '3', '3', '2', '1' ], 
    [ '3', '3', '2', '2' ],
    [ '3', '3', '2', '2', '1' ],
    [ '3', '3', '3', '2', '2' ],
], 
*/