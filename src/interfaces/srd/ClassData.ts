import { OTHER_PROF } from "../../enum/OTHER_PROF";


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
    level: number, // level on which the feature first appears
    content: string,
    variants?: Record<number, Partial<ClassFeature>> // level ~ variant
}

interface ClassResource {
    name: string,
    total: string,
    current: string,
    type: 'simple' | 'complex',
    levels?: Record<number, string> // total per level
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
    resources: ClassResource[]
}