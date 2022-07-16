<script lang="ts">
    import { modifyCharacter } from "../stores";
    import InPlaceEdit from "./InPlaceEdit.svelte";

    export let value: string;
    export let boxLabel: string;
    export let characterLimit: number = 0;
    export let inlineStyle: string = '';
    export let editWidth: string = '';
    export let editHeight: string = '';
    export let onSubmitFce: () => void = () => $modifyCharacter();

</script>

<box class="box-with-label" style={inlineStyle}>
    <div class="box-main-text">
        <InPlaceEdit 
            bind:value={value} 
            editWidth={editWidth} 
            editHeight={editHeight} 
            on:submit={() => { characterLimit !== 0 && value.length > characterLimit ? value = value.slice(0, characterLimit) : value; onSubmitFce()}}
        />
    </div>
    <div class="box-justify-filler"></div>
    <div class="box-label">
        {boxLabel}
    </div>
</box>

<style>
    
</style>