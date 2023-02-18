<script lang="ts">
    import axios from "axios";
    import { stat } from "fs";
    import { params } from "svelte-spa-router";
    import ABILITY_TAGS from "../../../../enum/AbilityTags";
    import type { MonsterData, MonsterTrait } from "../../../../interfaces/5E/MonsterData";
    import { formatModifier, messageMode, sendSkillCheck, user } from "../../../../stores";
    import { convertValueToASMod, toSnakeCase } from "../../../../util/util";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import SimpleButton from "../../../SimpleButton.svelte";
    import SimpleIconButton from "../../../SimpleIconButton.svelte";
    import SimpleAccordionDetail from "../../SimpleAccordionDetail.svelte";
    import MonsterAttackInner from "./MonsterAttackInner.svelte";
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

    const editMonster = async () => {
        try {
            await axios.post('/api/edit-monster', {
                campaignID: $params.id,
                modifiedMonster: monster
            });

            user.set(Object.assign($user, { 
                gameData: Object.assign($user.gameData, { 
                    monsters: $user.gameData.monsters.map(monsterIter => {
                        if (monsterIter.id === monster.id) {
                            return monster;
                        }
                        return monsterIter;
                    })
                    })
                }));
		    }

		catch (err) {
            console.log(err);
		}
    }

    const addTrait = async (traitField: string) => {
        monster[`${traitField}`] = monster[`${traitField}`].concat([{ name: '', content: '' }]);
        editMonster();
    }

    const deleteTrait = async (traitField: string, trait: MonsterTrait) => {
        monster[`${traitField}`] = monster[`${traitField}`].filter(traitIter => traitIter !== trait);
        editMonster();
    }

    const addAttack = async () => {
        monster.actions = monster.actions.concat([{ name: '', type: '', attack_info: '', attack_dmg: '---'}]);
        editMonster();
    }

    const sendASRoll = (tag: string) => {
        $sendSkillCheck(
            convertValueToASMod(monster.ability_scores[tag]), `${monster.name.toUpperCase()} | straight ${tag.toUpperCase()}`, '', '-', 'd20'
        );
    }

    const rollHP = () => {
        const hpFormula = monster.hit_points.split('(')[1]?.split(')')[0];
        $sendSkillCheck(0, `${monster.name.toUpperCase()} | hit points | ${hpFormula}`, '', '-', '-', '-', hpFormula);
    }

    const sendSkill = (skill: string, statType: string) => {
        const skillSplit = skill.trim().split(' ');
        const skillName = statType === "Saving Throws" ? `${skillSplit[0]} saving throw` : skillSplit[0].toLowerCase();
        $sendSkillCheck(~~skillSplit[1] ?? 0, `${monster.name.toUpperCase()} | ${skillName}`, '');
    }

</script>

<monster-detail>
    <div class="name">
        <div class="monster-name">
            {#if editModeON}
                <InPlaceEdit bind:value={monster.name} editWidth="15rem" editHeight="2rem" on:submit={() => editMonster()}/>
            {:else}
                {monster.name}
            {/if}
        </div>
        <div class="monster-meta">
            <em>
            {#if editModeON}
                <InPlaceEdit bind:value={monster.meta} editWidth="15rem" editHeight="1.5rem" on:submit={() => editMonster()}/>
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
                <InPlaceEdit bind:value={monster.armor_class} editWidth="fit-content" editHeight="2rem" on:submit={() => editMonster()}/>
            {:else}
                {monster.armor_class}
            {/if}
        </div>
        <div class="info-line">
            <b>Hit Points</b>
            {#if editModeON}
                <InPlaceEdit bind:value={monster.hit_points} editWidth="fit-content" editHeight="2rem" on:submit={() => editMonster()}/>
            {:else}
                <sendable on:click={() => rollHP()} on:keyup={() => {}}>
                    {monster.hit_points}
                </sendable>
            {/if}
        </div>
        <div class="info-line">
            <b>Speed</b>
            {#if editModeON}
                <InPlaceEdit bind:value={monster.speed} editWidth="fit-content" editHeight="2rem" on:submit={() => editMonster()}/>
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
                            <InPlaceEdit bind:value={monster.ability_scores[tag]} editWidth="1.5rem" editHeight="1.5rem" on:submit={() => editMonster()}/>
                            <div>
                                ({$formatModifier(convertValueToASMod(monster.ability_scores[tag]), 'always')})
                            </div>
                        {:else}
                            {monster.ability_scores[tag]}
                            <sendable on:click={() => sendASRoll(tag)} on:keyup={() => {}}>
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
                        <InPlaceEdit bind:value={monster[`${toSnakeCase(statType)}`]} editWidth="18rem" editHeight="2rem" on:submit={() => editMonster()}/>
                    {:else if statType === 'Skills' || statType === 'Saving Throws'}
                        {#each monster[`${toSnakeCase(statType)}`].split(',') as singleSkill}
                            <sendable on:click={() => sendSkill(singleSkill, statType)} on:keyup={() => {}}>                                
                                {singleSkill}
                            </sendable>
                        {/each}
                    {:else}
                        {monster[`${toSnakeCase(statType)}`]} 
                    {/if}
                </div>
            {/if}
        {/each}

        <hr class="{editModeON ? 'edit-mode' : ''}">
        <div class="traits-container">
            {#if editModeON}
                <SimpleButton value="Add trait" icon="mdi:text-box-plus" iconClass='big-icon' type="primary" onClickFn={() => addTrait('traits') }></SimpleButton>
            {/if}
            {#if monster.traits}
                <div class="traits-list {editModeON ? 'edit-mode' : ''}">
                    {#each monster.traits as trait}
                        {#if editModeON}
                            <SimpleAccordionDetail 
                                bind:value={trait.name} 
                                bind:content={trait.content}
                                icon='mdi:text-box'
                                editWidth='15rem'
                                editHeight='2rem'
                                onSubmitFn={editMonster}
                                deleteItem={() => deleteTrait('traits', trait)}>
                            </SimpleAccordionDetail>
                        {:else}
                            <MonsterTraitDetail trait={trait}></MonsterTraitDetail>          
                        {/if}
                    {/each}
                </div>
            {/if}
        </div>
    </div>
    <div class="actions {editModeON ? 'edit-mode' : ''}">
        {#each ["actions", "legendary_actions", "reactions"] as actionType, index}
            {#if monster[`${actionType}`] && (monster[`${actionType}`].length !== 0 || editModeON)}
                <div class="action-title">
                    {ACTION_TITLES[index]}
                    <hr class="{editModeON ? 'edit-mode' : ''}">
                </div>
                {#if editModeON}
                    <div class="actions-edit-buttons">
                        <SimpleButton 
                            value={`Add ${actionType.slice(0, -1).split('_').join(' ')}`} 
                            icon="mdi:text-box-plus" 
                            iconClass='big-icon' 
                            type="primary" 
                            onClickFn={() => addTrait(`${actionType}`)}>
                        </SimpleButton>
                        {#if actionType === "actions"}
                            <SimpleButton 
                                value={`Add attack`} 
                                icon="mdi:sword" 
                                iconClass='big-icon' 
                                type="green" 
                                onClickFn={() => addAttack()}>
                            </SimpleButton>
                        {/if}
                    </div>
                {/if}
                {#each monster[`${actionType}`] as trait}
                    {#if editModeON}
                        <SimpleAccordionDetail
                            bind:value={trait.name} 
                            bind:content={trait.content}
                            icon={trait.attack_dmg ? 'mdi:sword' : 'mdi:text-box'}
                            editWidth='15rem'
                            editHeight='2rem'
                            textareaHeight='15em'
                            useCustomComponent={trait.attack_dmg && true}
                            onSubmitFn={editMonster}
                            deleteItem={() => deleteTrait(actionType, trait)}
                        >
                            <span slot="custom-component">
                                {#if trait.attack_dmg}
                                    <MonsterAttackInner 
                                        bind:trait={trait}
                                        editMonster={editMonster}
                                        deleteItem={() => deleteTrait(actionType, trait)}>
                                    </MonsterAttackInner>
                                {/if}
                            </span>            
                        </SimpleAccordionDetail>
                    {:else}
                        <MonsterTraitDetail trait={trait}></MonsterTraitDetail>          
                    {/if}
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
        padding: 0.1em 1em 4px 0em;
        margin-bottom: 2em;
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

    .traits-container {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        margin-top: -0.4em;
        width: 100%;
    }

    :global(.traits-container > simple-button, .actions-edit-buttons > simple-button) {
        padding: 0.2em 1em;
        width: fit-content;
        font-size: 1.1rem;
        align-self: center;
        margin: 1em 0em;
    }

    .actions-edit-buttons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 1em;
    }

    .traits-list {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
        text-align: left;
    }

    .traits-list.edit-mode {
        gap: 0.4em;        
        text-align: center;
        align-items: center;
    }

    :global(.traits-list p, .actions p) {
        margin: 0.4em 0em;
    }

    .actions { grid-area: actions; 
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.2em;
        padding-right: 1.4em;
        padding-bottom: 4px;
        margin-bottom: 2em;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: thin;
        text-align: left;
    }

    .actions.edit-mode {
        gap: 0.4em;
        align-items: center;
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