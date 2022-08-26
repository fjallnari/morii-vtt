import type ClassData from "./ClassData";
import type { QCAbilityScores } from "./QCAbilityScores";
import type { QCAsGenInfo } from "./QCAsGenInfo";
import type RaceData from "./RaceData";

export default interface QuickCreateCharacterParts {
    race: RaceData,
    class: ClassData,
    spellcasting: boolean,
    ability_scores: QCAbilityScores,
    as_gen_info: QCAsGenInfo
}