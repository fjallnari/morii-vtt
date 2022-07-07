export interface AttributeVTTES {
    name: string,
    current: string | number,
    max: string | number,
    id: string
}

export interface CharacterVTTES {
    schema_version: number,
    type: string,
    character: {
        oldId: string,
        name: string,
        avatar: string,
        bio: string,
        gmnotes: string,
        defaulttoken: string,
        tags: string,
        controlledby: string,
        inplayerjournals: string,
        attribs: AttributeVTTES[],
        abilities: any[]
    },
}