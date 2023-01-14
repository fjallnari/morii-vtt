import Monsters from "../components/Game/GameOverview/Monsters.svelte";
import GameOverview from "../components/Game/GameOverview/GameOverview.svelte";
import CharacterSheetCore from "../components/Game/CharacterSheet/CharacterSheetCore.svelte";
import CharacterSheetBio from "../components/Game/CharacterSheet/CharacterSheetBio.svelte";
import CharacterSheetSpells from "../components/Game/CharacterSheet/CharacterSheetSpells.svelte";
import CharacterSheetSettings from "../components/Game/CharacterSheet/CharacterSheetSettings.svelte";
import QuickCreateSheet from "../components/Game/QCreate/QuickCreateSheet.svelte";
import CopyExistingSheet from "../components/Game/CopyExistingSheet.svelte";
import ImportJsonSheet from "../components/Game/ImportJsonSheet.svelte";
import InnerOverview5E from "../components/Game/GameOverview/InnerOverview5E.svelte";


const OWNER_STANDARD_OVERVIEW = {
    id: 'default',
    tooltip: 'Overview',
    color: '#A7C284',
    icon: 'material-symbols:dashboard-rounded',
    access: 'owner',
    component: GameOverview
};

const GAME_SYSTEMS = {
    'D&D 5E': {
        characterSheetTabs: [CharacterSheetCore, CharacterSheetBio, CharacterSheetSpells, CharacterSheetSettings],
        creationOptions: [QuickCreateSheet, CopyExistingSheet, ImportJsonSheet],
        innerOverview: InnerOverview5E,
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
    // 'Cairn': {
    //     characterSheetTabs: [],
    //     creationOptions: [],
    //     innerOverview: undefined,
    //     gameTabs: [
    //         OWNER_STANDARD_OVERVIEW
    //     ]
    // }
}

export default GAME_SYSTEMS;