import Monsters from "../components/Game/GameOverview/5E/Monsters.svelte";
import GameOverview from "../components/Game/GameOverview/GameOverview.svelte";
import QuickCreateSheet from "../components/Game/QCreate/QuickCreateSheet.svelte";
import CopyExistingSheet from "../components/Game/CopyExistingSheet.svelte";
import InnerOverview5E from "../components/Game/GameOverview/5E/InnerOverview5E.svelte";
import CharacterSheetSettings from "../components/Game/CharacterSheet/CharacterSheetSettings.svelte";
import CharacterSheetCore5E from "../components/Game/CharacterSheet/5E/CharacterSheetCore5E.svelte";
import CharacterSheetBio5E from "../components/Game/CharacterSheet/5E/CharacterSheetBio5E.svelte";
import CharacterSheetSpells5E from "../components/Game/CharacterSheet/5E/CharacterSheetSpells5E.svelte";
import SpecificSettings5E from "../components/Game/CharacterSheet/5E/SpecificSettings5E.svelte";
import CharacterSheetCoreCairn from "../components/Game/CharacterSheet/Cairn/CharacterSheetCoreCairn.svelte";
import SpecificSettingsCairn from "../components/Game/CharacterSheet/Cairn/SpecificSettingsCairn.svelte";
import CharacterSheetRulesCairn from "../components/Game/CharacterSheet/Cairn/CharacterSheetRulesCairn.svelte";
import CreateRandomSheetCairn from "../components/Game/CharacterSheet/Cairn/CreateRandomSheetCairn.svelte";
import ImportJsonSheet5E from "../components/Game/CharacterSheet/5E/ImportJsonSheet5E.svelte";
import ImportJsonSheetCairn from "../components/Game/CharacterSheet/Cairn/ImportJsonSheetCairn.svelte";
import CharacterBadge5E from "../components/Game/CharacterSheet/5E/CharacterBadge5E.svelte";
import CharacterBadgeCairn from "../components/Game/CharacterSheet/Cairn/CharacterBadgeCairn.svelte";
import InnerOverviewCairn from "../components/Game/GameOverview/Cairn/InnerOverviewCairn.svelte";
import type GameTab from "../interfaces/GameTab";


interface CharacterSheetTab {
    color: string,
    icon: string, // iconify string
    component: unknown // svelte component
}

export interface GameSystem {
    // used both for both the tabs and the tab-switching icons in CharSheetMenu
    // SETTINGS_TAB should always be included
    characterSheetTabs: CharacterSheetTab[],

    // array of Svelte components, CopyExistingSheet should work for any system, others are system-specific
    // dialogs are recommended for anything more complex
    creationOptions: unknown[],

    // Svelte component, this is the bottom-right part of GM's game overview (anything other than PCs, and NPCs), system-specific
    innerOverview: unknown,

    // Svelte component, middle part of character sheet settings (between the user tag and the delete button)
    specificSettings: unknown,

    // Svelte component, system-specific, the CharacterBadge5E can be used as an placeholder
    characterBadge: unknown,

    // manages all game tabs, both the icon-switchers in GameInfo and the components themselves
    // should have OWNER_STANDARD_OVERVIEW included
    gameTabs: GameTab[]
}

// unless the system has very specific needs, each game system should have this included
const OWNER_STANDARD_OVERVIEW: GameTab = {
    id: 'default',
    tooltip: 'Overview',
    color: '#A7C284',
    icon: 'material-symbols:dashboard-rounded',
    access: 'owner',
    component: GameOverview
};

// should be included in every system under 'characterSheetTabs'
const SETTINGS_TAB: CharacterSheetTab = {
    color: '#9DB5B2',
    icon: 'mdi:cog',
    component:  CharacterSheetSettings
};

const GAME_SYSTEMS: Record<string, GameSystem> = {
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
        creationOptions: [ QuickCreateSheet, CopyExistingSheet, ImportJsonSheet5E ],
        innerOverview: InnerOverview5E,
        specificSettings: SpecificSettings5E,
        characterBadge: CharacterBadge5E,
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
            {
                color: '#A7C284',
                icon: 'mdi:shield-account',
                component:  CharacterSheetCoreCairn
            },
            {
                color: '#DBD8B3',
                icon: 'mdi:book-open-page-variant',
                component:  CharacterSheetRulesCairn
            },
            SETTINGS_TAB
        ],
        creationOptions: [ CreateRandomSheetCairn, CopyExistingSheet, ImportJsonSheetCairn ],
        innerOverview: InnerOverviewCairn,
        specificSettings: SpecificSettingsCairn,
        characterBadge: CharacterBadgeCairn,
        gameTabs: [
            OWNER_STANDARD_OVERVIEW
        ]
    }
}

export default GAME_SYSTEMS;