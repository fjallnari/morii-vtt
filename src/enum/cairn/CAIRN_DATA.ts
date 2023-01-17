import { BACKGROUNDS } from "./BACKGROUNDS";
import { GEAR } from "./GEAR";
import { NAMES_FEMALE, NAMES_MALE, SURNAMES } from "./NAMES_CAIRN";
import { SCARS } from "./SCARS";
import { SPELLBOOKS } from "./SPELLBOOKS";
import { TOOLS } from "./TOOLS";
import { TRAITS } from "./TRAITS";
import { TRINKETS } from "./TRINKETS";

export const CAIRN_DATA = {
    gear: GEAR,
    tools: TOOLS,
    trinkets: TRINKETS,
    spellbooks: SPELLBOOKS,
    backgrounds: BACKGROUNDS,
    scars: SCARS,
    names: {
        male: NAMES_MALE,
        female: NAMES_FEMALE,
        surnames: SURNAMES
    },
    traits: TRAITS
}