<script lang="ts">
    import axios from "axios";
    import { params } from "svelte-spa-router";
    import ABILITY_TAGS from "../../../enum/AbilityTags";
    import type { MonsterData } from "../../../interfaces/MonsterData";
    import { formatModifier, user } from "../../../stores";
    import { convertValueToASMod, toSnakeCase } from "../../../util/util";
    import InPlaceEdit from "../../InPlaceEdit.svelte";
    import SimpleIconButton from "../../SimpleIconButton.svelte";
    import MonsterTraitDetail from "./MonsterTraitDetail.svelte";

    export let monster: MonsterData;
    export let addMonster: (monsterTemplate?: {}) => Promise<MonsterData>;
    export let monsterChosenObj: MonsterData;

    let isFavorite: boolean = false;
    let editModeON: boolean = false;

    const ACTION_TITLES = ['Actions', 'Legendary Actions', 'Reactions'];
    const STAT_TITLES = ['Saving Throws', 'Skills', 'Damage Resistances', 'Damage Immunities', 'Condition Immunities', 'Damage Vulnerabilities', 'Senses', 'Languages', 'Challenge'];

    // favorites and saves a monster
    const addMonsterToFavorites = async () => {
        isFavorite = !isFavorite;

        if (isFavorite && monster) {
            const { id, ... cleanMonster } = Object.assign(monster, { source: 'srd' });
            await addMonster(cleanMonster);
        }
    }

    const removeMonster = async () => {
        try {
            await axios.post('/api/remove-monster', {
                campaignID: $params.id,
                monsterID: monster.id
            });

            user.set(Object.assign($user, { 
                gameData: Object.assign($user.gameData, { 
                    monsters: $user.gameData.monsters.filter(monsterIter => monsterIter.id !== monster.id)
                })
            }));
            monsterChosenObj = undefined;
		}
		catch (err) {
            console.log(err);
		}
    }

</script>

<monster-detail>
    <div class="name">
        <div class="monster-name">
            {#if editModeON}
                <InPlaceEdit bind:value={monster.name} editWidth="15rem" editHeight="2rem" on:submit={() => {}}/>
            {:else}
                {monster.name}
            {/if}
        </div>
        <div class="monster-meta">
            <em>
            {#if editModeON}
                <InPlaceEdit bind:value={monster.meta} editWidth="15rem" editHeight="1.5rem" on:submit={() => {}}/>
            {:else}
                {monster.meta}
            {/if}
        </em>
        </div>
        <div class="monster-menu">
            {#if monster.is_custom}
                <SimpleIconButton 
                    icon={`mdi:${editModeON ? 'content-save-edit': 'hammer-wrench'}`}
                    color='var(--clr-accent-light)'
                    onClickFn={() => editModeON = !editModeON}>
                </SimpleIconButton>
                <SimpleIconButton 
                    icon='mdi:delete'
                    color='var(--clr-contrast-normal)'
                    onClickFn={() => removeMonster()}>
                </SimpleIconButton>
            {:else}
                <SimpleIconButton 
                    icon={`material-symbols:${isFavorite ? 'star-rounded': 'star-outline-rounded'}`}
                    color={isFavorite ? 'var(--clr-icon-owner)' : 'inherit'}
                    onClickFn={() => addMonsterToFavorites()}>
                </SimpleIconButton>
            {/if}
        </div>
    </div>
    <div class="stats">
        <div class="info-line">
            <b>Armor Class</b>
            {#if editModeON}
                <InPlaceEdit bind:value={monster.armor_class} editWidth="20rem" editHeight="2rem" on:submit={() => {}}/>
            {:else}
                {monster.armor_class}
            {/if}
        </div>
        <div class="info-line">
            <b>Hit Points</b>
            {#if editModeON}
                <InPlaceEdit bind:value={monster.hit_points} editWidth="20rem" editHeight="2rem" on:submit={() => {}}/>
            {:else}
                {monster.hit_points}
            {/if}
        </div>
        <div class="info-line">
            <b>Speed</b>
            {#if editModeON}
                <InPlaceEdit bind:value={monster.speed} editWidth="20rem" editHeight="2rem" on:submit={() => {}}/>
            {:else}
                {monster.speed}
            {/if}
        </div>
        <hr class="{editModeON ? 'edit-mode' : ''}">
        <div class="ability-scores">
            {#each ABILITY_TAGS.slice(1) as tag}
                <div class="ability-score">
                    <div class="as-tag">
                        <b>{tag}</b>                   
                    </div>
                    <div class="as-value">
                        {#if editModeON}
                            <InPlaceEdit bind:value={monster.ability_scores[tag]} editWidth="1.5rem" editHeight="1.5rem" on:submit={() => {}}/>
                            <div>
                                ({$formatModifier(convertValueToASMod(monster.ability_scores[tag]), 'always')})
                            </div>
                        {:else}
                            {monster.ability_scores[tag]}
                            <sendable on:click={() => {}} on:keyup={() => {}}>
                                ({$formatModifier(convertValueToASMod(monster.ability_scores[tag]), 'always')})
                            </sendable>
                        {/if}

                    </div>
                </div>
            {/each}
        </div>

        <hr class="{editModeON ? 'edit-mode' : ''}">
        {#each STAT_TITLES as statType}
            {#if editModeON || monster[`${toSnakeCase(statType)}`]}
                <div class="info-line">
                    <b>{statType}</b>
                    {#if editModeON}
                        <InPlaceEdit bind:value={monster[`${toSnakeCase(statType)}`]} editWidth="18rem" editHeight="2rem" on:submit={() => {}}/>
                    {:else}
                        {monster[`${toSnakeCase(statType)}`]} 
                    {/if}
                </div>
            {/if}
        {/each}

        <hr class="{editModeON ? 'edit-mode' : ''}">
        <div class="traits">
            {#if monster.traits}
                {#each monster.traits as trait}
                    <MonsterTraitDetail trait={trait}></MonsterTraitDetail>
                {/each}
            {/if}
        </div>
    </div>
    <div class="actions">
        {#each [monster.actions, monster.legendary_actions, monster.reactions] as actionType, index}
            {#if actionType && (actionType.length !== 0 || editModeON)}
                <div class="action-title">
                    {ACTION_TITLES[index]}
                    <hr class="{editModeON ? 'edit-mode' : ''}">
                </div>
                {#each actionType as trait}
                    <MonsterTraitDetail trait={trait}></MonsterTraitDetail>
                {/each}
            {/if}
        {/each}
    </div>
</monster-detail>

<style>
    monster-detail { grid-area: monster-detail;
        width: 100%;
        height: 100%;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        gap: 0.5em;
        margin-top: 1em;
        grid-template-areas: 
            "name name name name name actions actions actions actions actions"
            "stats stats stats stats stats actions actions actions actions actions"
            "stats stats stats stats stats actions actions actions actions actions"
            "stats stats stats stats stats actions actions actions actions actions"
            "stats stats stats stats stats actions actions actions actions actions"
            "stats stats stats stats stats actions actions actions actions actions"
            "stats stats stats stats stats actions actions actions actions actions"
            "stats stats stats stats stats actions actions actions actions actions"
            "stats stats stats stats stats actions actions actions actions actions"
            "stats stats stats stats stats actions actions actions actions actions"; 
    }

    hr {
        width: 100%;
        margin-right: auto;
        margin-left: 0;
        color: var(--clr-accent-normal);
    }

    hr.edit-mode {
        color: none;
        border: none;
        border-top: 2px dashed var(--clr-contrast-dark);
    }

    .ability-scores {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
    }

    .ability-score {
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        gap: 0.5em; 
        grid-template-areas: 
            "as-tag as-tag"
            "as-value as-value";         
    }

    .as-tag { grid-area: as-tag; }
    .as-value { grid-area: as-value; 
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25em;
    }

    .name { grid-area: name; 
        display: grid; 
        grid-template-columns: 8fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        gap: 0.25em;
        margin-right: 1em;
        border-bottom: 1px var(--clr-text) solid;
        grid-template-areas: 
            "monster-name monster-menu"
            "monster-meta monster-menu";
    }

    .monster-name { grid-area: monster-name; 
        display: flex;
        align-items: center;
        font-size: 1.2em;
        font-family: Montserrat;
        text-transform: uppercase;
        font-weight: 400;
    }

    .monster-meta { grid-area: monster-meta; 
        display: flex;
        align-items: flex-start;    
    }

    .monster-menu { grid-area: monster-menu; 
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }

    .stats { grid-area: stats; 
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.2em;
        padding: 0.1em 1em 1.4em 0em;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: thin;
    }

    .stats > .info-line {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        text-align: left;
    }

    .info-line b {
        white-space: nowrap;
    }

    .traits { 
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        text-align: left;
        margin-top: -0.4em;
    }

    :global(.traits p, .actions p) {
        margin: 0.4em 0em;
    }

    .actions { grid-area: actions; 
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.2em;
        padding: 0em 1.4em 1.4em 0em;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: thin;
        text-align: left;
    }

    .action-title {
        font-size: 1em;
        font-family: Montserrat;
        text-transform: uppercase;
        font-weight: 400;
        width: 100%;
        margin-top: 1em;
    }

</style>