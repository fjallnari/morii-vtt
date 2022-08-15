import type { Spell } from "./Character"

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
    type: 1 | 2, // ARMOR | WEAPON
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
    level: number, // level on which the feature first appears
    content: string,
    variants?: Record<number, Partial<ClassFeature>> // level ~ variant
}

export interface ClassResource {
    name: string,
    type: 'simple' | 'complex',
    total: string,
    current: string,
    levels?: Record<number, string>
}

interface ClassSpellsByLevel {
    slots_total: string,
    slots_current: string,
    spells: Partial<Spell>[]
}

type SpellsKnown = Record<number, number>;

interface UniqueSpellcastingInfo {
    label: string,
    content: string
}

export interface ClassSpellcasting {
    casting_info: string,
    ability: string,
    ability_info: string,
    ritual_casting?: string,
    focus: string,
    cantrips_known?: SpellsKnown,
    spells_known?: SpellsKnown,
    spell_slots: string[][]
    spells_by_level: Record<number, ClassSpellsByLevel>,
    unique_info?: UniqueSpellcastingInfo
    isCustom?: boolean,
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
    resources: ClassResource[],
    spellcasting?: ClassSpellcasting
}