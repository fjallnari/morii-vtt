<script lang="ts">
    import type { Character } from "../../interfaces/Character";
import { modifyCharacter } from "../../stores";
    import InPlaceEditBox from "./CharacterSheet/InPlaceEditBox.svelte";
    import CharacterSheetMenu from "./CharacterSheetMenu.svelte";

    export let character: Character;


</script>

<tab-container>
    <div class="character-additional-info">
        <InPlaceEditBox bind:value={character.age} boxLabel="Age" editWidth="5em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.height} boxLabel="Height" editWidth="5em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.weight} boxLabel="Weight" editWidth="5em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.eyes} boxLabel="Eyes" editWidth="5em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.skin} boxLabel="Skin" editWidth="5em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.hair} boxLabel="Hair" editWidth="5em"></InPlaceEditBox>
        <InPlaceEditBox bind:value={character.alignment} boxLabel="Alignment" editWidth="5em"></InPlaceEditBox>
    </div>
    <box class="appearance box-with-label">
        <textarea on:change={() => $modifyCharacter()} bind:value={character.appearance}></textarea>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Appearance
        </div>
    </box>
    <box class="backstory box-with-label">
        <textarea on:change={() => $modifyCharacter()} bind:value={character.backstory}></textarea>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Backstory
        </div>
    </box>
    <box class="allies-orgs box-with-label">
        <textarea on:change={() => $modifyCharacter()} bind:value={character.allies}></textarea>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Allies & Organisations
        </div>
    </box>
    <box class="enemies box-with-label">
        <textarea on:change={() => $modifyCharacter()} bind:value={character.enemies}></textarea>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Enemies
        </div>
    </box>
    <box class="treasury box-with-label">
        <textarea on:change={() => $modifyCharacter()} bind:value={character.treasure}></textarea>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Treasury
        </div>
    </box>
    <box class="personality-traits box-with-label">
        <textarea on:change={() => $modifyCharacter()} bind:value={character.person_traits}></textarea>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Personality Traits
        </div>
    </box>
    <box class="ideals box-with-label">
        <textarea on:change={() => $modifyCharacter()} bind:value={character.ideals}></textarea>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Ideals
        </div>
    </box>
    <box class="bonds box-with-label">
        <textarea on:change={() => $modifyCharacter()} bind:value={character.bonds}></textarea>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Bonds
        </div>
    </box>
    <box class="flaws box-with-label">
        <textarea on:change={() => $modifyCharacter()} bind:value={character.flaws}></textarea>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Flaws
        </div> 
    </box>
    <box class="other-notes box-with-label">
        <textarea on:change={() => $modifyCharacter()} bind:value={character.other_notes}></textarea>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Other Notes
        </div>
    </box>
    <CharacterSheetMenu></CharacterSheetMenu>
</tab-container>

<style>
    :root {
        --outer-edge-margin: 0.75em;
    }

    tab-container {
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr; 
        grid-template-rows: 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        gap: 0.5em 0.5em; 
        grid-template-areas: 
            "character-additional-info character-additional-info character-additional-info"
            "appearance allies-orgs personality-traits"
            "appearance allies-orgs personality-traits"
            "appearance allies-orgs personality-traits"
            "appearance allies-orgs ideals"
            "appearance enemies ideals"
            "appearance enemies ideals"
            "backstory enemies bonds"
            "backstory enemies bonds"
            "backstory treasury bonds"
            "backstory treasury flaws"
            "backstory treasury flaws"
            "backstory treasury flaws"
            "backstory treasury other-notes"
            "backstory treasury other-notes"
            "backstory char-sheet-menu other-notes"; 

        height: inherit;
        flex: 5;

        background-color: #212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        
        font-weight: 100;
        font-family: Quicksand;
    }

    textarea {
        border: transparent;
        height: 100%;
        font-family: Quicksand;
    }

    textarea:focus {
        outline: none !important;
        border: 2px solid var(--primary-accent-color);
        caret-color: var(--primary-accent-color);
    }

    .character-additional-info { grid-area: character-additional-info; 
        margin: 0.5em 0.5em 0em 0.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        color: #FCF7F8;
        font-size: 1.5em;
        gap: 0.35em;
    }

    .box-with-label {
        height: auto;
    }

    .appearance { grid-area: appearance;
        margin-left: var(--outer-edge-margin);

    }
    .backstory { grid-area: backstory;
        margin: 0em 0em 0.5em var(--outer-edge-margin);
    
    }
    .allies-orgs { grid-area: allies-orgs; }
    .enemies { grid-area: enemies; }
    .treasury { grid-area: treasury; }
    .personality-traits { grid-area: personality-traits; 
        margin-right: var(--outer-edge-margin);
    }
    .ideals { grid-area: ideals; 
        margin-right: var(--outer-edge-margin);
    }
    .bonds { grid-area: bonds; 
        margin-right: var(--outer-edge-margin);
    }
    .flaws { grid-area: flaws; 
        margin-right: var(--outer-edge-margin);
    }
    .other-notes { grid-area: other-notes; 
        margin: 0em var(--outer-edge-margin) 0.5em 0em;
    }

</style>