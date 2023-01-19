<script lang="ts">
    import type { MonsterTrait } from "../../../interfaces/5E/MonsterData";
    import InPlaceEdit from "../../InPlaceEdit.svelte";
    import SimpleButton from "../../SimpleButton.svelte";

    export let trait: MonsterTrait;
    export let deleteItem: () => void = () => {};
    export let editMonster: () => void = () => {};

</script>

<div class="inner-container">
    <div class="single-line">
        <h4>Type:</h4>
        <InPlaceEdit bind:value={trait.type} editWidth="18rem" editHeight="2rem" on:submit={() => editMonster()}/>
    </div>
    <div class="single-line">
        <h4>Atk:</h4>
        <InPlaceEdit bind:value={trait.attack_info} editWidth="18rem" editHeight="2rem" on:submit={() => editMonster()}/>
    </div>
    <div class="single-line">
        <h4>Damage:</h4>
    </div>
    <textarea on:change={() => editMonster()} bind:value={trait.attack_dmg}></textarea>
    <SimpleButton value='Delete' type="delete" onClickFn={() => deleteItem()}></SimpleButton>
</div>

<style>
    .inner-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5em;
    }

    .single-line {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }

    h4 {
        text-transform: uppercase;
        font-family: Athiti;
        margin: 0em;
    }

    textarea {
        height: 10em;
    }

</style>