
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
    choose_list?: string[]
}

interface ClassFeatures {

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

export default interface ClassData {
    name: string,
    level: number,
    hp: ClassHitPoints,
    tool_prof: ClassToolProf,
    other_prof: ClassOtherProf[],
    saving_throws: string[], // e.g. ['STR', 'CON']
    skills: ClassSkills,
    features: ClassFeatures[],
    equipment: ClassEquipment
}