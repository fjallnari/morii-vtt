<script lang="ts">
    import type { MonsterTrait } from "../../../interfaces/MonsterData";


    export let trait: MonsterTrait;
</script>

{#if !trait.attack_dmg}
    <p>
        <em><strong>{trait.name ?? ''}</strong></em>
        <em>{trait.subtitle ?? ''}</em>
        {trait.content.split('\n\n')[0]}
        {#each trait.content.split('\n\n').slice(1) as paragraph}
            <p class="inner-trait-paragraph">{paragraph}</p>
        {/each}
    </p>
{:else}
    <p>
        <em><strong>{trait.name ?? ''}</strong></em>
        <em>{trait.type ?? ''}</em>
        {trait.attack_info}
        <em>{"Hit:"}</em>
        {trait.attack_dmg}
        {trait?.content?.split('\n\n')[0] ?? ''}
        {#each trait?.content?.split('\n\n').slice(1) ?? [] as paragraph}
            <p class="inner-trait-paragraph">{paragraph}</p>
        {/each}
    </p>
{/if}

<style>
    .inner-trait-paragraph {
        margin: 0.8em 0em;
    }
</style>