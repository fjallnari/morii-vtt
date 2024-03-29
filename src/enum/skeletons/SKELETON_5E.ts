import Character from "../../interfaces/Character";

// 0 ~= not proficient, 1 ~= proficient, 2 ~= expertise
enum PROFICIENCY {
    NOT_PROF,
    PROF,
    EXP
}

export const SKELETON_5E: Omit<Character, '_id' | 'playerID'> = {
    name: '',
    classes: '',
    xp: '',
    subclass: '',
    race: '',
    background: '',
    prof_bonus: '',
    inspiration: false,
    ability_scores: { 
        'STR': {
            name: 'strength',
            value: '',
            saving_throw: false,
            skills: [
                {
                    name: 'athletics',
                    proficiency: PROFICIENCY.NOT_PROF
                }
            ]
        },
        'DEX': {
            name: 'dexterity',
            value: '',
            saving_throw: false,
            skills: [
                {
                    name: 'acrobatics',
                    proficiency: PROFICIENCY.NOT_PROF
                },
                {
                    name: 'sleight of hand',
                    proficiency: PROFICIENCY.NOT_PROF
                },
                {
                    name: 'stealth',
                    proficiency: PROFICIENCY.NOT_PROF
                }
            ]
        },
        'CON': {
            name: 'constitution',
            value: '',
            saving_throw: false,
            skills: [
            ]
        },
        'INT': {
            name: 'intelligence',
            value: '',
            saving_throw: false,
            skills: [
                {
                    name: 'arcana',
                    proficiency: PROFICIENCY.NOT_PROF
                },
                {
                    name: 'history',
                    proficiency: PROFICIENCY.NOT_PROF
                },
                {
                    name: 'investigation',
                    proficiency: PROFICIENCY.NOT_PROF
                },
                {
                    name: 'nature',
                    proficiency: PROFICIENCY.NOT_PROF
                },
                {
                    name: 'religion',
                    proficiency: PROFICIENCY.NOT_PROF
                },

            ]
        },
        'WIS': {
            name: 'wisdom',
            value: '',
            saving_throw: false,
            skills: [
                {
                    name: 'animal handling',
                    proficiency: PROFICIENCY.NOT_PROF
                },
                {
                    name: 'insight',
                    proficiency: PROFICIENCY.NOT_PROF
                },
                {
                    name: 'medicine',
                    proficiency: PROFICIENCY.NOT_PROF
                },
                {
                    name: 'perception',
                    proficiency: PROFICIENCY.NOT_PROF
                },
                {
                    name: 'survival',
                    proficiency: PROFICIENCY.NOT_PROF
                },

            ]
        },
        'CHA': {
            name: 'charisma',
            value: '',
            saving_throw: false,
            skills: [
                {
                    name: 'deception',
                    proficiency: PROFICIENCY.NOT_PROF
                },
                {
                    name: 'intimidation',
                    proficiency: PROFICIENCY.NOT_PROF
                },
                {
                    name: 'performance',
                    proficiency: PROFICIENCY.NOT_PROF
                },
                {
                    name: 'persuasion',
                    proficiency: PROFICIENCY.NOT_PROF
                },
            ]
        },
    },
    initiative_bonus: '', // not initiative !, only for things like the Alert feat
    armor_class: '',
    speed_max: '',
    speed_bonus: 0,
    exhaustion: 0,
    hp_max: '',
    hp_current: '',
    hp_temp: '',
    death_save_success: 0,
    death_save_failure: 0,
    hd_total: '', // used by character sheet for edits
    hd_current: {},
    attacks: [],
    coins: {
        cp: '',
        sp: '',
        gp: '',
        pp: ''
    },
    inventory: [],
    other_profs: [],
    tools: [],
    resources: [],
    features: [],
    
    // bio tab
    age: '',
    height: '',
    weight: '',
    eyes: '',
    skin: '',
    hair: '',    
    alignment: '',
    appearance: '',
    backstory: '',
    person_traits: '',
    ideals: '',
    bonds: '',
    flaws: '',
    treasure: '',
    allies: '',
    enemies: '',
    other_notes: '',

    spell_ability: '',
    spell_save_dc_bonus: '',
    spells_by_level: {
        0: { // ~= cantrips
            slots_total: '',
            slots_current: '',
            spells: []
        },
        1: {
            slots_total: '',
            slots_current: '',
            spells: []
        },
        2: {
            slots_total: '',
            slots_current: '',
            spells: []
        },
        3: {
            slots_total: '',
            slots_current: '',
            spells: []
        },
        4: {
            slots_total: '',
            slots_current: '',
            spells: []
        },
        5: {
            slots_total: '',
            slots_current: '',
            spells: []
        },
        6: {
            slots_total: '',
            slots_current: '',
            spells: []
        },
        7: {
            slots_total: '',
            slots_current: '',
            spells: []
        },
        8: {
            slots_total: '',
            slots_current: '',
            spells: []
        },
        9: {
            slots_total: '',
            slots_current: '',
            spells: []
        },
    },
    settings: {
        use_encumbrance: true,
        use_spell_components: true
    }
};