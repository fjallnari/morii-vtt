<script lang="ts">
    import { formatModifier } from "../../../../stores";
    import InPlaceEditBox from "../../../InPlaceEditBox.svelte";

    export let value: string;
    export let name: string;
    export let convertValueToMod: (value: string) => number = (value) => { return ~~value };
    export let onClickFn: () => void = () => {};

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
            onClickFn={onClickFn}
            editWidth="2em"
            sendable={true}
        />
    </div>
</ability-score>



<style>
    ability-score {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        min-width: 0;
        font-size: 1.2em;
    }

    .ability-score-modifier {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 60%;
        width: 40%;
        z-index: 2;
        margin-bottom: -1.2em;

        font-size: 1.2em;
        font-weight: var(--semi-bold);
        font-family: Quicksand;
    }

    .ability-score-value {
        width: 60%;
        height: 100%;
    }

    .ability-score-value :global(.box-main-text) {
        margin-bottom: -1.5em
    }

</style>