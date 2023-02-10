import type { ItemCairn } from "./CharacterCairn";

export default interface CairnGearPackage {
    name: string, 
    items: Partial<ItemCairn>[]
}