import { BACKGROUNDS } from "./BACKGROUNDS";
import { GEAR } from "./GEAR";
import { NAMES_FEMALE, NAMES_MALE, SURNAMES } from "./NAMES_CAIRN";
import { PRINCIPLES } from "./PRINCIPLES";
import { RULES_SUMMARY } from "./RULES_SUMMARY";
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
    traits: TRAITS,
    rules_basic: RULES_SUMMARY[0],
    rules_combat: RULES_SUMMARY[1]
}