<script lang="ts">
    import { formatModifier } from "../../../../stores";
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";

    export let value: string;
    export let name: string;
    export let convertValueToMod: (value: string) => number = (value) => { return ~~value} ;

</script>


<ability-score>
    <box class="ability-score-modifier">
        {$formatModifier(convertValueToMod(value))}
    </box>

    <div class="ability-score-value">
        <InPlaceEditBox
            bind:value
            boxLabel={name}
            inlineStyle="flex-grow: 2;" 
            editWidth="2em">
        </InPlaceEditBox>
    </div>
</ability-score>



<style>
    ability-score {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: fit-content;
        height: fit-content;
        min-width: 0;
    }

    .ability-score-modifier {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 2.5em;
        width: 2.5em;
        z-index: 2;
        margin-bottom: -1.2em;

        font-size: 1.2em;
        font-weight: var(--semi-bold);
        font-family: Quicksand;
    }

    .ability-score-value {
        width: 5em;
        height: 5em;
    }

    .ability-score-value :global(.box-main-text) {
        margin-bottom: -1.5em
    }

</style>