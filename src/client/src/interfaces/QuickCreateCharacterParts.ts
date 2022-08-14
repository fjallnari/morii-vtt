import type ClassData from "./ClassData";
import type RaceData from "./RaceData";

export default interface QuickCreateCharacterParts {
    race: RaceData,
    class: ClassData,
    spellcasting: boolean
}