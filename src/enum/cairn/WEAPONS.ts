import { ItemCairn } from "../../interfaces/CharacterCairn";

export class WeaponCairn {
    public record: Record<string, Partial<ItemCairn>>;

    constructor({ name, damage, bulky }: { name: string, damage: string, bulky?: boolean }) {
        const prettyName = `${name} (${damage}${bulky ? ', bulky' : ''})`;
        this.record = { [name]: { name: prettyName, type: 'weapon', damage: damage, bulky} }
        return this;
    }

    public getItem() {
        return this.record[Object.keys(this.record)[0]];
    }
}

export const WEAPONS: Record<string, Partial<ItemCairn>> = {
    ... new WeaponCairn({ name: "Dagger", damage: "d6"}).record,
    ... new WeaponCairn({ name: "Cudgel", damage: "d6"}).record,
    ... new WeaponCairn({ name: "Staff", damage: "d6"}).record,
    ... new WeaponCairn({ name: "Sword", damage: "d8"}).record,
    ... new WeaponCairn({ name: "Mace", damage: "d8"}).record,
    ... new WeaponCairn({ name: "Axe", damage: "d8"}).record,
    ... new WeaponCairn({ name: "Longbow", damage: "d6", bulky: true}).record,
    ... new WeaponCairn({ name: "Crossbow", damage: "d6", bulky: true}).record,
    ... new WeaponCairn({ name: "Sling", damage: "d4"}).record,
    ... new WeaponCairn({ name: "Halberd", damage: "d10", bulky: true}).record,
    ... new WeaponCairn({ name: "War Hammer", damage: "d10", bulky: true}).record,
    ... new WeaponCairn({ name: "Battleaxe", damage: "d10", bulky: true}).record,

}
