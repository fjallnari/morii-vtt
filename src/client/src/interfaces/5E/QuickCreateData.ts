import type ClassData from "./5E/ClassData";
import type { QCAbilityScores } from "./QCAbilityScores";
import type RaceData from "./RaceData";

export default interface QuickCreateData {
    races: RaceData[],
    classes: ClassData[],
    spells: any,
    as_blank: QCAbilityScores
}