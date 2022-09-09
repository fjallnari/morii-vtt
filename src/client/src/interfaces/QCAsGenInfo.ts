import type { Feature } from "./Character";
import type IDNameInterface from "./IDNameInterface";

export interface QCAsGenInfo {
    baseArray: number[], 
    customAssignPrio: IDNameInterface[], 
    customField: string,
    asiInfo: string,
    feats: Partial<Feature>[],
}