import Character from "../interfaces/Character";

// 0 ~= not proficient, 1 ~= proficient, 2 ~= expertise
enum PROFICIENCY {
    NOT_PROF,
    PROF,
    EXP
}

export const CHARACTER_SKELETON: Omit<Character, '_id' | 'playerID'> = {
    name: '',
    classes: '',
    xp: '',
    subclass: '',
    race: '',
    background: '',
    alignment: '',
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
    inventory: []
};