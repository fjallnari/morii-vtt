<script lang="ts">
    import type { MonsterTrait } from "../../../interfaces/MonsterData";
    import SimpleButton from "../../SimpleButton.svelte";

    export let trait: MonsterTrait;
    export let deleteItem: () => void = () => {};

    // TODO

</script>

<div class="inner-container">
    <!-- <textarea style='height: {textareaHeight};' on:change={() => onSubmitFn()} bind:value={content}></textarea> -->
    <SimpleButton value='Delete' type="delete" onClickFn={() => deleteItem()}></SimpleButton>
</div>

<style>
    .inner-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }    

</style>