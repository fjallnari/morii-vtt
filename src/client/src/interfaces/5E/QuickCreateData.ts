import type ClassData from "./ClassData";
import type { QCAbilityScores } from "./QCAbilityScores";
import type RaceData from "./RaceData";

export default interface QuickCreateData {
    races: RaceData[],
    classes: ClassData[],
    spells: any,
    as_blank: QCAbilityScores
}