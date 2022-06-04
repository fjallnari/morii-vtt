<script lang="ts">
    import IconButton, { Icon } from '@smui/icon-button';
    import InPlaceEdit from "../InPlaceEdit.svelte";
    import Tooltip, {
        Wrapper,
        Title,
        Content,
        Link,
        RichActions,
    } from '@smui/tooltip';
    import type { AbilitySkill, Character } from "../../interfaces/Character";
    import axios from "axios";
    import { accessToken, socket, user } from "../../stores";
    import { params } from "svelte-spa-router";
import EXHAUSTION from '../../enum/ExhaustionInfo';

    export let character: Character;

    $socket.on('change-character', (modifiedCharacter: Character) => {
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

    const sendSkillCheck = async (modifier: number, skillName: string) => {
        $socket.emit('chat-message', {
            senderInfo: {
                _id: $user._id, 
                username: $user.username,
                settings: $user.settings,
            }, 
            messageText: `/r d20${formatModifier(modifier)}`,
            skillCheckInfo: {
                characterName: character.name,
                skillName: skillName
            },
            gameID: $params.id,
            isPublic: true // make isMessagePublic a store variable
        });
    }

    /**
     * Formats modifier to show plus signs if the modifier is positive
     */
    const formatModifier = (modifier: number) => {
        return new Intl.NumberFormat("en-US", {
            signDisplay: "exceptZero"
        }).format(modifier);
    }

    /**
     * 
     * @param AS - ability score tag, e.g. 'WIS', 'DEX', 'STR' ...
     */
    const getASModifier = (AS: string) => {
        return (~~character.ability_scores[AS].value - 10) / 2 >> 0;
    }

    const getSkill = (AS: string, skillName: string) => {
        return character.ability_scores[AS].skills.find(skill => skill.name === skillName);
    }

    const getSkillModifier = (AS: string, skill: AbilitySkill) => {
        return getASModifier(AS) + (skill.proficiency * ~~character.prof_bonus);
    }

    const getSavingThrowModifier = (AS: string) => {
        return getASModifier(AS) + (character.ability_scores[AS].saving_throw ? ~~character.prof_bonus : 0);
    }

</script>


<div class="character-sheet-container">
    <div class="character-name">
        <box class="box-with-label">
            <div class="box-main-text">
                <InPlaceEdit bind:value={character.name} on:submit={() => modifyCharacter()}/>
            </div>
            <div class="box-justify-filler"></div>
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
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Class & Level
            </div>
        </box>
        <box class="box-with-label">
            <div class="box-main-text">
                <InPlaceEdit bind:value={character.xp} editModeWidth="5em" on:submit={() => modifyCharacter()}/>
            </div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                XP
            </div>
        </box>
        <box class="box-with-label" style="flex-grow: 2;">
            <div class="box-main-text">
                <InPlaceEdit bind:value={character.subclass} editModeWidth="6em" on:submit={() => modifyCharacter()}/>
            </div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Subclass
            </div>
        </box>
        <box class="box-with-label" style="flex-grow: 2;">
            <div class="box-main-text">
                <InPlaceEdit bind:value={character.race} editModeWidth="6em" on:submit={() => modifyCharacter()}/>
            </div>
            <div class="box-justify-filler"></div>
            <div class="box-label">
                Race
            </div>
        </box>
        <box class="box-with-label" style="flex-grow: 2;">
            <div class="box-main-text">
                <InPlaceEdit bind:value={character.background} editModeWidth="6em" on:submit={() => modifyCharacter()}/>
            </div>
            <div class="box-justify-filler"></div>
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
                <div class="ability-score-container" style="{['WIS', 'INT'].includes(AS) ? 'padding-bottom: 2.2em;': ''}">
                    <div class="ability-score-info">
                        <box class="ability-score-modifier">
                            {formatModifier(getASModifier(AS))}
                        </box>
                        <div class="ability-score-value">
                            <box class="box-with-label" style="flex-grow: 2;">
                                <div class="box-main-text" style="margin-bottom: -1.5em">
                                    <InPlaceEdit bind:value={character.ability_scores[AS].value} editModeWidth="2em" on:submit={() => modifyCharacter()}/>
                                </div>
                                <div class="box-justify-filler"></div>
                                <div class="box-label">
                                    {character.ability_scores[AS].name}
                                </div>
                            </box>
                        </div>
                    </div>

                    <div class="skills">
                        <div class="skill-field">
                            <img class="skill-prof-icon" 
                                src="../static/rhombus{character.ability_scores[AS].saving_throw ? '' : '-outline'}.svg" 
                                alt="rhombus"
                                on:click={() => { character.ability_scores[AS].saving_throw = !character.ability_scores[AS].saving_throw; modifyCharacter() }}
                            >
                            <mod>
                                {formatModifier(getSavingThrowModifier(AS))}
                            </mod>
                            <sendable on:click={() => { sendSkillCheck(getSavingThrowModifier(AS), `${AS} saving throw`) }}>{AS} saving throws<br></sendable>
                        </div>
                        {#each character.ability_scores[AS].skills as skill}
                            <div class="skill-field">
                                <img class="skill-prof-icon" 
                                    src="../static/{['checkbox-blank-outline', 'checkbox-marked', 'flare'][skill.proficiency]}.svg" 
                                    alt="checkbox"
                                    on:click={() => { skill.proficiency += 1 + (skill.proficiency === 2 ? -3 : 0); modifyCharacter() }}
                                >
                                <mod>{formatModifier(getSkillModifier(AS, skill))}</mod>
                                <sendable on:click={() => { sendSkillCheck(getSkillModifier(AS, skill), skill.name) }}>{skill.name}<br></sendable>
                            </div>
                        {/each}
                    </div>
                    {#if AS === 'WIS'}
                        <box class="additional-skill-box">
                            <div class="box-with-label">
                                <div class="box-main-text">
                                    {10 + getSkillModifier('WIS', character.ability_scores['WIS'].skills.find(skill => skill.name === 'perception'))}
                                </div>
                                <div class="box-justify-filler"></div>
                                <div class="box-label">
                                    Passive Perception
                                </div>
                            </div>
                        </box>
                    {:else if AS === 'DEX'}
                        <box class="additional-skill-box">
                            <div class="box-with-label">
                                <div class="box-main-text">
                                    {formatModifier(getASModifier('DEX') + ~~character.initiative_bonus)}
                                </div>
                                <div class="box-justify-filler"></div>
                                <sendable class="box-label" on:click={() => sendSkillCheck((getASModifier('DEX') + ~~character.initiative_bonus), `initiative`)}>
                                    Initiative
                                </sendable>
                            </div>
                        </box>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    <div class="character-stats">
        <div class="armor-class">
            <box class="box-with-label">
                <div class="box-main-text">
                    <InPlaceEdit bind:value={character.armor_class} editModeWidth="2em" editModeHeight="2em" on:submit={() => modifyCharacter()}/>
                </div>
                <div class="box-justify-filler"></div>
                <div class="box-label">
                    Armor Class
                </div>
            </box>
        </div>

        <div class="speed">
            <box class="box-with-label">
                <div class="box-main-text"></div>
                <div class="box-justify-filler"></div>
                <div class="box-label">
                    Speed
                </div>
            </box>
        </div>

        <div class="exhaustion">
            <box class="box-with-label">
                <div class="box-main-text">
                    {#each [1, 2, 3, 4, 5, 6] as exhaustion_level}
                        <Wrapper rich>
                            <img class="skill-prof-icon"
                                src="../static/{exhaustion_level > character.exhaustion ? 'checkbox-blank-outline' : `numeric/numeric-${exhaustion_level}-box`}.svg" 
                                alt="checkbox"
                                on:click={() => { character.exhaustion = exhaustion_level === character.exhaustion ? 0 : exhaustion_level; modifyCharacter()}}
                            >
                            <Tooltip>
                                <Content style="white-space: pre-line;">
                                    {EXHAUSTION.slice(0, exhaustion_level).join('\n')}
                                </Content>
                            </Tooltip>
                        </Wrapper>
                    {/each}
                </div>
                <div class="box-justify-filler"></div>
                <div class="box-label">
                    Exhaustion
                </div>
            </box>
        </div>

        <div class="death-saves">
            <box class="box-with-label">
                <div class="box-main-text"></div>
                <div class="box-label">
                    Death Saves
                </div>
            </box>
        </div>

        <div class="hit-points">
            <box class="box-with-label">
                <div class="box-main-text"></div>
                <div class="box-label">
                    Hit Points
                </div>
            </box>
        </div>

        <div class="hit-dice">
            <box class="box-with-label">
                <div class="box-main-text"></div>
                <div class="box-label">
                    Hit Dice
                </div>
            </box>
        </div>
    </div>

    <div class="attacks">
        <box class="box-with-label">
            <div class="box-main-text"></div>
            <div class="box-label">
                Attacks
            </div>
        </box>
    </div>

    <div class="equipment">
        <box class="box-with-label">
            <div class="box-main-text"></div>
            <div class="box-label">
                Equipment
            </div>
        </box>
    </div>

    <div class="other-prof-languages">
        <box class="box-with-label">
            <div class="box-main-text"></div>
            <div class="box-label">
                Other prof & Languages
            </div>
        </box>
    </div>

    <div class="features-traits">
        <box class="box-with-label">
            <div class="box-main-text"></div>
            <div class="box-label">
                Features & Traits
            </div>
        </box>
    </div>

    <div id="char-sheet-menu">
        <IconButton class="material-icons" style="color: #A7C284; font-size: xx-large;" ripple={false} on:click={() => {}}>home</IconButton>
        <IconButton class="material-icons" style="color: #DBD8B3; font-size: xx-large;" ripple={false} on:click={() => {}}>article</IconButton>
        <IconButton class="material-icons" style="color: #EFA48B; font-size: xx-large;" ripple={false} on:click={() => {}}>local_fire_department</IconButton>
        <IconButton class="material-icons" style="color: #9DB5B2; font-size: xx-large;" ripple={false} on:click={() => {}}>settings</IconButton>
    </div>
</div>


<style>
    mod {
        font-weight: bold;
        border-bottom: 1px #F2E8CF dotted;
        min-width: 1.2em;
        margin: 0em 0.3em;
    }

    sendable {
        cursor: pointer;
        transition-duration: 200ms;
        transition-property: color;
    }

    sendable:active {
        color: #EFA48B;
        transition-duration: 200ms;
        transition-property: color;
    }

    .character-sheet-container {  display: grid;
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
        "ability-scores-bonuses character-stats features-traits"
        "ability-scores-bonuses character-stats features-traits"
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
        justify-content: flex-end;
        align-items: center;
    }

    .box-main-text {
        margin-top: auto;
        margin-bottom: -0.6vw;
    }

    .box-justify-filler {
        margin-top: auto; 
        height: 0;
    }
    
    .box-label {
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

    .ability-score-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 90%;
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

    .skills {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        text-align: center;
        width: inherit;
        height: 7em;
        font-family: Quicksand;
        font-size: medium;
        text-transform: capitalize;
    }

    .skill-field {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .skill-prof-icon {
        cursor: pointer; 
        height: 1.4em; 
        width: 1.4em;
    }

    .additional-skill-box {
        padding: 0.4em;
    }

    .additional-skill-box .box-main-text {
        font-weight: bold;
        font-size: 1.2em;
        padding-bottom: 0.8em;
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

    .armor-class box {
        width: 5em;
        height: 5em;
        border: 0.5em solid transparent;
        border-radius: 50% 50% 50% 50% / 12% 12% 70% 70%;
    }

    .armor-class box .box-main-text {
        font-size: 1.5em;
        font-weight: bold;
    }

    .armor-class box .box-label {
        width: 5em;
        margin-bottom: -0.25em;
    }

    .speed { grid-area: speed; }

    .exhaustion { grid-area: exhaustion; }
    
    .exhaustion .box-main-text {
        display: flex;
        gap: 0.2em;
    }

    .exhaustion .skill-prof-icon {
        width: 1.8em; 
        height: 1.8em;
    }

    .death-saves { grid-area: death-saves; }
    .hit-points { grid-area: hit-points; }
    .hit-dice { grid-area: hit-dice; }

    .other-prof-languages { grid-area: other-prof-languages;
        margin: 0em 0.75em 0em 0em;
    }

    .equipment { grid-area: equipment; 
    
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