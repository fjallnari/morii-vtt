<script lang="ts">
    import InPlaceEdit from "./InPlaceEdit.svelte";

    export let mainObject = undefined;
    export let label: string = '';
    export let propertyName: string = label;
    export let gridArea: string = label;
    export let editWidth: string = "3em";
    export let editHeight: string = "3em";

</script>

<box-with-info style="grid-area: {gridArea};">
    <div class="box-main">
        <box class="box-value">
            {#if mainObject}
                <InPlaceEdit bind:value={mainObject[`${propertyName}`]} editWidth={editWidth} editHeight={editHeight} on:submit={() => {}}/>
            {:else}
                X
            {/if}
        </box>
        <div class="box-label">
            {label}
        </div>
    </div>
    <box class="box-info">
        {#if mainObject && mainObject[`${propertyName}_info`]}
            <p>{mainObject[`${propertyName}_info`]}</p>
        {:else}
            <p>No info</p>
        {/if}
    </box>
</box-with-info>



<style>
    box-with-info {
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr; 
        grid-template-areas: 
            "box-main box-main box-info box-info box-info"
            "box-main box-main box-info box-info box-info"
            "box-main box-main box-info box-info box-info"
            "box-main box-main box-info box-info box-info";
        max-height: 10em;
    }

    .box-main { grid-area: box-main; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
    }

    .box-value {
        display: flex;
        width: 75%;
        height: 50%;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 1.3em;
        font-weight: var(--semi-bold);
        font-family: Quicksand;
    }

    .box-label {
        font-size: 1vw !important;
    }
    
    .box-info { grid-area: box-info;
        overflow-y: auto;
        scrollbar-width: thin;
    }

    .box-info p {
        font-family: 'Quicksand';
        font-size: 0.8vw;
        text-align: left;
        margin: 0.5em !important;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #1d1d22;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #757578;
        border: transparent;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #404044;
    }

</style>