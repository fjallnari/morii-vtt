<script lang="ts">
    import CharacterSheetMenu from "../Components/CharSheetMenu.svelte";
    import { nanoid } from 'nanoid/non-secure'
    import type { Character5E, Spell } from "../../../../interfaces/5E/Character5E";
    import Spellcasting from "../Components/Spellcasting.svelte";
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";
    import BoxWithList from "../../../BoxWithList.svelte";
    import SpellDetail from "../Components/SpellDetail.svelte";
    import { modifyCharacter } from "../../../../stores";

    export let character: Character5E;

    const addNewSpell = (spellLevel: number, spellTemplate: object = {}) => {
        const spellSkeleton: Spell = {
            id: nanoid(16),
            name: '',
            level: spellLevel,
            is_prepared: false,
            casting_time: '',
            ritual: false,
            range: '',
            school: '',
            components: {
                verbal: false,
                somatic: false,
                material: false,
                materials_needed: ''
            },
            duration: '',
            concentration: false,
            description: '',
            higher_levels: ''
        }

        character.spells_by_level[spellLevel].spells = character.spells_by_level[spellLevel].spells.concat([Object.assign(spellSkeleton, { ...spellTemplate, level: spellLevel })]);
    };

    const spellGridClasses = ['cantrips'].concat([...Array(9)].map((_, i) => `level-${1 + i}`)); // ~= ['cantrips', 'level-1', 'level-2', etc.]

    const deleteSpell = (spell: Spell) => {
        character.spells_by_level[spell.level].spells = character.spells_by_level[spell.level].spells.filter(obj => obj.id !== spell.id);
        $modifyCharacter();
    }

</script>

<tab-container>
    <Spellcasting bind:character={character} addNewSpell={addNewSpell}></Spellcasting>
    {#each spellGridClasses as spellGridClass, spellLevel}
        <div class= "main-spell-box" style="grid-area: {spellGridClass};">
            {#if spellLevel !== 0}
                <div class="spell-slots">
                    <InPlaceEditBox bind:value={character.spells_by_level[spellLevel].slots_total}
                        boxLabel="Slots Total"
                        inlineStyle="margin-top: 0.5em;"
                        editWidth="2em"
                        editHeight="2em"
                    />
                    <InPlaceEditBox bind:value={character.spells_by_level[spellLevel].slots_current}
                        boxLabel="Current"
                        inlineStyle="margin-bottom: 0.5em;"
                        editWidth="2em"
                        editHeight="2em"
                    />
                </div>
            {/if}
            <BoxWithList 
                label={spellGridClass.split('-').join(' ')}
                styleClass={spellLevel === 0 ? '' : 'spell-box-with-slots'} 
                addNewListItem={() => addNewSpell(spellLevel)}
            >
                <div class="spell-list" slot='list'>
                    {#each character.spells_by_level[spellLevel].spells as spell}
                        <SpellDetail bind:spell={spell} bind:character={character} deleteSpellFce={() => deleteSpell(spell)}></SpellDetail>
                    {/each}  
                </div>
            </BoxWithList>
        </div>
    {/each}
    <CharacterSheetMenu />
</tab-container>

<style>
    tab-container {
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1.2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        gap: 0.5em 0.5em;
        box-sizing: border-box;
        padding: 0.75em;
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

    :global(.spell-slots box) {
        width: 3.5em;
        height: 1em;
        margin-right: 2em;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    :global(.spell-slots .box-main-text) {
        font-size: 1.2em;
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