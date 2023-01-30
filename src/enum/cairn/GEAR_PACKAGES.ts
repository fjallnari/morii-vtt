import { ItemCairn } from "../../interfaces/CharacterCairn"
import { ArmorCairn, ARMORS } from "./ARMORS"
import { WeaponCairn, WEAPONS } from "./WEAPONS"
import { SPELLBOOKS } from "./SPELLBOOKS"

const createItem = ({ name, description, bulky, stacks }: {
    name: string,
    description?: string,
    bulky?: boolean,
    stacks?: boolean,
}
): ItemCairn => {
    return { name: name, type: 'item', description: description, bulky, stacks: stacks, };
}

const getRandomSpellbook = (): ItemCairn => {
    const spellbook = SPELLBOOKS[Math.floor(Math.random() * SPELLBOOKS.length)];
    return { name: spellbook.name, type: 'spellbook', description: spellbook.description };
}

const getCharmOrDetectSpellbook = (): ItemCairn => {
    if ((Math.floor(Math.random() * 2) == 0)) {
        const charm = SPELLBOOKS[13];
        return { name: charm.name, type: 'spellbook', description: charm.description };
    } else {
        const detect = SPELLBOOKS[21];
        return { name: detect.name, type: 'spellbook', description: detect.description };
    }
}

export const GEAR_PACKAGES: { name: string, items: Partial<ItemCairn>[] }[] = [
    {
        name: 'Cleric',
        items: [
            WEAPONS["War Hammer"],
            ARMORS["Chainmail"],
            new ArmorCairn({ name: "Gauntlets", armor: "+1" }).getItem(),
            new WeaponCairn({ name: "Cleansing Blade", damage: "d6" }).getItem(),
            createItem({ name: "Holy Symbol", description: "Ward once per day" }),
            createItem({ name: "Cloak of the Order" })
        ],
    },
    {
        name: "Dowser",
        items: [
            new WeaponCairn({ name: "Sickle", damage: "d6" }).getItem(),
            new ArmorCairn({ name: "Patchwork Doublet", armor: "+1" }).getItem(),
            createItem({ name: "Dowsing Rod" }),
            createItem({ name: "Eyestone", description: "Sense if placed in fresh water" }),
            createItem({ name: "Worn Map" }),
            createItem({ name: "Spyglass" })
        ],
    },
    {
        name: "Dwarf",
        items: [
            new WeaponCairn({ name: "Prickly Root", damage: "d6" }).getItem(),
            new ArmorCairn({ name: "Pinecone Lattice", armor: "1" }).getItem(),
            createItem({ name: "Trowel" }),
            createItem({ name: "Jar of Forest Ants" }),
            createItem({ name: "Poisonous Mushroom" }),
            createItem({ name: "Hand Drill" })
        ],
    },
    {
        name: "Elf",
        items: [
            new WeaponCairn({ name: "Elegant Sword", damage: "d8" }).getItem(),
            new WeaponCairn({ name: "Recurve Bow", damage: "d8" }).getItem(),
            new ArmorCairn({ name: "Gilt Clothing", armor: "1" }).getItem(),
            getCharmOrDetectSpellbook(),
            createItem({ name: "Golden Flute" }),
            createItem({ name: "Air Bladder" })
        ],
    },
    {
        name: "Fighter",
        items: [
            new WeaponCairn({ name: "Glaive", damage: "d10", bulky: true }).getItem(),
            new WeaponCairn({ name: "Scimitar", damage: "d8" }).getItem(),
            new WeaponCairn({ name: "Shortsword", damage: "d6" }).getItem(),
            new WeaponCairn({ name: "Shortsword", damage: "d6" }).getItem(),
            createItem({ name: "Tobacco Pouch & Pipe" }),
            createItem({ name: "Dice Set", stacks: true })
        ],
    },
    {
        name: "Friar",
        items: [
            new ArmorCairn({ name: "Scepter", armor: "d6" }).getItem(),
            new ArmorCairn({ name: "Deceptive Robes", armor: "+1" }).getItem(),
            createItem({ name: "Censer & Holy Water" }),
            createItem({ name: "Jug of Honey Wine" }),
            createItem({ name: "Folk Songbook" }),
            createItem({ name: "Cart", description: "+4 slots", bulky: true }) // TODO: We should add logic to automatically increase slots
        ],
    },
    {
        name: "Knight",
        items: [
            new WeaponCairn({ name: "Longsword", damage: "d10", bulky: true }).getItem(),
            ARMORS["Chainmail"],
            ARMORS["Helmet"],
            createItem({ name: "Heraldic Cape" }),
            createItem({ name: "Manacles" }),
            createItem({ name: "Fine Rope" })
        ],
    },
    {
        name: "Magic User",
        items: [
            new WeaponCairn({ name: "Fizzled Staff", damage: "d8", bulky: true }).getItem(),
            WEAPONS["Dagger"],
            getRandomSpellbook(),
            getRandomSpellbook(),
            createItem({ name: "Ragged Clothing", description: "hidden pockets" }),
            createItem({ name: "Leycap", description: "1 use. Anyone ingesting this green-flecked mushroom loses a Fatigue, but is then required to make a WIL save to avoid its addictive properties. A fail leaves the PC deprived and unable to focus until they can eat another leycap, providing only a brief reprieve from the addiction." }),
            createItem({ name: "Leycap", description: "1 use. Anyone ingesting this green-flecked mushroom loses a Fatigue, but is then required to make a WIL save to avoid its addictive properties. A fail leaves the PC deprived and unable to focus until they can eat another leycap, providing only a brief reprieve from the addiction." })
        ],
    },
    {
        name: "Thief",
        items: [
            new WeaponCairn({ name: "Two daggers", damage: "d6+d8" }).getItem(),
            new ArmorCairn({ name: "Hooded Jerkin", armor: "1" }).getItem(),
            createItem({ name: "Lockpick" }),
            createItem({ name: "Caltrops" }),
            createItem({ name: "Grappling Hook" }),
            createItem({ name: "Metal File", stacks: true })
        ],
    },
    {
        name: "Ranger",
        items: [
            new WeaponCairn({ name: "Longbow", damage: "d8", bulky: true }).getItem(), // Stronger than normal longbow d6
            new WeaponCairn({ name: "Hatchet", damage: "d6" }).getItem(),
            new ArmorCairn({ name: "Padded Leathers", armor: "1" }).getItem(),
            createItem({ name: "Large Trap" }),
            //"Bloodhound | 2 HP, 12 DEX, bite (d6)", // TODO, how to do companions?
            createItem({ name: "Thundering Horn" })
        ],
    }
]

