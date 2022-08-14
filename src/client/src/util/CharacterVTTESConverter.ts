import type { Attack, Feature, Item, OtherProf, Spell, Tool } from "../interfaces/Character";
import type { AttributeVTTES, CharacterVTTES } from "../interfaces/CharacterVTTES";
import { nanoid } from 'nanoid/non-secure';

/**
 * I mean, it ain't pretty, but it kinda works.
 * Its complexity is awful, and I should probably refactor it at some point.
 * but tbh, I don't want to spend any more time with roll20's/VVTTES .json format
 */
export class CharacterVTTESConverter {
    characterName: string;
    attributes: AttributeVTTES[];

    constructor(characterVTTES: CharacterVTTES) {
        this.characterName = characterVTTES.character.name;
        this.attributes = characterVTTES.character.attribs;
    }

    private getAttribute(regex: RegExp, wantMax: boolean = false) {
        const attribute = this.attributes.find(attribute => regex.test(attribute.name));
        return (wantMax ? attribute?.max : attribute?.current) ?? '';
    }

    private getSkillProf(skill: string | number) {
        return /\[Proficiency\]/.test(skill.toString()) ? 1 : 0;
    }

    private getSpellcastingAbility() {
        const spellAbilityCurrent = this.getAttribute(/^spellcasting_ability$/).toString();
        return spellAbilityCurrent === '' || spellAbilityCurrent === '0*' ? '' : spellAbilityCurrent.match(/^@{(.*)_mod}\+$/)[1].slice(0, 3).toUpperCase();
    }

    private getTools() {
        const toolArray = this.attributes.filter(attribute => attribute.name.match(/^repeating_tool_/));
        let toolMap: Record<string, Tool> = {};

        toolArray.forEach( toolShard => {
            const toolNameArr = toolShard.name.match(/^repeating_tool_(.[^_]*)_(.*)$/); // 1 ~= id, 2 ~= tool tag

            if(!toolMap[toolNameArr[1]]) {
                toolMap[toolNameArr[1]] = {
                    id: nanoid(16),
                    name: '',
                    ability: '',
                    proficiency: 1
                }
            }

            switch (toolNameArr[2]) {
                case 'toolname' :
                    toolMap[toolNameArr[1]].name = toolShard.current.toString();
                    break;
                case 'toolattr':
                    toolMap[toolNameArr[1]].ability = toolShard.current.toString().slice(0, 3);
                    break;
                case 'toolbonus_base':
                    toolMap[toolNameArr[1]].proficiency = toolShard.current.toString() === '(@{pb}*2)' ? 2 : 0;
            }
        });

        return Object.values(toolMap) ?? [];
    }

    public getOtherProficiencies() {
        const profArray = this.attributes.filter(attribute => attribute.name.match(/^repeating_proficiencies_/));
        let profMap: Record<string, OtherProf> = {};

        profArray.forEach( profShard => {
            const profNameArr = profShard.name.match(/^repeating_proficiencies_(.[^_]*)_(.*)$/); // 1 ~= id, 2 ~= prof tag

            if(!profMap[profNameArr[1]]) {
                profMap[profNameArr[1]] = {
                    id: nanoid(16),
                    name: '',
                    type: 3,
                    content: ''
                }
            }

            switch (profNameArr[2]) {
                case 'name' :
                    profMap[profNameArr[1]].name = profShard.current.toString();
                    break;
                case 'prof_type':
                    profMap[profNameArr[1]].type = ['OTHER', 'ARMOR', 'WEAPON'].indexOf(profShard.current.toString());
                    break;
            }
        });

        return Object.values(profMap) ?? [];
    }

    public getInventoryItems() {
        const itemArray = this.attributes.filter(attribute => attribute.name.match(/^repeating_inventory_/));
        let itemMap: Record<string, Item> = {};

        itemArray.forEach( itemShard => {
            const itemNameArr = itemShard.name.match(/^repeating_inventory_(.[^_]*)_(.*)$/); // 1 ~= id, 2 ~= prof tag

            if(!itemMap[itemNameArr[1]]) {
                itemMap[itemNameArr[1]] = {
                    id: nanoid(16),
                    name: '',
                    is_equipped: true,
                    amount: '1',
                    has_weight: false,
                    has_attack: false,
                    want_tooltip: false,
                    use_as_resource: false
                }
            }

            switch (itemNameArr[2]) {
                case 'itemname' :
                    itemMap[itemNameArr[1]].name = itemShard.current.toString();
                    break;
                case 'equipped':
                    itemMap[itemNameArr[1]].is_equipped = itemShard.current !== "0";
                    break;
                case 'itemcount':
                    itemMap[itemNameArr[1]].amount = itemShard.current.toString();
                    break;
                case 'itemweight':
                    itemMap[itemNameArr[1]].has_weight = true;
                    itemMap[itemNameArr[1]].weight = itemShard.current.toString();
                    break;
                case 'itemmodifiers':
                    itemMap[itemNameArr[1]].tooltip = itemShard.current.toString();
                    break;
            }
        });

        return Object.values(itemMap) ?? [];
    }

    public getFeatures() {
        const featureArray = this.attributes.filter(attribute => attribute.name.match(/^repeating_traits_/));
        let featureMap: Record<string, Feature> = {};

        featureArray.forEach( itemShard => {
            const featureNameArr = itemShard.name.match(/^repeating_traits_(.[^_]*)_(.*)$/); // 1 ~= id, 2 ~= prof tag

            if(!featureMap[featureNameArr[1]]) {
                featureMap[featureNameArr[1]] = {
                    id: nanoid(16),
                    name: '',
                    type: 0,
                    source_name: '',
                    content: ''
                }
            }

            switch (featureNameArr[2]) {
                case 'name':
                    featureMap[featureNameArr[1]].name = itemShard.current.toString();
                    break;
                case 'description':
                    featureMap[featureNameArr[1]].content = itemShard.current.toString();
                    break;
                case 'source':
                    featureMap[featureNameArr[1]].type = ['Racial', 'Class', 'Feat', 'Background', 'Other'].indexOf(itemShard.current.toString());
                    break;
                case 'source_type':
                    featureMap[featureNameArr[1]].source_name = itemShard.current.toString();
                    break;
            }
        });

        return Object.values(featureMap) ?? [];
    }

    public getAttacks() {
        const attackArray = this.attributes.filter(attribute => attribute.name.match(/^repeating_attack_/));
        let attackMap: Record<string, Attack> = {};

        attackArray.forEach( attackShard => {
            const attackNameArr = attackShard.name.match(/^repeating_attack_(.[^_]*)_(.*)$/); // 1 ~= id, 2 ~= prof tag

            if(!attackMap[attackNameArr[1]]) {
                attackMap[attackNameArr[1]] = {
                    id: nanoid(16),
                    name: '',
                    atk_ability: 'STR', // e.g. STR
                    atk_bonus: '',
                    atk_proficiency: true,
                    range: '',
                    dmg_die: '', // e.g. 1d6
                    dmg_ability: 'STR', // e.g. STR
                    dmg_bonus: '',
                    dmg_type: '', // e.g. Slashing
                    versatile_die: '',
                    versatile_active: false,
                }
            }

            switch (attackNameArr[2]) {
                case 'atkname':
                    attackMap[attackNameArr[1]].name = attackShard.current.toString();
                    break;
                case 'atkattr_base':
                    attackMap[attackNameArr[1]].atk_ability = attackShard.current.toString().slice(2, 5).toUpperCase() ?? '';
                    break;
                case 'atkmod':
                    attackMap[attackNameArr[1]].atk_bonus = attackShard.current.toString();
                    break;
                case 'atkprofflag':
                    attackMap[attackNameArr[1]].atk_proficiency = attackShard.current.toString() === "(@{pb})";
                    break;
                case 'atkrange':
                    attackMap[attackNameArr[1]].range = attackShard.current.toString();
                    break;
                case 'dmgbase':
                    attackMap[attackNameArr[1]].dmg_die = attackShard.current.toString();
                    break;
                case 'dmgattr':
                    attackMap[attackNameArr[1]].dmg_ability = attackShard.current.toString().slice(2, 5).toUpperCase();
                    break;
                case 'dmgtype':
                    attackMap[attackNameArr[1]].dmg_type = attackShard.current.toString();
                    break;
                case 'dmgmod':
                    attackMap[attackNameArr[1]].dmg_bonus = attackShard.current.toString();
                    break;
            }
        });
        return Object.values(attackMap) ?? [];
    }

    public getSpells() {
        let spellSkeleton =  {
            0: { // ~= cantrips
                slots_total: '',
                slots_current: '',
                spells: []
            },
            1: {
                slots_total: '',
                slots_current: '',
                spells: []
            },
            2: {
                slots_total: '',
                slots_current: '',
                spells: []
            },
            3: {
                slots_total: '',
                slots_current: '',
                spells: []
            },
            4: {
                slots_total: '',
                slots_current: '',
                spells: []
            },
            5: {
                slots_total: '',
                slots_current: '',
                spells: []
            },
            6: {
                slots_total: '',
                slots_current: '',
                spells: []
            },
            7: {
                slots_total: '',
                slots_current: '',
                spells: []
            },
            8: {
                slots_total: '',
                slots_current: '',
                spells: []
            },
            9: {
                slots_total: '',
                slots_current: '',
                spells: []
            },
        }

        for (let level of Object.keys(spellSkeleton)) {
            spellSkeleton[level].slots_total = this.attributes.find(attribute => attribute.name === (`lvl${level}_slots_total`))?.current.toString() ?? '';
            spellSkeleton[level].slots_current = this.attributes.find(attribute => attribute.name === (`lvl${level}_slots_expended`))?.current.toString() ?? '';
        }

        const spellArray = this.attributes.filter(attribute => attribute.name.match(/^repeating_spell-/));
        let spellMap: Record<string, Spell> = {};

        spellArray.forEach( spellShard => {
            const spellNameArr = spellShard.name.match(/^repeating_spell-(.[^_]*)_(.[^_]*)_(.*)$/); // 1 ~= spell level, 2 ~= id, 3 ~= prof tag

            if(!spellMap[spellNameArr[2]]) {
                spellMap[spellNameArr[2]] = {
                    id: nanoid(16),
                    name: '',
                    level: spellNameArr[1] === 'cantrip' ? 0 : ~~spellNameArr[1],
                    is_prepared: false,
                    casting_time: '',
                    ritual: false,
                    range: '',
                    school: '',
                    components: {
                        verbal: true,
                        somatic: true,
                        material: false,
                        materials_needed: ''
                    },
                    duration: '',
                    concentration: false,
                    description: '',
                    higher_levels: ''
                }
            }

            switch (spellNameArr[3]) {
                case 'spellname':
                    spellMap[spellNameArr[2]].name = spellShard.current.toString();
                    break;
                
                case 'spellprepared':
                    spellMap[spellNameArr[2]].is_prepared = spellShard.current.toString() === "1";
                    break;

                case 'spellcastingtime':
                    spellMap[spellNameArr[2]].casting_time = spellShard.current.toString();
                    break;

                case 'spellritual':
                    spellMap[spellNameArr[2]].ritual = spellShard.current.toString() === 'Yes'; // ...
                    break;

                case 'spellrange':
                    spellMap[spellNameArr[2]].range = spellShard.current.toString();
                    break;

                case 'spellschool':
                    spellMap[spellNameArr[2]].school = spellShard.current.toString();
                    break;

                case 'spellcomp_v':
                    spellMap[spellNameArr[2]].components.verbal = spellShard.current !== 0;
                    break;

                case 'spellcomp_s':
                    spellMap[spellNameArr[2]].components.somatic = spellShard.current !== 0;
                    break;

                case 'spellcomp_m':
                    spellMap[spellNameArr[2]].components.material = spellShard.current !== 0;
                    break;

                case 'spellcomp_materials':
                    spellMap[spellNameArr[2]].components.materials_needed = spellShard.current.toString();
                    break;

                case 'spellduration':
                    spellMap[spellNameArr[2]].duration = spellShard.current.toString();
                    break;

                case 'spellconcentration':
                    spellMap[spellNameArr[2]].concentration = spellShard.current.toString() === "{{concentration=1}}";
                    break;
                
                case 'spelldescription':
                    spellMap[spellNameArr[2]].description = spellShard.current.toString();
                    break;
                
                case 'spellathigherlevels':
                    spellMap[spellNameArr[2]].higher_levels = spellShard.current.toString();
                    break;
            }
        });

        for (let spell of Object.values(spellMap)) {
            spellSkeleton[spell.level].spells.push(spell);         
        }

        return spellSkeleton;
    }

    private getDeathSaves(type: string = 'succ') {
        return this.attributes.filter(attribute => attribute.name.match(new RegExp(`^deathsave_${type}[1-3]$`))).reduce((acc, attrib) => acc += attrib.current === 'on' ? 1 : 0, 0);
    }

    public constructCharacter() {

        const characterTemplate = {
            name: this.characterName,
            classes: `${this.getAttribute(/^class$/)} ${this.getAttribute(/^level$/)}`,
            xp: this.getAttribute(/^experience$/),
            subclass: this.getAttribute(/^subclass$/),
            race: this.getAttribute(/^race$/),
            background: this.getAttribute(/^background$/),
            prof_bonus: new Intl.NumberFormat("en-US", { signDisplay: 'always'}).format(~~this.getAttribute(/^pb$/)),
            inspiration: this.getAttribute(/^inspiration$/) !== "0",
            ability_scores: { 
                'STR': {
                    name: 'strength',
                    value: this.getAttribute(/^strength_base$/),
                    saving_throw: this.getAttribute(/^strength_save_prof$/) !== 0,
                    skills: [
                        {
                            name: 'athletics',
                            proficiency: this.getSkillProf(this.getAttribute(/^athletics_roll$/))
                        }
                    ]
                },
                'DEX': {
                    name: 'dexterity',
                    value: this.getAttribute(/^dexterity_base$/),
                    saving_throw: this.getAttribute(/^dexterity_save_prof$/) !== 0,
                    skills: [
                        {
                            name: 'acrobatics',
                            proficiency: this.getSkillProf(this.getAttribute(/^acrobatics_roll$/))
                        },
                        {
                            name: 'sleight of hand',
                            proficiency: this.getSkillProf(this.getAttribute(/^sleight_of_hand_roll$/))
                        },
                        {
                            name: 'stealth',
                            proficiency: this.getSkillProf(this.getAttribute(/^stealth_roll$/))
                        }
                    ]
                },
                'CON': {
                    name: 'constitution',
                    value: this.getAttribute(/^constitution_base$/),
                    saving_throw: this.getAttribute(/^constitution_save_prof$/) !== 0,
                    skills: [
                    ]
                },
                'INT': {
                    name: 'intelligence',
                    value: this.getAttribute(/^intelligence_base$/),
                    saving_throw: this.getAttribute(/^intelligence_save_prof$/) !== 0,
                    skills: [
                        {
                            name: 'arcana',
                            proficiency: this.getSkillProf(this.getAttribute(/^arcana_roll$/))
                        },
                        {
                            name: 'history',
                            proficiency: this.getSkillProf(this.getAttribute(/^history_roll$/))
                        },
                        {
                            name: 'investigation',
                            proficiency: this.getSkillProf(this.getAttribute(/^investigation_roll$/))
                        },
                        {
                            name: 'nature',
                            proficiency: this.getSkillProf(this.getAttribute(/^nature_roll$/))
                        },
                        {
                            name: 'religion',
                            proficiency: this.getSkillProf(this.getAttribute(/^religion_roll$/))
                        },
                    ]
                },
                'WIS': {
                    name: 'wisdom',
                    value: this.getAttribute(/^wisdom_base$/),
                    saving_throw: this.getAttribute(/^wisdom_save_prof$/) !== 0,
                    skills: [
                        {
                            name: 'animal handling',
                            proficiency: this.getSkillProf(this.getAttribute(/^animal_handling_roll$/))
                        },
                        {
                            name: 'insight',
                            proficiency: this.getSkillProf(this.getAttribute(/^insight_roll$/))
                        },
                        {
                            name: 'medicine',
                            proficiency: this.getSkillProf(this.getAttribute(/^medicine_roll$/))
                        },
                        {
                            name: 'perception',
                            proficiency: this.getSkillProf(this.getAttribute(/^perception_roll$/))
                        },
                        {
                            name: 'survival',
                            proficiency: this.getSkillProf(this.getAttribute(/^survival_roll$/))
                        },
                    ]
                },
                'CHA': {
                    name: 'charisma',
                    value: this.getAttribute(/^charisma_base$/),
                    saving_throw: this.getAttribute(/^charisma_save_prof$/) !== 0,
                    skills: [
                        {
                            name: 'deception',
                            proficiency: this.getSkillProf(this.getAttribute(/^deception_roll$/))
                        },
                        {
                            name: 'intimidation',
                            proficiency: this.getSkillProf(this.getAttribute(/^intimidation_roll$/))
                        },
                        {
                            name: 'performance',
                            proficiency: this.getSkillProf(this.getAttribute(/^performance_roll$/))
                        },
                        {
                            name: 'persuasion',
                            proficiency: this.getSkillProf(this.getAttribute(/^persuasion_roll$/))
                        },
                    ]
                },
            },
            armor_class: this.getAttribute(/^ac$/),
            speed_max: this.getAttribute(/^speed$/),
            hp_max: this.getAttribute(/^hp$/, true),
            hp_current: this.getAttribute(/^hp$/),
            hp_temp: this.getAttribute(/^hp_temp$/),
            death_save_success: this.getDeathSaves(),
            death_save_failure: this.getDeathSaves('fail'),
            hd_total: `${this.getAttribute(/^level$/)}d${this.getAttribute(/^hitdietype$/)}`,
            attacks: this.getAttacks(),
            coins: {
                cp: this.getAttribute(/^cp$/),
                sp: this.getAttribute(/^sp$/),
                gp: this.getAttribute(/^gp$/),
                pp: this.getAttribute(/^pp$/)
            },

            inventory: this.getInventoryItems(),
            other_profs: this.getOtherProficiencies(),
            tools: this.getTools(),
            features: this.getFeatures(),

            // bio tab
            age: this.getAttribute(/^age$/),
            height: this.getAttribute(/^height$/),
            weight: this.getAttribute(/^weight$/),
            eyes: this.getAttribute(/^eyes$/),
            skin: this.getAttribute(/^skin$/),
            hair: this.getAttribute(/^hair$/),    
            alignment: this.getAttribute(/^alignment$/),
            appearance: this.getAttribute(/^character_appearance$/),
            backstory: this.getAttribute(/^character_backstory$/),
            person_traits: this.getAttribute(/^personality_traits$/),
            ideals: this.getAttribute(/^ideals$/),
            bonds: this.getAttribute(/^bonds$/),
            flaws: this.getAttribute(/^flaws$/),
            treasure: this.getAttribute(/^treasure$/),
            allies: this.getAttribute(/^allies_and_organizations$/),
            other_notes: this.getAttribute(/^additional_feature_and_traits$/),
            
            // spells
            spell_ability: this.getSpellcastingAbility(),
            spells_by_level: this.getSpells()
        }

        return characterTemplate;
    }

}