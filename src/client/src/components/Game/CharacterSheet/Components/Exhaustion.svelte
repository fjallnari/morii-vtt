<script lang="ts">
    import EXHAUSTION from '../../../../enum/ExhaustionInfo';
    import { modifyCharacter } from '../../../../stores';
    import { Tooltip } from "@svelte-plugins/tooltips";

    export let charExhaustion: number;
</script>

<box class="box-with-label">
    <div class="box-main-text">
        {#each Array.from({ length: 6 }, (_, i) => i + 1) as exhaustion_level}
            <img class="exhaustion-icon"
                src="../static/{exhaustion_level > charExhaustion ? 'checkbox-blank-outline' : exhaustion_level === 6 ?  'skull-scan' : `numeric/roman-${exhaustion_level}-box`}.svg" 
                alt="checkbox"
                on:click={() => { charExhaustion = exhaustion_level === charExhaustion ? 0 : exhaustion_level; $modifyCharacter()}}
            >
        {/each}
    </div>
    <div class="box-justify-filler"></div>
    <div class="box-label exhaustion-tooltip">
        <Tooltip 
            content="{EXHAUSTION.map(level => `<div>${level}</div>`).join('<br/>')}" 
            theme="blurred" 
            position='bottom' 
            animation='slide'
        >
            Exhaustion
        </Tooltip>
    </div>
</box>

<style>
    .box-main-text {
        display: flex;
        gap: 0.2em;
    }

    .exhaustion-icon {
        cursor: pointer;
        width: 1.5vw;
    }

</style>