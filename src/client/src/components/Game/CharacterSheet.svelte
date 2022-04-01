<script lang="ts">
    import type Campaign from "../../interfaces/Campaign";
    import type GameData from "../../interfaces/GameData";
    import IconButton from '@smui/icon-button';

    export let gameData: GameData;

</script>


<div class="character-sheet-container">
    <div class="character-basic-info">
    </div>
    <div class="ability-scores"></div>
    <div class="other-prof-languages"></div>
    <div class="equipment"></div>
    <div class="ac-init-speed"></div>
    <div class="hp-death-saves"></div>
    <div class="spellcasting-modifiers"></div>
    <div class="attacks"></div>
    <div class="features-traits"></div>
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
        
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 2fr 1fr 1fr 1fr 1fr 1fr 4fr 1fr 1fr 2fr 2fr 1fr; 
        gap: 1em 1em; 
        grid-template-areas: 
            "character-basic-info character-basic-info character-basic-info"
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

    .character-sheet-container div {
        background-color:#252529;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    .character-basic-info { display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 0px 0px;
        grid-auto-flow: row;
        grid-template-areas:
        ". . ."
        ". . ."
        ". . .";
        grid-area: character-basic-info;
        margin: 1em 1em 0em 1em;
    }

    .ability-scores { grid-area: ability-scores;
        margin-left: 1em;
    }

    .other-prof-languages { grid-area: other-prof-languages;
        margin: 0em 0em 1em 1em;
    }

    .equipment { grid-area: equipment; 
    
    }

    .ac-init-speed { grid-area: ac-init-speed;
        
    }

    .hp-death-saves { grid-area: hp-death-saves; 
    
    }

    .spellcasting-modifiers { grid-area: spellcasting-modifiers;
        margin-right: 1em; 
    }

    .attacks { grid-area: attacks;

    }

    .features-traits { grid-area: features-traits;
        margin: 0em 1em 1em 0em;
    }

    #char-sheet-menu { grid-area: char-sheet-menu;
        display: flex;
        background-color: #212125;
        box-shadow: none;
        border-radius: 0px;
        justify-content: center;
        align-items: center;
        gap: 1em;
        margin-bottom: 1em;
    }

</style>