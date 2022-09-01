import type { Feature, Item } from "./Character";

export default interface QCBioData {
    info: string,
    skills: string[],
    tools: string[],
    languages: string[],
    equipment: Partial<Item>[],
    features: Partial<Feature>[],
    personality: string,
    ideals: string,
    bonds: string,
    flaws: string,
}