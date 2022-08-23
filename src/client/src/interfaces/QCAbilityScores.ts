export type QCAbilityScores = Record<string, QCAbilityScore>;

export interface QCAbilityScore {
    name: string,
    value: string,
    base: string,
    asi_bonus: string,
    other_bonus: string,
}