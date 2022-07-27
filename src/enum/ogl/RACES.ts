import RaceData from "../../interfaces/ogl/RaceData";

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
        tools_prof: [],
        other_prof: []
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
        skill_prof: [],
        tools_prof: [],
        other_prof: []
    },
]