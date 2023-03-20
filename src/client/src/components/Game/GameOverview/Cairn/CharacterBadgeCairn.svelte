<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { CharacterCairn } from "../../../../interfaces/Cairn/CharacterCairn";
    import { user } from "../../../../stores";
    import { getDefaultIfEmpty } from "../../../../util/util";

    export let character: CharacterCairn;

</script>

<character-badge>
    <div class="names">
        <div class="character-name">
            {getDefaultIfEmpty(character.name, '???')}
        </div>
        <div class="player-name">
            {$user?.gameData?.players.find(player => player._id === character.playerID)?.username}        
        </div>
    </div>
    <div class="character-hp single-stat">
        {#if ~~character.hp > 0 }
            <Icon class="medi-icon" icon="mdi:heart" color='var(--clr-contrast-normal)'/>
        {:else}
            <Icon class="medi-icon" icon="mdi:heart-broken" color='gray'/>
        {/if}
        <div class="stat-text">
            {getDefaultIfEmpty(character.hp)}/{getDefaultIfEmpty(character.hp_max)}
        </div>
    </div>
    <div class="character-armor single-stat">
        <Icon class="medi-icon" icon="mdi:shield-half-full" />
        <div class="stat-text">
            {getDefaultIfEmpty(character.armor)}
        </div>
    </div>
    <div class="character-slots single-stat">
        <Icon class="medi-icon" icon="mdi:cube" />
        <div class="stat-text">
            {getDefaultIfEmpty(character.slots_filled, '??')}/{getDefaultIfEmpty(character.slots)}
        </div>
    </div>
    <div class="character-ascores">
        {#each Object.keys(character.ability_scores) as abilityTag}
            <div class="single-stat">
                <div class="ability-tag">{abilityTag}</div>
                <div>{getDefaultIfEmpty(character.ability_scores[abilityTag].current)}</div>
            </div>
        {/each}
    </div>

</character-badge>

<style>
    character-badge {  display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
        width: 100%;
        height: 100%;
        font-family: Quicksand;
        grid-auto-flow: row;
        grid-template-areas:
            "names names"
            "names names"
            "names names"
            "character-hp character-ascores"
            "character-armor character-ascores"
            "character-slots character-ascores";
    }

    character-badge > div, .names > div, .character-ascores > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .names { grid-area: names;
        gap: 0.25em;
        flex-direction: column;
    }

    .character-name {
        font-size: 1.2em;
        font-weight: 500;
    }

    .player-name {
        color: var(--clr-accent-light);
    }

    .single-stat {
        justify-content: flex-start;
        gap: 0.5em;
        padding-left: 0.5em;
        font-family: Athiti;
    }

    .character-hp { grid-area: character-hp; }

    .character-armor { grid-area: character-armor; }

    .character-slots { grid-area: character-slots; }

    .character-ascores { grid-area: character-ascores; 
        flex-direction: column;
        gap: 0em;
        align-items: flex-start;
    }

    .ability-tag {
        font-weight: var(--semi-bold);
    }


</style>