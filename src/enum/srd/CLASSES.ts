import ClassData from "../../interfaces/srd/ClassData";
import { OTHER_PROF } from "../OTHER_PROF";
import { TOOLS } from "./TOOLS";
import { WEAPONS } from "./WEAPONS";

const ARTISAN_TOOLS = TOOLS['ARTISAN'].map(tool => tool.name);
const MUSICAL_INSTRUMENTS = TOOLS['MUSIC'].map(tool => tool.name);
const WEAPONS_SIMPLE_ALL = WEAPONS.SIMPLE.MELEE.concat(WEAPONS.SIMPLE.RANGED);

export const CLASSES: ClassData[] = [
    // {
    //     name: 'Custom',
    //     level: 1,
    //     hp: {
    //         hit_die: 0
    //     },
    //     other_prof: [],
    //     tool_prof: {
    //         label: '',
    //         tools: []
    //     },
    //     saving_throws: [ '', '' ],
    //     skills: {
    //         final: [],
    //         choose_n: 0,
    //         type: 'any'
    //     },
    //     equipment: [],
    //     features: []
    // },
    {
        name: 'Barbarian',
        level: 1,
        hp: {
            hit_die: 12
        },
        other_prof: [
            {
                type: OTHER_PROF.ARMOR,
                name: 'Light armor'
            },
            {
                type: OTHER_PROF.ARMOR,
                name: 'Medium armor'
            },
            {
                type: OTHER_PROF.ARMOR,
                name: 'Shields'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Simple weapons'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Martial weapons'
            }
        ],
        tool_prof: {
            label: 'None',
            tools: []
        },
        saving_throws: [ 'Strength', 'Constitution' ],
        skills: {
            final: [],
            choose_n: 2,
            type: 'list',
            choose_list: [ 'Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival' ]
        },
        equipment: [
            // 1st line ~ (a) a greataxe or (b) any martial melee weapon
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: 'Greataxe',
                            amount: 1,
                            tags: [
                                'weapon'
                            ]
                        }
                    ],
                    // (b)
                    [
                        {
                            name: '',
                            amount: 1,
                            tags: [
                                'weapon'
                            ],
                            placeholder: 'any martial melee ⚔️',
                            options: WEAPONS.MARTIAL.MELEE
                        }
                    ]
                ]
            },
            // 2nd line ~ (a) two handaxes or (b) any simple weapon
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: 'Handaxe',
                            amount: 2,
                            tags: [
                                'weapon'
                            ]
                        }
                    ],
                    // (b)
                    [
                        {
                            name: '',
                            amount: 1,
                            tags: [
                                'weapon'
                            ],
                            placeholder: 'any simple ⚔️',
                            options: WEAPONS_SIMPLE_ALL
                        }
                    ]
                ]
            },
            // 3rd line ~ An explorer’s pack and four javelins
            {
                final: [
                    {
                        name: 'Explorer’s pack',
                        amount: 1,
                        tags: [],
                        description: '', // TODO -- add equipment pack description lookup
                    },
                    {
                        name: 'Javelin',
                        amount: 4,
                        tags: [
                            'weapon',
                            'resource'
                        ]
                    }
                ]
            }
        ],
        features: [],
    },
    {
        name: 'Bard',
        level: 1,
        hp: {
            hit_die: 8
        },
        other_prof: [
            {
                type: OTHER_PROF.ARMOR,
                name: 'Light Armor'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Simple weapons'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Hand crossbows'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Longswords'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Rapiers'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Shortswords'
            },
        ],
        tool_prof: {
            label: 'Choose 3 musical instruments:',
            tools: [
                {
                    name: '',
                    choose_list: MUSICAL_INSTRUMENTS
                },
                {
                    name: '',
                    choose_list: MUSICAL_INSTRUMENTS
                },
                {
                    name: '',
                    choose_list: MUSICAL_INSTRUMENTS
                },
            ]
        },
        saving_throws: [ 'Dexterity', 'Charisma' ],
        skills: {
            final: [],
            choose_n: 3,
            type: 'any'
        },
        equipment: [
            // 1st line ~ (a) a rapier, (b) a longsword, or (c) any simple weapon
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: 'Rapier',
                            amount: 1,
                            tags: [
                                'weapon'
                            ]
                        }
                    ],
                    // (b)
                    [
                        {
                            name: 'Longsword',
                            amount: 1,
                            tags: [
                                'weapon'
                            ]
                        }
                    ],
                    // (c)
                    [
                        {
                            name: '',
                            amount: 1,
                            tags: [
                                'weapon'
                            ],
                            placeholder: 'any simple ⚔️',
                            options: WEAPONS_SIMPLE_ALL
                        }
                    ]
                ]
            },
            // 2nd line ~ (a) a diplomat’s pack or (b) an entertainer’s pack
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: "Diplomat's pack",
                            amount: 1,
                            tags: [],
                            description: '' // TODO
                        }
                    ],
                    // (b)
                    [
                        {
                            name: "Entertainer’s pack",
                            amount: 1,
                            tags: [],
                            description: '' // TODO
                        }
                    ],
                ]
            },
            // 3rd line ~ (a) a lute or (b) any other musical instrument
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: "Lute",
                            amount: 1,
                            tags: [],
                        }
                    ],
                    // (b)
                    [
                        {
                            name: '',
                            amount: 1,
                            tags: [],
                            placeholder: 'any other 🎺',
                            options: MUSICAL_INSTRUMENTS.filter(instrument => instrument !== 'Lute')
                        }
                    ],
                ]
            },
            // 3rd line ~ Leather armor and a dagger
            {
                final: [
                    {
                        name: 'Explorer’s pack',
                        amount: 1,
                        tags: [],
                        description: '', // TODO -- add equipment pack description lookup
                    },
                    {
                        name: 'Javelin',
                        amount: 4,
                        tags: [
                            'weapon',
                            'resource'
                        ]
                    }
                ]
            }
        ],
        features: [],
    },
    {
        name: 'Cleric',
        level: 1,
        hp: {
            hit_die: 8
        },
        other_prof: [
            {
                type: OTHER_PROF.ARMOR,
                name: 'Light Armor'
            },
            {
                type: OTHER_PROF.ARMOR,
                name: 'Medium Armor'
            },
            {
                type: OTHER_PROF.ARMOR,
                name: 'Shields'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Simple Weapons'
            },
        ],
        tool_prof: {
            label: 'None',
            tools: []
        },
        saving_throws: [ 'Wisdom', 'Charisma' ],
        skills: {
            final: [],
            choose_n: 2,
            type: 'list',
            choose_list: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion']
        },        
        equipment: [
            // 1st line ~ (a) a mace or (b) a warhammer (if proficient)
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: 'Mace',
                            amount: 1,
                            tags: [
                                'weapon'
                            ]
                        }
                    ],
                    // (b)
                    [
                        {
                            name: 'Warhammer (if proficient)',
                            amount: 1,
                            tags: [
                                'weapon'
                            ]
                        }
                    ],
                ]
            },
            // 2nd line ~ (a) scale mail, (b) leather armor, or (c) chain mail (if proficient)
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: "Scale Mail",
                            amount: 1,
                            tags: [],
                            description: '' // TODO
                        }
                    ],
                    // (b)
                    [
                        {
                            name: "Leather Armor",
                            amount: 1,
                            tags: [],
                            description: '' // TODO
                        }
                    ],
                    // (c)
                    [
                        {
                            name: "Chain Mail (if proficient)",
                            amount: 1,
                            tags: [],
                            description: '' // TODO
                        }
                    ],
                ]
            },
            // 3rd line ~ (a) a light crossbow and 20 bolts or (b) any simple weapon
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: "Light Crossbow",
                            amount: 1,
                            tags: [],
                        },
                        {
                            name: "Bolts",
                            amount: 20,
                            tags: [
                                'resource'
                            ]
                        }
                    ],
                    // (b)
                    [
                        {
                            name: '',
                            amount: 1,
                            tags: [],
                            placeholder: 'any simple ⚔️',
                            options: WEAPONS_SIMPLE_ALL
                        }
                    ],
                ]
            },
            // 4th line ~ (a) a priest’s pack or (b) an explorer’s pack
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: 'Priest’s pack',
                            amount: 1,
                            tags: [],
                            description: '', // TODO -- add equipment pack description lookup
                        }
                    ],
                    // (b)
                    [
                        {
                            name: 'Explorer’s pack',
                            amount: 1,
                            tags: [],
                            description: '', // TODO -- add equipment pack description lookup
                        }
                    ],
                ]
            },
            // 5th line ~ A shield and a holy symbol
            {
                final: [
                    {
                        name: 'Shield',
                        amount: 1,
                        tags: [],
                        description: '', // TODO -- add equipment pack description lookup
                    },
                    {
                        name: 'Holy Symbol',
                        amount: 1,
                        tags: []
                    }
                ]
            }
        ],
        features: [],
    },
]
