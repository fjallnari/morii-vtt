import { nanoid } from "nanoid/non-secure";
import type GameData from "../interfaces/GameData";
import type { AttackShadowdark } from "../interfaces/Shadowdark/AttackShadowdark";
import type { CharacterDarklings, CharacterDarklingsBonus } from "../interfaces/Shadowdark/CharacterDarklings";
import type { CharacterShadowdark } from "../interfaces/Shadowdark/CharacterShadowdark";
import type ItemShadowdark from "../interfaces/Shadowdark/ItemShadowdark";
import type ProfShadowdark from "../interfaces/Shadowdark/ProfShadowdark";
import type { SpellShadowdark } from "../interfaces/Shadowdark/SpellShadowdark";
import type TalentShadowdark from "../interfaces/Shadowdark/TalentShadowdark";

export class CharacterDarklingsConverter {
    character: CharacterDarklings;
    gameData: GameData;

    constructor(characterDarklings: CharacterDarklings, gameData: GameData) {
        this.character = characterDarklings;
        this.gameData = gameData;
    }

    private prettifyTalent(bonus: CharacterDarklingsBonus) {
        const talentLookup = {
            "WeaponMastery": {
                name: `Weapon Mastery: ${bonus.bonusTo}`,
                content: `You gain +1 to attack and damage with ${bonus.bonusTo}. In addition, add half your level to these rolls (round down).`
            },
            "ArmorMastery": {
                name: `Armor Mastery: ${bonus.bonusTo}`,
                content: `You get +1 AC from ${bonus.bonusTo}.`
            },
            "Grit": {
                name: `Grit: ADV on ${bonus.bonusName === "Strength" ? "STR": "DEX"} checks`,
                content: `You have advantage on ${bonus.bonusName} checks to overcome an opposing force, such as kicking open a stuck door (Strength) or slipping free of rusty chains (Dexterity).`
            },
            "BackstabIncrease": {
                name: "Backstab Increase",
                content: "Your Backstab deals +1 dice of damage."
            },
            // the PlusTwoInt part was filtered beforehand
            "PlusTwoIntOrPlusOneWizCasting": {
                name: "+1 to spellcasting checks",
                content: `${bonus.bonusTo}`
            },
            "Plus1ToCastingSpells": {
                name: "+1 to spellcasting checks",
                content: `${bonus.bonusTo}`
            },
            "AdvOnCastOneSpell": {
                name: `ADV: ${bonus.bonusName}`,
                content: ""
            },
            "FarSight": {
                name: "Farsight",
                content: `${bonus.bonusName} - ${bonus.bonusTo}`
            },
            "Plus1ToHit": {
                name: bonus.bonusTo,
                content: `${bonus.bonusName} - ${bonus.bonusTo}`
            }
        }

        return talentLookup[bonus.name] ?? { name: bonus.name, content: `${bonus.bonusName} - ${bonus.bonusTo}`};
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

        // Priest specific
        const holySymbol: ItemShadowdark[] = this.character.class === "Priest" ? [{
            id: nanoid(16), 
            name: `Holy symbol of ${this.character.deity}`, 
            type: "item", 
            weight: "0",
        }] : [];

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
            const convertedSpell =  this.gameData.shadowdark.spells.find(s => s.name === spell.trim());
            return convertedSpell ? { id: nanoid(16), ...convertedSpell } : null;
        }).filter(s => s);

        const convertedAttacks: AttackShadowdark[] = this.character.gear.filter(item => item.type === "weapon").map(item => {
            const weapon = this.gameData.shadowdark.weapons.find(a => a.name === item.name);
            
            return weapon ? { id: nanoid(16), ... weapon } : null;
        }).filter(a => a);

        const classProficiencies: ProfShadowdark[] = this.gameData.shadowdark.classInfo[this.character.class]?.proficiencies.map(prof => {
            return { id: nanoid(16), ...prof };
        }) ?? [];

        const defaultClassTalents = this.gameData.shadowdark.classInfo[this.character.class]?.talents.map(talent => {
            return { id: nanoid(16), type: 2, ...talent }
        }) ?? [];

        const convertedTalents: TalentShadowdark[] = this.character.bonuses.filter(bonus => {
            return !bonus.name.includes("ExtraLanguage") && !bonus.name.includes("Spell:") && bonus.name !== "StatBonus" && bonus.bonusName !== "StatBonus";
        }).map(bonus => {
            return {
                id: nanoid(16),
                type: bonus.sourceType === "Ancestry" ? 1 : 2,
                ... this.prettifyTalent(bonus)
            }
        });

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

            proficiencies: [].concat(classProficiencies).concat(languages),
            attacks: convertedAttacks,
            gear: [].concat(holySymbol).concat(convertedGear),
            talents: [].concat(defaultClassTalents).concat(convertedTalents),
        
            spells: convertedSpells,
            spell_ability: { "Wizard": "INT", "Priest": "WIS" }[this.character.class] ?? "",
            spells_known: this.gameData.shadowdark.classInfo[this.character.class]?.spellsKnown ?? [ [], [], [], [], [], [], [], [], [], [] ],
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