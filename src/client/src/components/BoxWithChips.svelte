<script lang="ts">
    import Icon from '@iconify/svelte';

    export let chipsArray: any[];
    export let blankChip: any = '';
    export let label: string = '';
    export let gridArea: string = label.toLowerCase();
    export let maxHeight: string = '';
    export let headerText: string = '';
    export let chipsType: 'crud' | 'select-n' | 'readonly' = 'crud';
    export let selectNFinalArray: any[] = [];
    export let selectNMaxChips: number = 0;

    const addChip = () => {
        // just so BoxWithChips works with either object, arrays of strings or simple strings
        const cleanBlankChip = typeof blankChip === 'object' && typeof blankChip[0] !== 'string' ? {...blankChip} : typeof blankChip === 'string' ? blankChip.slice() : [...blankChip];
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

    const isBlank = (chip: any) => {
        const chipName = typeof chip === 'object' ? chip.name ?? '' : chip;
        return chipName === '' || chipName === '???' || chipName === '---';
    }

    $: occurences = (chipsArray[0]?.name ? chipsArray.map(chip => chip.name) : chipsArray).reduce((acc, curr) => {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc;
    }, {});

</script>


<box class="box-with-chips" style="grid-area: {gridArea}; max-height: {maxHeight};">
    {#if headerText}
        <p class="header-text">{headerText}</p>
    {/if}
    {#if chipsType === 'crud'}
        <sendable class="add-new-item" on:click={() => { addChip()}} on:keyup={() => {}}>
            <Icon class="big-icon" icon="mdi:add" />
        </sendable>
    {/if}
    <div class="chips-array box-main-text {chipsType === 'readonly' ? 'top-margin' : ''}">
        {#if chipsArray.length === 0}
            <div>No {label.toLowerCase()}</div>
        {:else}
            {#each chipsArray as chip, index}
                <box class="chip{isBlank(chip) ? ' error-pulse': ''}{occurences[chip] > 1 && !isBlank(chip) ? ' non-uniq' : ''}{chipsType === 'select-n' ? ' selectable' : ''}{selectNFinalArray.includes(chip) ? ' selected' : ''}" 
                    on:click={() => toggleChip(chip)} on:keyup={() => {}}
                >
                    {#if chipsType === 'crud'}
                        <sendable class="delete-chip" on:click={() => { deleteChip(index)}} on:keyup={() => {}}>
                            <Icon class="big-icon" icon="mdi:close" />
                        </sendable>
                    {:else if selectNFinalArray.includes(chip)}
                        <Icon class="big-icon" icon="mdi:check" />
                    {/if}
                    <slot index={index}></slot>
                </box>
            {/each}
        {/if}      
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
        position: relative;
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

    .chips-array.top-margin {
        margin-top: 0.5em;
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
        background-color: var(--clr-box-bg-light);
    }

    .chip.selectable {
        cursor: pointer;
    }

    :global(.chips-array .chip i) {
        font-size: 1.2em;
    }

    .chip.selected {
        background-color: var(--clr-accent-dark) !important;
        font-weight: var(--semi-bold);
    }

    p.header-text {
        font-family: 'Quicksand';
        font-size: 1em;
        margin: 0.5em;      
    }

    .delete-chip {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .non-uniq {
        background-color: var(--clr-contrast-normal) !important;
        font-weight: var(--semi-bold);
    }

</style>