<script lang="ts">
    import { modifyCharacter } from "../stores";
    import InPlaceEdit from "./InPlaceEdit.svelte";

    export let currentValue: string;
    export let maxValue: string;
    export let label: string;
    export let onSubmitFce = $modifyCharacter;

</script>

<box-with-max>
    <box class="max-value-box box-with-label">
        <div class="box-main-text">
            <InPlaceEdit bind:value={maxValue} editWidth="2em" editHeight="2em" on:submit={() => onSubmitFce()}/>
        </div>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Max
        </div>
    </box>
    <box class="current-value-box box-with-label">
        <div class="box-main-text">
            <InPlaceEdit bind:value={currentValue} editWidth="2em" editHeight="2em" on:submit={() => onSubmitFce()}/>
        </div>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            {label}
        </div>
    </box>
</box-with-max>

<style>
    box-with-max {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .max-value-box {
        height: 65%;
        width: 3em;
        margin-right: 1em;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .max-value-box .box-main-text {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
    }

    .current-value-box {
        height: 85%;
        width: 50%;
        margin-left: -1em;
    }

    .current-value-box .box-main-text {
        font-weight: var(--semi-bold);
        font-size: 2em;
    }

    .current-value-box .box-label {
        font-size: 1.2em;
    }

    .box-label {
        font-size: 1em;
    }

</style>