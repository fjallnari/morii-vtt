import { AttackShadowdark } from "../../interfaces/CharacterShadowdark";


const WEAPONS_SD: Partial<AttackShadowdark>[] = [
    {
        name: "Bastard sword",
        type: 0,
        stat: "STR",
        atk_bonus: "",
        range: "C",
        damage: "1d8",
        versatile_die: "1d10",
        versatile_active: false,
        properties: "V, 2 slots",
    },
    {
        name: "Club",
        type: 0,
        stat: "STR",
        atk_bonus: "",
        range: "C",
        damage: "1d4",
        properties: "",
    },
    {
        name: "Crossbow",
        type: 1,
        stat: "DEX",
        atk_bonus: "",
        range: "F",
        damage: "1d6",
        properties: "2H, L",
    },
    {
        name: "Dagger",
        type: 0,
        stat: "DEX",
        atk_bonus: "",
        range: "C/N",
        damage: "1d4",
        properties: "F, Th",
    },
    {
        name: "Greataxe",
        type: 0,
        stat: "STR",
        atk_bonus: "",
        range: "C",
        damage: "1d8",
        versatile_die: "1d10",
        versatile_active: false,
        properties: "V, 2 slots",
    },
    {
        name: "Greatsword",
        type: 0,
        stat: "STR",
        atk_bonus: "",
        range: "C",
        damage: "1d12",
        properties: "2H, 2 slots",
    },
    {
        name: "Javelin",
        type: 0,
        stat: "STR",
        atk_bonus: "",
        range: "C/F",
        damage: "1d4",
        properties: "Th",
    },
    {
        name: "Longbow",
        type: 1,
        stat: "DEX",
        atk_bonus: "",
        range: "F",
        damage: "1d8",
        properties: "2H",
    },
    {
        name: "Longsword",
        type: 0,
        stat: "STR",
        atk_bonus: "",
        range: "C",
        damage: "1d8",
        properties: "",
    },
    {
        name: "Mace",
        type: 0,
        stat: "STR",
        atk_bonus: "",
        range: "C",
        damage: "1d6",
        properties: "",
    },
    {
        name: "Shortbow",
        type: 1,
        stat: "DEX",
        atk_bonus: "",
        range: "F",
        damage: "1d4",
        properties: "2H",
    },
    {
        name: "Shortsword",
        type: 0,
        stat: "STR",
        atk_bonus: "",
        range: "C",
        damage: "1d6",
        properties: "",
    },
    {
        name: "Spear",
        type: 0,
        stat: "STR",
        atk_bonus: "",
        range: "C/N",
        damage: "1d6",
        properties: "Th",
    },
    {
        name: "Staff",
        type: 0,
        stat: "STR",
        atk_bonus: "",
        range: "C",
        damage: "1d4",
        properties: "2H",
    },
    {
        name: "Warhammer",
        type: 0,
        stat: "STR",
        atk_bonus: "",
        range: "C",
        damage: "1d10",
        properties: "2H",
    }
]

export default WEAPONS_SD;
