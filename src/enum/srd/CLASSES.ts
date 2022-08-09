import ClassData from "../../interfaces/srd/ClassData";
import { OTHER_PROF } from "../OTHER_PROF";
import { TOOLS } from "./TOOLS";
import { WEAPONS } from "./WEAPONS";

const ARTISAN_TOOLS = TOOLS['ARTISAN'].map(tool => tool.name);
const MUSICAL_INSTRUMENTS = TOOLS['MUSIC'].map(tool => tool.name);
const WEAPONS_SIMPLE_ALL = WEAPONS.SIMPLE.MELEE.concat(WEAPONS.SIMPLE.RANGED);
const ASI_CONTENT_STANDARD = 'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature.';
const ASI_VARIANTS = {
    8: { name: 'x2' },
    12: { name: 'x3' },
    16: { name: 'x4' },
    19: { name: 'x5' }
};

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
        features: [
            {
                name: 'Rage',
                level: 1,
                content: `In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.
While raging, you gain the following benefits if you aren’t wearing heavy armor:
    - You have advantage on Strength checks and Strength saving throws.
    - When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table.
    - You have resistance to bludgeoning, piercing, and slashing damage.

If you are able to cast spells, you can’t cast them or concentrate on them while raging.

Your rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven’t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action.

Once you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.`
            },
            {
                name: 'Unarmored Defense',
                level: 1,
                content: `While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.`
            },
            {
                name: 'Reckless Attack',
                level: 2,
                content: `Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.`
            },
            {
                name: 'Danger Sense',
                level: 2,
                content: `At 2nd level, you gain an uncanny sense of when things nearby aren’t as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can’t be blinded, deafened, or incapacitated.`
            },
            {
                name: 'Primal Path ~ Subclass',
                level: 3,
                content: `At 3rd level, you choose a path that shapes the nature of your rage. Your choice grants you features at 3rd level and again at 6th, 10th, and 14th levels.`
            },
            {
                name: 'Ability Score Improvement',
                level: 4,
                content: ASI_CONTENT_STANDARD,
                variants: ASI_VARIANTS
            },
            {
                name: 'Extra Attack',
                level: 5,
                content: `Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.`
            },
            {
                name: 'Fast Movement',
                level: 5,
                content: `Starting at 5th level, your speed increases by 10 feet while you aren’t wearing heavy armor.`
            },
            {
                name: 'Feral Instinct',
                level: 7,
                content: `By 7th level, your instincts are so honed that you have advantage on initiative rolls.
                
Additionally, if you are surprised at the beginning of combat and aren’t incapacitated, you can act normally on your first turn, but only if you enter your rage before doing anything else on that turn.`
            },
            {
                name: 'Brutal Critical',
                level: 9,
                content: `Beginning at 9th level, you can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack.

This increases to two additional dice at 13th level and three additional dice at 17th level.`,
            },
            {
                name: 'Relentless Rage',
                level: 11,
                content: `Starting at 11th level, your rage can keep you fighting despite grievous wounds. If you drop to 0 hit points while you’re raging and don’t die outright, you can make a DC 10 Constitution saving throw. If you succeed, you drop to 1 hit point instead.

Each time you use this feature after the first, the DC increases by 5. When you finish a short or long rest, the DC resets to 10.`
            },
            {
                name: 'Persistent Rage',
                level: 15,
                content: `Beginning at 15th level, your rage is so fierce that it ends early only if you fall unconscious or if you choose to end it.`
            },
            {
                name: 'Indomitable Might',
                level: 18,
                content: `Beginning at 18th level, if your total for a Strength check is less than your Strength score, you can use that score in place of the total.`
            },
            {
                name: 'Primal Champion',
                level: 20,
                content: `At 20th level, you embody the power of the wilds. Your Strength and Constitution scores increase by 4. Your maximum for those scores is now 24.`
            },
        ],
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
    {
        name: 'Druid',
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
                name: 'Clubs'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Daggers'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Darts'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Javelins'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Maces'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Quarterstaffs'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Scimitars'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Sickles'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Slings'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Spears'
            },
        ],
        tool_prof: {
            label: '',
            tools: [
                {
                    name: 'Herbalism kit'
                }
            ]
        },
        saving_throws: [ 'Intelligence', 'Wisdom' ],
        skills: {
            final: [],
            choose_n: 2,
            type: 'list',
            choose_list: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival']
        },        
        equipment: [
            // 1st line ~ (a) a wooden shield or (b) any simple weapon
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: 'Wooden shield',
                            amount: 1,
                            tags: []
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
                    ],
                ]
            },
            // 2nd line ~ (a) a scimitar or (b) any simple melee weapon
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: "Scimitar",
                            amount: 1,
                            tags: [
                                'weapon'
                            ],
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
                            placeholder: 'any simple melee ⚔️',
                            options: WEAPONS.SIMPLE.MELEE
                        }
                    ]
                ]
            },
            // 3rd line ~ Leather armor, an explorer’s pack, and a druidic focus
            {
                final: [
                    {
                        name: 'Leather armor',
                        amount: 1,
                        tags: [],
                    },
                    {
                        name: 'Explorer’s pack',
                        amount: 1,
                        tags: [],
                        description: '' // TODO
                    },
                    {
                        name: 'Druidic focus',
                        amount: 1,
                        tags: [],
                    },
                ]
            }
        ],
        features: [],
    },
]
