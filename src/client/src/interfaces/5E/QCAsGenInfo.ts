import type { Feature } from "./5E/Character5E";
import type IDNameInterface from "./IDNameInterface";

export interface QCAsGenInfo {
    baseArray: number[], 
    customAssignPrio: IDNameInterface[], 
    customField: string,
    asiInfo: string,
    feats: Partial<Feature>[],
}