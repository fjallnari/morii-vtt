import ClassData from "../../interfaces/srd/ClassData";
import { OTHER_PROF } from "../OTHER_PROF";
import { PACKS } from "./PACKS";
import { TOOLS } from "./TOOLS";
import { WEAPONS } from "./WEAPONS";

const ARTISAN_TOOLS = TOOLS['ARTISAN'].map(tool => tool.name);
const MUSICAL_INSTRUMENTS = TOOLS['MUSIC'].map(tool => tool.name);
const WEAPONS_SIMPLE_ALL = WEAPONS.SIMPLE.MELEE.concat(WEAPONS.SIMPLE.RANGED);
const WEAPONS_MARTIAL_ALL = WEAPONS.MARTIAL.MELEE.concat(WEAPONS.MARTIAL.RANGED);

const ASI_CONTENT_STANDARD = 'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature.';
const ASI_LEVELS_STANDARD = {
    4: '1',
    8: '2',
    12: '3',
    16: '4',
    19: '5'
};

const SPELLSLOTS_STANDARD = [
    [ '2' ],
    [ '3' ],
    [ '4', '2' ],
    [ '4', '3' ],
    [ '4', '3', '2' ],
    [ '4', '3', '3' ],
    [ '4', '3', '3', '1' ],
    [ '4', '3', '3', '2' ],
    [ '4', '3', '3', '3', '1' ],
    [ '4', '3', '3', '3', '2' ],
    [ '4', '3', '3', '3', '2', '1' ],
    [ '4', '3', '3', '3', '2', '1' ],
    [ '4', '3', '3', '3', '2', '1', '1' ],
    [ '4', '3', '3', '3', '2', '1', '1' ],
    [ '4', '3', '3', '3', '2', '1', '1', '1' ],
    [ '4', '3', '3', '3', '2', '1', '1', '1' ],
    [ '4', '3', '3', '3', '2', '1', '1', '1', '1' ],
    [ '4', '3', '3', '3', '3', '1', '1', '1', '1' ],
    [ '4', '3', '3', '3', '3', '2', '1', '1', '1' ],
    [ '4', '3', '3', '3', '3', '2', '2', '1', '1' ],
];

const SPELLSLOTS_HALFCASTER = [
    [ ],
    [ '2' ],
    [ '3' ],
    [ '3' ],
    [ '4', '2' ],
    [ '4', '2' ], 
    [ '4', '3' ], 
    [ '4', '3' ],
    [ '4', '3', '2' ],
    [ '4', '3', '2' ],
    [ '4', '3', '3' ],
    [ '4', '3', '3'  ],
    [ '4', '3', '3', '1' ],
    [ '4', '3', '3', '1' ],
    [ '4', '3', '3', '2' ],
    [ '4', '3', '3', '2' ],
    [ '4', '3', '3', '3', '1' ],
    [ '4', '3', '3', '3', '1' ],
    [ '4', '3', '3', '3', '2' ],
    [ '4', '3', '3', '3', '2' ],
];

const SPELLSLOTS_WARLOCK = [
    [ '1' ],
    [ '2' ],
    [ '0', '2' ],
    [ '0', '2' ],
    [ '0', '0', '2' ],
    [ '0', '0', '2' ], 
    [ '0', '0', '0', '2' ], 
    [ '0', '0', '0', '2' ],
    [ '0', '0', '0', '0', '2' ],
    [ '0', '0', '0', '0', '2' ],
    [ '0', '0', '0', '0', '3' ],
    [ '0', '0', '0', '0', '3'  ],
    [ '0', '0', '0', '0', '3' ],
    [ '0', '0', '0', '0', '3' ],
    [ '0', '0', '0', '0', '3' ],
    [ '0', '0', '0', '0', '3' ],
    [ '0', '0', '0', '0', '4' ],
    [ '0', '0', '0', '0', '4' ],
    [ '0', '0', '0', '0', '4' ],
    [ '0', '0', '0', '0', '4' ],
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
    {
        name: 'Custom',
        level: 1,
        hp: {
            hit_die: '?'
        },
        other_prof: [],
        tool_prof: {
            label: '',
            tools: []
        },
        saving_throws: [],
        skills: {
            final: [],
            choose_n: 0,
            type: 'any',
        },
        equipment: [
            {
                final: []
            }
        ],
        features: [],
        asi: {
            4: '1',
            8: '2',
            10: '3',
            12: '4',
            16: '5',
            19: '6'
        },
        resources: [],
        as_prio: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']
    },
    {
        name: 'Barbarian',
        level: 1,
        hp: {
            hit_die: '12'
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
            label: '',
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
                        description: PACKS['EXPLORER']
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
        asi: ASI_LEVELS_STANDARD,
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
            },
        ],
        as_prio: ['STR', 'CON', 'DEX', 'WIS', 'CHA', 'INT']
    },
    {
        name: 'Bard',
        level: 1,
        hp: {
            hit_die: '8'
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
                            description: PACKS['DIPLOMAT']
                        }
                    ],
                    // (b)
                    [
                        {
                            name: "Entertainer’s pack",
                            amount: 1,
                            tags: [],
                            description: PACKS['ENTERTAINER']
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
            // 4th line ~ Leather armor and a dagger
            {
                final: [
                    {
                        name: 'Explorer’s pack',
                        amount: 1,
                        tags: [],
                        description: PACKS['EXPLORER']
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
        asi: ASI_LEVELS_STANDARD,
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
        },
        as_prio: ['CHA', 'CON', 'DEX', 'WIS', 'STR', 'INT']
    },
    {
        name: 'Cleric',
        level: 1,
        hp: {
            hit_die: '8'
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
            label: '',
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
                            name: "Light crossbow",
                            amount: 1,
                            tags: [
                                'weapon'
                            ],
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
                            tags: [
                                'weapon'
                            ],
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
                            description: PACKS['PRIEST']
                        }
                    ],
                    // (b)
                    [
                        {
                            name: 'Explorer’s pack',
                            amount: 1,
                            tags: [],
                            description: PACKS['EXPLORER']
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
                content: `As a conduit for divine power, you can cast cleric spells.
#### Cantrips

At 1st level, you know three cantrips of your choice from the cleric spell list. You learn additional cleric cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Cleric table.

#### Preparing and Casting Spells
The Cleric table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell’s level or higher. You regain all expended spell slots when you finish a long rest.

You prepare the list of cleric spells that are available for you to cast, choosing from the cleric spell list. When you do so, choose a number of cleric spells equal to your Wisdom modifier + your cleric level (minimum of one spell). The spells must be of a level for which you have spell slots.

For example, if you are a 3rd-level cleric, you have four 1st-level and two 2nd-level spell slots. With a Wisdom of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell cure wounds, you can cast it using a 1st-level or 2nd-level slot. Casting the spell doesn’t remove it from your list of prepared spells.

You can change your list of prepared spells when you finish a long rest. Preparing a new list of cleric spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.

#### Spellcasting Ability
Wisdom is your spellcasting ability for your cleric spells. The power of your spells comes from your devotion to your deity. You use your Wisdom whenever a cleric spell refers to your spellcasting ability. In addition, you use your Wisdom modifier when setting the saving throw DC for a cleric spell you cast and when making an attack roll with one.

**Spell save DC** = 8 + your proficiency bonus + your Wisdom modifier

**Spell attack modifier** = your proficiency bonus + your Wisdom modifier

#### Ritual Casting
You can cast a cleric spell as a ritual if that spell has the ritual tag and you have the spell prepared.

#### Spellcasting Focus
You can use a holy symbol (see chapter 5, “Equipment”) as a spellcasting focus for your cleric spells.`,
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
        asi: ASI_LEVELS_STANDARD,
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
        ],
        spellcasting: {
            ability: 'WIS',
            ability_info: `Wisdom is your spellcasting ability for your cleric spells. The power of your spells comes from your devotion to your deity. You use your Wisdom whenever a cleric spell refers to your spellcasting ability. 

In addition, you use your Wisdom modifier when setting the saving throw DC for a cleric spell you cast and when making an attack roll with one.

**Spell save DC** = 8 + your proficiency bonus + your Wisdom modifier

**Spell attack modifier** = your proficiency bonus + your Wisdom modifier`,
            ritual_casting: 'You can cast a cleric spell as a ritual if that spell has the ritual tag and you have the spell prepared.',
            focus: 'You can use a holy symbol as a spellcasting focus for your cleric spells.',
            casting_info: `As a conduit for divine power, you can cast cleric spells.

#### Cantrips
At 1st level, you know three cantrips of your choice from the cleric spell list. You learn additional cleric cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Cleric table.

#### Preparing and Casting Spells
The Cleric table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell’s level or higher. You regain all expended spell slots when you finish a long rest.

You prepare the list of cleric spells that are available for you to cast, choosing from the cleric spell list. When you do so, choose a number of cleric spells equal to your Wisdom modifier + your cleric level (minimum of one spell). The spells must be of a level for which you have spell slots.

For example, if you are a 3rd-level cleric, you have four 1st-level and two 2nd-level spell slots. With a Wisdom of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell cure wounds, you can cast it using a 1st-level or 2nd-level slot. Casting the spell doesn’t remove it from your list of prepared spells.

You can change your list of prepared spells when you finish a long rest. Preparing a new list of cleric spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.`,
            cantrips_known: {
                1: 3,
                4: 4,
                10: 5
            },
            spell_slots: SPELLSLOTS_STANDARD,
            spells_by_level: SPELLS_BY_LEVEL_BLANK
        },
        as_prio: ['WIS', 'CON', 'DEX', 'STR', 'CHA', 'INT']
    },
    {
        name: 'Druid',
        level: 1,
        hp: {
            hit_die: '8'
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
                        description: PACKS['EXPLORER']
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
        asi: ASI_LEVELS_STANDARD,
        resources: [],
        spellcasting: {
            ability: 'WIS',
            ability_info: `Wisdom is your spellcasting ability for your druid spells, since your magic draws upon your devotion and attunement to nature.

In addition, you use your Wisdom modifier when setting the saving throw DC for a druid spell you cast and when making an attack roll with one.

**Spell save DC** = 8 + your proficiency bonus + your Wisdom modifier

**Spell attack modifier** = your proficiency bonus + your Wisdom modifier`,
            ritual_casting: 'You can cast a druid spell as a ritual if that spell has the ritual tag and you have the spell prepared.',
            focus: 'You can use a druidic focus as a spellcasting focus for your druid spells.',
            casting_info: `Drawing on the divine essence of nature itself, you can cast spells to shape that essence to your will.

#### Cantrips
At 1st level, you know two cantrips of your choice from the druid spell list. You learn additional druid cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Druid table.

#### Preparing and Casting Spells
The Druid table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these druid spells, you must expend a slot of the spell’s level or higher. You regain all expended spell slots when you finish a long rest.

You prepare the list of druid spells that are available for you to cast, choosing from the druid spell list. When you do so, choose a number of druid spells equal to your Wisdom modifier + your druid level (minimum of one spell). The spells must be of a level for which you have spell slots.`,
            cantrips_known: {
                1: 2,
                4: 3,
                10: 4
            },
            spell_slots: SPELLSLOTS_STANDARD,
            spells_by_level: SPELLS_BY_LEVEL_BLANK
        },
        as_prio: ['WIS', 'CON', 'DEX', 'STR', 'CHA', 'INT']
    },
    {
        name: 'Fighter',
        level: 1,
        hp: {
            hit_die: '10'
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
            label: '',
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
                            tags: []
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
                            tags: [
                                'weapon'
                            ],
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
                            tags: [
                                'weapon'
                            ],
                            placeholder: 'any martial ⚔️',
                            options: WEAPONS_MARTIAL_ALL
                        },
                        {
                            name: '',
                            amount: 1,
                            tags: [
                                'weapon'
                            ],
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
                            description: PACKS['DUNGEONEER']
                        },
                    ],
                    [
                        {
                            name: 'Explorer’s pack',
                            amount: 1,
                            tags: [],
                            description: PACKS['EXPLORER']
                        },
                    ]
                ]
            }
        ],
        features: [
            {
                name: 'Fighting Style - ???',
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
        asi: {
            4: '1',
            6: '2',
            8: '3',
            12: '4',
            16: '5',
            19: '6'
        },
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
        as_prio: ['STR', 'CON', 'DEX', 'WIS', 'CHA', 'INT']
    },
    {
        name: 'Monk',
        level: 1,
        hp: {
            hit_die: '8'
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
                            description: PACKS['DUNGEONEER']
                        },
                    ],
                    [
                        {
                            name: 'Explorer’s pack',
                            amount: 1,
                            tags: [],
                            description: PACKS['EXPLORER']
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
                content: ASI_CONTENT_STANDARD
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
        asi: ASI_LEVELS_STANDARD,
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
        as_prio: ['DEX', 'WIS', 'CON', 'STR', 'CHA', 'INT']
    },
    {
        name: 'Paladin',
        level: 1,
        hp: {
            hit_die: '10'
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
            label: '',
            tools: []
        },
        saving_throws: [ 'WIS', 'CHA' ],
        skills: {
            final: [],
            choose_n: 2,
            type: 'list',
            options: [ 'Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion' ]
        },
        equipment: [
                // 1st line ~ (a) a martial weapon and a shield or (b) two martial weapons
                {
                    final: [],
                    line_options: [
                        // (a)
                        [
                            {
                                name: '',
                                amount: 1,
                                tags: [
                                    'weapon'
                                ],
                                placeholder: 'any martial ⚔️',
                                options: WEAPONS_MARTIAL_ALL
                            },
                            {
                                name: 'Shield',
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
                                placeholder: 'any martial ⚔️',
                                options: WEAPONS_MARTIAL_ALL
                            },
                            {
                                name: '',
                                amount: 1,
                                tags: [
                                    'weapon'
                                ],
                                placeholder: 'any martial ⚔️',
                                options: WEAPONS_MARTIAL_ALL
                            },
                        ],
                    ]
                },
                // 2nd line ~ (a) five javelins or (b) any simple melee weapon
                {
                    final: [],
                    line_options: [
                        // (a)
                        [
                            {
                                name: 'Javelin',
                                amount: 5,
                                tags: [
                                    'weapon',
                                    'resource'
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
                                placeholder: 'any simple melee ⚔️',
                                options: WEAPONS.SIMPLE.MELEE
                            }
                        ],
                    ]
                },
                // 3rd line ~ (a) a priest’s pack or (b) an explorer’s pack
                {
                    final: [],
                    line_options: [
                        // (a)
                        [
                            {
                                name: "Priest’s pack",
                                amount: 1,
                                tags: [],
                                description: PACKS['PRIEST']
                            }
                        ],
                        // (b)
                        [
                            {
                                name: "Explorer’s pack",
                                amount: 1,
                                tags: [],
                                description: PACKS['EXPLORER']
                            }
                        ],
                    ]
                },
                // 4th line ~ Leather armor and a dagger
                {
                    final: [
                        {
                            name: 'Chain Mail',
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
                name: 'Divine Sense',
                level: 1,
                content: `The presence of strong evil registers on your senses like a noxious odor, and powerful good rings like heavenly music in your ears. As an action, you can open your awareness to detect such forces. 

Until the end of your next turn, you know the location of any celestial, fiend, or undead within 60 feet of you that is not behind total cover. You know the type (celestial, fiend, or undead) of any being whose presence you sense, but not its identity (the vampire Count Strahd von Zarovich, for instance). Within the same radius, you also detect the presence of any place or object that has been consecrated or desecrated, as with the hallow spell.

You can use this feature a number of times equal to 1 + your Charisma modifier. When you finish a long rest, you regain all expended uses.`
            },
            {
                name: 'Lay on Hands',
                level: 1,
                content: `Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level × 5.

As an action, you can touch a creature and draw power from the pool to restore a number of hit points to that creature, up to the maximum amount remaining in your pool.

Alternatively, you can expend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison affecting it. You can cure multiple diseases and neutralize multiple poisons with a single use of Lay on Hands, expending hit points separately for each one.

This feature has no effect on undead and constructs.`
            },
            {
                name: 'Fighting Style - ???',
                level: 2,
                content: `At 2nd level, you adopt a style of fighting as your specialty. Choose one of the following options. You can’t take a Fighting Style option more than once, even if you later get to choose again.

**Defense**
While you are wearing armor, you gain a +1 bonus to AC.

**Dueling**
When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.

**Great Weapon Fighting**
When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll. The weapon must have the two-handed or versatile property for you to gain this benefit.

**Protection**
When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.`
            },
            {
                name: 'Spellcasting',
                level: 2,
                content: `By 2nd level, you have learned to draw on divine magic through meditation and prayer to cast spells as a cleric does.

**Preparing and Casting Spells**
The Paladin table shows how many spell slots you have to cast your spells. To cast one of your paladin spells of 1st level or higher, you must expend a slot of the spell’s level or higher. You regain all expended spell slots when you finish a long rest.

You prepare the list of paladin spells that are available for you to cast, choosing from the paladin spell list. When you do so, choose a number of paladin spells equal to your Charisma modifier + half your paladin level, rounded down (minimum of one spell). The spells must be of a level for which you have spell slots.

For example, if you are a 5th-level paladin, you have four 1st-level and two 2nd-level spell slots. With a Charisma of 14, your list of prepared spells can include four spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell cure wounds, you can cast it using a 1st-level or a 2nd- level slot. Casting the spell doesn’t remove it from your list of prepared spells.

You can change your list of prepared spells when you finish a long rest. Preparing a new list of paladin spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.

**Spellcasting Ability**
Charisma is your spellcasting ability for your paladin spells, since their power derives from the strength of your convictions. You use your Charisma whenever a spell refers to your spellcasting ability. In addition, you use your Charisma modifier when setting the saving throw DC for a paladin spell you cast and when making an attack roll with one.

**Spell save DC** = 8 + your proficiency bonus + your Charisma modifier

**Spell attack modifier** = your proficiency bonus + your Charisma modifier

**Spellcasting Focus**
You can use a holy symbol as a spellcasting focus for your paladin spells.`
            },
            {
                name: 'Divine Smite',
                level: 2,
                content: `Starting at 2nd level, when you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage to the target, in addition to the weapon’s damage. The extra damage is 2d8 for a 1st-level spell slot, plus 1d8 for each spell level higher than 1st, to a maximum of 5d8. The damage increases by 1d8 if the target is an undead or a fiend.`
            },
            {
                name: 'Divine Health',
                level: 3,
                content: 'By 3rd level, the divine magic flowing through you makes you immune to disease.'
            },
            {
                name: 'Sacred Oath ~ Subclass',
                level: 3,
                content: `When you reach 3rd level, you swear the oath that binds you as a paladin forever. Up to this time you have been in a preparatory stage, committed to the path but not yet sworn to it.

Your choice grants you features at 3rd level and again at 7th, 15th, and 20th level. Those features include oath spells and the Channel Divinity feature.

**Oath Spells**
Each oath has a list of associated spells. You gain access to these spells at the levels specified in the oath description. Once you gain access to an oath spell, you always have it prepared. Oath spells don’t count against the number of spells you can prepare each day.

If you gain an oath spell that doesn’t appear on the paladin spell list, the spell is nonetheless a paladin spell for you.

**Channel Divinity**
Your oath allows you to channel divine energy to fuel magical effects. Each Channel Divinity option provided by your oath explains how to use it.

When you use your Channel Divinity, you choose which option to use. You must then finish a short or long rest to use your Channel Divinity again.

Some Channel Divinity effects require saving throws. When you use such an effect from this class, the DC equals your paladin spell save DC.`
            },
            {
                name: 'Breaking Your Oath',
                level: 3,
                content: `A paladin tries to hold to the highest standards of conduct, but even the most virtuous paladin is fallible. Sometimes the right path proves too demanding, sometimes a situation calls for the lesser of two evils, and sometimes the heat of emotion causes a paladin to transgress his or her oath.

A paladin who has broken a vow typically seeks absolution from a cleric who shares his or her faith or from another paladin of the same order. The paladin might spend an all- night vigil in prayer as a sign of penitence, or undertake a fast or similar act of self-denial. After a rite of confession and forgiveness, the paladin starts fresh.

If a paladin willfully violates his or her oath and shows no sign of repentance, the consequences can be more serious. At the GM’s discretion, an impenitent paladin might be forced to abandon this class and adopt another.`
            },
            {
                name: 'Ability Score Improvement',
                level: 4,
                content: ASI_CONTENT_STANDARD
            },
            {
                name: 'Extra Attack',
                level: 5,
                content: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.'
            },
            {
                name: 'Aura of Protection',
                level: 6,
                content: `Starting at 6th level, whenever you or a friendly creature within 10 feet of you must make a saving throw, the creature gains a bonus to the saving throw equal to your Charisma modifier (with a minimum bonus of +1). You must be conscious to grant this bonus.

At 18th level, the range of this aura increases to 30 feet.`
            },
            {
                name: 'Aura of Courage',
                level: 10,
                content: `Starting at 10th level, you and friendly creatures within 10 feet of you can’t be frightened while you are conscious.

At 18th level, the range of this aura increases to 30 feet.`
            },
            {
                name: 'Improved Divine Smite',
                level: 11,
                content: `By 11th level, you are so suffused with righteous might that all your melee weapon strikes carry divine power with them. Whenever you hit a creature with a melee weapon, the creature takes an extra 1d8 radiant damage. If you also use your Divine Smite with an attack, you add this damage to the extra damage of your Divine Smite.`
            },
            {
                name: 'Cleansing Touch',
                level: 14,
                content: `Beginning at 14th level, you can use your action to end one spell on yourself or on one willing creature that you touch.

You can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain expended uses when you finish a long rest.`
            },
        ],
        asi: ASI_LEVELS_STANDARD,
        resources: [],
        spellcasting: {
            ability: 'CHA',
            ability_info: `Charisma is your spellcasting ability for your paladin spells, since their power derives from the strength of your convictions.

In addition, you use your Charisma modifier when setting the saving throw DC for a paladin spell you cast and when making an attack roll with one.

**Spell save DC** = 8 + your proficiency bonus + your Charisma modifier

**Spell attack modifier** = your proficiency bonus + your Charisma modifier`,
            focus: 'You can use a holy symbol as a spellcasting focus for your paladin spells.',
            casting_info: `The Paladin table shows how many spell slots you have to cast your spells. To cast one of your paladin spells of 1st level or higher, you must expend a slot of the spell’s level or higher. You regain all expended spell slots when you finish a long rest.

You prepare the list of paladin spells that are available for you to cast, choosing from the paladin spell list. When you do so, choose a number of paladin spells equal to your Charisma modifier + half your paladin level, rounded down (minimum of one spell). The spells must be of a level for which you have spell slots.

For example, if you are a 5th-level paladin, you have four 1st-level and two 2nd-level spell slots. With a Charisma of 14, your list of prepared spells can include four spells of 1st or 2nd level, in any combination. If you prepare the 1st-level spell cure wounds, you can cast it using a 1st-level or a 2nd- level slot. Casting the spell doesn’t remove it from your list of prepared spells.

You can change your list of prepared spells when you finish a long rest. Preparing a new list of paladin spells requires time spent in prayer and meditation: at least 1 minute per spell level for each spell on your list.`,
            spell_slots: SPELLSLOTS_HALFCASTER,
            spells_by_level: SPELLS_BY_LEVEL_BLANK
        },
        as_prio: ['STR', 'CON', 'CHA', 'DEX', 'WIS', 'INT']
    },
    {
        name: 'Ranger',
        level: 1,
        hp: {
            hit_die: '10'
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
            },
        ],
        tool_prof: {
            label: '',
            tools: []
        },
        saving_throws: [ 'STR', 'DEX' ],
        skills: {
            final: [],
            choose_n: 3,
            type: 'list',
            options: [ 'Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival' ]
        },
        equipment: [
                // 1st line ~ (a) scale mail or (b) leather armor
                {
                    final: [],
                    line_options: [
                        // (a)
                        [
                            {
                                name: 'Scale Mail',
                                amount: 1,
                                tags: []
                            }
                        ],
                        // (b)
                        [
                            {
                                name: 'Leather Armor',
                                amount: 1,
                                tags: []
                            }
                        ],
                    ]
                },
                // 2nd line ~ (a) two shortswords or (b) two simple melee weapons
                {
                    final: [],
                    line_options: [
                        // (a)
                        [
                            {
                                name: 'Shortsword',
                                amount: 2,
                                tags: [
                                    'weapon',
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
                                placeholder: 'any simple melee ⚔️',
                                options: WEAPONS.SIMPLE.MELEE
                            },
                            {
                                name: '',
                                amount: 1,
                                tags: [
                                    'weapon'
                                ],
                                placeholder: 'any simple melee ⚔️',
                                options: WEAPONS.SIMPLE.MELEE
                            }
                        ],
                    ]
                },
                // 3rd line ~ (a) a dungeoneer’s pack or (b) an explorer’s pack
                {
                    final: [],
                    line_options: [
                        // (a)
                        [
                            {
                                name: "Dungeoneer’s pack",
                                amount: 1,
                                tags: [],
                                description: PACKS['DUNGEONEER']
                            }
                        ],
                        // (b)
                        [
                            {
                                name: "Explorer’s pack",
                                amount: 1,
                                tags: [],
                                description: PACKS['EXPLORER']
                            }
                        ],
                    ]
                },
                // 4th line ~ Leather armor and a dagger
                {
                    final: [
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
                }
            ],
        features: [
            {
                name: 'Favored Enemy - ???',
                level: 1,
                content: `Beginning at 1st level, you have significant experience studying, tracking, hunting, and even talking to a certain type of enemy.

Choose a type of favored enemy: aberrations, beasts, celestials, constructs, dragons, elementals, fey, fiends, giants, monstrosities, oozes, plants, or undead. Alternatively, you can select two races of humanoid (such as gnolls and orcs) as favored enemies.

You have advantage on Wisdom (Survival) checks to track your favored enemies, as well as on Intelligence checks to recall information about them.

When you gain this feature, you also learn one language of your choice that is spoken by your favored enemies, if they speak one at all.

You choose one additional favored enemy, as well as an associated language, at 6th and 14th level. As you gain levels, your choices should reflect the types of monsters you have encountered on your adventures.`
            },
            {
                name: 'Natural Explorer - ???',
                level: 1,
                content: `You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions. Choose one type of favored terrain: arctic, coast, desert, forest, grassland, mountain, or swamp. When you make an Intelligence or Wisdom check related to your favored terrain, your proficiency bonus is doubled if you are using a skill that you’re proficient in.

While traveling for an hour or more in your favored terrain, you gain the following benefits:

- Difficult terrain doesn’t slow your group’s travel.
- Your group can’t become lost except by magical means.
- Even when you are engaged in another activity while traveling (such as foraging, navigating, or tracking), you remain alert to danger.
- If you are traveling alone, you can move stealthily at a normal pace.
- When you forage, you find twice as much food as you normally would.
- While tracking other creatures, you also learn their exact number, their sizes, and how long ago they passed through the area.

You choose additional favored terrain types at 6th and 10th level.`
            },
            {
                name: 'Fighting Style - ???',
                level: 2,
                content: `At 2nd level, you adopt a particular style of fighting as your specialty. Choose one of the following options. You can’t take a Fighting Style option more than once, even if you later get to choose again.
**Archery**
You gain a +2 bonus to attack rolls you make with ranged weapons.

**Defense**
While you are wearing armor, you gain a +1 bonus to AC.

**Dueling**
When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.

**Two-Weapon Fighting**
When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.`
            },
            {
                name: 'Spellcasting',
                level: 2,
                content: `By the time you reach 2nd level, you have learned to use the magical essence of nature to cast spells, much as a druid does. See chapter 10 for the general rules of spellcasting and chapter 11 for the ranger spell list.
**Spell Slots**
The Ranger table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell’s level or higher. You regain all expended spell slots when you finish a long rest.

For example, if you know the 1st-level spell animal friendship and have a 1st-level and a 2nd-level spell slot available, you can cast animal friendship using either slot.

**Spells Known of 1st Level and Higher**
You know two 1st-level spells of your choice from the ranger spell list.

The Spells Known column of the Ranger table shows when you learn more ranger spells of your choice. Each of these spells must be of a level for which you have spell slots. For instance, when you reach 5th level in this class, you can learn one new spell of 1st or 2nd level.

Additionally, when you gain a level in this class, you can choose one of the ranger spells you know and replace it with another spell from the ranger spell list, which also must be of a level for which you have spell slots.

**Spellcasting Ability**
Wisdom is your spellcasting ability for your ranger spells, since your magic draws on your attunement to nature. You use your Wisdom whenever a spell refers to your spellcasting ability. In addition, you use your Wisdom modifier when setting the saving throw DC for a ranger spell you cast and when making an attack roll with one.

Spell save DC = 8 + your proficiency bonus + your Wisdom modifier

Spell attack modifier = your proficiency bonus + your Wisdom modifier`
            },
            {
                name: 'Ranger Archetype ~ Subclass',
                level: 3,
                content: `At 3rd level, you choose an archetype that you strive to emulate. Your choice grants you features at 3rd level and again at 7th, 11th, and 15th level.`
            },
            {
                name: 'Primeval Awareness',
                level: 3,
                content: `Beginning at 3rd level, you can use your action and expend one ranger spell slot to focus your awareness on the region around you. For 1 minute per level of the spell slot you expend, you can sense whether the following types of creatures are present within 1 mile of you (or within up to 6 miles if you are in your favored terrain): aberrations, celestials, dragons, elementals, fey, fiends, and undead. This feature doesn’t reveal the creatures’ location or number.`
            },
            {
                name: 'Ability Score Improvement',
                level: 4,
                content: ASI_CONTENT_STANDARD
            },
            {
                name: 'Extra Attack',
                level: 5,
                content: `Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.`
            },
            {
                name: 'Land’s Stride',
                level: 8,
                content: `Starting at 8th level, moving through nonmagical difficult terrain costs you no extra movement. You can also pass through nonmagical plants without being slowed by them and without taking damage from them if they have thorns, spines, or a similar hazard.

In addition, you have advantage on saving throws against plants that are magically created or manipulated to impede movement, such those created by the entangle spell.`
            },
            {
                name: 'Hide in Plain Sight',
                level: 10,
                content: `Starting at 10th level, you can spend 1 minute creating camouflage for yourself. You must have access to fresh mud, dirt, plants, soot, and other naturally occurring materials with which to create your camouflage.

Once you are camouflaged in this way, you can try to hide by pressing yourself up against a solid surface, such as a tree or wall, that is at least as tall and wide as you are. You gain a +10 bonus to Dexterity (Stealth) checks as long as you remain there without moving or taking actions. Once you move or take an action or a reaction, you must camouflage yourself again to gain this benefit.`
            },
            {
                name: 'Vanish',
                level: 14,
                content: `Starting at 14th level, you can use the Hide action as a bonus action on your turn. Also, you can’t be tracked by nonmagical means, unless you choose to leave a trail.`
            },
            {
                name: 'Feral Senses',
                level: 18,
                content: `At 18th level, you gain preternatural senses that help you fight creatures you can’t see. When you attack a creature you can’t see, your inability to see it doesn’t impose disadvantage on your attack rolls against it.

You are also aware of the location of any invisible creature within 30 feet of you, provided that the creature isn’t hidden from you and you aren’t blinded or deafened.`
            },
            {
                name: 'Foe Slayer',
                level: 20,
                content: `At 20th level, you become an unparalleled hunter of your enemies. Once on each of your turns, you can add your Wisdom modifier to the attack roll or the damage roll of an attack you make against one of your favored enemies. You can choose to use this feature before or after the roll, but before any effects of the roll are applied.`
            },
        ],
        asi: ASI_LEVELS_STANDARD,
        resources: [],
        spellcasting: {
            ability: 'WIS',
            ability_info: `Wisdom  is your spellcasting ability for your ranger spells, since your magic draws on your attunement to nature.

In addition, you use your Wisdom  modifier when setting the saving throw DC for a ranger spell you cast and when making an attack roll with one.

**Spell save DC** = 8 + your proficiency bonus + your Wisdom  modifier

**Spell attack modifier** = your proficiency bonus + your Wisdom  modifier`,
            focus: 'No focus needed.',
            casting_info: `#### Spell Slots
The Ranger table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell’s level or higher. You regain all expended spell slots when you finish a long rest.

For example, if you know the 1st-level spell animal friendship and have a 1st-level and a 2nd-level spell slot available, you can cast animal friendship using either slot.

#### Spells Known of 1st Level and Higher
You know two 1st-level spells of your choice from the ranger spell list.

The Spells Known column of the Ranger table shows when you learn more ranger spells of your choice. Each of these spells must be of a level for which you have spell slots. For instance, when you reach 5th level in this class, you can learn one new spell of 1st or 2nd level.

Additionally, when you gain a level in this class, you can choose one of the ranger spells you know and replace it with another spell from the ranger spell list, which also must be of a level for which you have spell slots.`,
            spells_known: {
                2: 2,
                3: 3,
                5: 4,
                7: 5,
                9: 6,
                11: 7,
                13: 8,
                15: 9,
                17: 10,
                19: 11
            },
            spell_slots: SPELLSLOTS_HALFCASTER,
            spells_by_level: SPELLS_BY_LEVEL_BLANK
        },
        as_prio: ['DEX', 'CON', 'WIS', 'STR', 'CHA', 'INT']
    },
    {
        name: 'Rogue',
        level: 1,
        hp: {
            hit_die: '8'
        },
        other_prof: [
            {
                type: OTHER_PROF.ARMOR,
                name: 'Light armor'
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
            label: '',
            tools: [
                {
                    name: 'Thieves’ tools'
                }
            ]
        },
        saving_throws: [ 'DEX', 'INT' ],
        skills: {
            final: [],
            choose_n: 4,
            type: 'list',
            options: [ 'Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Performance', 'Persuasion', 'Sleight of Hand', 'Stealth' ]
        },
        equipment: [
                // 1st line ~ (a) a rapier or (b) a shortsword
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
                                name: 'Shortsword',
                                amount: 1,
                                tags: [
                                    'weapon'
                                ]
                            }
                        ],
                    ]
                },
                // 2nd line ~ (a) a shortbow and quiver of 20 arrows or (b) a shortsword
                {
                    final: [],
                    line_options: [
                        // (a)
                        [
                            {
                                name: 'Shortbow',
                                amount: 1,
                                tags: [
                                    'weapon',
                                ]
                            },
                            {
                                name: 'Arrows',
                                amount: 20,
                                tags: [
                                    'resource',
                                ]
                            },
                        ],
                        // (b)
                        [
                            {
                                name: 'Shortsword',
                                amount: 1,
                                tags: [
                                    'weapon'
                                ],
                            }
                        ],
                    ]
                },
                // 3rd line ~ (a) a burglar’s pack, (b) a dungeoneer’s pack, or (c) an explorer’s pack
                {
                    final: [],
                    line_options: [
                        // (a)
                        [
                            {
                                name: "Burglar’s pack",
                                amount: 1,
                                tags: [],
                                description: PACKS['BURGLAR']
                            }
                        ],
                        // (b)
                        [
                            {
                                name: "Dungeoneer’s pack",
                                amount: 1,
                                tags: [],
                                description: PACKS['DUNGEONEER']
                            }
                        ],
                        // (c)
                        [
                            {
                                name: "Explorer’s pack",
                                amount: 1,
                                tags: [],
                                description: PACKS['EXPLORER']
                            }
                        ],
                    ]
                },
                // 4th line ~ Leather armor, two daggers, and thieves’ tools
                {
                    final: [
                        {
                            name: 'Leather armor',
                            amount: 1,
                            tags: [],
                        },
                        {
                            name: 'Dagger',
                            amount: 2,
                            tags: [
                                'weapon'
                            ],
                        },
                        {
                            name: 'Thieves’ tools',
                            amount: 1,
                            tags: [],
                        },
                    ]
                }
            ],
        features: [
            {
                name: 'Expertise',
                level: 1,
                content: `At 1st level, choose two of your skill proficiencies, or one of your skill proficiencies and your proficiency with thieves’ tools. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.

At 6th level, you can choose two more of your proficiencies (in skills or with thieves’ tools) to gain this benefit.`
            },
            {
                name: 'Sneak Attack',
                level: 1,
                content: `Beginning at 1st level, you know how to strike subtly and exploit a foe’s distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll. The attack must use a finesse or a ranged weapon.

You don’t need advantage on the attack roll if another enemy of the target is within 5 feet of it, that enemy isn’t incapacitated, and you don’t have disadvantage on the attack roll.

The amount of the extra damage increases as you gain levels in this class, as shown in the Sneak Attack column of the Rogue table.`
            },
            {
                name: 'Thieves’ Cant',
                level: 1,
                content: `During your rogue training you learned thieves’ cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation. Only another creature that knows thieves’ cant understands such messages. It takes four times longer to convey such a message than it does to speak the same idea plainly.

In addition, you understand a set of secret signs and symbols used to convey short, simple messages, such as whether an area is dangerous or the territory of a thieves’ guild, whether loot is nearby, or whether the people in an area are easy marks or will provide a safe house for thieves on the run.`
            },
            {
                name: 'Cunning Action',
                level: 2,
                content: `Starting at 2nd level, your quick thinking and agility allow you to move and act quickly. You can take a bonus action on each of your turns in combat. This action can be used only to take the Dash, Disengage, or Hide action.`
            },
            {
                name: 'Roguish Archetype ~ Subclass',
                level: 3,
                content: `At 3rd level, you choose an archetype that you emulate in the exercise of your rogue abilities. Your archetype choice grants you features at 3rd level and then again at 9th, 13th, and 17th level.`
            },
            {
                name: 'Ability Score Improvement',
                level: 4,
                content: `When you reach 4th level, and again at 8th, 10th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can’t increase an ability score above 20 using this feature.`
            },
            {
                name: 'Uncanny Dodge',
                level: 5,
                content: `Starting at 5th level, when an attacker that you can see hits you with an attack, you can use your reaction to halve the attack’s damage against you.`
            },
            {
                name: 'Evasion',
                level: 7,
                content: `Beginning at 7th level, you can nimbly dodge out of the way of certain area effects, such as a red dragon’s fiery breath or an ice storm spell. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.`
            },
            {
                name: 'Reliable Talent',
                level: 11,
                content: `By 11th level, you have refined your chosen skills until they approach perfection. Whenever you make an ability check that lets you add your proficiency bonus, you can treat a d20 roll of 9 or lower as a 10.`
            },
            {
                name: 'Blindsense',
                level: 14,
                content: `Starting at 14th level, if you are able to hear, you are aware of the location of any hidden or invisible creature within 10 feet of you.`
            },
            {
                name: 'Slippery Mind',
                level: 15,
                content: `By 15th level, you have acquired greater mental strength. You gain proficiency in Wisdom saving throws.`
            },
            {
                name: 'Elusive',
                level: 18,
                content: `Beginning at 18th level, you are so evasive that attackers rarely gain the upper hand against you. No attack roll has advantage against you while you aren’t incapacitated.`
            },
            {
                name: 'Stroke of Luck',
                level: 20,
                content: `At 20th level, you have an uncanny knack for succeeding when you need to. If your attack misses a target within range, you can turn the miss into a hit. Alternatively, if you fail an ability check, you can treat the d20 roll as a 20.

Once you use this feature, you can’t use it again until you finish a short or long rest.`
            },
        ],
        asi: {
            4: '1',
            8: '2',
            10: '3',
            12: '4',
            16: '5',
            19: '6'
        },
        resources: [
            {
                name: 'Sneak Attack',
                total: '',
                current: '',
                type: 'simple',
                levels: {
                    1: '1d6',
                    3: '2d6',
                    5: '3d6',
                    7: '4d6',
                    9: '5d6',
                    11: '6d6',
                    13: '7d6',
                    15: '8d6',
                    17: '9d6',
                    19: '10d6'
                }
            }
        ],
        as_prio: ['DEX', 'CON', 'WIS', 'STR', 'CHA', 'INT']
    },
    {
        name: 'Sorcerer',
        level: 1,
        hp: {
            hit_die: '6'
        },
        other_prof: [
            {
                type: OTHER_PROF.WEAPON,
                name: 'Daggers'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Slings'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Quarterstaffs'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Light crossbows'
            },
        ],
        tool_prof: {
            label: '',
            tools: []
        },
        saving_throws: [ 'CON', 'CHA' ],
        skills: {
            final: [],
            choose_n: 2,
            type: 'list',
            options: [ 'Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion' ]
        },
        equipment: [
            // 1st line ~ (a) a light crossbow and 20 bolts or (b) any simple weapon
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
                            ]
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
            // 2nd line ~ (a) a component pouch or (b) an arcane focus
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: "Component pouch",
                            amount: 1,
                            tags: [],
                        }
                    ],
                    // (b)
                    [
                        {
                            name: "Arcane focus",
                            amount: 1,
                            tags: [],
                        }
                    ],
                ]
            },
            // 3rd line ~ (a) a dungeoneer’s pack or (b) an explorer’s pack
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: "Dungeoneer’s pack",
                            amount: 1,
                            tags: [],
                            description: PACKS['DUNGEONEER']
                        }
                    ],
                    // (b)
                    // (a)
                    [
                        {
                            name: "Explorer’s pack",
                            amount: 1,
                            tags: [],
                            description: PACKS['EXPLORER']
                        }
                    ],
                ]
            },
            // 4th line ~ Two daggers
            {
                final: [
                    {
                        name: 'Dagger',
                        amount: 2,
                        tags: [
                            'weapon',
                        ]
                    }
                ]
            }
        ],
        features: [
            {
                name: 'Spellcasting',
                level: 1,
                content: `An event in your past, or in the life of a parent or ancestor, left an indelible mark on you, infusing you with arcane magic. This font of magic, whatever its origin, fuels your spells.
**Cantrips**
At 1st level, you know four cantrips of your choice from the sorcerer spell list. You learn additional sorcerer cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Sorcerer table.

**Spell Slots**
The Sorcerer table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these sorcerer spells, you must expend a slot of the spell’s level or higher. You regain all expended spell slots when you finish a long rest.

For example, if you know the 1st-level spell burning hands and have a 1st-level and a 2nd-level spell slot available, you can cast burning hands using either slot.

**Spells Known of 1st Level and Higher**
You know two 1st-level spells of your choice from the sorcerer spell list.

The Spells Known column of the Sorcerer table shows when you learn more sorcerer spells of your choice. Each of these spells must be of a level for which you have spell slots. For instance, when you reach 3rd level in this class, you can learn one new spell of 1st or 2nd level.

Additionally, when you gain a level in this class, you can choose one of the sorcerer spells you know and replace it with another spell from the sorcerer spell list, which also must be of a level for which you have spell slots.

**Spellcasting Ability**
Charisma is your spellcasting ability for your sorcerer spells, since the power of your magic relies on your ability to project your will into the world. You use your Charisma whenever a spell refers to your spellcasting ability. In addition, you use your Charisma modifier when setting the saving throw DC for a sorcerer spell you cast and when making an attack roll with one.

Spell save DC = 8 + your proficiency bonus + your Charisma modifier

Spell attack modifier = your proficiency bonus + your Charisma modifier

**Spellcasting Focus**
You can use an arcane focus as a spellcasting focus for your sorcerer spells.`
            },
            {
                name: 'Sorcerous Origin ~ Subclass',
                level: 1,
                content: `Choose a sorcerous origin, which describes the source of your innate magical power. Your choice grants you features when you choose it at 1st level and again at 6th, 14th, and 18th level.`
            },
            {
                name: 'Font of Magic',
                level: 2,
                content: `At 2nd level, you tap into a deep wellspring of magic within yourself. This wellspring is represented by sorcery points, which allow you to create a variety of magical effects.
**Sorcery Points**
You have 2 sorcery points, and you gain more as you reach higher levels, as shown in the Sorcery Points column of the Sorcerer table. You can never have more sorcery points than shown on the table for your level. You regain all spent sorcery points when you finish a long rest.

**Flexible Casting **
You can use your sorcery points to gain additional spell slots, or sacrifice spell slots to gain additional sorcery points. You learn other ways to use your sorcery points as you reach higher levels.

**Creating Spell Slots.** You can transform unexpended sorcery points into one spell slot as a bonus action on your turn. The Creating Spell Slots table shows the cost of creating a spell slot of a given level. You can create spell slots no higher in level than 5th.

Any spell slot you create with this feature vanishes when you finish a long rest.

Creating Spell Slots
Spell Slot Level ~ Sorcery Point Cost
1st ~ 2
2nd ~ 3
3rd ~ 5
4th ~ 6
5th ~ 7

Converting a Spell Slot to Sorcery Points. As a bonus action on your turn, you can expend one spell slot and gain a number of sorcery points equal to the slot’s level.`
            },
            {
                name: 'Metamagic',
                level: 3,
                content: `At 3rd level, you gain the ability to twist your spells to suit your needs. You gain two of the following Metamagic options of your choice. You gain another one at 10th and 17th level.

You can use only one Metamagic option on a spell when you cast it, unless otherwise noted.

**Careful Spell**
When you cast a spell that forces other creatures to make a saving throw, you can protect some of those creatures from the spell’s full force. To do so, you spend 1 sorcery point and choose a number of those creatures up to your Charisma modifier (minimum of one creature). A chosen creature automatically succeeds on its saving throw against the spell.

**Distant Spell**
When you cast a spell that has a range of 5 feet or greater, you can spend 1 sorcery point to double the range of the spell.

When you cast a spell that has a range of touch, you can spend 1 sorcery point to make the range of the spell 30 feet.

**Empowered Spell**
When you roll damage for a spell, you can spend 1 sorcery point to reroll a number of the damage dice up to your Charisma modifier (minimum of one). You must use the new rolls.

You can use Empowered Spell even if you have already used a different Metamagic option during the casting of the spell.

**Extended Spell**
When you cast a spell that has a duration of 1 minute or longer, you can spend 1 sorcery point to double its duration, to a maximum duration of 24 hours.

**Heightened Spell**
When you cast a spell that forces a creature to make a saving throw to resist its effects, you can spend 3 sorcery points to give one target of the spell disadvantage on its first saving throw made against the spell.

**Quickened Spell**
When you cast a spell that has a casting time of 1 action, you can spend 2 sorcery points to change the casting time to 1 bonus action for this casting.

**Subtle Spell**
When you cast a spell, you can spend 1 sorcery point to cast it without any somatic or verbal components.

**Twinned Spell**
When you cast a spell that targets only one creature and doesn’t have a range of self, you can spend a number of sorcery points equal to the spell’s level to target a second creature in range with the same spell (1 sorcery point if the spell is a cantrip).

To be eligible, a spell must be incapable of targeting more than one creature at the spell’s current level. For example, magic missile and scorching ray aren’t eligible, but ray of frost and chromatic orb are.`
            },
            {
                name: 'Ability Score Improvement',
                level: 4,
                content: ASI_CONTENT_STANDARD
            },
            {
                name: 'Sorcerous Restoration',
                level: 20,
                content: `At 20th level, you regain 4 expended sorcery points whenever you finish a short rest.`
            },
        ],
        resources: [
            {
                name: 'Sorcery Points',
                total: '',
                current: '',
                type: 'complex',
                levels: {
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
                    15: '16',
                    17: '17',
                    18: '19',
                    19: '19',
                    20: '20',
                }
            }
        ],
        asi: ASI_LEVELS_STANDARD,
        spellcasting: {
            ability: 'CHA',
            ability_info: `Charisma is your spellcasting ability for your sorcerer spells, since the power of your magic relies on your ability to project your will into the world. You use your Charisma whenever a spell refers to your spellcasting ability. 

In addition, you use your Charisma modifier when setting the saving throw DC for a sorcerer spell you cast and when making an attack roll with one.

**Spell save DC** = 8 + your proficiency bonus + your Charisma modifier

**Spell attack modifier** = your proficiency bonus + your Charisma modifier`,
            focus: 'You can use an arcane focus as a spellcasting focus for your sorcerer spells.',
            casting_info: `An event in your past, or in the life of a parent or ancestor, left an indelible mark on you, infusing you with arcane magic. This font of magic, whatever its origin, fuels your spells.
#### Cantrips
At 1st level, you know four cantrips of your choice from the sorcerer spell list. You learn additional sorcerer cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Sorcerer table.

#### Spell Slots
The Sorcerer table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these sorcerer spells, you must expend a slot of the spell’s level or higher. You regain all expended spell slots when you finish a long rest.

For example, if you know the 1st-level spell burning hands and have a 1st-level and a 2nd-level spell slot available, you can cast burning hands using either slot.

#### Spells Known of 1st Level and Higher
You know two 1st-level spells of your choice from the sorcerer spell list.

The Spells Known column of the Sorcerer table shows when you learn more sorcerer spells of your choice. Each of these spells must be of a level for which you have spell slots. For instance, when you reach 3rd level in this class, you can learn one new spell of 1st or 2nd level.

Additionally, when you gain a level in this class, you can choose one of the sorcerer spells you know and replace it with another spell from the sorcerer spell list, which also must be of a level for which you have spell slots.`,
            cantrips_known: {
                1: 4,
                4: 5,
                10: 6
            },
            spells_known: {
                1: 2,
                2: 3,
                3: 4,
                4: 5,
                5: 6,
                6: 7,
                7: 8,
                8: 9,
                9: 10,
                10: 11,
                11: 12,
                13: 13,
                15: 14,
                17: 15,
            },
            spell_slots: SPELLSLOTS_STANDARD,
            spells_by_level: SPELLS_BY_LEVEL_BLANK,
            unique_info: {
                label: 'Metamagic',
                type: 'select-features',
                levels: {
                    3: '2',
                    10: '3',
                    17: '4'
                },
                final: [],
                options: [
                    {
                        name: 'Careful Spell',
                        content: `When you cast a spell that forces other creatures to make a saving throw, you can protect some of those creatures from the spell’s full force. 
\nTo do so, you spend 1 sorcery point and choose a number of those creatures up to your Charisma modifier (minimum of one creature). A chosen creature automatically succeeds on its saving throw against the spell.`                
                    },
                    {
                        name: 'Distant Spell',
                        content: `When you cast a spell that has a range of 5 feet or greater, you can spend 1 sorcery point to double the range of the spell.
\nWhen you cast a spell that has a range of touch, you can spend 1 sorcery point to make the range of the spell 30 feet.`
                    },
                    {
                        name: 'Empowered Spell',
                        content: `When you roll damage for a spell, you can spend 1 sorcery point to reroll a number of the damage dice up to your Charisma modifier (minimum of one). You must use the new rolls.
\nYou can use Empowered Spell even if you have already used a different Metamagic option during the casting of the spell.`
                    },
                    {
                        name: 'Extended Spell',
                        content: `When you cast a spell that has a duration of 1 minute or longer, you can spend 1 sorcery point to double its duration, to a maximum duration of 24 hours.`
                    },
                    {
                        name: 'Heightened Spell',
                        content: `When you cast a spell that forces a creature to make a saving throw to resist its effects, you can spend 3 sorcery points to give one target of the spell disadvantage on its first saving throw made against the spell.`
                    },
                    {
                        name: 'Quickened Spell',
                        content: `When you cast a spell that has a casting time of 1 action, you can spend 2 sorcery points to change the casting time to 1 bonus action for this casting.`
                    },
                    {
                        name: 'Subtle Spell',
                        content: `When you cast a spell, you can spend 1 sorcery point to cast it without any somatic or verbal components.`
                    },
                    {
                        name: 'Twinned Spell',
                        content: `When you cast a spell that targets only one creature and doesn’t have a range of self, you can spend a number of sorcery points equal to the spell’s level to target a second creature in range with the same spell (1 sorcery point if the spell is a cantrip).
\nTo be eligible, a spell must be incapable of targeting more than one creature at the spell’s current level. For example, magic missile and scorching ray aren’t eligible, but ray of frost and chromatic orb are.`
                    },
                ],
            }
        },
        as_prio: ['CHA', 'DEX', 'CON', 'INT', 'WIS', 'STR']
    },
    {
        name: 'Warlock',
        level: 1,
        hp: {
            hit_die: '8'
        },
        other_prof: [
            {
                type: OTHER_PROF.ARMOR,
                name: 'Light Armor'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Simple weapons'
            }
        ],
        tool_prof: {
            label: '',
            tools: []
        },
        saving_throws: [ 'WIS', 'CHA' ],
        skills: {
            final: [],
            choose_n: 2,
            type: 'list',
            options: [ 'Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion' ]
        },
        equipment: [
            // 1st line ~ (a) a light crossbow and 20 bolts or (b) any simple weapon
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
                            ]
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
            // 2nd line ~ (a) a component pouch or (b) an arcane focus
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: "Component pouch",
                            amount: 1,
                            tags: [],
                        }
                    ],
                    // (b)
                    [
                        {
                            name: 'Arcane focus',
                            amount: 1,
                            tags: [],
                        }
                    ],
                ]
            },
            // 3rd line ~ (a) a diplomat’s pack or (b) an entertainer’s pack
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: 'Scholar’s pack',
                            amount: 1,
                            tags: [],
                            description: PACKS['SCHOLAR']
                        }
                    ],
                    // (b)
                    [
                        {
                            name: "Dungeoneer’s pack",
                            amount: 1,
                            tags: [],
                            description: PACKS['DUNGEONEER']
                        }
                    ],
                ]
            },

            // 4th line ~ Leather armor and a dagger
            {
                final: [
                    {
                        name: 'Leather armor',
                        amount: 1,
                        tags: [],
                    },
                    {
                        name: '',
                        amount: 1,
                        tags: [
                            'weapon'
                        ],
                        placeholder: 'any simple ⚔️',
                        options: WEAPONS_SIMPLE_ALL
                    },
                    {
                        name: 'Dagger',
                        amount: 2,
                        tags: [
                            'weapon',
                        ]
                    }
                ]
            }
        ],
        features: [
            {
                name: 'Otherworldly Patron ~ Subclass',
                level: 1,
                content: `At 1st level, you have struck a bargain with an otherworldly being of your choice. Your choice grants you features at 1st level and again at 6th, 10th, and 14th level.`
            },
            {
                name: 'Pact Magic',
                level: 1,
                content: `Your arcane research and the magic bestowed on you by your patron have given you facility with spells.
**Cantrips**
You know two cantrips of your choice from the warlock spell list. You learn additional warlock cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Warlock table.

**Spell Slots**
The Warlock table shows how many spell slots you have. The table also shows what the level of those slots is; all of your spell slots are the same level. To cast one of your warlock spells of 1st level or higher, you must expend a spell slot. You regain all expended spell slots when you finish a short or long rest.

For example, when you are 5th level, you have two 3rd-level spell slots. To cast the 1st-level spell thunderwave, you must spend one of those slots, and you cast it as a 3rd-level spell.

**Spells Known of 1st Level and Higher**
At 1st level, you know two 1st-level spells of your choice from the warlock spell list.

The Spells Known column of the Warlock table shows when you learn more warlock spells of your choice of 1st level and higher. A spell you choose must be of a level no higher than what’s shown in the table’s Slot Level column for your level. When you reach 6th level, for example, you learn a new warlock spell, which can be 1st, 2nd, or 3rd level.

Additionally, when you gain a level in this class, you can choose one of the warlock spells you know and replace it with another spell from the warlock spell list, which also must be of a level for which you have spell slots.

**Spellcasting Ability**
Charisma is your spellcasting ability for your warlock spells, so you use your Charisma whenever a spell refers to your spellcasting ability. In addition, you use your Charisma modifier when setting the saving throw DC for a warlock spell you cast and when making an attack roll with one.

Spell save DC = 8 + your proficiency bonus + your Charisma modifier

Spell attack modifier = your proficiency bonus + your Charisma modifier

**Spellcasting Focus**
You can use an arcane focus as a spellcasting focus for your warlock spells.`
            },
            {
                name: 'Eldritch Invocations',
                level: 2,
                content: `In your study of occult lore, you have unearthed eldritch invocations, fragments of forbidden knowledge that imbue you with an abiding magical ability.

At 2nd level, you gain two eldritch invocations of your choice. Your invocation options are detailed at the end of the class description. When you gain certain warlock levels, you gain additional invocations of your choice, as shown in the Invocations Known column of the Warlock table.

Additionally, when you gain a level in this class, you can choose one of the invocations you know and replace it with another invocation that you could learn at that level.

If an eldritch invocation has prerequisites, you must meet them to learn it. You can learn the invocation at the same time that you meet its prerequisites. A level prerequisite refers to your level in this class.`
            },
            {
                name: 'Pact Boon ~ ???',
                level: 3,
                content: `At 3rd level, your otherworldly patron bestows a gift upon you for your loyal service. You gain one of the following features of your choice.
**Pact of the Chain**
You learn the find familiar spell and can cast it as a ritual. The spell doesn’t count against your number of spells known.

When you cast the spell, you can choose one of the normal forms for your familiar or one of the following special forms: imp, pseudodragon, quasit, or sprite.

Additionally, when you take the Attack action, you can forgo one of your own attacks to allow your familiar to make one attack of its own with its reaction.

**Pact of the Blade**
You can use your action to create a pact weapon in your empty hand. You can choose the form that this melee weapon takes each time you create it. You are proficient with it while you wield it. This weapon counts as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.

Your pact weapon disappears if it is more than 5 feet away from you for 1 minute or more. It also disappears if you use this feature again, if you dismiss the weapon (no action required), or if you die.

You can transform one magic weapon into your pact weapon by performing a special ritual while you hold the weapon. You perform the ritual over the course of 1 hour, which can be done during a short rest. You can then dismiss the weapon, shunting it into an extradimensional space, and it appears whenever you create your pact weapon thereafter. You can’t affect an artifact or a sentient weapon in this way. The weapon ceases being your pact weapon if you die, if you perform the 1-hour ritual on a different weapon, or if you use a 1-hour ritual to break your bond to it. The weapon appears at your feet if it is in the extradimensional space when the bond breaks.

**Pact of the Tome**
Your patron gives you a grimoire called a Book of Shadows. When you gain this feature, choose three cantrips from any class’s spell list (the three needn’t be from the same list). While the book is on your person, you can cast those cantrips at will. They don’t count against your number of cantrips known. If they don’t appear on the warlock spell list, they are nonetheless warlock spells for you.

If you lose your Book of Shadows, you can perform a 1-hour ceremony to receive a replacement from your patron. This ceremony can be performed during a short or long rest, and it destroys the previous book. The book turns to ash when you die.`
            },
            {
                name: 'Ability Score Improvement',
                level: 4,
                content: ASI_CONTENT_STANDARD
            },
            {
                name: 'Mystic Arcanum',
                level: 11,
                content: `At 11th level, your patron bestows upon you a magical secret called an arcanum. Choose one 6th- level spell from the warlock spell list as this arcanum.

You can cast your arcanum spell once without expending a spell slot. You must finish a long rest before you can do so again.

At higher levels, you gain more warlock spells of your choice that can be cast in this way: one 7th- level spell at 13th level, one 8th-level spell at 15th level, and one 9th-level spell at 17th level. You regain all uses of your Mystic Arcanum when you finish a long rest.`
            },
            {
                name: 'Eldritch Master',
                level: 20,
                content: `At 20th level, you can draw on your inner reserve of mystical power while entreating your patron to regain expended spell slots. You can spend 1 minute entreating your patron for aid to regain all your expended spell slots from your Pact Magic feature. Once you regain spell slots with this feature, you must finish a long rest before you can do so again.`
            },
        ],
        asi: ASI_LEVELS_STANDARD,
        resources: [
            {
                name: 'Mystic Arcanum',
                total: '',
                current: '',
                type: 'simple',
                levels: {
                    11: '6th level',
                    13: '7th level',
                    15: '8th level',
                    17: '9th level'
                }
            }
        ],
        spellcasting: {
            ability: 'CHA',
            ability_info: `Charisma is your spellcasting ability for your warlock spells, so you use your Charisma whenever a spell refers to your spellcasting ability. 

In addition, you use your Charisma modifier when setting the saving throw DC for a warlock spell you cast and when making an attack roll with one.

**Spell save DC** = 8 + your proficiency bonus + your Charisma modifier

**Spell attack modifier** = your proficiency bonus + your Charisma modifier`,
            focus: 'You can use an arcane focus as a spellcasting focus for your warlock spells.',
            casting_info: `Your arcane research and the magic bestowed on you by your patron have given you facility with spells.
#### Cantrips
You know two cantrips of your choice from the warlock spell list. You learn additional warlock cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Warlock table.

#### Spell Slots
The Warlock table shows how many spell slots you have. The table also shows what the level of those slots is; all of your spell slots are the same level. To cast one of your warlock spells of 1st level or higher, you must expend a spell slot. You regain all expended spell slots when you finish a short or long rest.

For example, when you are 5th level, you have two 3rd-level spell slots. To cast the 1st-level spell thunderwave, you must spend one of those slots, and you cast it as a 3rd-level spell.

#### Spells Known of 1st Level and Higher
At 1st level, you know two 1st-level spells of your choice from the warlock spell list.

The Spells Known column of the Warlock table shows when you learn more warlock spells of your choice of 1st level and higher. A spell you choose must be of a level no higher than what’s shown in the table’s Slot Level column for your level. When you reach 6th level, for example, you learn a new warlock spell, which can be 1st, 2nd, or 3rd level.

Additionally, when you gain a level in this class, you can choose one of the warlock spells you know and replace it with another spell from the warlock spell list, which also must be of a level for which you have spell slots.`,
            cantrips_known: {
                1: 2,
                4: 3,
                10: 4
            },
            spells_known: {
                1: 2,
                2: 3,
                3: 4,
                4: 5,
                5: 6,
                6: 7,
                7: 8,
                8: 9 ,
                9: 10,
                11: 11,
                13: 12,
                15: 13,
                17: 14,
                19: 15, 
            },
            spell_slots: SPELLSLOTS_WARLOCK,
            spells_by_level: SPELLS_BY_LEVEL_BLANK,
            unique_info: {
                label: 'Eldritch Invocations',
                type: 'select-features',
                levels: {
                    2: '2',
                    5: '3',
                    7: '4',
                    9: '5',
                    12: '6',
                    15: '7',
                    18: '8'
                },
                final: [],
                options: [
                    {
                        name: 'Agonizing Blast',
                        content: `*Prerequisite: eldritch blast cantrip*\n\nWhen you cast eldritch blast, add your Charisma modifier to the damage it deals on a hit.`,
                    },
                    {
                        name: 'Armor of Shadows',
                        content: `You can cast mage armor on yourself at will, without expending a spell slot or material components.`
                    },
                    {
                        name: 'Ascendant Step',
                        content: `*Prerequisite: 9th level*\n\nYou can cast levitate on yourself at will, without expending a spell slot or material components.`
                    },
                    {
                        name: 'Beast Speech',
                        content: `You can cast speak with animals at will, without expending a spell slot.`
                    },
                    {
                        name: 'Beguiling Influence',
                        content: `You gain proficiency in the Deception and Persuasion skills.`
                    },
                    {
                        name: 'Bewitching Whispers',
                        content: `Prerequisite: 7th level\n\nYou can cast compulsion once using a warlock spell slot. You can’t do so again until you finish a long rest.`
                    },
                    {
                        name: 'Book of Ancient Secrets',
                        content: `*Prerequisite: Pact of the Tome feature*

You can now inscribe magical rituals in your Book of Shadows. Choose two 1st-level spells that have the ritual tag from any class’s spell list (the two needn’t be from the same list). The spells appear in the book and don’t count against the number of spells you know. With your Book of Shadows in hand, you can cast the chosen spells as rituals. You can’t cast the spells except as rituals, unless you’ve learned them by some other means. You can also cast a warlock spell you know as a ritual if it has the ritual tag.

On your adventures, you can add other ritual spells to your Book of Shadows. When you find such a spell, you can add it to the book if the spell’s level is equal to or less than half your warlock level (rounded up) and if you can spare the time to transcribe the spell. For each level of the spell, the transcription process takes 2 hours and costs 50 gp for the rare inks needed to inscribe it.`
                    },
                    {
                        name: 'Chains of Carceri',
                        content: `*Prerequisite: 15th level, Pact of the Chain feature*

You can cast hold monster at will—targeting a celestial, fiend, or elemental—without expending a spell slot or material components. You must finish a long rest before you can use this invocation on the same creature again.`
                    },
                    {
                        name: 'Devil’s Sight',
                        content: `You can see normally in darkness, both magical and nonmagical, to a distance of 120 feet.`
                    },
                    {
                        name: 'Dreadful Word',
                        content: `*Prerequisite: 7th level*

You can cast confusion once using a warlock spell slot. You can’t do so again until you finish a long rest.`
                    },
                    {
                        name: 'Eldritch Sight',
                        content: `You can cast detect magic at will, without expending a spell slot.`
                    },
                    {
                        name: 'Eldritch Spear',
                        content: `*Prerequisite: eldritch blast cantrip*\n\nWhen you cast eldritch blast, its range is 300 feet.`
                    },
                    {
                        name: 'Eyes of the Rune Keeper',
                        content: `You can read all writing.`
                    },
                    {
                        name: 'Fiendish Vigor',
                        content: `You can cast false life on yourself at will as a 1st-level spell, without expending a spell slot or material components.`
                    },
                    {
                        name: 'Gaze of Two Minds',
                        content: `You can use your action to touch a willing humanoid and perceive through its senses until the end of your next turn. As long as the creature is on the same plane of existence as you, you can use your action on subsequent turns to maintain this connection, extending the duration until the end of your next turn. While perceiving through the other creature’s senses, you benefit from any special senses possessed by that creature, and you are blinded and deafened to your own surroundings.`
                    },
                    {
                        name: 'Lifedrinker',
                        content: `*Prerequisite: 12th level, Pact of the Blade feature*\n\nWhen you hit a creature with your pact weapon, the creature takes extra necrotic damage equal to your Charisma modifier (minimum 1).`
                    },
                    {
                        name: 'Mask of Many Faces',
                        content: `You can cast disguise self at will, without expending a spell slot.`
                    },
                    {
                        name: 'Master of Myriad Forms',
                        content: `*Prerequisite: 15th level*\n\nYou can cast alter self at will, without expending a spell slot.`
                    },
                    {
                        name: 'Minions of Chaos',
                        content: `*Prerequisite: 9th level*\n\nYou can cast conjure elemental once using a warlock spell slot. You can’t do so again until you finish a long rest.`
                    },
                    {
                        name: 'Mire the Mind',
                        content: `*Prerequisite: 5th level*\n\nYou can cast slow once using a warlock spell slot. You can’t do so again until you finish a long rest.`
                    },
                    {
                        name: 'Misty Visions',
                        content: `You can cast silent image at will, without expending a spell slot or material components.`
                    },
                    {
                        name: 'One with Shadows',
                        content: `*Prerequisite: 5th level*\n\nWhen you are in an area of dim light or darkness, you can use your action to become invisible until you move or take an action or a reaction.`
                    },
                    {
                        name: 'Otherworldly Leap',
                        content: `*Prerequisite: 9th level*\n\nYou can cast jump on yourself at will, without expending a spell slot or material components.`
                    },
                    {
                        name: 'Repelling Blast',
                        content: `*Prerequisite: eldritch blast cantrip*\n\nWhen you hit a creature with eldritch blast, you can push the creature up to 10 feet away from you in a straight line.`
                    },
                    {
                        name: 'Sculptor of Flesh',
                        content: `*Prerequisite: 7th level*\n\nYou can cast polymorph once using a warlock spell slot. You can’t do so again until you finish a long rest.`
                    },
                    {
                        name: 'Sign of Ill Omen',
                        content: `*Prerequisite: 5th level*\n\nYou can cast bestow curse once using a warlock spell slot. You can’t do so again until you finish a long rest.`
                    },
                    {
                        name: 'Thief of Five Fates',
                        content: `You can cast bane once using a warlock spell slot. You can’t do so again until you finish a long rest.`
                    },
                    {
                        name: 'Thirsting Blade',
                        content: `*Prerequisite: 5th level, Pact of the Blade feature*\n\nYou can attack with your pact weapon twice, instead of once, whenever you take the Attack action on your turn.`
                    },
                    {
                        name: 'Visions of Distant Realms',
                        content: `*Prerequisite: 15th level*\n\nYou can cast arcane eye at will, without expending a spell slot.`
                    },
                    {
                        name: 'Voice of the Chain Master',
                        content: `*Prerequisite: Pact of the Chain feature*

You can communicate telepathically with your familiar and perceive through your familiar’s senses as long as you are on the same plane of existence. Additionally, while perceiving through your familiar’s senses, you can also speak through your familiar in your own voice, even if your familiar is normally incapable of speech.`
                    },
                    {
                        name: 'Whispers of the Grave',
                        content: `*Prerequisite: 9th level*\n\nYou can cast speak with dead at will, without expending a spell slot.`
                    },
                    {
                        name: 'Witch Sight',
                        content: `*Prerequisite: 15th level*\n\nYou can see the true form of any shapechanger or creature concealed by illusion or transmutation magic while the creature is within 30 feet of you and within line of sight.`
                    },
                ],
            }
        },
        as_prio: ['CHA', 'DEX', 'CON', 'WIS', 'INT', 'STR']
    },
    {
        name: 'Wizard',
        level: 1,
        hp: {
            hit_die: '6'
        },
        other_prof: [
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
                name: 'Slings'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Quarterstaffs'
            },
            {
                type: OTHER_PROF.WEAPON,
                name: 'Light crossbows'
            },
        ],
        tool_prof: {
            label: '',
            tools: []
        },
        saving_throws: [ 'INT', 'WIS' ],
        skills: {
            final: [],
            choose_n: 2,
            type: 'list',
            options: [ 'Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion' ]
        },
        equipment: [
            // 1st line ~ (a) a quarterstaff or (b) a dagger
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: 'Quarterstaff',
                            amount: 1,
                            tags: [
                                'weapon'
                            ]
                        }
                    ],
                    // (b)
                    [
                        {
                            name: 'Dagger',
                            amount: 1,
                            tags: [
                                'weapon'
                            ]
                        }
                    ]
                ]
            },
            // 2nd line ~ (a) a component pouch or (b) an arcane focus
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: "Component pouch",
                            amount: 1,
                            tags: [],
                        }
                    ],
                    // (b)
                    [
                        {
                            name: "Arcane focus",
                            amount: 1,
                            tags: [],
                        }
                    ],
                ]
            },
            // 3rd line ~ (a) a scholar’s pack or (b) an explorer’s pack
            {
                final: [],
                line_options: [
                    // (a)
                    [
                        {
                            name: "Scholar’s pack",
                            amount: 1,
                            tags: [],
                            description: PACKS['SCHOLAR']
                        }
                    ],
                    // (b)
                    // (a)
                    [
                        {
                            name: "Explorer’s pack",
                            amount: 1,
                            tags: [],
                            description: PACKS['EXPLORER']
                        }
                    ],
                ]
            },
            // 4th line ~ A spellbook
            {
                final: [
                    {
                        name: 'Spellbook',
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
                content: `As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power.

#### Cantrips
At 1st level, you know three cantrips of your choice from the wizard spell list. You learn additional wizard cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Wizard table.

#### Spellbook
At 1st level, you have a spellbook containing six 1st- level wizard spells of your choice. Your spellbook is the repository of the wizard spells you know, except your cantrips, which are fixed in your mind.

#### Preparing and Casting Spells
The Wizard table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell’s level or higher. You regain all expended spell slots when you finish a long rest.

You prepare the list of wizard spells that are available for you to cast. To do so, choose a number of wizard spells from your spellbook equal to your Intelligence modifier + your wizard level (minimum of one spell). The spells must be of a level for which you have spell slots.

For example, if you’re a 3rd-level wizard, you have four 1st-level and two 2nd-level spell slots. With an Intelligence of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination, chosen from your spellbook. If you prepare the 1st-level spell magic missile, you can cast it using a 1st-level or a 2nd-level slot. Casting the spell doesn’t remove it from your list of prepared spells.

You can change your list of prepared spells when you finish a long rest. Preparing a new list of wizard spells requires time spent studying your spellbook and memorizing the incantations and gestures you must make to cast the spell: at least 1 minute per spell level for each spell on your list.

#### Spellcasting Ability
Intelligence is your spellcasting ability for your wizard spells, since you learn your spells through dedicated study and memorization. You use your Intelligence whenever a spell refers to your spellcasting ability. In addition, you use your Intelligence modifier when setting the saving throw DC for a wizard spell you cast and when making an attack roll with one.

**Spell save DC** = 8 + your proficiency bonus + your Intelligence modifier

**Spell attack modifier** = your proficiency bonus + your Intelligence modifier

#### Ritual Casting
You can cast a wizard spell as a ritual if that spell has the ritual tag and you have the spell in your spellbook. You don’t need to have the spell prepared.

#### Spellcasting Focus
You can use an arcane focus as a spellcasting focus for your wizard spells.

#### Learning Spells of 1st Level and Higher
Each time you gain a wizard level, you can add two wizard spells of your choice to your spellbook for free. Each of these spells must be of a level for which you have spell slots, as shown on the Wizard table. On your adventures, you might find other spells that you can add to your spellbook (see the “Your Spellbook” sidebar).`
            },
            {
                name: 'Arcane Recovery',
                level: 1,
                content: `You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up), and none of the slots can be 6th level or higher.
\nFor example, if you’re a 4th-level wizard, you can recover up to two levels worth of spell slots. You can recover either a 2nd-level spell slot or two 1st-level spell slots.`
            },
            {
                name: 'Arcane Tradition ~ Subclass',
                level: 2,
                content: `When you reach 2nd level, you choose an arcane tradition, shaping your practice of magic through one of eight schools: Abjuration, Conjuration, Divination, Enchantment, Evocation, Illusion, Necromancy, or Transmutation. Your choice grants you features at 2nd level and again at 6th, 10th, and 14th level.`
            },
            {
                name: 'Ability Score Improvement',
                level: 4,
                content: ASI_CONTENT_STANDARD
            },
            {
                name: 'Spell Mastery',
                level: 18,
                content: `At 18th level, you have achieved such mastery over certain spells that you can cast them at will. Choose a 1st-level wizard spell and a 2nd-level wizard spell that are in your spellbook. You can cast those spells at their lowest level without expending a spell slot when you have them prepared. If you want to cast either spell at a higher level, you must expend a spell slot as normal.
\nBy spending 8 hours in study, you can exchange one or both of the spells you chose for different spells of the same levels.`
            },
            {
                name: 'Signature Spell',
                level: 20,
                content: `When you reach 20th level, you gain mastery over two powerful spells and can cast them with little effort. Choose two 3rd-level wizard spells in your spellbook as your signature spells. You always have these spells prepared, they don’t count against the number of spells you have prepared, and you can cast each of them once at 3rd level without expending a spell slot. When you do so, you can’t do so again until you finish a short or long rest.
\nIf you want to cast either spell at a higher level, you must expend a spell slot as normal.`
            },
        ],
        asi: ASI_LEVELS_STANDARD,
        resources: [],
        spellcasting: {
            ability: 'INT',
            ability_info: `Intelligence is your spellcasting ability for your wizard spells, since you learn your spells through dedicated study and memorization. You use your Intelligence whenever a spell refers to your spellcasting ability. 

In addition, you use your Intelligence modifier when setting the saving throw DC for a wizard spell you cast and when making an attack roll with one.

**Spell save DC** = 8 + your proficiency bonus + your Intelligence modifier

**Spell attack modifier** = your proficiency bonus + your Intelligence modifier`,
            focus: 'You can use an arcane focus as a spellcasting focus for your wizard spells.',
            ritual_casting: 'You can cast a wizard spell as a ritual if that spell has the ritual tag and you have the spell in your spellbook. You don’t need to have the spell prepared.',
            casting_info: `As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power.

#### Cantrips
At 1st level, you know three cantrips of your choice from the wizard spell list. You learn additional wizard cantrips of your choice at higher levels, as shown in the Cantrips Known column of the Wizard table.

#### Spellbook
At 1st level, you have a spellbook containing six 1st- level wizard spells of your choice. Your spellbook is the repository of the wizard spells you know, except your cantrips, which are fixed in your mind.

#### Preparing and Casting Spells
The Wizard table shows how many spell slots you have to cast your spells of 1st level and higher. To cast one of these spells, you must expend a slot of the spell’s level or higher. You regain all expended spell slots when you finish a long rest.

You prepare the list of wizard spells that are available for you to cast. To do so, choose a number of wizard spells from your spellbook equal to your Intelligence modifier + your wizard level (minimum of one spell). The spells must be of a level for which you have spell slots.

For example, if you’re a 3rd-level wizard, you have four 1st-level and two 2nd-level spell slots. With an Intelligence of 16, your list of prepared spells can include six spells of 1st or 2nd level, in any combination, chosen from your spellbook. If you prepare the 1st-level spell magic missile, you can cast it using a 1st-level or a 2nd-level slot. Casting the spell doesn’t remove it from your list of prepared spells.

You can change your list of prepared spells when you finish a long rest. Preparing a new list of wizard spells requires time spent studying your spellbook and memorizing the incantations and gestures you must make to cast the spell: at least 1 minute per spell level for each spell on your list.

#### Learning Spells of 1st Level and Higher
Each time you gain a wizard level, you can add two wizard spells of your choice to your spellbook for free. Each of these spells must be of a level for which you have spell slots, as shown on the Wizard table. On your adventures, you might find other spells that you can add to your spellbook (see the “Your Spellbook” sidebar).`,
            cantrips_known: {
                1: 3,
                4: 4,
                10: 5
            },
            spell_slots: SPELLSLOTS_STANDARD,
            spells_by_level: SPELLS_BY_LEVEL_BLANK,
            unique_info: {
                label: 'Your Spellbook',
                type: 'simple',
                content: `The spells that you add to your spellbook as you gain levels reflect the arcane research you conduct on your own, as well as intellectual breakthroughs you have had about the nature of the multiverse. You might find other spells during your adventures. You could discover a spell recorded on a scroll in an evil wizard’s chest, for example, or in a dusty tome in an ancient library.

***Copying a Spell into the Book.*** When you find a wizard spell of 1st level or higher, you can add it to your spellbook if it is of a spell level you can prepare and if you can spare the time to decipher and copy it.

Copying that spell into your spellbook involves reproducing the basic form of the spell, then deciphering the unique system of notation used by the wizard who wrote it. You must practice the spell until you understand the sounds or gestures required, then transcribe it into your spellbook using your own notation.

For each level of the spell, the process takes 2 hours and costs 50 gp. The cost represents material components you expend as you experiment with the spell to master it, as well as the fine inks you need to record it. Once you have spent this time and money, you can prepare the spell just like your other spells.

***Replacing the Book.*** You can copy a spell from your own spellbook into another book—for example, if you want to make a backup copy of your spellbook. This is just like copying a new spell into your spellbook, but faster and easier, since you understand your own notation and already know how to cast the spell. You need spend only 1 hour and 10 gp for each level of the copied spell.

If you lose your spellbook, you can use the same procedure to transcribe the spells that you have prepared into a new spellbook. Filling out the remainder of your spellbook requires you to find new spells to do so, as normal. For this reason, many wizards keep backup spellbooks in a safe place.

***The Book’s Appearance.*** Your spellbook is a unique compilation of spells, with its own decorative flourishes and margin notes. It might be a plain, functional leather volume that you received as a gift from your master, a finely bound gilt-edged tome you found in an ancient library, or even a loose collection of notes scrounged together after you lost your previous spellbook in a mishap.`
            }
        },
        as_prio: ['INT', 'DEX', 'CON', 'WIS', 'CHA', 'STR']
    },
]