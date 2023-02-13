<script lang="ts">
    import axios from "axios";
    import { params } from "svelte-spa-router";
    import { user } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import SimpleIconButton from "../../../SimpleIconButton.svelte";
    import type MonsterDataCairn from "../../../../interfaces/Cairn/MonsterDataCairn";
    import SvelteMarkdown from "svelte-markdown";
    import HtmlRendererOverride from "../../../HTMLRendererOverride.svelte";

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
    <div class="stats cairn-monster-markdown">
        {#if editModeON}
            <textarea style="height: 6em; margin: 0.5em 0em;" bind:value={monster.stats} on:change={() => editMonster()}></textarea>
            <textarea style="height: 100%;" bind:value={monster.description} on:change={() => editMonster()}></textarea>
        {:else}
            <SvelteMarkdown source={monster.stats ?? '???'} renderers={{html: HtmlRendererOverride}}/>
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
        margin-top: 1em;
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

    :global(.cairn-monster-markdown > p) {
        margin: 0.5em 0.25em;
    }

    :global(.cairn-monster-markdown > ul) {
        margin: 0em;
    }

</style>