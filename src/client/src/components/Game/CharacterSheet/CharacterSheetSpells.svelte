<script lang="ts">
    import CharacterSheetMenu from "./Components/CharSheetMenu.svelte";
    import { v4 as uuidv4 } from 'uuid';
    import type { Character, Spell } from "../../../interfaces/Character";
    import Spellcasting from "./Components/Spellcasting.svelte";
    import InPlaceEditBox from "../../InPlaceEditBox.svelte";
    import BoxWithList from "../../BoxWithList.svelte";
    import SpellDetail from "./Components/SpellDetail.svelte";

    export let character: Character;

    const addNewSpell = (spellLevel: number, spellTemplate: object = {}) => {
        const spellSkeleton: Spell = {
            id: uuidv4(),
            name: '',
            level: spellLevel,
            is_prepared: false,
            casting_time: '',
            is_ritual: false,
            range: '',
            school: '',
            components: {
                verbal: false,
                somatic: false,
                material: false,
                material_content: ''
            },
            duration: '',
            concentration: false,
            description: '',
            at_higher_levels: ''
        }

        character.spells_by_level[spellLevel].spells = character.spells_by_level[spellLevel].spells.concat([Object.assign(spellSkeleton, { ...spellTemplate })]);
    };

    const spellGridClasses = ['cantrips'].concat([...Array(9)].map((_, i) => `level-${1 + i}`)); // ~= ['cantrips', 'level-1', 'level-2', etc.]

</script>

<tab-container>
    <Spellcasting bind:character={character} addNewSpell={addNewSpell}></Spellcasting>
    {#each spellGridClasses as spellGridClass, spellLevel}
        <div class= "main-spell-box {spellGridClass}">
            {#if spellLevel !== 0}
                <div class="spell-slots">
                    <InPlaceEditBox bind:value={character.spells_by_level[spellLevel].slots_total} boxLabel={'Slots Total'} 
                        inlineStyle="margin-top: 0.5em;"
                        editWidth="2em" editHeight="2em">
                    </InPlaceEditBox>
                    <InPlaceEditBox bind:value={character.spells_by_level[spellLevel].slots_current} boxLabel={'Current'} 
                        inlineStyle="margin-bottom: 0.5em;"
                        editWidth="2em" editHeight="2em">
                    </InPlaceEditBox>
                </div>
            {/if}
            <BoxWithList label={spellGridClass.split('-').join(' ')} styleClass={spellLevel === 0 ? '' : 'spell-box-with-slots'} addNewListItem={() => addNewSpell(spellLevel)}>
                <div class="spell-list" slot='list'>
                    {#each character.spells_by_level[spellLevel].spells as spell}
                        <SpellDetail bind:spell={spell} bind:character={character}></SpellDetail>
                    {/each}  
                </div>
            </BoxWithList>
        </div>
    {/each}
    <CharacterSheetMenu></CharacterSheetMenu>
</tab-container>

<style>
    tab-container {
        height: inherit;
        flex: 5;

        background-color: #212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        
        font-weight: 100;
        font-family: Quicksand;

        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1.25fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        gap: 0.5em 0.5em; 
        grid-template-areas: 
            "cantrips cantrips cantrips spellcasting spellcasting spellcasting level-6 level-6 level-6"
            "cantrips cantrips cantrips level-3 level-3 level-3 level-6 level-6 level-6"
            "cantrips cantrips cantrips level-3 level-3 level-3 level-6 level-6 level-6"
            "cantrips cantrips cantrips level-3 level-3 level-3 level-7 level-7 level-7"
            "level-1 level-1 level-1 level-3 level-3 level-3 level-7 level-7 level-7"
            "level-1 level-1 level-1 level-4 level-4 level-4 level-7 level-7 level-7"
            "level-1 level-1 level-1 level-4 level-4 level-4 level-8 level-8 level-8"
            "level-1 level-1 level-1 level-4 level-4 level-4 level-8 level-8 level-8"
            "level-2 level-2 level-2 level-5 level-5 level-5 level-8 level-8 level-8"
            "level-2 level-2 level-2 level-5 level-5 level-5 level-9 level-9 level-9"
            "level-2 level-2 level-2 level-5 level-5 level-5 level-9 level-9 level-9"
            "level-2 level-2 level-2 char-sheet-menu char-sheet-menu char-sheet-menu level-9 level-9 level-9";
    }

    .box-with-label {
        height: auto;
    }

    .main-spell-box {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(.spell-box-with-slots) {
        margin-left: -2em;
        align-items: normal;
    }

    .spell-list {
        width: 95%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0.25em;
    }

    .spell-slots {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        align-items: center;
        height: 85%;
    }

    .spell-slots :global(box) {
        width: 3.5em;
        height: 1em;
        margin-right: 2em;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .spell-slots :global(.box-main-text) {
        font-size: 1.2em;
    }

    :global(.spellcasting-container) { grid-area: spellcasting; 
        margin-top: var(--outer-edge-margin);
    }

    :global(.cantrips) { grid-area: cantrips; 
        margin: var(--outer-edge-margin) 0em 0em var(--outer-edge-margin);
    }

    :global(.level-1) { grid-area: level-1; 
        margin-left: var(--outer-edge-margin);
    }

    :global(.level-2) { grid-area: level-2; 
        margin: 0em 0em 0.5em var(--outer-edge-margin);
    }

    :global(.level-3) { grid-area: level-3; }

    :global(.level-4) { grid-area: level-4; }

    :global(.level-5) { grid-area: level-5; }

    :global(.level-6) { grid-area: level-6; 
        margin: var(--outer-edge-margin) var(--outer-edge-margin) 0em 0em;
    }

    :global(.level-7) { grid-area: level-7; 
        margin-right: var(--outer-edge-margin);
    }

    :global(.level-8) { grid-area: level-8; 
        margin-right: var(--outer-edge-margin);
    }

    :global(.level-9) { grid-area: level-9; 
        margin: 0em var(--outer-edge-margin) 0.5em 0em;
    }

    :global(.tab-switch-container) {
        padding-top: 0.75em;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #1d1d22;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #757578;
        border: transparent;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #404044;
    }


</style>