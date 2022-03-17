<script lang="ts">
    import type DiceRollResult from "../../interfaces/DiceRollResult";

    export let rollResult: DiceRollResult;

</script>

<div class="main-roll-block">
    <em>Rolling {rollResult.diceInput} =></em>
    <div class="roll-formula">
        <span>
            ( 
            {#each rollResult.naturalThrows as naturalThrow, index}
                {#if naturalThrow === 1 || naturalThrow === rollResult.diceSides}
                    <span class="natural-crit" style="color: {naturalThrow === 1 ? '#EFA48B' : '#C6D8AF'};">
                        {naturalThrow}
                    </span>
                {:else}
                    {naturalThrow}
                {/if}
                {#if index !== rollResult.naturalThrows.length - 1}
                    {' + '}
                {/if}
            {/each}
            ) {rollResult.modifierString ? `${rollResult.modifierString} ` : ''}=
        </span>
        <span class="dice-roll-result">
            <strong>{rollResult.finalSum}</strong>
        </span>
    </div>
</div>

<style>
    .main-roll-block {
        align-items: center;
        line-height: 2em;
    }

    .roll-formula {
        font-size: x-large;
        gap: 0.5em;
    }

    .dice-roll-result {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 2em;
        height: 2em;
        background-color:#202022;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 1%;
        text-align: center;
    }

    .natural-crit { 
        font-weight: 900;
    }

</style>