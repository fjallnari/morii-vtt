<script lang="ts">
    import type { Character } from '../../../interfaces/Character';
    import InPlaceEditBox from '../../InPlaceEditBox.svelte';
    import AbilityScores from './Components/AbilityScores.svelte';
    import ArmorClass from './Components/ArmorClass.svelte';
    import Attacks from './Components/Attacks.svelte';
    import CharacterSheetMenu from './Components/CharSheetMenu.svelte';
    import DeathSaves from './Components/DeathSaves.svelte';
    import Exhaustion from './Components/Exhaustion.svelte';
    import Features from './Components/Features.svelte';
    import HitDice from './Components/HitDice.svelte';
    import HitPoints from './Components/HitPoints.svelte';
    import ProfBonusInspiration from './Components/ProfBonusInspiration.svelte';
    import Speed from './Components/Speed.svelte';
    import ToolsOtherProf from './Components/ToolsOtherProf.svelte';
    import Inventory from './Components/Inventory.svelte';

    export let character: Character;

</script>


<tab-container>
    <div class="character-name">
        <InPlaceEditBox bind:value={character.name} boxLabel="Character Name"></InPlaceEditBox>  
    </div>

    <div class="character-basic-info">
        <InPlaceEditBox bind:value={character.classes} boxLabel="Class & Level" inlineStyle="flex-grow: 4;" editWidth="10em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.xp} boxLabel="XP" editWidth="5em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.subclass} boxLabel="Subclass" inlineStyle="flex-grow: 2;" editWidth="6em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.race} boxLabel="Race" inlineStyle="flex-grow: 2;" editWidth="6em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.background} boxLabel="Background" inlineStyle="flex-grow: 2;" editWidth="6em"></InPlaceEditBox>
    </div>

    <div class="ability-scores-bonuses">
        <div class="bonuses">
            <ProfBonusInspiration bind:character={character}></ProfBonusInspiration>
        </div>
        <div class="ability-scores">
            <AbilityScores bind:character={character}></AbilityScores>
        </div>
    </div>

    <div class="character-stats">
        <div class="armor-class">
            <ArmorClass bind:value={character.armor_class}></ArmorClass>
        </div>

        <div class="speed">
            <Speed bind:character={character}></Speed>
        </div>

        <div class="hit-points">
            <HitPoints bind:character={character}></HitPoints>
        </div>

        <div class="exhaustion">
            <Exhaustion bind:charExhaustion={character.exhaustion}></Exhaustion>
        </div>

        <div class="death-saves">
            <DeathSaves bind:character={character}></DeathSaves>
        </div>

        <div class="hit-dice">
            <HitDice bind:character={character}></HitDice>
        </div>
    </div>

    <div class="attacks">
        <Attacks bind:character={character}></Attacks>
    </div>

    <div class="inventory">
        <Inventory bind:character={character}></Inventory>
    </div>

    <div class="other-prof-languages">
        <ToolsOtherProf bind:character={character}></ToolsOtherProf>
    </div>

    <div class="features-traits">
        <Features bind:character={character}></Features>
    </div>

    <CharacterSheetMenu></CharacterSheetMenu>
</tab-container>


<style>
    tab-container {  display: grid;
        height: inherit;
        flex: 5;

        background-color: #212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        
        font-weight: 100;
        font-family: Quicksand;

        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1.5fr 1fr 1fr 1fr 1fr 1fr 4fr 1fr 1fr 2fr 2fr 1fr; 
        gap: 0.5em 0.5em;
        grid-template-areas: 
        "character-name character-basic-info character-basic-info"
        "ability-scores-bonuses character-stats other-prof-languages"
        "ability-scores-bonuses character-stats other-prof-languages"
        "ability-scores-bonuses character-stats other-prof-languages"
        "ability-scores-bonuses character-stats other-prof-languages"
        "ability-scores-bonuses character-stats features-traits"
        "ability-scores-bonuses attacks features-traits"
        "ability-scores-bonuses attacks features-traits"
        "ability-scores-bonuses inventory features-traits"
        "ability-scores-bonuses inventory features-traits"
        "ability-scores-bonuses inventory features-traits"
        "ability-scores-bonuses char-sheet-menu features-traits"; 
    }

    .character-name { grid-area: character-name;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #FCF7F8;
        font-size: 2em;
        margin: 0.4em 0em 0em 0.4em;
        width: inherit;
    }

    .character-basic-info { grid-area: character-basic-info;
        margin: 0.5em 0.5em 0em 0em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        color: #FCF7F8;
        font-size: 1.5em;
        gap: 0.35em;
    }


    .ability-scores-bonuses { grid-area: ability-scores-bonuses;
        margin-left: 0.75em;
        display: grid; 
        grid-template-columns: 1fr; 
        grid-template-rows: 0.05fr 1fr; 
        gap: 0.5em 0.5em; 
        grid-template-areas: 
        "bonuses"
        "ability-scores";
    }

    .bonuses { grid-area: bonuses; 
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }

    .ability-scores { grid-area: ability-scores; 
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 0.25em;
    }

    .character-stats { grid-area: character-stats;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1.5fr 0.5fr 1.5fr 0.5fr 1fr;
        gap: 0.5em 0.5em; 
        grid-template-areas: 
            "armor-class speed speed exhaustion exhaustion exhaustion"
            "armor-class speed speed death-saves death-saves death-saves"
            "hit-points hit-points hit-points death-saves death-saves death-saves"
            "hit-points hit-points hit-points hit-dice hit-dice hit-dice"
            "hit-points hit-points hit-points hit-dice hit-dice hit-dice";
    }

    .armor-class { grid-area: armor-class; }

    .armor-class :global(box) {
        width: 5em;
        height: 5em;
        border: 0.5em solid transparent;
        border-radius: 50% 50% 50% 50% / 12% 12% 70% 70%;
    }

    .armor-class :global(box .box-main-text) {
        font-size: 1.5em;
        font-weight: bold;
    }

    .armor-class :global(box .box-label) {
        width: 5em;
        margin-bottom: -0.25em;
    }

    .speed { grid-area: speed; 
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .exhaustion { grid-area: exhaustion; }

    .death-saves { grid-area: death-saves; }

    .hit-points { grid-area: hit-points; 
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .hit-dice { grid-area: hit-dice; 
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .attacks { grid-area: attacks;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    }

    .inventory { grid-area: inventory;
        display: flex;
        justify-content: center;
        align-items: center; 
    }

    .other-prof-languages { grid-area: other-prof-languages;
        margin: 0em 0.75em 0em 0em;
    }

    .features-traits { grid-area: features-traits;
        margin: 0em 0.75em 0.5em 0em;
    }

</style>