<script lang="ts">
    import InPlaceEdit from "../../InPlaceEdit.svelte";

    export let characterStat: string;
    export let boxLabel: string;
    export let inlineStyle: string = '';
    export let editModeWidth: string = '';
    export let editModeHeight: string = '';
    export let modifyCharacter: () => Promise<void>;

</script>

<box class="box-with-label" style={inlineStyle}>
    <div class="box-main-text">
        <InPlaceEdit bind:value={characterStat} editModeWidth={editModeWidth} editModeHeight={editModeHeight} on:submit={() => modifyCharacter()}/>
    </div>
    <div class="box-justify-filler"></div>
    <div class="box-label">
        {boxLabel}
    </div>
</box>

<style>
    
    .box-with-label {
        flex-grow: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
    }

    .box-main-text {
        margin-top: auto;
        margin-bottom: -0.6vw;
    }

    .box-justify-filler {
        margin-top: auto; 
        height: 0;
    }
    
    .box-label {
        color: #FCF7F8;
        font-size: 0.6vw;
        font-weight: 200;
        font-family: Athiti;
        text-transform: uppercase;
    }

</style>