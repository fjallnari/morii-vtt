interface SRDTool {
    name: string,
    cost: string,
    weight: string
}

export const TOOLS: Record<string, SRDTool[]> = {
    'ARTISAN': [
        {
            name: 'Alchemist’s supplies',
            cost: '50 gp',
            weight: '8'
        },
        {
            name: 'Brewer’s	supplies',
            cost: '20 gp',
            weight: '9'
        },
        {
            name: 'Calligrapher’s supplies',
            cost: '10 gp',
            weight: '5'
        },
        {
            name: 'Carpenter’s tools',
            cost: '8 gp',
            weight: '6'
        },
        {
            name: 'Cartographer’s tools',
            cost: '15 gp',
            weight: '6'
        },
        {
            name: 'Cobbler’s tools',
            cost: '5 gp',
            weight: '5'
        },
        {
            name: 'Cook’s utensils',
            cost: '1 gp',
            weight: '8'
        },
        {
            name: 'Glassblower’s tools',
            cost: '30 gp',
            weight: '5'
        },
        {
            name: 'Jeweler’s tools',
            cost: '25 gp',
            weight: '2'
        },
        {
            name: 'Leatherworker’s tools',
            cost: '5 gp',
            weight: '5'
        },
        {
            name: 'Mason’s tools',
            cost: '10 gp',
            weight: '8'
        },
        {
            name: 'Painter’s supplies',
            cost: '10 gp',
            weight: '5'
        },
        {
            name: 'Potter’s tools',
            cost: '10 gp',
            weight: '3'
        },
        {
            name: 'Smith’s tools',
            cost: '20 gp',
            weight: '8'
        },
        {
            name: 'Tinker’s tools',
            cost: '50 gp',
            weight: '10'
        },
        {
            name: 'Weaver’s tools',
            cost: '1 gp',
            weight: '5'
        },
        {
            name: 'Woodcarver’s tools',
            cost: '1 gp',
            weight: '5'
        },
        {
            name: 'Disguise kit',
            cost: '25 gp',
            weight: '3'
        },
        {
            name: 'Forgery kit',
            cost: '15 gp',
            weight: '5'
        },
    ],
    'MUSIC': [
        {
            name: 'Bagpipes',
            cost: '30 gp',
            weight: '6'
        },
        {
            name: 'Drum',
            cost: '6 gp',
            weight: '3'
        },
        {
            name: 'Dulcimer',
            cost: '25 gp',
            weight: '10'
        },
        {
            name: 'Flute',
            cost: '2 gp',
            weight: '1'
        },
        {
            name: 'Lute',
            cost: '35 gp',
            weight: '2'
        },
        {
            name: 'Lyre',
            cost: '30 gp',
            weight: '2'
        },
        {
            name: 'Horn',
            cost: '3 gp',
            weight: '2'
        },
        {
            name: 'Pan flute',
            cost: '12 gp',
            weight: '2'
        },
        {
            name: 'Shawm',
            cost: '2 gp',
            weight: '1'
        },
        {
            name: 'Viol',
            cost: '30 gp',
            weight: '1'
        },
    ],
    'OTHER': [

    ]
}