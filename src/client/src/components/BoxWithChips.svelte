<script lang="ts">
    import { Icon } from '@smui/icon-button';

    export let chipsArray: any[];
    export let blankChip: any = '';
    export let label: string;
    export let gridArea: string = label.toLowerCase();


    const addChip = () => {
        const cleanBlankChip = typeof blankChip === 'object' && typeof blankChip[0] !== 'string' ? {...blankChip} : [...blankChip];
        chipsArray = chipsArray.concat([cleanBlankChip]);
    }

    const deleteChip = (i: number) => {
        chipsArray = chipsArray.filter((_, index: number) => i !== index);
    }

</script>


<box class="box-with-chips" style="grid-area: {gridArea};">
    <sendable class="add-new-item" on:click={() => { addChip()}}>
        <Icon class="material-icons">{'add'}</Icon>
    </sendable>
    <div class="chips-array box-main-text">
        {#each chipsArray as _, index}
            <box class="chip">
                <sendable class="delete-chip" on:click={() => { deleteChip(index)}}>
                    <Icon class="material-icons">{'clear'}</Icon>
                </sendable>
                <slot index={index}></slot>
            </box>
        {/each}         
    </div>
    <div class="box-justify-filler"></div>
    <div class="box-label">
        {label}
    </div>
</box>

<style>
    .box-with-chips {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        max-height: 10em;
    }

    .chips-array {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.5em;
        overflow-y: auto;
        scrollbar-width: thin;
        margin-bottom: 0.2em;
        padding-bottom: 4px;
    }

    .chip {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 0.2em;
        font-family: 'Quicksand';
        font-size: 0.8vw;
        padding: 0.4em;
        background-color: var(--secondary-box-background-color);
    }

    .delete-chip {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

</style>