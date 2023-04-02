import type ProfShadowdark from "./ProfShadowdark";
import type TalentShadowdark from "./TalentShadowdark";

export default interface ClassInfoShadowdark {
    talents: Omit<TalentShadowdark, "id" | "type">[],
    proficiencies: Omit<ProfShadowdark, "id">[],
    spellsKnown?: string[][]
}