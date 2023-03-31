import { nanoid } from "nanoid/non-secure";
import type GameData from "../interfaces/GameData";
import type { AttackShadowdark } from "../interfaces/Shadowdark/AttackShadowdark";
import type { CharacterDarklings } from "../interfaces/Shadowdark/CharacterDarklings";
import type { CharacterShadowdark } from "../interfaces/Shadowdark/CharacterShadowdark";
import type ItemShadowdark from "../interfaces/Shadowdark/ItemShadowdark";
import type ProfShadowdark from "../interfaces/Shadowdark/ProfShadowdark";
import type { SpellShadowdark } from "../interfaces/Shadowdark/SpellShadowdark";

export class CharacterDarklingsConverter {
    character: CharacterDarklings;
    gameData: GameData;

    constructor(characterDarklings: CharacterDarklings, gameData: GameData) {
        this.character = characterDarklings;
        this.gameData = gameData;
    }

    public constructCharacter() {
        const languages: ProfShadowdark[] = this.character.languages.split(',').map(lang => {
            return {
                id: nanoid(16),
                name: lang.trim(),
                type: 3,
                content: ''
            }
        });

        const convertedGear: ItemShadowdark[] = this.character.gear.map(item => {
            return {
                id: nanoid(16),
                name: item.name,
                type: item.type === "sundry" ? (item.totalUnits > 1 ? "resource": "item") : item.type,

                weight: item.slots.toString(),
                charges: item.totalUnits.toString(),
                charges_max: item.totalUnits.toString(),
                description: ""
            }
        });

        const convertedSpells: SpellShadowdark[] = this.character.spellsKnown.split(',').map(spell => {
            return this.gameData.shadowdark.spells.find(s => s.name === spell.trim());
        }).filter(s => s);

        const convertedAttacks: AttackShadowdark[] = this.character.gear.filter(item => item.type === "weapon").map(item => {
            const weapon = this.gameData.shadowdark.weapons.find(a => a.name === item.name);
            
            return weapon ? { id: nanoid(16), ... weapon } : null;
        }).filter(a => a);

        return {
            name: this.character.name,
            background: this.character.background,
            title: this.character.title,
            alignment: this.character.alignment,
            deity: this.character.deity,
            luck: false,
            death_timer: "",
        
            ancestry: this.character.ancestry,
            class: this.character.class,
            level: this.character.level.toString(),
            xp: "",
        
            ac: this.character.armorClass.toString(),
            hp: this.character.maxHitPoints.toString(),
            hp_max: this.character.maxHitPoints.toString(),
            coins: {
                gp: this.character.gold.toString(),
                sp: this.character.silver.toString(),
                cp: this.character.copper.toString(),
            },
            filled_slots: this.character.gearSlotsUsed.toString(),
            total_slots: this.character.gearSlotsTotal.toString(),

            // TODO: Convert bonuses to proficiencies, attacks, gear, and talents
            proficiencies: [].concat(languages), // need to add class proficiencies lookup
            attacks: convertedAttacks,
            gear: convertedGear,
            talents: [], // filter only talents
        
            spells: convertedSpells,
            spell_ability: { "Wizard": "INT", "Priest": "WIS" }[this.character.class] ?? "",
            spells_known: [ [], [], [], [], [], [], [], [], [], [] ], // TODO: Add spells known
            ability_scores: { 
                'STR': {
                    value: this.character.stats.STR.toString(),
                },
                'DEX': {
                    value: this.character.stats.DEX.toString(),
                },
                'CON': {
                    value: this.character.stats.CON.toString(),
                },
                'INT': {
                    value: this.character.stats.INT.toString(),
                },
                'WIS': {
                    value: this.character.stats.WIS.toString(),
                },
                'CHA': {
                    value: this.character.stats.CHA.toString(),
                },
            },
            notes: '',
            shinies: '',
            foes: '',
            allies: ''
        } as Omit<CharacterShadowdark, '_id' | 'playerID' | 'system'>;
    }
}