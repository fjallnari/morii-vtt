import { OTHER_PROF } from "../../enum/OTHER_PROF";
import { Spell } from "../Character";

type LevelsRecord = Record<number, string>;

interface ClassHitPoints {
    hit_die: number, // e.g. '12', {level}d12
    current?: string,
}

interface ClassToolProf {
    label: string,
    tools: ClassTool[]
}

interface ClassTool {
    name: string,
    placeholder?: string,
    choose_list?: string[]
}

interface ClassOtherProf {
    type: OTHER_PROF.ARMOR | OTHER_PROF.WEAPON,
    name: string
}

interface ClassSkills {
    final: string[],
    choose_n: number, // 0 is reserved for custom class, so you can pick skills the way you want to
    type: 'any' | 'list',
    options?: string[]
}

interface EquipmentItem {
    name: string,
    amount: number,
    tags: string[], // weapon, resource
    description?: string,
    placeholder?: string,
    options?: string[]
}

interface EquipmentSingleLine {
    final: EquipmentItem[],
    line_options?: EquipmentItem[][]    
}

type ClassEquipment = EquipmentSingleLine[];

interface ClassFeature {
    name: string,
    level?: number, // level on which the feature first appears
    content: string,
}

interface ClassResource {
    name: string,
    total: string,
    current: string,
    type: 'simple' | 'complex',
    levels?: LevelsRecord // total per level
}

interface ClassSpellsByLevel {
    slots_total: string,
    slots_current: string,
    spells: Partial<Spell>[]
}

type SpellsKnown = Record<number, number>;

interface UniqueSpellcastingInfo {
    label: string,
    type: 'simple' | 'select-features',
    levels?: LevelsRecord,
    content?: string,
    final?: ClassFeature[],
    options?: ClassFeature[]    
}

interface ClassSpellcasting {
    casting_info: string,
    ability: string,
    ability_info: string,
    ritual_casting?: string,
    focus: string,
    cantrips_known?: SpellsKnown,
    spells_known?: SpellsKnown,
    spell_slots: string[][] // [{1: 2}, {1:3}, {1:4, 2:2}], index ~= classLevel, key ~= spell slot level, value ~= amount of spell slots
    spells_by_level: Record<number, ClassSpellsByLevel>,
    unique_info?: UniqueSpellcastingInfo
}

export default interface ClassData {
    name: string,
    level: number,
    hp: ClassHitPoints,
    tool_prof: ClassToolProf,
    other_prof: ClassOtherProf[],
    saving_throws: string[], // e.g. ['STR', 'CON']
    skills: ClassSkills,
    equipment: ClassEquipment,
    features: ClassFeature[],
    asi: LevelsRecord,
    resources: ClassResource[],
    spellcasting?: ClassSpellcasting
}