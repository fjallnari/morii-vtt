import { Attack } from "../../interfaces/Character";

export const WEAPON_STATS: Record<string, Partial<Attack>> = {
    'Club': {
        atk_ability: 'STR', // e.g. STR
        range: '',
        dmg_die: '1d4', // e.g. 1d6
        dmg_ability: 'STR', // e.g. STR
        dmg_type: 'Bludgeoning', // e.g. Slashing
        versatile_die: '',
        weapon_type: 'Simple weapons'
    },
    'Dagger': {
        atk_ability: 'DEX',
        range: '20/60',
        dmg_die: '1d4', 
        dmg_ability: 'DEX', 
        dmg_type: 'Piercing', 
        versatile_die: '',
        weapon_type: 'Simple weapons'
    },
    'Greatclub': {
        atk_ability: 'STR',
        range: '',
        dmg_die: '1d8',
        dmg_ability: 'STR',
        dmg_type: 'Bludgeoning',
        versatile_die: '',
        weapon_type: 'Simple weapons'
    },
    'Handaxe': {
        atk_ability: 'STR', 
        range: '20/60',
        dmg_die: '1d6', 
        dmg_ability: 'STR', 
        dmg_type: 'Slashing', 
        versatile_die: '',
        weapon_type: 'Simple weapons'
    },
    'Javelin': {
        atk_ability: 'STR', 
        range: '30/120',
        dmg_die: '1d6', 
        dmg_ability: 'STR', 
        dmg_type: 'Piercing',
        versatile_die: '',
        weapon_type: 'Simple weapons'
    },
    'Light hammer': {
        atk_ability: 'STR', 
        range: '20/60',
        dmg_die: '1d4', 
        dmg_ability: 'STR', 
        dmg_type: 'Bludgeoning',
        versatile_die: '',
        weapon_type: 'Simple weapons'
    },
    'Mace': {
        atk_ability: 'STR', 
        range: '',
        dmg_die: '1d6', 
        dmg_ability: 'STR', 
        dmg_type: 'Bludgeoning',
        versatile_die: '',
        weapon_type: 'Simple weapons'
    },
    'Quarterstaff': {
        atk_ability: 'STR', 
        range: '',
        dmg_die: '1d6', 
        dmg_ability: 'STR', 
        dmg_type: 'Bludgeoning',
        versatile_die: '1d8',
        weapon_type: 'Simple weapons'
    },
    'Sickle': {
        atk_ability: 'STR', 
        range: '',
        dmg_die: '1d4', 
        dmg_ability: 'STR', 
        dmg_type: 'Slashing',
        versatile_die: '',
        weapon_type: 'Simple weapons'
    },
    'Spear': {
        atk_ability: 'STR', 
        range: '20/60',
        dmg_die: '1d6', 
        dmg_ability: 'STR', 
        dmg_type: 'Piercing',
        versatile_die: '1d8',
        weapon_type: 'Simple weapons'
    },
    'Light crossbow': {
        atk_ability: 'DEX', 
        range: '80/320',
        dmg_die: '1d8', 
        dmg_ability: 'DEX', 
        dmg_type: 'Piercing',
        versatile_die: '',
        weapon_type: 'Simple weapons'
    },
    'Dart': {
        atk_ability: 'DEX', 
        range: '20/60',
        dmg_die: '1d4', 
        dmg_ability: 'DEX', 
        dmg_type: 'Piercing',
        versatile_die: '',
        weapon_type: 'Simple weapons'
    },
    'Shortbow': {
        atk_ability: 'DEX', 
        range: '80/320',
        dmg_die: '1d6', 
        dmg_ability: 'DEX', 
        dmg_type: 'Piercing',
        versatile_die: '',
        weapon_type: 'Simple weapons'
    },
    'Sling': {
        atk_ability: 'DEX', 
        range: '30/120',
        dmg_die: '1d4', 
        dmg_ability: 'DEX', 
        dmg_type: 'Bludgeoning',
        versatile_die: '',
        weapon_type: 'Simple weapons'
    },
    'Battleaxe': {
        atk_ability: 'STR', 
        range: '',
        dmg_die: '1d8', 
        dmg_ability: 'STR', 
        dmg_type: 'Slashing',
        versatile_die: '1d10',
        weapon_type: 'Martial weapons'
    },
    'Flail': {
        atk_ability: 'STR', 
        range: '',
        dmg_die: '1d8', 
        dmg_ability: 'STR', 
        dmg_type: 'Bludgeoning',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Glaive': {
        atk_ability: 'STR', 
        range: '',
        dmg_die: '1d10', 
        dmg_ability: 'STR', 
        dmg_type: 'Slashing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Greataxe': {
        atk_ability: 'STR', 
        range: '',
        dmg_die: '1d12', 
        dmg_ability: 'STR', 
        dmg_type: 'Slashing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Greatsword': {
        atk_ability: 'STR', 
        range: '',
        dmg_die: '2d6', 
        dmg_ability: 'STR', 
        dmg_type: 'Slashing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Halberd': {
        atk_ability: 'STR', 
        range: 'Reach',
        dmg_die: '1d10', 
        dmg_ability: 'STR', 
        dmg_type: 'Slashing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Lance': {
        atk_ability: 'STR', 
        range: 'Reach',
        dmg_die: '1d12', 
        dmg_ability: 'STR', 
        dmg_type: 'Piercing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Longsword': {
        atk_ability: 'STR', 
        range: '',
        dmg_die: '1d8', 
        dmg_ability: 'STR', 
        dmg_type: 'Slashing',
        versatile_die: '1d10',
        weapon_type: 'Martial weapons'
    },
    'Maul': {
        atk_ability: 'STR', 
        range: '',
        dmg_die: '2d6', 
        dmg_ability: 'STR', 
        dmg_type: 'Bludgeoning',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Morningstar': {
        atk_ability: 'STR', 
        range: '',
        dmg_die: '1d8', 
        dmg_ability: 'STR', 
        dmg_type: 'Piercing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Pike': {
        atk_ability: 'STR', 
        range: 'Reach',
        dmg_die: '1d10', 
        dmg_ability: 'STR', 
        dmg_type: 'Piercing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Rapier': {
        atk_ability: 'DEX', 
        range: '',
        dmg_die: '1d8', 
        dmg_ability: 'DEX', 
        dmg_type: 'Piercing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Scimitar': {
        atk_ability: 'DEX', 
        range: '',
        dmg_die: '1d6', 
        dmg_ability: 'DEX', 
        dmg_type: 'Slashing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Shortsword': {
        atk_ability: 'DEX', 
        range: '',
        dmg_die: '1d6', 
        dmg_ability: 'DEX', 
        dmg_type: 'Piercing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Trident': {
        atk_ability: 'STR', 
        range: '20/60',
        dmg_die: '1d6', 
        dmg_ability: 'STR', 
        dmg_type: 'Piercing',
        versatile_die: '1d8',
        weapon_type: 'Martial weapons'
    },
    'War pick': {
        atk_ability: 'STR', 
        range: '',
        dmg_die: '1d8', 
        dmg_ability: 'STR', 
        dmg_type: 'Piercing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Warhammer': {
        atk_ability: 'STR', 
        range: '',
        dmg_die: '1d8', 
        dmg_ability: 'STR', 
        dmg_type: 'Bludgeoning',
        versatile_die: '1d10',
        weapon_type: 'Martial weapons'
    },
    'Whip': {
        atk_ability: 'DEX', 
        range: 'Reach',
        dmg_die: '1d4', 
        dmg_ability: 'DEX', 
        dmg_type: 'Slashing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Blowgun': {
        atk_ability: 'DEX', 
        range: '25/100',
        dmg_die: '1d1', 
        dmg_ability: 'DEX', 
        dmg_type: 'Piercing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Hand crossbow': {
        atk_ability: 'DEX', 
        range: '30/120',
        dmg_die: '1d6', 
        dmg_ability: 'DEX', 
        dmg_type: 'Piercing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Heavy crossbow': {
        atk_ability: 'DEX', 
        range: '100/400',
        dmg_die: '1d10', 
        dmg_ability: 'DEX', 
        dmg_type: 'Piercing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Longbow': {
        atk_ability: 'DEX', 
        range: '150/600',
        dmg_die: '1d8', 
        dmg_ability: 'DEX', 
        dmg_type: 'Piercing',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
    'Net': {
        atk_ability: 'DEX', 
        range: '5/15',
        dmg_die: '', 
        dmg_ability: 'DEX', 
        dmg_type: 'Special',
        versatile_die: '',
        weapon_type: 'Martial weapons'
    },
}