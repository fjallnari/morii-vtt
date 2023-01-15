import Monsters from "../components/Game/GameOverview/Monsters.svelte";
import GameOverview from "../components/Game/GameOverview/GameOverview.svelte";
import QuickCreateSheet from "../components/Game/QCreate/QuickCreateSheet.svelte";
import CopyExistingSheet from "../components/Game/CopyExistingSheet.svelte";
import ImportJsonSheet from "../components/Game/ImportJsonSheet.svelte";
import InnerOverview5E from "../components/Game/GameOverview/InnerOverview5E.svelte";
import SpecificSettings5E from "../components/Game/CharacterSheet/SpecificSettings5E.svelte";
import CharacterSheetSettings from "../components/Game/CharacterSheet/CharacterSheetSettings.svelte";
import CharacterSheetCore5E from "../components/Game/CharacterSheet/CharacterSheetCore5E.svelte";
import CharacterSheetBio5E from "../components/Game/CharacterSheet/CharacterSheetBio5E.svelte";
import CharacterSheetSpells5E from "../components/Game/CharacterSheet/CharacterSheetSpells5E.svelte";


const OWNER_STANDARD_OVERVIEW = {
    id: 'default',
    tooltip: 'Overview',
    color: '#A7C284',
    icon: 'material-symbols:dashboard-rounded',
    access: 'owner',
    component: GameOverview
};

const SETTINGS_TAB = {
    color: '#9DB5B2',
    icon: 'mdi:cog',
    component:  CharacterSheetSettings
};


const GAME_SYSTEMS = {
    'D&D 5E': {
        characterSheetTabs: [
            {
                color: '#A7C284',
                icon: 'mdi:home',
                component:  CharacterSheetCore5E
            }, 
            {
                color: '#DBD8B3',
                icon: 'mdi:script-text',
                component:  CharacterSheetBio5E
            },
            {
                color: '#EFA48B',
                icon: 'mdi:fire',
                component:  CharacterSheetSpells5E
            },
            SETTINGS_TAB
        ],
        creationOptions: [ QuickCreateSheet, CopyExistingSheet, ImportJsonSheet ],
        innerOverview: InnerOverview5E,
        specificSettings: SpecificSettings5E,
        gameTabs: [
            // {
            //     id: 'combat',
            //     tooltip: 'Combat',
            //     color: '#8FB8DE',
            //     icon: 'mdi:sword-cross',
            //     access: 'any'
            // },
            {
                id: 'monsters',
                tooltip: 'Monsters',
                color: '#C7B573',
                icon: 'mdi:duck',
                access: 'owner',
                component: Monsters
            },
            OWNER_STANDARD_OVERVIEW
        ]
    },
    'Cairn': {
        characterSheetTabs: [
            SETTINGS_TAB
        ],
        creationOptions: [],
        gameTabs: [
            OWNER_STANDARD_OVERVIEW
        ]
    }
}

export default GAME_SYSTEMS;