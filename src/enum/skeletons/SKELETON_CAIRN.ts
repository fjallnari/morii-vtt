export const SKELETON_CAIRN = {
    name: '',
    background: '',
    age: '',
    appearance: '',

    armor: '',
    hp: '',
    hp_max: '',
    deprived: false,

    ability_scores: {
        'STR': {
            current: '',
            max: '',
        },
        'DEX': {
            current: '',
            max: ''
        },
        'WIL': {
            current: '',
            max: ''
        }
    },

    coins: {
        gp: '',
        sp: '',
        cp: '',
    },
    notes: '',
    slots: '10',
    inventory: [
        {
            name: 'Torch',
            type: 'item'
        },
        {
            name: 'Three days’ rations',
            type: 'item'
        },
        {
            name: 'Spear',
            type: 'weapon',
            damage: 'd8'
        },
        {
            name: 'Brigandine (1 Armor, bulky)',
            type: 'armor',
            bulky: true
        },
        {
            type: 'fatigue'
        },
        {
            name: 'Visual Illusion',
            type: 'spellbook',
            description: 'A silent, immobile, room-sized illusion of your choice appears.'
        },
    ],   
}