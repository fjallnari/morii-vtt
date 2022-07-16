<script lang="ts">
    import type { NaturalRoll } from "../../../interfaces/RollResultData";

    export let naturalRoll: NaturalRoll;
    export let dieType: number;
    
    $: critColor = naturalRoll.value === dieType ? '#A7C284' : naturalRoll.value === 1 ? '#EFA48B' : 'inherit';

</script>

<span 
    class="natural-roll {critColor !== 'inherit' ? 'crit' : ''}" 
    style='color: {critColor}; {naturalRoll.modifierFlags.includes('d') ? 'text-decoration: line-through;' : ''}'
>
    {naturalRoll.value}
</span>

<style>
    .crit { 
        font-weight: var(--semi-bold);
    }
</style>
