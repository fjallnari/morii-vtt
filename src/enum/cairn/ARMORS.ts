import { ItemCairn } from "../../interfaces/CharacterCairn";

const createArmor = (name: string, armor: string, bulky: boolean = false): Record<string, Partial<ItemCairn>> => {
    const prettyArmorName = `${name} (${armor} Armor${bulky ? ', bulky': ''})`;
    return {[name]: { name: prettyArmorName, type: 'armor', bulky: bulky, armor: armor }};
}

export const ARMORS: Record<string, Partial<ItemCairn>> = {
    ... createArmor('Shield', '+1'),
    ... createArmor('Helmet', '+1'),
    ... createArmor('Gauntlets', '+1'),
    ... createArmor('Gambeson', '+1'),
    ... createArmor('Brigandine', '1', true),
    ... createArmor('Chainmail', '2', true),
    ... createArmor('Plate', '3', true),
}