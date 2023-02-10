import { ItemCairn } from "../../interfaces/CharacterCairn";

export class ArmorCairn {
    public record: Record<string, Partial<ItemCairn>>;

    constructor ({ name, armor, bulky }: { name: string, armor: string, bulky?: boolean }) {
        const prettyName = `${name} (${armor} Armor)`;
        this.record = {[name]: { name: prettyName, type: 'armor', bulky, armor: armor }};
        return this;
    }

    public getItem() {
        return this.record[Object.keys(this.record)[0]];
    }
}

export const ARMORS: Record<string, Partial<ItemCairn>> = {
    ... new ArmorCairn({ name: 'Shield', armor: '+1' }).record,
    ... new ArmorCairn({ name: 'Helmet', armor: '+1' }).record,
    ... new ArmorCairn({ name: 'Gambeson', armor: '+1' }).record,
    ... new ArmorCairn({ name: 'Brigandine', armor: '1', bulky: true }).record,
    ... new ArmorCairn({ name: 'Chainmail', armor: '2', bulky: true }).record,
    ... new ArmorCairn({ name: 'Plate', armor: '3', bulky: true }).record,
}
