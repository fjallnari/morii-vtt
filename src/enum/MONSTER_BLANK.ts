import { MonsterData } from "../interfaces/srd/MonsterData";

export const MONSTER_BLANK: Omit<MonsterData, 'id'> = {
    is_custom: true,
    source: "custom",
    name: "???",
    meta: "???",
    ability_scores: {
        "STR": "10",
        "DEX": "10",
        "CON": "10",
        "INT": "10",
        "WIS": "10",
        "CHA": "10"
    },
    armor_class: "",
    hit_points: "",
    speed: "",
    saving_throws: "",
    skills: "",
    damage_resistances: "",
    damage_immunities: "",
    condition_immunities: "",
    damage_vulnerabilities: "",
    senses: "???",
    languages: "???",
    challenge: "0 (10 XP)",
    traits: [],
    actions: [],
    reactions: [],
    legendary_actions: [],
    img_url: "",
}