<script lang="ts">
    import type MessageData from "../../../interfaces/MessageData";

    export let message: MessageData;

</script>

<div class="main-roll-block">
    <em>{message.skillCheckInfo ? message.skillCheckInfo.skillName : `rolling ${message.rollResult.diceInput} =>`}</em>
    <div class="roll-formula">
        <span>
            ( 
            {#each message.rollResult.naturalThrows as naturalThrow, index}
                {#if naturalThrow === 1 || naturalThrow === message.rollResult.diceSides}
                    <span class="natural-crit" style="color: {naturalThrow === 1 ? '#EFA48B' : '#A7C284'};">
                        {naturalThrow}
                    </span>
                {:else}
                    {naturalThrow}
                {/if}
                {#if index !== message.rollResult.naturalThrows.length - 1}
                    {' + '}
                {/if}
            {/each}
            ) {message.rollResult.modifierString ? `${message.rollResult.modifierString} ` : ''}=
        </span>
        <span class="dice-roll-result">
            <strong>{message.rollResult.finalSum}</strong>
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