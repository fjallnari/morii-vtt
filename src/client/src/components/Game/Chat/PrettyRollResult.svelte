<script lang="ts">
    import type MessageData from "../../../interfaces/MessageData";
    import NaturalRoll from "./NaturalRoll.svelte";

    export let message: MessageData;

    const isSuccess = (target: number, totalRoll: number, diceAccent: string) => {
        return diceAccent === 'roll-under' && target >= totalRoll || diceAccent === 'roll-over' && target <= totalRoll;
    }

    enum OUTCOMES {
        SUCCESS = '#A7C284',
        FAILURE = '#EFA48B'
    }

</script>

<div class="main-roll-block">
    <em>
        {message.skillCheckInfo ? message.skillCheckInfo.skillName : `rolling ${message.rollResult.notation} =>`}
        {#if message.skillCheckInfo?.target}
            {#if isSuccess(message?.skillCheckInfo?.target, message?.rollResult?.total, message?.skillCheckInfo?.diceAccent)}
                <em class="outcome" style="color: {OUTCOMES.SUCCESS}">
                    SUCCESS
                </em>
            {:else}
                <em class="outcome" style="color: {OUTCOMES.FAILURE}">
                    FAILURE
                </em>            
            {/if}
        {/if}
    </em>
    <div class="roll-formula">
        <span>
            {#each message.rollResult.splitRolls as splitRoll}
                {#if typeof splitRoll !== 'string'}
                    ( 
                    {#each splitRoll.rolls as naturalRoll, index}
                        <NaturalRoll naturalRoll={naturalRoll} dieType={~~splitRoll.dieType} diceAccent={message.skillCheckInfo?.diceAccent}></NaturalRoll>
                        {#if index !== splitRoll.rolls.length - 1}
                            {' + '}
                        {/if}
                    {/each}
                    )
                {:else}
                    {' ' + splitRoll + ' '}
                {/if}
            {/each}
            =
        </span>
        <span class="dice-roll-total">
            {message.rollResult.total}
        </span>
    </div>
</div>

<style>
    .main-roll-block {
        align-items: center;
        line-height: 2em;
    }

    .roll-formula {
        font-size: large;
        gap: 0.5em;
    }

    .dice-roll-total {
        display: inline-flex;
        justify-content: center;
        align-items: center;

        background-color: var(--clr-accent-darker);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        
        padding: 0.1em 0.4em;
        text-align: center;
        font-weight: var(--semi-bold);
    }

    .outcome {
        font-weight: var(--semi-bold);
    }

</style>