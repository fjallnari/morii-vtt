<script lang="ts">
    import type { NaturalRoll } from "../../../interfaces/RollResultData";

    export let naturalRoll: NaturalRoll;
    export let dieType: number;

    enum RESULT_COLOR {
        SUCCESS = '#A7C284',
        FAILURE = '#EFA48B'
    }
    
    $: critColor = naturalRoll.value === dieType ? RESULT_COLOR.SUCCESS : naturalRoll.value === 1 ? RESULT_COLOR.FAILURE : 'inherit';

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
