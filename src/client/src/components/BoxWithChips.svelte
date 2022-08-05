<script lang="ts">
    import { Icon } from '@smui/icon-button';

    export let chipsArray: any[];
    export let blankChip: any = '';
    export let label: string = '';
    export let gridArea: string = label.toLowerCase();
    export let chipsType: 'crud' | 'select-n' = 'crud';
    export let selectNFinalArray: any[] = [];
    export let selectNMaxChips: number = 0;
    export let selectNTooltip: string = '';


    const addChip = () => {
        const cleanBlankChip = typeof blankChip === 'object' && typeof blankChip[0] !== 'string' ? {...blankChip} : [...blankChip];
        chipsArray = chipsArray.concat([cleanBlankChip]);
    }

    const deleteChip = (i: number) => {
        chipsArray = chipsArray.filter((_, index: number) => i !== index);
    }

    const toggleChip = (chip: string) => {
        if (chipsType !== 'select-n') { return; }

        // add skill if it was not chosen before and there is still space for more skills within the choose_n limit
        if (!selectNFinalArray.includes(chip) && selectNFinalArray.length !== selectNMaxChips) {
            selectNFinalArray = selectNFinalArray.concat([chip]);
        }
        else {
            selectNFinalArray = selectNFinalArray.filter(chipIter => chipIter !== chip);
        }        
    }

</script>


<box class="box-with-chips" style="grid-area: {gridArea};">
    {#if chipsType === 'crud'}
        <sendable class="add-new-item" on:click={() => { addChip()}}>
            <Icon class="material-icons">{'add'}</Icon>
        </sendable>
    {:else}
        <p class="select-n-tooltip">{selectNTooltip}</p>
    {/if}
    <div class="chips-array box-main-text">
        {#each chipsArray as chip, index}
            <box class="chip {chipsType === 'select-n' ? 'selectable' : ''} {selectNFinalArray.includes(chip) ? 'selected' : ''}" on:click={() => toggleChip(chip)}>
                {#if chipsType === 'crud'}
                    <sendable class="delete-chip" on:click={() => { deleteChip(index)}}>
                        <Icon class="material-icons">{'clear'}</Icon>
                    </sendable>
                {:else if selectNFinalArray.includes(chip)}
                    <Icon class="material-icons">{'check'}</Icon>
                {/if}
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
        font-size: 1em;
        padding: 0.4em;
        background-color: var(--secondary-box-background-color);
    }

    .chip.selectable {
        cursor: pointer;
    }

    :global(.chip i) {
        font-size: 1.2em;
    }

    .chip.selected {
        background-color: #C78B77 !important;
    }

    p.select-n-tooltip {
        font-family: 'Quicksand';
        font-size: 1em;        
    }

    .delete-chip {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

</style>