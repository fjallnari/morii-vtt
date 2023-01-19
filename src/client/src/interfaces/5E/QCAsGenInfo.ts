import type IDNameInterface from "../IDNameInterface";
import type { Feature } from "./Character5E";


export interface QCAsGenInfo {
    baseArray: number[], 
    customAssignPrio: IDNameInterface[], 
    customField: string,
    asiInfo: string,
    feats: Partial<Feature>[],
}