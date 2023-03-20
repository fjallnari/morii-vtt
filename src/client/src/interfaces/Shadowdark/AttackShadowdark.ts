export interface AttackShadowdark {
    id: string,
    name: string,
    type: number
    stat: string, // e.g. STR
    atk_bonus: string,
    range: string,
    damage: string, // e.g. 1d6
    versatile_die?: string,
    versatile_active?: boolean,
    item_id?: string,
    properties: string,
}