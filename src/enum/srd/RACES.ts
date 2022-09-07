import RaceData from "../../interfaces/srd/RaceData";
import { OTHER_PROF } from "../OTHER_PROF";

export const RACES: RaceData[] = [
    {
        name: 'Custom',
        as_increase: {},
        age: '',
        age_info: '',
        alignment: '',
        alignment_info: '',
        size: '',
        size_info: '',
        speed: '',
        speed_info: '',
        languages: [],
        features: [],
        skill_prof: [],
        tools_prof: [],
        other_prof: []
    },
    {
        name: 'Dwarf',
        as_increase: {
            'CON': '+2'
        },
        age: '',
        age_info: 'Dwarves mature at the same rate as humans, but they’re considered young until they reach the age of 50. On average, they live about 350 years.',
        alignment: '',
        alignment_info: 'Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the benefits of a just order.',
        size: 'Medium',
        size_info: 'Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium.',
        speed: '25',
        speed_info: 'Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.',
        languages: ['Common', 'Dwarvish'],
        features: [
            {
                name: 'Darkvision',
                content: 'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.',
            },
            {
                name: 'Dwarven Resilience',
                content: 'You have advantage on saving throws against poison, and you have resistance against poison damage.'
            },
            {
                name: 'Dwarven Combat Training',
                content: 'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.'
            },
            {
                name: 'Tool Proficiency',
                content: 'You gain proficiency with the artisan’s tools of your choice: smith’s tools, brewer’s supplies, or mason’s tools.'
            },
            {
                name: 'Stonecunning',
                content: 'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.'
            }
        ],
        skill_prof: [],
        tools_prof: [[ 'smith’s 🛠', 'mason’s 🛠', 'brewer’s supplies' ]],
        other_prof: [
            {
                name: 'Battleaxe',
                type: OTHER_PROF.WEAPON
            },
            {
                name: 'Handaxe',
                type: OTHER_PROF.WEAPON
            },
            {
                name: 'Light Hammer',
                type: OTHER_PROF.WEAPON
            },
            {
                name: 'Warhammer',
                type: OTHER_PROF.WEAPON
            }
        ]
    },
    {
        name: 'Elf',
        as_increase: {
            'DEX': '+2'
        },
        age: '',
        age_info: 'Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old.',
        alignment: '',
        alignment_info: 'Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects of chaos. They value and protect others’ freedom as well as their own, and they are more often good than not. The drow are an exception; their exile has made them vicious and dangerous. Drow are more often evil than not.',
        size: 'Medium',
        size_info: 'Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.',
        speed: '30',
        speed_info: 'Your base walking speed is 30 feet.',
        languages: ['Common', 'Elvish'],
        features: [
            {
                name: 'Darkvision',
                content: 'Accustomed to twilit forests and the night sky, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.'
            },
            {
                name: 'Keen Senses',
                content: 'You have proficiency in the Perception skill.'
            },
            {
                name: 'Fey Ancestry',
                content: 'You have advantage on saving throws against being charmed, and magic can’t put you to sleep.'
            },
            {
                name: 'Trance',
                content: 'Elves don’t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is “trance.”) While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.'
            },
        ],
        skill_prof: ['Perception'],
        tools_prof: [],
        other_prof: []
    },
    {
        name: 'Halfling',
        as_increase: {
            'DEX': '+2'
        },
        age: '',
        age_info: 'A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second century.',
        alignment: '',
        alignment_info: 'Most halflings are lawful good. As a rule, they are good-hearted and kind, hate to see others in pain, and have no tolerance for oppression. They are also very orderly and traditional, leaning heavily on the support of their community and the comfort of their old ways.',
        size: 'Small',
        size_info: 'Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small.',
        speed: '25',
        speed_info: 'Your base walking speed is 25 feet.',
        languages: ['Common', 'Halfling'],
        features: [
            {
                name: 'Lucky',
                content: 'When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.'
            },
            {
                name: 'Brave',
                content: 'You have advantage on saving throws against being frightened.'
            },
            {
                name: 'Halfling Nimbleness',
                content: 'You can move through the space of any creature that is of a size larger than yours.'
            }
        ],
        skill_prof: [],
        tools_prof: [],
        other_prof: []
    },
    {
        name: 'Human',
        as_increase: {
            'STR': '+1',
            'DEX': '+1',
            'CON': '+1',
            'INT': '+1',
            'WIS': '+1',
            'CHA': '+1'
        },
        age: '',
        age_info: 'Humans reach adulthood in their late teens and live less than a century.',
        alignment: '',
        alignment_info: 'Humans tend toward no particular alignment. The best and the worst are found among them.',
        size: 'Medium',
        size_info: 'Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium.',
        speed: '30',
        speed_info: 'Your base walking speed is 30 feet.',
        languages: ['Common', '???'],
        features: [],
        skill_prof: [],
        tools_prof: [],
        other_prof: []
    },
    {
        name: 'Dragonborn',
        as_increase: {
            'STR': '+2',
            'CHA': '+1'
        },
        age: '',
        age_info: 'Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.',
        alignment: '',
        alignment_info: 'Dragonborn tend to extremes, making a conscious choice for one side or the other in the cosmic war between good and evil. Most dragonborn are good, but those who side with evil can be terrible villains.',
        size: 'Medium',
        size_info: 'Dragonborn are taller and heavier than humans, standing well over 6 feet tall and averaging almost 250 pounds. Your size is Medium.',
        speed: '30',
        speed_info: 'Your base walking speed is 30 feet.',
        languages: ['Common', 'Draconic'],
        features: [
            {
                name: 'Draconic Ancestry',
                content: `You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type, as shown in the table.
    Dragon -> Damage Type -> Breath Weapon                
   ------------------------------------------------------- 
    Black -> Acid -> 5 by 30 ft. line (Dex. save) 
    Blue -> Lightning -> 5 by 30 ft. line (Dex. save) 
    Brass -> Fire -> 5 by 30 ft. line (Dex. save) 
    Bronze -> Lightning -> 5 by 30 ft. line (Dex. save) 
    Copper -> Acid -> 5 by 30 ft. line (Dex. save) 
    Gold -> Fire -> 15 ft. cone (Dex. save)      
    Green -> Poison -> 15 ft. cone (Con. save)      
    Red -> Fire -> 15 ft. cone (Dex. save)      
    Silver -> Cold -> 15 ft. cone (Con. save)      
    White -> Cold -> 15 ft. cone (Con. save)`
            },
            {
                name: 'Breath Weapon',
                content: `You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation.
    When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level.
    After you use your breath weapon, you can’t use it again until you complete a short or long rest.`
            },
            {
                name: 'Damage Resistance',
                content: 'You have resistance to the damage type associated with your draconic ancestry.'
            }
        ],
        skill_prof: [],
        tools_prof: [],
        other_prof: []
    },
    {
        name: 'Rock Gnome',
        as_increase: {
            'INT': '+2',
            'CON': '+1'
        },
        age: '',
        age_info: 'Gnomes mature at the same rate humans do, and most are expected to settle down into an adult life by around age 40. They can live 350 to almost 500 years.',
        alignment: '',
        alignment_info: 'Gnomes are most often good. Those who tend toward law are sages, engineers, researchers, scholars, investigators, or inventors. Those who tend toward chaos are minstrels, tricksters, wanderers, or fanciful jewelers. Gnomes are good-hearted, and even the tricksters among them are more playful than vicious.',
        size: 'Small',
        size_info: 'Gnomes are between 3 and 4 feet tall and average about 40 pounds. Your size is Small.',
        speed: '25',
        speed_info: 'Your base walking speed is 25 feet.',
        languages: ['Common', 'Gnomish'],
        features: [
            {
                name: 'Darkvision',
                content: 'Accustomed to life underground, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.'
            },
            {
                name: 'Gnome Cunning',
                content: 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.'
            },
            {
                name: 'Artificer’s Lore',
                source: 'Rock Gnome',
                content: 'Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.'
            },
            {
                name: 'Tinker',
                source: 'Rock Gnome',
                content: `You have proficiency with artisan’s tools (tinker’s tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time.
                When you create a device, choose one of the following options:
                    - Clockwork Toy. This toy is a clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noises as appropriate to the creature it represents.
                    - Fire Starter. The device produces a miniature flame, which you can use to light a candle, torch, or campfire. Using the device requires your action.
                    - Music Box. When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song’s end or when it is closed.
                `
            },
        ],
        skill_prof: [],
        tools_prof: [],
        other_prof: []
    },
    {
        name: 'Half-Elf',
        as_increase: {
            'CHA': '+2',
        },
        age: '',
        age_info: 'Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much longer than humans, however, often exceeding 180 years.',
        alignment: '',
        alignment_info: 'Half-elves share the chaotic bent of their elven heritage. They value both personal freedom and creative expression, demonstrating neither love of leaders nor desire for followers. They chafe at rules, resent others’ demands, and sometimes prove unreliable, or at least unpredictable.',
        size: 'Medium',
        size_info: 'Half-elves are about the same size as humans, ranging from 5 to 6 feet tall. Your size is Medium.',
        speed: '30',
        speed_info: 'Your base walking speed is 30 feet.',
        languages: ['Common', 'Elvish', '???'],
        features: [
            {
                name: 'AS Increase - ???',
                content: 'Your Charisma score increases by 2, and two other ability scores of your choice increase by 1.'
            },
            {
                name: 'Darkvision',
                content: 'Thanks to your elf blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.'
            },
            {
                name: 'Fey Ancestry',
                content: 'You have advantage on saving throws against being charmed, and magic can’t put you to sleep.'
            },
            {
                name: 'Skill Versatility',
                content: 'You gain proficiency in two skills of your choice.'
            }
        ],
        skill_prof: ['', ''],
        tools_prof: [],
        other_prof: []
    },
    {
        name: 'Half-Orc',
        as_increase: {
            'STR': '+2',
            'CON': '+1'
        },
        age: '',
        age_info: 'Half-orcs mature a little faster than humans, reaching adulthood around age 14. They age noticeably faster and rarely live longer than 75 years.',
        alignment: '',
        alignment_info: 'Half-orcs inherit a tendency toward chaos from their orc parents and are not strongly inclined toward good. Half-orcs raised among orcs and willing to live out their lives among them are usually evil.',
        size: 'Medium',
        size_info: 'Half-orcs are somewhat larger and bulkier than humans, and they range from 5 to well over 6 feet tall. Your size is Medium.',
        speed: '30',
        speed_info: 'Your base walking speed is 30 feet.',
        languages: ['Common', 'Orc'],
        features: [
            {
                name: 'Darkvision',
                content: 'Thanks to your orc blood, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.'
            },
            {
                name: 'Menacing',
                content: 'You gain proficiency in the Intimidation skill.'
            },
            {
                name: 'Relentless Endurance',
                content: 'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can’t use this feature again until you finish a long rest.'
            },
            {
                name: 'Savage Attacks',
                content: 'When you score a critical hit with a melee weapon attack, you can roll one of the weapon’s damage dice one additional time and add it to the extra damage of the critical hit.'
            }
        ],
        skill_prof: ['Intimidation'],
        tools_prof: [],
        other_prof: []
    },
    {
        name: 'Tiefling',
        as_increase: {
            'INT': '+1',
            'CHA': '+2'
        },
        age: '',
        age_info: 'Tieflings mature at the same rate as humans but live a few years longer.',
        alignment: '',
        alignment_info: 'Tieflings might not have an innate tendency toward evil, but many of them end up there. Evil or not, an independent nature inclines many tieflings toward a chaotic alignment.',
        size: 'Medium',
        size_info: 'Tieflings are about the same size and build as humans. Your size is Medium.',
        speed: '30',
        speed_info: 'Your base walking speed is 30 feet.',
        languages: ['Common', 'Infernal'],
        features: [
            {
                name: 'Darkvision',
                content: 'Thanks to your infernal heritage, you have superior vision in dark and dim conditions. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can’t discern color in darkness, only shades of gray.'
            },
            {
                name: 'Hellish Resistance',
                content: 'You have resistance to fire damage.'
            },
            {
                name: 'Infernal Legacy',
                content: 'You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the hellish rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.'
            },
        ],
        skill_prof: [],
        tools_prof: [],
        other_prof: []
    }
]