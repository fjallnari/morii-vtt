import ClassData from "../../interfaces/srd/ClassData";
import { OTHER_PROF } from "../OTHER_PROF";
import { TOOLS } from "./TOOLS";
import { WEAPONS } from "./WEAPONS";

const ARTISAN_TOOLS = TOOLS['ARTISAN'].map(tool => tool.name);
const MUSICAL_INSTRUMENTS = TOOLS['MUSIC'].map(tool => tool.name);
const WEAPONS_SIMPLE_ALL = WEAPONS.SIMPLE.MELEE.concat(WEAPONS.SIMPLE.RANGED);
const WEAPONS_MARTIAL_ALL = WEAPONS.MARTIAL.MELEE.concat(WEAPONS.MARTIAL.RANGED);

const ASI_CONTENT_STANDARD = 'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature.';
const ASI_VARIANTS = {
    8: { name: 'x2' },
    12: { name: 'x3' },
    16: { name: 'x4' },
    19: { name: 'x5' }
};

const SPELLSLOTS_STANDARD = [
    [ 2 ],
    [ 3 ],
    [ 4, 2 ],
    [ 4, 3 ],
    [ 4, 3, 2 ],
    [ 4, 3, 3 ], 
    [ 4, 3, 3, 1 ], 
    [ 4, 3, 3, 2 ],
    [ 4, 3, 3, 3, 1 ],
    [ 4, 3, 3, 3, 2 ],
    [ 4, 3, 3, 3, 2, 1 ],
    [ 4, 3, 3, 3, 2, 1 ],
    [ 4, 3, 3, 3, 2, 1, 1 ],
    [ 4, 3, 3, 3, 2, 1, 1 ],
    [ 4, 3, 3, 3, 2, 1, 1, 1 ],
    [ 4, 3, 3, 3, 2, 1, 1, 1 ],
    [ 4, 3, 3, 3, 2, 1, 1, 1, 1 ],
    [ 4, 3, 3, 3, 3, 1, 1, 1, 1 ],
    [ 4, 3, 3, 3, 3, 2, 1, 1, 1 ],
    [ 4, 3, 3, 3, 3, 2, 2, 1, 1 ],
];

const SPELLS_BY_LEVEL_BLANK = {
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
}

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
    //     features: [],
    //     resources: [],
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
        saving_throws: [ 'STR', 'CON' ],
        skills: {
            final: [],
            choose_n: 2,
            type: 'list',
            options: [ 'Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival' ]
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
        resources: [
            {
                name: 'Rages',
                total: '',
                current: '',
                type: 'complex',
                levels: {
                    1: '2',
                    3: '3',
                    6: '4',
                    12: '5',
                    17: '6',
                    20: '∞',                   
                }
            },
            {
                name: 'Rage Damage',
                total: '',
                current: '',
                type: 'simple',
                levels: {
                    1: '+2',
                    9: '+3',
                    16: '+4',  
                }
            }
        ]
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
        saving_throws: [ 'DEX', 'CHA' ],
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
        features: [
            {
                name: 'Spellcasting',
                level: 1,
                content: `You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music. Your spells are part of your vast repertoire, magic that you can tune to different situations.

**Cantrips**
You know two cantrips of your choice from the bard spell list. You learn additional bard cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Bard table.

**Spell Slots**
The Bard table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell’s level or higher. You regain all expended spell slots when you finish a long rest.

For example, if you know the 1st-level spell cure wounds and have a 1st-level and a 2nd-level spell slot available, you can cast cure wounds using either slot.

**Spells Known of 1st Level and Higher**
You know four 1st-level spells of your choice from the bard spell list.

The Spells Known column of the Bard table shows when you learn more bard spells of your choice. Each of these spells must be of a level for which you have spell slots, as shown on the table. For instance, when you reach 3rd level in this class, you can learn one new spell of 1st or 2nd level.

Additionally, when you gain a level in this class, you can choose one of the bard spells you know and replace it with another spell from the bard spell list, which also must be of a level for which you have spell slots.

**Spellcasting Ability**
Charisma is your spellcasting ability for your bard spells. Your magic comes from the heart and soul you pour into the performance of your music or oration. You use your Charisma whenever a spell refers to your spellcasting ability. In addition, you use your Charisma modifier when setting the saving throw DC for a bard spell you cast and when making an attack roll with one.

**Spell save DC** = 8 + your proficiency bonus + your Charisma modifier

**Spell attack modifier** = your proficiency bonus + your Charisma modifier

**Ritual Casting**
You can cast any bard spell you know as a ritual if that spell has the ritual tag.

**Spellcasting Focus**
You can use a musical instrument (see chapter 5, “Equip-ment”) as a spellcasting focus for your bard spells.`
            },
            {
                name: 'Bardic Inspiration',
                level: 1,
                content: `You can inspire others through stirring words or music. To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6.

Once within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the GM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.
                
You can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain any expended uses when you finish a long rest.
                
Your Bardic Inspiration die changes when you reach certain levels in this class. The die becomes a d8 at 5th level, a d10 at 10th level, and a d12 at 15th level.`
            },
            {
                name: 'Jack of All Trades',
                level: 2,
                content: 'Starting at 2nd level, you can add half your proficiency bonus, rounded down, to any ability check you make that doesn’t already include your proficiency bonus.'
            },
            {
                name: 'Song of Rest',
                level: 2,
                content: `Beginning at 2nd level, you can use soothing music or oration to help revitalize your wounded allies during a short rest. If you or any friendly creatures who can hear your performance regain hit points at the end of the short rest by spending one or more Hit Dice, each of those creatures regains an extra 1d6 hit points.\n\nThe extra hit points increase when you reach certain levels in this class: to 1d8 at 9th level, to 1d10 at 13th level, and to 1d12 at 17th level.`
            },
            {
                name: 'Bard College ~ Subclass',
                level: 3,
                content: 'At 3rd level, you delve into the advanced techniques of a bard college of your choice. Your choice grants you features at 3rd level and again at 6th and 14th level.'
            },
            {
                name: 'Expertise',
                level: 3,
                content: `At 3rd level, choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.\n\nAt 10th level, you can choose another two skill proficiencies to gain this benefit.`
            },
            {
                name: 'Ability Score Improvement',
                level: 4,
                content: ASI_CONTENT_STANDARD
            },
            {
                name: 'Font of Inspiration',
                level: 5,
                content: 'Beginning when you reach 5th level, you regain all of your expended uses of Bardic Inspiration when you finish a short or long rest.'
            },
            {
                name: 'Countercharm',
                level: 6,
                content: 'At 6th level, you gain the ability to use musical notes or words of power to disrupt mind-influencing effects. As an action, you can start a performance that lasts until the end of your next turn. During that time, you and any friendly creatures within 30 feet of you have advantage on saving throws against being frightened or charmed. A creature must be able to hear you to gain this benefit. The performance ends early if you are incapacitated or silenced or if you voluntarily end it (no action required).'
            },
            {
                name: 'Magical Secrets',
                level: 10,
                content: `By 10th level, you have plundered magical knowledge from a wide spectrum of disciplines. Choose two spells from any class, including this one. A spell you choose must be of a level you can cast, as shown on the Bard table, or a cantrip.

The chosen spells count as bard spells for you and are included in the number in the Spells Known column of the Bard table.
                
You learn two additional spells from any class at 14th level and again at 18th level.`
            },
            {
                name: 'Superior Inspiration',
                level: 20,
                content: 'At 20th level, when you roll initiative and have no uses of Bardic Inspiration left, you regain one use.'
            },
        ],
        resources: [
            {
                name: 'Bardic Inspiration',
                total: '',
                current: '',
                type: 'simple',
                levels: {
                    1: 'd6',
                    5: 'd8',
                    10: 'd10',
                    15: 'd12'
                }
            },
            {
                name: 'Song of Rest',
                total: '',
                current: '',
                type: 'simple',
                levels: {
                    2: 'd6',
                    9: 'd8',
                    13: 'd10',
                    17: 'd12'
                }
            },
        ],
        // TODO  - SPELLCASTING
        spellcasting: {
            ability: 'CHA',
            ability_info: `Charisma is your spellcasting ability for your bard spells. Your magic comes from the heart and soul you pour into the performance of your music or oration. You use your Charisma whenever a spell refers to your spellcasting ability. 

In addition, you use your Charisma modifier when setting the saving throw DC for a bard spell you cast and when making an attack roll with one.

**Spell save DC** = 8 + your proficiency bonus + your Charisma modifier

**Spell attack modifier** = your proficiency bonus + your Charisma modifier`,
            ritual_casting: 'You can cast any bard spell you know as a ritual if that spell has the ritual tag.',
            focus: 'You can use a musical instrument as a spellcasting focus for your bard spells.',
            casting_info: `You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music.

Your spells are part of your vast repertoire, magic that you can tune to different situations.

#### Cantrips
You know two cantrips of your choice from the bard spell list. You learn additional bard cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Bard table.

#### Spell Slots
The Bard table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell’s level or higher. You regain all expended spell slots when you finish a long rest.

For example, if you know the 1st-level spell cure wounds and have a 1st-level and a 2nd-level spell slot available, you can cast cure wounds using either slot.

#### Spells Known of 1st Level and Higher
You know four 1st-level spells of your choice from the bard spell list.

The Spells Known column of the Bard table shows when you learn more bard spells of your choice. Each of these spells must be of a level for which you have spell slots, as shown on the table. For instance, when you reach 3rd level in this class, you can learn one new spell of 1st or 2nd level.

Additionally, when you gain a level in this class, you can choose one of the bard spells you know and replace it with another spell from the bard spell list, which also must be of a level for which you have spell slots.`,
            cantrips_known: {
                1: 2,
                4: 3,
                10: 4
            },
            spells_known: {
                1: 4,
                2: 5,
                3: 6,
                4: 7,
                5: 8,
                6: 9,
                7: 10,
                8: 11,
                9: 12,
                10: 14,
                11: 15,
                13: 16,
                14: 18,
                15: 19,
                17: 20,
                18: 22
            },
            spell_slots: SPELLSLOTS_STANDARD,
            spells_by_level: SPELLS_BY_LEVEL_BLANK
        }
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
        saving_throws: [ 'WIS', 'CHA' ],
        skills: {
            final: [],
            choose_n: 2,
            type: 'list',
            options: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion']
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
        features: [
            {
                name: 'Spellcasting',
                level: 1,
                content: '',
            },
            {
                name: 'Divine Domain ~ Subclass',
                level: 1,
                content: `Choose one domain related to your deity. Your choice grants you domain spells and other features when you choose it at 1st level. It also grants you additional ways to use Channel Divinity when you gain that feature at 2nd level, and additional benefits at 6th, 8th, and 17th levels.`,
            },
            {
                name: 'Channel Divinity',
                level: 2,
                content: `At 2nd level, you gain the ability to channel divine energy directly from your deity, using that energy to fuel magical effects. You start with two such effects: Turn Undead and an effect determined by your domain. Some domains grant you additional effects as you advance in levels, as noted in the domain description.

When you use your Channel Divinity, you choose which effect to create. You must then finish a short or long rest to use your Channel Divinity again.
                
Some Channel Divinity effects require saving throws. When you use such an effect from this class, the DC equals your cleric spell save DC.
                
Beginning at 6th level, you can use your Channel Divinity twice between rests, and beginning at 18th level, you can use it three times between rests. When you finish a short or long rest, you regain your expended uses.`,
            },
            {
                name: 'Channel Divinity: Turn Undead',
                level: 2,
                content: `As an action, you present your holy symbol and speak a prayer censuring the undead. Each undead that can see or hear you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage.
                
A turned creature must spend its turns trying to move as far away from you as it can, and it can’t willingly move to a space within 30 feet of you. It also can’t take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there’s nowhere to move, the creature can use the Dodge action.`
            },
            {
                name: 'Ability Score Improvement',
                level: 4,
                content: ASI_CONTENT_STANDARD,
            },
            {
                name: 'Destroy Undead',
                level: 5,
                content: 'Starting at 5th level, when an undead fails its saving throw against your Turn Undead feature, the creature is instantly destroyed if its challenge rating is at or below a certain threshold, as shown in the Destroy Undead table.',
            },
            {
                name: 'Divine Intervention',
                level: 10,
                content: `Beginning at 10th level, you can call on your deity to intervene on your behalf when your need is great.

Imploring your deity’s aid requires you to use your action. Describe the assistance you seek, and roll percentile dice. If you roll a number equal to or lower than your cleric level, your deity intervenes. The GM chooses the nature of the intervention; the effect of any cleric spell or cleric domain spell would be appropriate.
                
If your deity intervenes, you can’t use this feature again for 7 days. Otherwise, you can use it again after you finish a long rest.
                
At 20th level, your call for intervention succeeds automatically, no roll required.`,
            },
        ],
        resources: [
            {
                name: 'Channel Divinity',
                total: '',
                current: '',
                type: 'simple',
                levels: {
                    2: '1/rest',
                    6: '2/rest',
                    18: '3/rest'
                }
            },
            {
                name: 'Destroy Undead',
                total: '',
                current: '',
                type: 'simple',
                levels: {
                    5: 'CR 1/2',
                    8: 'CR 1',
                    11: 'CR 2',
                    14: 'CR 3',
                    17: 'CR 4'
                }
            }
        ]
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
        saving_throws: [ 'INT', 'WIS' ],
        skills: {
            final: [],
            choose_n: 2,
            type: 'list',
            options: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival']
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
        features: [
            {
                name: 'Druidic',
                level: 1,
                content: 'You know Druidic, the secret language of druids. You can speak the language and use it to leave hidden messages. You and others who know this language automatically spot such a message. Others spot the message’s presence with a successful DC 15 Wisdom (Perception) check but can’t decipher it without magic.'
            },
            {
                name: 'Spellcasting',
                level: 1,
                content: `Drawing on the divine essence of nature itself, you can cast spells to shape that essence to your will.
                
**Cantrips**
At 1st level, you know two cantrips of your choice from the druid spell list. You learn additional druid cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Druid table.

**Preparing and Casting Spells**
The Druid table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these druid spells, you must expend a slot of the spell’s level or higher. You regain all expended spell slots when you finish a long rest.

You prepare the list of druid spells that are available for you to cast, choosing from the druid spell list. When you do so, choose a number of druid spells equal to your Wisdom modifier + your druid level (minimum of one spell). The spells must be of a level for which you have spell slots.

For example, if you are a 3rd-level druid, you have four 1st-level and two 2nd-level spell slots. With a Wisdom of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell cure wounds, you can cast it using a 1st-level or 2nd-level slot. Casting the spell doesn’t remove it from your list of prepared spells.

You can also change your list of prepared spells when you finish a long rest. Preparing a new list of druid spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.

**Spellcasting Ability**
Wisdom is your spellcasting ability for your druid spells, since your magic draws upon your devotion and attunement to nature. You use your Wisdom whenever a spell refers to your spellcasting ability. In addition, you use your Wisdom modifier when setting the saving throw DC for a druid spell you cast and when making an attack roll with one.

**Spell save DC** = 8 + your proficiency bonus + your Wisdom modifier
**Spell attack modifier** = your proficiency bonus + your Wisdom modifier

**Ritual Casting**
You can cast a druid spell as a ritual if that spell has the ritual tag and you have the spell prepared.

**Spellcasting Focus**
You can use a druidic focus (see chapter 5, “Equip- ment”) as a spellcasting focus for your druid spells.`
            },
            {
                name: 'Wild Shape',
                level: 2,
                content: `Starting at 2nd level, you can use your action to magically assume the shape of a beast that you have seen before. You can use this feature twice. You regain expended uses when you finish a short or long rest.

Your druid level determines the beasts you can transform into, as shown in the Beast Shapes table. At 2nd level, for example, you can transform into any beast that has a challenge rating of 1/4 or lower that doesn’t have a flying or swimming speed.

**Beast Shapes**
Level CR    Limitations
2nd 	1/4  No flying or swimming speed
4th 	1/2  No flying speed
8th 	1      —

You can stay in a beast shape for a number of hours equal to half your druid level (rounded down). You then revert to your normal form unless you expend another use of this feature. You can revert to your normal form earlier by using a bonus action on your turn. You automatically revert if you fall unconscious, drop to 0 hit points, or die.

While you are transformed, the following rules apply:

-   Your game statistics are replaced by the statistics of the beast, but you retain your alignment, personality, and Intelligence, Wisdom, and Charisma scores. You also retain all of your skill and saving throw proficiencies, in addition to gaining those of the creature. If the creature has the same proficiency as you and the bonus in its stat block is higher than yours, use the creature’s bonus instead of yours. If the creature has any legendary or lair actions, you can’t use them.
\n-   When you transform, you assume the beast’s hit points and Hit Dice. When you revert to your normal form, you return to the number of hit points you had before you transformed. However, if you revert as a result of dropping to 0 hit points, any excess damage carries over to your normal form. For example, if you take 10 damage in animal form and have only 1 hit point left, you revert and take 9 damage. As long as the excess damage doesn’t reduce your normal form to 0 hit points, you aren’t knocked unconscious.
\n-   You can’t cast spells, and your ability to speak or take any action that requires hands is limited to the capabilities of your beast form. Transforming doesn’t break your concentration on a spell you’ve already cast, however, or prevent you from taking actions that are part of a spell, such as call lightning, that you’ve already cast.
\n-   You retain the benefit of any features from your class, race, or other source and can use them if the new form is physically capable of doing so. However, you can’t use any of your special senses, such as darkvision, unless your new form also has that sense.
\n-   You choose whether your equipment falls to the ground in your space, merges into your new form, or is worn by it. Worn equipment functions as normal, but the GM decides whether it is practical for the new form to wear a piece of equipment, based on the creature’s shape and size. Your equipment doesn’t change size or shape to match the new form, and any equipment that the new form can’t wear must either fall to the ground or merge with it. Equipment that merges with the form has no effect until you leave the form.`
            },
            {
                name: 'Druid Circle ~ Subclass',
                level: 2,
                content: 'At 2nd level, you choose to identify with a circle of druids. Your choice grants you features at 2nd level and again at 6th, 10th, and 14th level.'
            },
            {
                name: 'Ability Score Improvement',
                level: 4,
                content: ASI_CONTENT_STANDARD
            },
            {
                name: 'Timeless Body',
                level: 18,
                content: 'Starting at 18th level, the primal magic that you wield causes you to age more slowly. For every 10 years that pass, your body ages only 1 year.'
            },
            {
                name: 'Beast Spells',
                level: 18,
                content: 'Beginning at 18th level, you can cast many of your druid spells in any shape you assume using Wild Shape. You can perform the somatic and verbal components of a druid spell while in a beast shape, but you aren’t able to provide material components.'
            },
            {
                name: 'Archdruid',
                level: 20,
                content: `At 20th level, you can use your Wild Shape an unlimited number of times.\n\nAdditionally, you can ignore the verbal and somatic components of your druid spells, as well as any material components that lack a cost and aren’t consumed by a spell. You gain this benefit in both your normal shape and your beast shape from Wild Shape.`
            },
        ],
        resources: []
    },
    {
        name: 'Fighter',
        level: 1,
        hp: {
            hit_die: 10
        },
        other_prof: [
            {
                type: OTHER_PROF.ARMOR,
                name: 'All armor'
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
            },
        ],
        tool_prof: {
            label: 'None',
            tools: []
        },
        saving_throws: [ 'STR', 'CON' ],
        skills: {
            final: [],
            choose_n: 2,
            type: 'list',
            options: [ 'Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival' ]
        },
        equipment: [
            // 1st line ~ (a) chain mail or (b) leather armor, longbow, and 20 arrows
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: 'Chain mail',
                            amount: 1,
                            tags: [] // TODO
                        }
                    ],
                    // (b)
                    [
                        {
                            name: 'Leather armor',
                            amount: 1,
                            tags: [
                                'weapon'
                            ]
                        }
                    ],
                    // (c)
                    [
                        {
                            name: 'Longbow',
                            amount: 1,
                            tags: [
                                'weapon'
                            ],
                        },
                        {
                            name: 'Arrows',
                            amount: 20,
                            tags: [
                                'resource'
                            ]
                        }
                    ]
                ]
            },
            // 2nd line ~ (a) a martial weapon and a shield or (b) two martial weapons
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: '',
                            amount: 1,
                            tags: [],
                            placeholder: 'any martial ⚔️',
                            options: WEAPONS_MARTIAL_ALL
                        },
                        {
                            name: "Shield",
                            amount: 1,
                            tags: [],
                            description: '' // TODO
                        }
                    ],
                    // (b)
                    [
                        {
                            name: '',
                            amount: 1,
                            tags: [],
                            placeholder: 'any martial ⚔️',
                            options: WEAPONS_MARTIAL_ALL
                        },
                        {
                            name: '',
                            amount: 1,
                            tags: [],
                            placeholder: 'any martial ⚔️',
                            options: WEAPONS_MARTIAL_ALL
                        },
                    ],
                ]
            },
            // 3rd line ~ (a) a light crossbow and 20 bolts or (b) two handaxes
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: 'Light crossbow',
                            amount: 1,
                            tags: [
                                'weapon'
                            ],
                        },
                        {
                            name: 'Bolts',
                            amount: 20,
                            tags: [
                                'resource'
                            ]
                        }
                    ],
                    // (b)
                    [
                        {
                            name: 'Handaxe',
                            amount: 2,
                            tags: [
                                'weapon'
                            ],
                        },
                    ],
                ]
            },
            // 4th ~ (a) a dungeoneer’s pack or (b) an explorer’s pack
            {
                final: [],
                line_options: [
                    [
                        {
                            name: 'Dungeoneer’s pack',
                            amount: 1,
                            tags: [],
                            description: '', // TODO -- add equipment pack description lookup
                        },
                    ],
                    [
                        {
                            name: 'Explorer’s pack',
                            amount: 1,
                            tags: [],
                            description: '', // TODO -- add equipment pack description lookup
                        },
                    ]
                ]
            }
        ],
        features: [
            {
                name: 'Fighting Style',
                level: 1,
                content: `You adopt a particular style of fighting as your specialty. Choose one of the following options. You can’t take a Fighting Style option more than once, even if you later get to choose again.

**Archery**
You gain a +2 bonus to attack rolls you make with ranged weapons.

**Defense**
While you are wearing armor, you gain a +1 bonus to AC.

**Dueling**
When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.

**Great Weapon Fighting**
When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.

**Protection**
When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.

**Two-Weapon Fighting**
When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.`
            },
            {
                name: 'Second Wind',
                level: 1,
                content: 'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again.'
            },
            {
                name: 'Action Surge',
                level: 2,
                content: `Starting at 2nd level, you can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action on top of your regular action and a possible bonus action.\n\nOnce you use this feature, you must finish a short or long rest before you can use it again. Starting at 17th level, you can use it twice before a rest, but only once on the same turn.`
            },
            {
                name: 'Martial Archetype ~ Subclass',
                level: 3,
                content: 'At 3rd level, you choose an archetype that you strive to emulate in your combat styles and techniques. The archetype you choose grants you features at 3rd level and again at 7th, 10th, 15th, and 18th level.'
            },
            {
                name: 'Ability Score Improvement',
                level: 4,
                content: 'When you reach 4th level, and again at 6th, 8th, 12th, 14th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature.'
            },
            {
                name: 'Extra Attack',
                level: 5,
                content: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.\n\nThe number of attacks increases to three when you reach 11th level in this class and to four when you reach 20th level in this class.'
            },
            {
                name: 'Indomitable',
                level: 9,
                content: 'Beginning at 9th level, you can reroll a saving throw that you fail. If you do so, you must use the new roll, and you can’t use this feature again until you finish a long rest.\n\nYou can use this feature twice between long rests starting at 13th level and three times between long rests starting at 17th level.'
            },
        ],
        resources: [
            {
                name: 'Action Surge',
                total: '',
                current: '',
                type: 'simple',
                levels: {
                    2: '1/rest',
                    17: '2/rest',
                }
            },
            {
                name: 'Indomitable',
                total: '',
                current: '',
                type: 'simple',
                levels: {
                    9: '1/rest',
                    13: '2/rest',
                    17: '3/rest',
                }
            },
            {
                name: 'Extra Attack',
                total: '',
                current: '',
                type: 'simple',
                levels: {
                    5: '1',
                    11: '2',
                    20: '3',
                }
            },
        ],
    },
    {
        name: 'Monk',
        level: 1,
        hp: {
            hit_die: 8
        },
        other_prof: [
            {
                type: OTHER_PROF.WEAPON,
                name: 'Simple weapons'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Shortswords'
            },
        ],
        tool_prof: {
            label: 'Choose one type of artisan’s tools or one musical instrument:',
            tools: [
                {
                    name: '',
                    choose_list: ARTISAN_TOOLS
                },
                {
                    name: '',
                    choose_list: MUSICAL_INSTRUMENTS
                },
            ]
        },
        saving_throws: [ 'STR', 'DEX' ],
        skills: {
            final: [],
            choose_n: 2,
            type: 'list',
            options: [ 'Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth' ]
        },
        equipment: [
            // 1st line ~ (a) a shortsword or (b) any simple weapon
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: 'Shortsword',
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
                            placeholder: 'any simple ⚔️',
                            options: WEAPONS_SIMPLE_ALL
                        }
                    ],
                ]
            },
            // 2nd line ~ (a) a dungeoneer’s pack or (b) an explorer’s pack
            {
                final: [],
                line_options: [
                    [
                        {
                            name: 'Dungeoneer’s pack',
                            amount: 1,
                            tags: [],
                            description: '', // TODO -- add equipment pack description lookup
                        },
                    ],
                    [
                        {
                            name: 'Explorer’s pack',
                            amount: 1,
                            tags: [],
                            description: '', // TODO -- add equipment pack description lookup
                        },
                    ]
                ]
            },
            {
                final: [
                    {
                        name: 'Dart',
                        amount: 10,
                        tags: [
                            'weapon', 'resource'
                        ],
                    },
                ]
            }
        ],
        features: [
            {
                name: 'Unarmored Defense',
                level: 1,
                content: 'Beginning at 1st level, while you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier.'
            },
            {
                name: 'Martial Arts',
                level: 1,
                content: `At 1st level, your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons, which are shortswords and any simple melee weapons that don’t have the two- handed or heavy property.
\nYou gain the following benefits while you are unarmed or wielding only monk weapons and you aren’t wearing armor or wielding a shield:
\n-   You can use Dexterity instead of Strength for the attack and damage rolls of your unarmed strikes and monk weapons.
-   You can roll a d4 in place of the normal damage of your unarmed strike or monk weapon. This die changes as you gain monk levels, as shown in the Martial Arts column of the Monk table.
-   When you use the Attack action with an unarmed strike or a monk weapon on your turn, you can make one unarmed strike as a bonus action. For example, if you take the Attack action and attack with a quarterstaff, you can also make an unarmed strike as a bonus action, assuming you haven’t already taken a bonus action this turn.
\nCertain monasteries use specialized forms of the monk weapons. For example, you might use a club that is two lengths of wood connected by a short chain (called a nunchaku) or a sickle with a shorter, straighter blade (called a kama). Whatever name you use for a monk weapon, you can use the game statistics provided for the weapon.`
            },
            {
                name: 'Ki',
                level: 2,
                content: `Starting at 2nd level, your training allows you to harness the mystic energy of ki. Your access to this energy is represented by a number of ki points. Your monk level determines the number of points you have, as shown in the Ki Points column of the Monk table.

You can spend these points to fuel various ki features. You start knowing three such features: Flurry of Blows, Patient Defense, and Step of the Wind. You learn more ki features as you gain levels in this class.

When you spend a ki point, it is unavailable until you finish a short or long rest, at the end of which you draw all of your expended ki back into yourself. You must spend at least 30 minutes of the rest meditating to regain your ki points.

Some of your ki features require your target to make a saving throw to resist the feature’s effects. The saving throw DC is calculated as follows:

**Ki save DC** = 8 + your proficiency bonus + your Wisdom modifier

**Flurry of Blows**
Immediately after you take the Attack action on your turn, you can spend 1 ki point to make two unarmed strikes as a bonus action.

**Patient Defense**
You can spend 1 ki point to take the Dodge action as a bonus action on your turn.

**Step of the Wind**
You can spend 1 ki point to take the Disengage or Dash action as a bonus action on your turn, and your jump distance is doubled for the turn.`
            },
            {
                name: 'Unarmored Movement',
                level: 2,
                content: `Starting at 2nd level, your speed increases by 10 feet while you are not wearing armor or wielding a shield. This bonus increases when you reach certain monk levels, as shown in the Monk table.
At 9th level, you gain the ability to move along vertical surfaces and across liquids on your turn without falling during the move.`
            },
            {
                name: 'Monastic Tradition ~ Subclass',
                level: 3,
                content: 'When you reach 3rd level, you commit yourself to a monastic tradition. Your tradition grants you features at 3rd level and again at 6th, 11th, and 17th level.'
            },
            {
                name: 'Deflect Missiles',
                level: 3,
                content: `Starting at 3rd level, you can use your reaction to deflect or catch the missile when you are hit by a ranged weapon attack. When you do so, the damage you take from the attack is reduced by 1d10 + your Dexterity modifier + your monk level.
\nIf you reduce the damage to 0, you can catch the missile if it is small enough for you to hold in one hand and you have at least one hand free. If you catch a missile in this way, you can spend 1 ki point to make a ranged attack with the weapon or piece of ammunition you just caught, as part of the same reaction. You make this attack with proficiency, regardless of your weapon proficiencies, and the missile counts as a monk weapon for the attack, which has a normal range of 20 feet and a long range of 60 feet.`
            },
            {
                name: 'Ability Score Improvement',
                level: 4,
                content: 'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature.'
            },
            {
                name: 'Slow Fall',
                level: 4,
                content: 'Beginning at 4th level, you can use your reaction when you fall to reduce any falling damage you take by an amount equal to five times your monk level.'
            },
            {
                name: 'Extra Attack',
                level: 5,
                content: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.'
            },
            {
                name: 'Stunning Strike',
                level: 5,
                content: 'Starting at 5th level, you can interfere with the flow of ki in an opponent’s body. When you hit another creature with a melee weapon attack, you can spend 1 ki point to attempt a stunning strike. The target must succeed on a Constitution saving throw or be stunned until the end of your next turn.'
            },
            {
                name: 'Ki-Empowered Strikes',
                level: 6,
                content: 'Starting at 6th level, your unarmed strikes count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.'
            },
            {
                name: 'Evasion',
                level: 7,
                content: 'At 7th level, your instinctive agility lets you dodge out of the way of certain area effects, such as a blue dragon’s lightning breath or a fireball spell. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.'
            },
            {
                name: 'Stillness of Mind',
                level: 7,
                content: 'Starting at 7th level, you can use your action to end one effect on yourself that is causing you to be charmed or frightened.'
            },
            {
                name: 'Purity of Body',
                level: 10,
                content: 'At 10th level, your mastery of the ki flowing through you makes you immune to disease and poison.'
            },
            {
                name: 'Tongue of the Sun and Moon',
                level: 13,
                content: 'Starting at 13th level, you learn to touch the ki of other minds so that you understand all spoken languages. Moreover, any creature that can understand a language can understand what you say.'
            },
            {
                name: 'Diamond Soul',
                level: 14,
                content: 'Beginning at 14th level, your mastery of ki grants you proficiency in all saving throws.\n\nAdditionally, whenever you make a saving throw and fail, you can spend 1 ki point to reroll it and take the second result.'
            },
            {
                name: 'Timeless Body',
                level: 15,
                content: 'At 15th level, your ki sustains you so that you suffer none of the frailty of old age, and you can’t be aged magically. You can still die of old age, however. In addition, you no longer need food or water.'
            },
            {
                name: 'Empty Body',
                level: 18,
                content: `Beginning at 18th level, you can use your action to spend 4 ki points to become invisible for 1 minute. During that time, you also have resistance to all damage but force damage.
\nAdditionally, you can spend 8 ki points to cast the astral projection spell, without needing material components. When you do so, you can’t take any other creatures with you.`
            },
            {
                name: 'Perfect Self',
                level: 20,
                content: 'At 20th level, when you roll for initiative and have no ki points remaining, you regain 4 ki points.'
            },
        ],
        resources: [
            {
                name: 'Martial Arts',
                total: '',
                current: '',
                type: 'simple',
                levels: {
                    1: '1d4',
                    5: '1d6',
                    11: '1d8',
                    17: '1d10'
                }
            },
            {
                name: 'Ki Points',
                total: '',
                current: '',
                type: 'simple',
                levels: {
                    1: '',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8',
                    9: '9',
                    10: '10',
                    11: '11',
                    12: '12',
                    13: '13',
                    14: '14',
                    15: '15',
                    16: '16',
                    17: '17',
                    18: '18',
                    19: '19',
                    20: '20'
                }
            },
            {
                name: 'Unarmored Movement',
                total: '',
                current: '',
                type: 'simple',
                levels: {
                    2: '+10 ft.',
                    6: '+15 ft.',
                    10: '+20 ft.',
                    14: '+25 ft.',
                    18: '+30 ft.'
                }
            },
        ],
    },
]
