<script lang="ts">
    import IconButton, { Icon } from '@smui/icon-button';
    import InPlaceEdit from "../InPlaceEdit.svelte";

    import type { AbilitySkill, Character } from "../../interfaces/Character";
    import axios from "axios";
    import { accessToken, formatModifier, getASModifier, modifyCharacter, sendSkillCheck, socket, user } from "../../stores";
    import { params } from "svelte-spa-router";
    import HpBar from './CharacterSheet/HpBar.svelte';
    import InPlaceEditBox from './CharacterSheet/InPlaceEditBox.svelte';
    import ArmorClass from './CharacterSheet/ArmorClass.svelte';
    import Exhaustion from './CharacterSheet/Exhaustion.svelte';
    import DeathSaves from './CharacterSheet/DeathSaves.svelte';
    import HitDice from './CharacterSheet/HitDice.svelte';
    import Attacks from './CharacterSheet/Attacks.svelte';
    import Equipment from './CharacterSheet/Equipment.svelte';
    import ToolsOtherProf from './CharacterSheet/ToolsOtherProf.svelte';
    import Features from './CharacterSheet/Features.svelte';

    export let character: Character;

    $socket.on('change-character', (modifiedCharacter: Character) => {
        character = modifiedCharacter;
    });

    // modifyCharacter is inside global store
    modifyCharacter.set(async () => {
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
	})

    sendSkillCheck.set(async (modifier: number, skillName: string, dice_type = 'd20') => {
        $socket.emit('chat-message', {
            senderInfo: {
                _id: $user._id, 
                username: $user.username,
                settings: $user.settings,
            }, 
            messageText: `/r ${dice_type}${$formatModifier(modifier, "always")}`,
            skillCheckInfo: {
                characterName: character.name,
                skillName: skillName
            },
            gameID: $params.id,
            isPublic: true // make isMessagePublic a store variable
        });
    });

    /**
     * Formats modifier to show plus signs if the modifier is positive
     */
    formatModifier.set((modifier: number, signDisplay: ("exceptZero" | "always" | "auto" | "never") = "exceptZero") => {
        return new Intl.NumberFormat("en-US", {
            signDisplay: signDisplay
        }).format(modifier);
    });

    /**
     * 
     * @param AS - ability score tag, e.g. 'WIS', 'DEX', 'STR' ...
     */
    getASModifier.set((AS: string) => {
        return (~~(character.ability_scores[AS] ? character.ability_scores[AS].value : 0) - 10) / 2 >> 0;
    });

    const getSkill = (AS: string, skillName: string) => {
        return character.ability_scores[AS].skills.find(skill => skill.name === skillName);
    }

    const getSkillModifier = (AS: string, skill: AbilitySkill) => {
        return $getASModifier(AS) + (skill.proficiency * ~~character.prof_bonus);
    }

    const getSavingThrowModifier = (AS: string) => {
        return $getASModifier(AS) + (character.ability_scores[AS].saving_throw ? ~~character.prof_bonus : 0);
    }

    const correctHP = () => {
        character.hp_current = ~~character.hp_current > ~~character.hp_max ? character.hp_max : character.hp_current;
    }

</script>


<div class="character-sheet-container">
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
            <div class="row-box-with-label">
                <box class="row-box-value">
                    <InPlaceEdit bind:value={character.prof_bonus} editWidth="2em" editHeight="2em" on:submit={() => $modifyCharacter()}/>
                </box>
                <box class="row-box-label">
                    Proficiency Bonus    
                </box>
            </div>
            <div class="row-box-with-label">
                <!-- inverts inspiration value on click -->
                <box class="row-box-value" style="cursor: pointer;" on:click={() => { character.inspiration = !character.inspiration; $modifyCharacter() }}>
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
                            {$formatModifier($getASModifier(AS))}
                        </box>

                        <div class="ability-score-value">
                            <InPlaceEditBox 
                                bind:value={character.ability_scores[AS].value}
                                boxLabel={character.ability_scores[AS].name}
                                inlineStyle="flex-grow: 2;" 
                                editWidth="2em">
                            </InPlaceEditBox>
                        </div>
                    </div>

                    <div class="skills">
                        <div class="skill-field">
                            <img class="skill-prof-icon" 
                                src="../static/rhombus{character.ability_scores[AS].saving_throw ? '' : '-outline'}.svg" 
                                alt="rhombus"
                                on:click={() => { character.ability_scores[AS].saving_throw = !character.ability_scores[AS].saving_throw; $modifyCharacter() }}
                            >
                            <mod>
                                {$formatModifier(getSavingThrowModifier(AS))}
                            </mod>
                            <sendable on:click={() => { $sendSkillCheck(getSavingThrowModifier(AS), `${AS} saving throw`) }}>{AS} saving throws<br></sendable>
                        </div>
                        {#each character.ability_scores[AS].skills as skill}
                            <div class="skill-field">
                                <!-- cycles through proficiency values 0, 1 and 2 -->
                                <img class="skill-prof-icon" 
                                    src="../static/{['checkbox-blank-outline', 'checkbox-marked', 'flare'][skill.proficiency]}.svg" 
                                    alt="checkbox"
                                    on:click={() => { skill.proficiency += 1 + (skill.proficiency === 2 ? -3 : 0); $modifyCharacter() }}
                                >
                                <mod>{$formatModifier(getSkillModifier(AS, skill))}</mod>
                                <sendable on:click={() => { $sendSkillCheck(getSkillModifier(AS, skill), skill.name) }}>{skill.name}<br></sendable>
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
                                    {$formatModifier($getASModifier('DEX') + ~~character.initiative_bonus)}
                                </div>
                                <div class="box-justify-filler"></div>
                                <sendable class="box-label" on:click={() => $sendSkillCheck(($getASModifier('DEX') + ~~character.initiative_bonus), `initiative`)}>
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
            <ArmorClass bind:value={character.armor_class}></ArmorClass>
        </div>

        <div class="speed">
            <box class="max-speed-box box-with-label">
                <div class="box-main-text">
                    <InPlaceEdit bind:value={character.speed_max} editWidth="2em" editHeight="2em" on:submit={() => $modifyCharacter()}/>ft.
                </div>
                <div class="box-justify-filler"></div>
                <div class="box-label">
                    Max
                </div>
            </box>
            <box class="current-speed-box box-with-label">
                <div class="box-main-text">
                    {~~character.speed_max + ~~character.speed_bonus}ft.
                </div>
                <div class="box-justify-filler"></div>
                <div class="box-label">
                    Speed
                </div>
            </box>
        </div>

        <div class="hit-points">
            <div class="hp-double-box">
                <InPlaceEditBox bind:value={character.hp_max} 
                    boxLabel="Max" 
                    inlineStyle="margin-top: 0.5em;" 
                    editWidth="2em" 
                    editHeight="2em" 
                    onSubmitFce={() => { correctHP(); $modifyCharacter()}}>
                </InPlaceEditBox>
                <InPlaceEditBox bind:value={character.hp_temp} boxLabel="Temp" inlineStyle="margin-bottom: 0.5em;" editWidth="2em" editHeight="2em"></InPlaceEditBox>
            </div>
            <box class="hp-main-box">
                <HpBar character={character}></HpBar>
                <div class="current-hp-text">
                    <InPlaceEdit bind:value={character.hp_current} editWidth="2em" editHeight="2em" on:submit={() => { correctHP(); $modifyCharacter(); }}/>
                </div>
                <div class="box-label hp-footer">
                    Hit Points
                </div>
            </box>
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

    <div class="equipment">
        <Equipment bind:character={character}></Equipment>
    </div>

    <div class="other-prof-languages">
        <ToolsOtherProf bind:character={character}></ToolsOtherProf>
    </div>

    <div class="features-traits">
        <Features bind:character={character}></Features>
    </div>

    <div id="char-sheet-menu">
        <IconButton class="material-icons" style="color: #A7C284; font-size: xx-large;" ripple={false} on:click={() => {}}>home</IconButton>
        <IconButton class="material-icons" style="color: #DBD8B3; font-size: xx-large;" ripple={false} on:click={() => {}}>article</IconButton>
        <IconButton class="material-icons" style="color: #EFA48B; font-size: xx-large;" ripple={false} on:click={() => {}}>local_fire_department</IconButton>
        <IconButton class="material-icons" style="color: #9DB5B2; font-size: xx-large;" ripple={false} on:click={() => {}}>settings</IconButton>
    </div>
</div>


<style>
    :global(box) {
        background-color:#252529;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    mod {
        font-weight: bold;
        border-bottom: 1px #F2E8CF dotted;
        min-width: 1.2em;
        margin: 0em 0.3em;
    }

    :global(sendable) {
        cursor: pointer;
        transition-duration: 200ms;
        transition-property: color;
    }

    :global(sendable:active) {
        color: var(--primary-accent-color);
        transition-duration: 200ms;
        transition-property: color;
    }

    :global(delete-button) {
        background-color: var(--delete-button-background-color);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        width: 100%;
        cursor: pointer;
        transition-duration: 200ms;
        transition-property: color;
        font-size: 1em;
        font-weight: bold;
        font-family: Athiti;
        text-transform: uppercase;
    }

    :global(delete-button:active) {
        background-color: #A43D42;
        transition-duration: 200ms;
        transition-property: color;        
    }

    :global(textarea) {
        width: 100%;
        padding: 0.5em 0.5em;
        box-sizing: border-box;
        border: 1px solid #ffffff8a;
        border-radius: 4px;
        background-color: transparent;
        font-size: 1em;
        font-family: Athiti;
        color: var(--primary-text-color);
        resize: none;
        scrollbar-width: thin;
    }

    :global(textarea:focus) {
        outline: none !important;
        border: 2px solid var(--primary-accent-color);
        caret-color: var(--primary-accent-color);
    }

    :global(select) {
        background-color: var(--secondary-box-background-color);
        color: inherit;
        border: none;
        font-size: inherit;
        font-family: inherit;
        cursor: pointer;
        border-radius: 4px;
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
        "ability-scores-bonuses character-stats other-prof-languages"
        "ability-scores-bonuses character-stats features-traits"
        "ability-scores-bonuses attacks features-traits"
        "ability-scores-bonuses attacks features-traits"
        "ability-scores-bonuses equipment features-traits"
        "ability-scores-bonuses equipment features-traits"
        "ability-scores-bonuses equipment features-traits"
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

    :global(.box-with-label) {
        flex-grow: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }

    :global(.box-main-text) {
        margin-top: auto;
        margin-bottom: -0.6vw;
    }

    :global(.box-justify-filler) {
        margin-top: auto; 
        height: 0;
    }
    
    :global(.box-label) {
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

    .ability-score-value :global(.box-main-text) {
        margin-bottom: -1.5em
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

    .speed .max-speed-box {
        height: 65%;
        width: 3em;
        margin-right: 1em;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .speed .max-speed-box .box-main-text {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .speed .current-speed-box {
        height: 85%;
        width: 50%;
        margin-left: -1em;
    }

    .speed .current-speed-box .box-main-text {
        font-weight: bold;
        font-size: 1.2em;
    }

    .exhaustion { grid-area: exhaustion; }

    .death-saves { grid-area: death-saves; }

    .hit-points { grid-area: hit-points; 
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .hit-points .hp-main-box {
        display: grid; 
        grid-template-columns: 1fr; 
        grid-template-rows: 1fr 1fr; 
        gap: 0.5em 0px; 
        grid-template-areas: 
            "hp-bar"
            "current-hp-text"
            "hp-footer";
        
        margin-left: -2em;
        height: 100%;
    }

    .hit-points .hp-main-box .current-hp-text {
        grid-area: current-hp-text;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
        font-weight: bold;
    }

    .hp-footer { grid-area: hp-footer;
    }

    .hit-points .hp-double-box {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        align-items: center;
        height: 100%;
    }

    .hit-points .hp-double-box :global(box) {
        width: 4em;
        height: 1em;
        margin-right: 2em;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
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

    .equipment { grid-area: equipment;
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

    #char-sheet-menu { grid-area: char-sheet-menu;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;
        margin-bottom: 0.5em;
    }

</style>