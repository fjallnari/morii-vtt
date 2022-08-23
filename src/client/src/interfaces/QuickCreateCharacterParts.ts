import type ClassData from "./ClassData";
import type { QCAbilityScores } from "./QCAbilityScores";
import type RaceData from "./RaceData";

export default interface QuickCreateCharacterParts {
    race: RaceData,
    class: ClassData,
    spellcasting: boolean,
    ability_scores: QCAbilityScores,
}