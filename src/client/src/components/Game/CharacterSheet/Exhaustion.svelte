<script lang="ts">
    import Tooltip, {
        Wrapper,
        Content,
    } from '@smui/tooltip';
    import EXHAUSTION from '../../../enum/ExhaustionInfo';
    import { modifyCharacter } from '../../../stores';

    export let charExhaustion: number;
</script>

<box class="box-with-label">
    <div class="box-main-text">
        {#each Array.from({ length: 6 }, (_, i) => i + 1) as exhaustion_level}
            <Wrapper rich>
                <img class="skill-prof-icon"
                    src="../static/{exhaustion_level > charExhaustion ? 'checkbox-blank-outline' : exhaustion_level === 6 ?  'skull-scan' : `numeric/roman-${exhaustion_level}-box`}.svg" 
                    alt="checkbox"
                    on:click={() => { charExhaustion = exhaustion_level === charExhaustion ? 0 : exhaustion_level; $modifyCharacter()}}
                >
                <Tooltip>
                    <Content style="white-space: pre-line;">
                        {EXHAUSTION.slice(0, exhaustion_level).join('\n')}
                    </Content>
                </Tooltip>
            </Wrapper>
        {/each}
    </div>
    <div class="box-justify-filler"></div>
    <div class="box-label">
        Exhaustion
    </div>
</box>

<style>
    .box-main-text {
        display: flex;
        gap: 0.2em;
    }

    .skill-prof-icon {
        cursor: pointer;
        width: 1.8em; 
        height: 1.8em;
    }

</style>