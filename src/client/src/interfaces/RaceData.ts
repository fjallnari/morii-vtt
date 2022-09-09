interface SimpleFeature {
    name: string,
    content: string,
    source?: string
}

interface SimpleOtherProf {
    name: string,
    type: number,
}

interface SimpleTool {
    name: string,
    options?: string[]
}

export default interface RaceData {
    name: string,
    as_increase: Record<string, string>
    age: string,
    age_info: string,
    alignment: string,
    alignment_info: string,
    size: string,
    size_info: string,
    speed: string,
    speed_info: string,
    languages: string[],
    features: SimpleFeature[],
    skill_prof: string[],
    tools_prof: SimpleTool[],
    other_prof: SimpleOtherProf[]
}