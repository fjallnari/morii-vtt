<script lang="ts">
    import axios from "axios";
    import { params } from "svelte-spa-router";
    import { sendSkillCheck, user } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import SimpleIconButton from "../../../SimpleIconButton.svelte";
    import type MonsterDataCairn from "../../../../interfaces/Cairn/MonsterDataCairn";
    import SvelteMarkdown from "svelte-markdown";
    import HtmlRendererOverride from "../../../HTMLRendererOverride.svelte";
    import Icon from "@iconify/svelte";
    import SimpleButton from "../../../SimpleButton.svelte";

    export let monster: MonsterDataCairn;
    export let addMonster: (monsterTemplate?: {}) => Promise<MonsterDataCairn>;
    export let monsterChosenObj: MonsterDataCairn;

    let isFavorite: boolean = false;
    let editModeON: boolean = false;

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
                    cairn: Object.assign($user.gameData.cairn, {
                        monsters: $user.gameData.cairn.monsters.filter(monsterIter => monsterIter.id !== monster.id)
                    })
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
                    cairn: Object.assign($user.gameData.cairn, {
                        monsters: $user.gameData.cairn.monsters.map(monsterIter => {
                            if (monsterIter.id === monster.id) {
                                return monster;
                            }
                            return monsterIter;
                        })
                    })
                })
            }));
		}

		catch (err) {
            console.log(err);
		}
    }

    const sendAttack = (attack: string) => {
        const splitAttack = attack.split('(');
        let damage = splitAttack[1]?.replace(')', '') ?? '';
        let name = `${splitAttack[0]} (${damage})`;

        if (damage.includes(',')) {
            damage = damage.split(',')[0];
        }

        $sendSkillCheck(0, `${monster.name.toLowerCase()} | ${name}`, '', '-', '-', '-', damage);
    }

    const sendAbility = (ability: string) => {
        $sendSkillCheck(0, `${monster.name.toLowerCase()} | ${ability} save (<=${monster[ability]}) | `, '', '-', 'd20', '', '', '', 'roll-under', ~~monster[ability]);
    }

    const addAttack = async () => {
        monster.attacks = monster.attacks.concat(['']);
        editMonster();
    }

    const deleteAttack = async (indexToRemove: number) => {
        monster.attacks = monster.attacks.filter((_, index) => index != indexToRemove);
        editMonster();
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
        <div class="monster-menu">
            {#if monster.is_custom}
                <SimpleIconButton
                    icon={`mdi:${editModeON ? 'content-save-check': 'edit'}`}
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
    <div class="stats cairn-monster-markdown">
        <div class="stats-line">
            <div class="single-stat">
                <div class="stat-text">
                    {#if editModeON}
                        <InPlaceEdit bind:value={monster.hp} editWidth="2rem" editHeight="1.5rem" on:submit={() => editMonster()}/>
                    {:else}
                        {monster.hp ?? '0'}
                    {/if}
                </div>
                <Icon class="medi-icon" icon="mdi:heart" color="var(--clr-contrast-normal)" />
            </div>
            {#if monster.armor && monster.armor !== "" || editModeON}
                <div class="single-stat">
                    <div class="stat-text">
                        {#if editModeON}
                            <InPlaceEdit bind:value={monster.armor} editWidth="2rem" editHeight="1.5rem" on:submit={() => editMonster()}/>
                        {:else}
                            {monster.armor ?? '0'}
                        {/if}
                    </div>
                    <Icon class="medi-icon" icon="mdi:shield-half-full" color="gray" />
                </div>
            {/if}
            <div class="divider">|</div>
            {#each ['str', 'dex', 'wil'] as ability}
                {#if editModeON}
                    <div class="single-stat">
                        <div class="stat-text">
                            <InPlaceEdit bind:value={monster[ability]} editWidth="2rem" editHeight="1.5rem" on:submit={() => editMonster()}/>
                        </div>
                        <strong>{ability.toUpperCase()}</strong>
                    </div>
                {:else}
                    <sendable class="single-stat" on:click={() => sendAbility(ability)} on:keyup={() => {}}>
                        <div class="stat-text">
                            {monster[ability] ?? '10'}
                        </div>
                        <strong>{ability.toUpperCase()}</strong>
                    </sendable>
                {/if}
            {/each}
            {#if (monster.special && monster.special !== "") || editModeON}
                <div class="divider">|</div>
                <div class="single-stat">
                    <div class="stat-text">
                        {#if editModeON}
                            <InPlaceEdit bind:value={monster.special} editWidth="12rem" editHeight="1.5rem" on:submit={() => editMonster()}/>
                        {:else}
                            {monster.special}
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
        <div class="stats-line">
            {#each monster.attacks ?? [] as attack, index}
                {#if editModeON}
                    <div class="single-stat">
                        <div class="stat-text">
                            <InPlaceEdit bind:value={attack} editWidth="12rem" editHeight="1.5rem" on:submit={() => editMonster()}/>
                        </div>
                        <sendable on:click={() => deleteAttack(index)} on:keyup={() => {}}>
                            <Icon class="medi-icon" icon="mdi:delete" color="var(--clr-contrast-normal)" />
                        </sendable>

                    </div>
                {:else}
                    <sendable class="single-stat" on:click={() => sendAttack(attack)} on:keyup={() => {}}>
                        <div class="stat-text">
                            {attack}
                        </div>
                        <Icon class="medi-icon" icon="mdi:sword" />
                    </sendable>
                {/if}
            {/each}
        </div>
        {#if editModeON}
            <div class="button-wrapper">
                <SimpleButton
                    value={`Add attack`}
                    icon="mdi:sword"
                    iconClass='medi-icon'
                    type="primary"
                    onClickFn={() => addAttack()}>
                </SimpleButton>
            </div>
            <!-- <textarea style="height: 6em; margin: 0.5em 0em;" bind:value={monster.stats} on:change={() => editMonster()}></textarea> -->
            <textarea class="description-edit" bind:value={monster.description} on:change={() => editMonster()}></textarea>
        {:else}
            <SvelteMarkdown source={monster.description ?? '???'} renderers={{html: HtmlRendererOverride}}/>
        {/if}

    </div>
</monster-detail>

<style>
    monster-detail { grid-area: monster-detail;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 8fr;
        gap: 0.5em;
        grid-template-areas:
            "name name name name name"
            "stats stats stats stats stats"
    }

    .name { grid-area: name;
        display: grid;
        grid-template-columns: 8fr 1fr;
        grid-template-rows: 1fr;
        gap: 0.25em;
        margin-right: 1em;
        border-bottom: 1px var(--clr-text) solid;
        grid-template-areas:
            "monster-name monster-menu"
    }

    .monster-name { grid-area: monster-name;
        display: flex;
        align-items: center;
        font-size: 1.2em;
        font-family: Montserrat;
        text-transform: uppercase;
        font-weight: 400;
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
        padding: 0.1em 1em 4px 0em;
        margin-bottom: 2em;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: thin;
        text-align: left;
        line-height: 1.5em;
        width: 100%;
    }

    .stats-line {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        padding-top: 0.1em;
        flex-flow: wrap;
        text-align: center;
    }

    .single-stat {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5em;
        padding-left: 0.5em;
        font-family: Athiti;
        white-space: nowrap;
    }

    .divider {
        padding-left: 0.5em;
    }

    :global(.cairn-monster-markdown > p) {
        margin: 0.5em 0.25em;
    }

    /* :global(.cairn-monster-markdown > ul) {
        margin: 0em;
    } */

    .description-edit {
        height: 100%;
        margin-top: 0.5em;
    }

    .button-wrapper {
        width: 40%;
        margin: 0.5em;
    }

</style>
