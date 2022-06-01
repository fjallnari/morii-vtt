<script lang="ts">
    import IconButton, { Icon } from '@smui/icon-button';
    import InPlaceEdit from "../InPlaceEdit.svelte";
    import type { Character } from "../../interfaces/Character";
    import axios from "axios";
    import { accessToken, socket, user } from "../../stores";
    import { params } from "svelte-spa-router";

    export let character: Character;

    $socket.on('change-character', (modifiedCharacter: Character) => {
        console.log(modifiedCharacter);
        character = modifiedCharacter;
    });

    const modifyCharacter = async () => {
        // prevents race condition in case loading finishes before access token is refresh (e.g. on reload)
        // TODO: refactor the "refresh token/load secure route" flow
        // await new Promise(res => setTimeout(res, 500));
        try {
            const response = await axios.post('/api/modify-character', {
                modifiedCharacter: character,
            },
            {
                headers: {
                    'Authorization': `Bearer ${$accessToken}`
                }
            });
            $socket.emit('change-character', { modifierID: $user._id, roomID: $params.id, character: character });
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

    <div class="character-basic-info">
        <box class="box-with-label" style="flex-grow: 4;">
            <div class="box-main-text">
                <InPlaceEdit bind:value={character.classes} editModeWidth="10em" on:submit={() => modifyCharacter()}/>
            </div>
            <div class="box-label">
                Class & Level
            </div>
        </box>
        <box class="box-with-label">
            <div class="box-main-text">
                <InPlaceEdit bind:value={character.xp} editModeWidth="5em" on:submit={() => modifyCharacter()}/>
            </div>
            <div class="box-label">
                XP
            </div>
        </box>
        <box class="box-with-label" style="flex-grow: 2;">
            <div class="box-main-text">
                <InPlaceEdit bind:value={character.subclass} editModeWidth="6em" on:submit={() => modifyCharacter()}/>
            </div>
            <div class="box-label">
                Subclass
            </div>
        </box>
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
    </div>

    <div class="ability-scores-bonuses">
        <div class="bonuses">
            <div class="row-box-with-label">
                <box class="row-box-value">
                    <InPlaceEdit bind:value={character.prof_bonus} editModeWidth="2em" editModeHeight="2em" on:submit={() => modifyCharacter()}/>
                </box>
                <box class="row-box-label">
                    Proficiency Bonus    
                </box>
            </div>
            <div class="row-box-with-label">
                <!-- inverts inspiration value on click -->
                <box class="row-box-value" style="cursor: pointer;" on:click={() => { character.inspiration = !character.inspiration; modifyCharacter() }}>
                    <Icon class="material-icons">{character.inspiration ? 'auto_awesome': ''}</Icon>
                </box>
                <box class="row-box-label">
                    Inspiration    
                </box>
            </div>
        </div>
        <div class="ability-scores">
            {#each Object.keys(character.ability_scores) as AS}
                <div class="ability-score-container">
                    <div class="ability-score-info">
                        <box class="ability-score-modifier">
                            <!-- Formats the modifiers to show plus signs if the modifier is positive -->
                            {
                                new Intl.NumberFormat("en-US", {
                                    signDisplay: "exceptZero"
                                }).format((~~character.ability_scores[AS].value - 10) / 2 >> 0)
                            }
                        </box>
                        <div class="ability-score-value">
                            <box class="box-with-label" style="flex-grow: 2;">
                                <div class="box-main-text">
                                    <InPlaceEdit bind:value={character.ability_scores[AS].value} editModeWidth="2em" on:submit={() => modifyCharacter()}/>
                                </div>
                                <div class="box-label">
                                    {character.ability_scores[AS].name}
                                </div>
                            </box>
                        </div>
                    </div>

                    <div class="skills">

                    </div>
                </div>
            {/each}
        </div>
    </div>

    <box class="other-prof-languages"></box>
    <box class="equipment"></box>
    <box class="ac-init-speed">

    </box>
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
        "character-name character-basic-info character-basic-info"
        "ability-scores-bonuses ac-init-speed other-prof-languages"
        "ability-scores-bonuses ac-init-speed other-prof-languages"
        "ability-scores-bonuses hp-death-saves other-prof-languages"
        "ability-scores-bonuses hp-death-saves features-traits"
        "ability-scores-bonuses hp-death-saves features-traits"
        "ability-scores-bonuses attacks features-traits"
        "ability-scores-bonuses attacks features-traits"
        "ability-scores-bonuses equipment features-traits"
        "ability-scores-bonuses equipment features-traits"
        "ability-scores-bonuses equipment features-traits"
        "ability-scores-bonuses char-sheet-menu features-traits"; 
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

    .row-box-with-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .row-box-value {
        display: flex;
        width: 2em;
        height: 2em;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
        font-weight: bold;
        font-family: Quicksand;
        z-index: 2;
    }

    .row-box-label {
        padding: 0.5em;
        text-transform: uppercase;
        font-family: Athiti;
        margin-left: -5px;
        z-index: 1;
        padding-left: 15px;
        padding-right: 0.75em;
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

    .ability-scores { grid-area: ability-scores; 
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5em;
    }

    .ability-score-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .ability-score-modifier {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 2.5em;
        width: 2.5em;
        z-index: 2;
        margin-bottom: -1.2em;

        font-size: 1.2em;
        font-weight: bold;
        font-family: Quicksand;
    }

    .ability-score-value {
        width: 5em;
        height: 5em;
    }

    .bonuses { grid-area: bonuses; 
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }

    .other-prof-languages { grid-area: other-prof-languages;
        margin: 0em 0.75em 0em 0em;
    }

    .equipment { grid-area: equipment; 
    
    }

    .ac-init-speed { grid-area: ac-init-speed;
        
    }

    .hp-death-saves { grid-area: hp-death-saves; 
    
    }

    .attacks { grid-area: attacks;

    }

    .features-traits { grid-area: features-traits;
        margin: 0em 0.75em 0.5em 0em;
    }

    #char-sheet-menu { grid-area: char-sheet-menu;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;
        margin-bottom: 0.5em;
    }

</style>