<script lang="ts">
    import axios from "axios";
    import { params } from "svelte-spa-router";
    import ABILITY_TAGS from "../../../enum/AbilityTags";
    import type { MonsterData } from "../../../interfaces/MonsterData";
    import { formatModifier, user } from "../../../stores";
    import { convertValueToASMod, toSnakeCase } from "../../../util/util";
    import SimpleIconButton from "../../SimpleIconButton.svelte";
    import MonsterTraitDetail from "./MonsterTraitDetail.svelte";

    export let monster: MonsterData;

    let isFavorite: boolean = $user?.gameData.monsters.some(saved => saved.id === monster.id) ?? false;

    const ACTION_TITLES = ['Actions', 'Legendary Actions', 'Reactions'];
    const STAT_TITLES = ['Saving Throws', 'Skills', 'Damage Resistances', 'Damage Immunities', 'Condition Immunities', 'Damage Vulnerabilities', 'Senses', 'Languages', 'Challenge'];

    const getSimpleMonster = () => {
        return {
            id: monster.id, 
            name: monster.name, 
            cr: monster.challenge.split(' (')[0], 
            type: monster.meta.split(' ')[1].replace(',', '') 
        }
    }

    // either favorites and saves a monster or does the opposite
    const changeMonsterStatus = async () => {
        isFavorite = !isFavorite;
        const simpleMonster = getSimpleMonster();

		try {
            axios.post('/api/favorite-monster', {
                campaignID: $params.id,
                monster: simpleMonster,
                isFavorite: isFavorite
            });

            const updatedMonsters = isFavorite ? $user?.gameData?.monsters.concat([simpleMonster]) : $user?.gameData?.monsters.filter(saved => saved.id !== monster.id);
            user.set(Object.assign($user, { gameData: Object.assign($user.gameData, { monsters: updatedMonsters})}));
		}
		catch (err) {
            console.log(err);
		}
    }

</script>

<monster-detail>
    <div class="name">
        <div class="monster-name">
            {monster.name}
        </div>
        <div class="monster-meta">
            <em>{monster.meta}</em>
        </div>
        <div class="favorite-monster">
            <SimpleIconButton 
                icon={`material-symbols:${isFavorite ? 'star-rounded': 'star-outline-rounded'}`}
                color={isFavorite ? 'var(--clr-icon-owner)' : 'inherit'}
                onClickFn={() => changeMonsterStatus()}>
            </SimpleIconButton>
        </div>
    </div>
    <div class="stats">
        <div class="info-line">
            <b>Armor Class</b>
            {monster.armor_class}
        </div>
        <div class="info-line">
            <b>Hit Points</b>
            {monster.hit_points}
        </div>
        <div class="info-line">
            <b>Speed</b>
            {monster.speed}
        </div>
        <hr>
        <div class="ability-scores">
            {#each ABILITY_TAGS.slice(1) as tag}
                <div class="ability-score">
                    <div class="as-tag">
                        <b>{tag}</b>                   
                    </div>
                    <div class="as-value">
                        {monster.ability_scores[tag]}
                        <sendable>
                            ({$formatModifier(convertValueToASMod(monster.ability_scores[tag]), 'always')})
                        </sendable>
                    </div>
                </div>
            {/each}
        </div>
        <hr>
        {#each STAT_TITLES as statType}
            {#if monster[`${toSnakeCase(statType)}`]}
                <div class="info-line">
                    <b>{statType}</b>
                    {monster[`${toSnakeCase(statType)}`]}
                </div>
            {/if}
        {/each}
        <hr>
        
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
            {#if actionType}
                <div class="action-title">
                    {ACTION_TITLES[index]}
                    <hr>
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
        margin: 0em 1em;
        border-bottom: 1px var(--clr-text) solid;
        grid-template-areas: 
            "monster-name favorite-monster"
            "monster-meta favorite-monster";
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

    .favorite-monster { grid-area: favorite-monster; 
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .stats { grid-area: stats; 
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.2em;
        padding: 0em 1em;
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
        padding: 0em 1em;
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