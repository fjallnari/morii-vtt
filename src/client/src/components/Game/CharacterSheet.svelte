<script lang="ts">
    import type Campaign from "../../interfaces/Campaign";
    import type GameData from "../../interfaces/GameData";
    import IconButton from '@smui/icon-button';
    import InPlaceEdit from "../InPlaceEdit.svelte";
    import type Character from "../../interfaces/Character";
    import axios from "axios";
    import { accessToken, user } from "../../stores";

    export let character: Character;
    //console.log(gameData.character);

    let charName = 'Cinkylinka';
    let charClassLevel = 'Bard 3';
    let charXP = '2200';
    let charRace = 'Half-Orc';
    let charBackground = 'Outlander';
    let charAlignment = 'CHG';

    const modifyCharacter = async () => {
        // prevents race condition in case loading finishes before access token is refresh (e.g. on reload)
        // TODO: refactor the "refresh token/load secure route" flow
        await new Promise(res => setTimeout(res, 500));
        try {
            const response = await axios.post('/api/modify-character', {
                modifiedCharacter: character,
            },
            {
                headers: {
                    'Authorization': `Bearer ${$accessToken}`
                }
            });
        }
        catch (err){
            console.log(err);
        }
	}

</script>


<div class="character-sheet-container">
    <div class="character-name">
        <box class="box-with-label">
            <div class="box-main-text">
                <InPlaceEdit bind:value={character.name} on:submit={() => modifyCharacter()}/>
            </div>
            <div class="box-label">
                Character Name
            </div>
        </box>   
    </div>
    
    <div class="character-class-level">
        <box class="box-with-label" style="flex-grow: 4;">
            <div class="box-main-text">
                <InPlaceEdit bind:value={character.classLevel} editModeWidth="10em" on:submit={() => modifyCharacter()}/>
            </div>
            <div class="box-label">
                Class & Level
            </div>
        </box>
        <box class="box-with-label">
            <div class="box-main-text">
                <InPlaceEdit bind:value={character.experience} editModeWidth="5em" on:submit={() => modifyCharacter()}/>
            </div>
            <div class="box-label">
                XP
            </div>
        </box>
    </div>

    <div class="character-basic-info">
        <box class="box-with-label" style="flex-grow: 2;">
            <div class="box-main-text">
                <InPlaceEdit bind:value={character.race} editModeWidth="6em" on:submit={() => modifyCharacter()}/>
            </div>
            <div class="box-label">
                Race
            </div>
        </box>
        <box class="box-with-label" style="flex-grow: 2;">
            <div class="box-main-text">
                <InPlaceEdit bind:value={character.background} editModeWidth="6em" on:submit={() => modifyCharacter()}/>
            </div>
            <div class="box-label">
                Background
            </div>
        </box>
        <box class="box-with-label">
            <div class="box-main-text">
                <InPlaceEdit bind:value={character.alignment} editModeWidth="4em" on:submit={() => modifyCharacter()}/>
            </div>
            <div class="box-label">
                Alignment
            </div>
        </box>
    </div>

    <box class="ability-scores"></box>
    <box class="other-prof-languages"></box>
    <box class="equipment"></box>
    <box class="ac-init-speed"></box>
    <box class="hp-death-saves"></box>
    <box class="spellcasting-modifiers"></box>
    <box class="attacks"></box>
    <box class="features-traits"></box>
    <div id="char-sheet-menu">
        <IconButton class="material-icons" style="color: #A7C284; font-size: xx-large;" ripple={false} on:click={() => {}}>home</IconButton>
        <IconButton class="material-icons" style="color: #DBD8B3; font-size: xx-large;" ripple={false} on:click={() => {}}>article</IconButton>
        <IconButton class="material-icons" style="color: #EFA48B; font-size: xx-large;" ripple={false} on:click={() => {}}>local_fire_department</IconButton>
        <IconButton class="material-icons" style="color: #9DB5B2; font-size: xx-large;" ripple={false} on:click={() => {}}>settings</IconButton>
    </div>
</div>


<style>
    .character-sheet-container {  display: grid;
        height: inherit;
        flex: 5;

        background-color: #212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        
        font-weight: 100;
        font-family: Quicksand;

        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 2fr 1fr 1fr 1fr 1fr 1fr 4fr 1fr 1fr 2fr 2fr 1fr; 
        gap: 0.5em 0.5em;
        grid-template-areas: 
        "character-name character-class-level character-basic-info"
        "ability-scores ac-init-speed spellcasting-modifiers"
        "ability-scores ac-init-speed spellcasting-modifiers"
        "ability-scores hp-death-saves features-traits"
        "ability-scores hp-death-saves features-traits"
        "ability-scores hp-death-saves features-traits"
        "ability-scores attacks features-traits"
        "ability-scores attacks features-traits"
        "ability-scores equipment features-traits"
        "ability-scores equipment features-traits"
        "other-prof-languages equipment features-traits"
        "other-prof-languages char-sheet-menu features-traits";
    }

    .character-sheet-container box {
        background-color:#252529;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
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

    .character-class-level { grid-area: character-class-level;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        color: #FCF7F8;
        font-size: 1.5em;
        margin-top: 0.5em;
        gap: 0.35em;
    }

    .box-with-label {
        flex-grow: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .box-label {
        align-self: center;
        margin: 0.7em 0em 0.5em 0em;
        color: #FCF7F8;
        font-size: 0.6vw;
        font-weight: 200;
        font-family: Athiti;
        text-transform: uppercase;
    }

    .box-main-text {
        margin-top: auto;
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


    .ability-scores { grid-area: ability-scores;
        margin-left: 0.75em;
    }

    .other-prof-languages { grid-area: other-prof-languages;
        margin: 0em 0em 0.75em 0.75em;
    }

    .equipment { grid-area: equipment; 
    
    }

    .ac-init-speed { grid-area: ac-init-speed;
        
    }

    .hp-death-saves { grid-area: hp-death-saves; 
    
    }

    .spellcasting-modifiers { grid-area: spellcasting-modifiers;
        margin-right: 0.75em; 
    }

    .attacks { grid-area: attacks;

    }

    .features-traits { grid-area: features-traits;
        margin: 0em 0.75em 0.75em 0em;
    }

    #char-sheet-menu { grid-area: char-sheet-menu;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;
        margin-bottom: 0.75em;
    }

</style>