import { OTHER_PROF } from "../../enum/OTHER_PROF"

interface ClassSkills {
    final: string[],
    choose_n: number, // 0 is reserved for custom class, so you can pick skills the way you want to
    type: 'any' | 'list',
    choose_list?: string[]
}

interface ClassOtherProf {
    type: OTHER_PROF.ARMOR | OTHER_PROF.WEAPON,
    name: string
}

interface ClassToolProf {

}

interface ClassFeatures {

}

export default interface ClassData {
    name: string,
    level: number,
    hit_dice: number, // e.g. '12', {level}d12
    tool_prof: ClassToolProf[],
    other_prof: ClassOtherProf[],
    saving_throws: string[], // e.g. ['STR', 'CON']
    skills: ClassSkills,
    features: ClassFeatures[]
}