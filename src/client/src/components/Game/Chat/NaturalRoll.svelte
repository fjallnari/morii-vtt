<script lang="ts">
    import type { NaturalRoll } from "../../../interfaces/RollResultData";

    export let naturalRoll: NaturalRoll;
    export let dieType: number;
    export let diceAccent: 'roll-over' | 'roll-under' = 'roll-over';

    enum OUTCOMES {
        SUCCESS = '#A7C284',
        FAILURE = '#EFA48B'
    }

    // $: outcomeColors = [OUTCOMES.SUCCESS, OUTCOMES.FAILURE];
    // $: resultColors = diceAccent === 'roll-over' ? outcomeColors : outcomeColors.reverse();
    
    $: critColor = naturalRoll.value === dieType ? OUTCOMES.SUCCESS : naturalRoll.value === 1 ? OUTCOMES.FAILURE : 'inherit';

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
