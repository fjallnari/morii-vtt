import type ClassData from "./ClassData";
import type RaceData from "./RaceData";

export default interface QuickCreateData {
    races: RaceData[],
    classes: ClassData[]
}