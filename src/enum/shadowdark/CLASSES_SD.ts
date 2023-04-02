import { ProfShadowdark, TalentShadowdark } from "../../interfaces/CharacterShadowdark"


interface ClassShadowdark {
    talents: Omit<TalentShadowdark, "id" | "type">[],
    proficiencies: Omit<ProfShadowdark, "id">[],
    spellsKnown?: string[][]
}

const CLASSES_SD: Record<string, ClassShadowdark> = {
    "Fighter": {
        talents: [
            { name: "Hauler", content: "Add your Constitution modifier, if positive, to your gear slots." },
        ],
        proficiencies: [
            { name: "All weapons", type: 2, content: "" },
            { name: "All armor", type: 1, content: "" },
            { name: "Shields", type: 1, content: "" },
        ]
    },
    "Priest": {
        talents: [
            { name: "Turn Undead", content: "You know the turn undead spell. It doesn’t count toward your number of known spells." },
            { name: "Spellcasting", content: "You can cast priest spells you know. You know two tier 1 spells of your choice from the priest spell list on pg. 57. Each time you gain a level, you choose new priest spells to learn according to the Priest Spells Known table. For casting priest spells, see Spellcasting on pg. 52." }
        ],
        proficiencies: [
            { name: "Club", type: 2, content: "" },
            { name: "Crossbow", type: 2, content: "" },
            { name: "Dagger", type: 2, content: "" },
            { name: "Mace", type: 2, content: "" },
            { name: "Longsword", type: 2, content: "" },
            { name: "Staff", type: 2, content: "" },
            { name: "Warhammer", type: 2, content: "" },
            { name: "All armor", type: 1, content: "" },
            { name: "Shields", type: 1, content: "" },
        ],
        spellsKnown: [ 
            [ '2' ],
            [ '3' ],
            [ '3', '1' ],
            [ '3', '2' ],
            [ '3', '2', '1' ],
            [ '3', '2', '2' ], 
            [ '3', '3', '2', '1' ], 
            [ '3', '3', '2', '2' ],
            [ '3', '3', '2', '2', '1' ],
            [ '3', '3', '3', '2', '2' ],
        ], 
    },
    "Thief": {
        talents: [
            { name: "Backstab", content: "If you hit a creature who is unaware of your attack, you deal an extra weapon die of damage. Add additional weapon dice of damage equal to half your level (round down)." },
            { name: "Thievery", content: "You are adept at thieving skills and have the necessary tools of the trade secreted on your person (they take up no gear slots). You are trained in the following tasks and have advantage on any associated checks: Climbing, Sneaking and hiding, Applying disguises, Finding and disabling traps, Delicate tasks such as picking pockets and opening locks" },
        ],
        proficiencies: [
            { name: "Club", type: 2, content: "" },
            { name: "Crossbow", type: 2, content: "" },
            { name: "Dagger", type: 2, content: "" },
            { name: "Shortbow", type: 2, content: "" },
            { name: "Shortsword", type: 2, content: "" },
            { name: "Leather armor", type: 1, content: "" },
            { name: "Mithral chainmail", type: 1, content: "" },
        ]
    },
    "Wizard": {
        talents: [
            { name: "Learning Spells", content: "You can permanently learn a wizard spell from a spell scroll by studying it for a day and succeeding on a DC 15 Intelligence check.\nWhether you succeed or fail, you expend the spell scroll. Spells you learn in this way don't count toward your known spells." },
            { name: "Spellcasting", content: "You can cast wizard  spells you know. You know three tier 1 spells of your choice from the wizard spell list on pg. 57. Each time you gain a level, you choose new wizard spells to learn according to the Wizard Spells Known table. For casting wizard spells, see Spellcasting on pg. 52" },
        ],
        proficiencies: [
            { name: "Dagger", type: 2, content: "" },
            { name: "Staff", type: 2, content: "" }
        ],
        spellsKnown: [ 
            [ '3' ],
            [ '4' ],
            [ '4', '1' ],
            [ '4', '2' ],
            [ '4', '2', '1' ],
            [ '4', '3', '2' ], 
            [ '4', '3', '2', '1' ], 
            [ '4', '4', '2', '2' ],
            [ '4', '4', '3', '2', '1' ],
            [ '4', '4', '4', '2', '2' ],
        ]
    }
}

export default CLASSES_SD;