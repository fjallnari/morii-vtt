interface SimpleFeature {
    name: string,
    content: string
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
    skill_prof: [],
    tools_prof: [],
    other_prof: []
}