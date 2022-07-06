<script lang="ts">
    import type { Character } from "../../../../interfaces/Character";
    import { modifyCharacter } from "../../../../stores";
    import InPlaceEdit from "../../../InPlaceEdit.svelte";

    export let character: Character;

</script>

<box class="max-speed-box box-with-label">
    <div class="box-main-text">
        <InPlaceEdit bind:value={character.speed_max} editWidth="2em" editHeight="2em" on:submit={() => $modifyCharacter()}/>ft.
    </div>
    <div class="box-justify-filler"></div>
    <div class="box-label">
        Max
    </div>
</box>
<box class="current-speed-box box-with-label">
    <div class="box-main-text">
        {~~character.speed_max + ~~character.speed_bonus}ft.
    </div>
    <div class="box-justify-filler"></div>
    <div class="box-label">
        Speed
    </div>
</box>

<style>
    .max-speed-box {
        height: 65%;
        width: 3em;
        margin-right: 1em;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .max-speed-box .box-main-text {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .current-speed-box {
        height: 85%;
        width: 50%;
        margin-left: -1em;
    }

    .current-speed-box .box-main-text {
        font-weight: bold;
        font-size: 1.2em;
    }

</style>