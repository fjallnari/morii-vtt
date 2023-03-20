import { SKELETON_5E } from "./SKELETON_5E";
import { SKELETON_CAIRN } from "./SKELETON_CAIRN";
import { SKELETON_SD } from "./SKELETON_SD";

const CHARACTER_SKELETONS: Record<string, object> = {
    "D&D 5E": SKELETON_5E,
    "Cairn": SKELETON_CAIRN,
    "Shadowdark": SKELETON_SD
}

export default CHARACTER_SKELETONS;