import type { Feature, Item } from "./5E/Character5E";

export default interface QCBioData {
    info: string,
    name: string,
    backstory: string,
    appearance: string,
    skills: string[],
    tools: string[],
    languages: string[],
    equipment: Partial<Item>[],
    features: Partial<Feature>[],
    personality: string,
    ideals: string,
    bonds: string,
    flaws: string,
    coins: Record<string, string>
}