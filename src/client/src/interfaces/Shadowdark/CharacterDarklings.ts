interface CharacterDarklingsBonus {
    sourceType: string,
    sourceName: string,
    sourceCategory: string,
    gainedAtLevel: number,
    name: string,
    bonusTo: string,
    bonusName: string,
    bonusAmount: number,
}

interface CharacterDarklingsItem {
    instanceId: string,
    gearId: string,
    name: string,
    type: string,
    quantity: number,
    totalUnits: number,
    slots: number,
    cost: number,
    currency: string
}

export interface CharacterDarklings {
    name: string,
    stats: Record<string, number>,
    ancestry: string,
    class: string,
    level: number,
    title: string,
    alignment: string,
    background: string,
    deity: string,
    maxHitPoints: number,
    armorClass: number,
    gearSlotsTotal: number,
    gearSlotsUsed: number,
    bonuses: CharacterDarklingsBonus[],
    goldRolled: number,
    gold: number,
    silver: number,
    copper: number,
    gear: CharacterDarklingsItem[],
    spellsKnown: string,
    languages: string
}