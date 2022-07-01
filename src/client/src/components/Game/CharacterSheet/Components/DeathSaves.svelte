<script lang="ts">
    import type { Character } from "../../../../interfaces/Character";
    import { sendSkillCheck } from "../../../../stores";
    import TripleCheckBox from "../../../TripleCheckBox.svelte";

    export let character: Character;

</script>

<box class="box-with-label">
    <div class="box-main-text">
        <div class="triple-box-container">
            <div class="box-label">
                Successes
            </div>
            <TripleCheckBox bind:value={character.death_save_success}></TripleCheckBox>
        </div>
        <div class="triple-box-container">
            <div class="box-label">
                Failures
            </div>
            <TripleCheckBox bind:value={character.death_save_failure} fullBoxLast={'skull-scan'}></TripleCheckBox>
        </div>
    </div>
    <div class="box-justify-filler"></div>
    <sendable class="box-label" on:click={() => $sendSkillCheck(0, 'death save')}>
        Death Saves
    </sendable>
</box>

<style>
    .box-main-text {
        display: flex; 
        flex-direction:column; 
        align-items: end;
        justify-content: center;
    }

    .triple-box-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
    }

</style>