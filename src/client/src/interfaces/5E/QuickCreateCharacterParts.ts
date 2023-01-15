import type { Attack } from "./5E/Character5E";
import type ClassData from "./5E/ClassData";
import type { QCAbilityScores } from "./QCAbilityScores";
import type { QCAsGenInfo } from "./QCAsGenInfo";
import type QCBioData from "./QCBioData";
import type RaceData from "./RaceData";

export default interface QuickCreateCharacterParts {
    name?: string,
    race: RaceData,
    class: ClassData,
    spellcasting: boolean,
    ability_scores: QCAbilityScores,
    as_gen_info: QCAsGenInfo,
    bio: QCBioData,
    weapons: Record<string, Partial<Attack>>
}