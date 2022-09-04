<script lang="ts">
    import { Icon } from '@smui/icon-button';

    export let chipsArray: any[];
    export let blankChip: any = '';
    export let label: string = '';
    export let gridArea: string = label.toLowerCase();
    export let maxHeight: string = '';
    export let headerText: string = '';
    export let chipsType: 'crud' | 'select-n' | 'readonly' | 'with-categories' = 'crud';
    export let selectNFinalArray: any[] = [];
    export let selectNMaxChips: number = 0;

    let showCategory = false;

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
        const chipName = typeof chip === 'object' ? chip.name ?? (chip[0] && chip.length > 1 ? '' : chip[0]) ?? '' : chip;
        return chipName === '' || chipName === '???' || chipName === '---';
    }

    $: occurences = (chipsType === 'with-categories' ? chipsArray.flatMap(a => a.items) : chipsArray[0]?.name ? chipsArray.map(chip => chip.name) : chipsArray).reduce((acc, curr) => {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});

</script>


<box class="box-with-chips" style="grid-area: {gridArea}; max-height: {maxHeight};">
    {#if headerText}
        <p class="header-text">{headerText}</p>
    {/if}
    {#if chipsType === 'crud'}
        <div class="add-new-item">
            <sendable on:click={() => { addChip()}}>
                <Icon class="material-icons">{'add'}</Icon>
            </sendable>
        </div>
    {/if}
    <div class="chips-array box-main-text {chipsType === 'readonly' || chipsType === 'with-categories' ? 'top-margin' : ''}">
        {#if chipsArray.length === 0}
            <div>No {label.toLowerCase()}</div>
        {:else if chipsType === 'with-categories'}
            <img class="toggle-show-category" 
                src="../static/toggle-switch-variant{showCategory ? '' : '-off'}.svg" 
                alt="show-category"
                on:click={ () => showCategory = !showCategory }
            >
            {#each chipsArray as category, catIndex}
                {#if category.items.length !== 0 && showCategory}
                    <div class="category">
                        <div class='category-label box-label'>{category.name}</div>
                        {#each category.items as chip, index}
                            <box class="chip{isBlank(chip) ? ' error-pulse': ''}{occurences[chip] > 1 && !isBlank(chip) ? ' non-uniq' : ''}">
                                {chip}
                            </box>
                        {/each}
                    </div>
                {:else}
                    {#each category.items as chip, index}
                        <box class="chip{isBlank(chip) ? ' error-pulse': ''}{occurences[chip] > 1 && !isBlank(chip) ? ' non-uniq' : ''}">
                            {chip}
                        </box>
                    {/each}
                {/if}
            {/each}
        {:else}
            {#each chipsArray as chip, index}
                <box class="chip{isBlank(chip) ? ' error-pulse': ''}{occurences[chip] > 1 && !isBlank(chip) ? ' non-uniq' : ''}{chipsType === 'select-n' ? ' selectable' : ''}{selectNFinalArray.includes(chip) ? ' selected' : ''}" on:click={() => toggleChip(chip)}>
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

    /* TODO - for box with chips with categories */
    .category {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
        border: var(--clr-accent-light) 2px solid;
        border-radius: 4px;
        padding: 0.3em;
        position: relative;
        margin-bottom: 1em;
        flex-wrap: wrap;
        max-width: 90%;
        justify-content: center;
    }

    .category-label {
        position: absolute;
        bottom: 0%;
        left: 50%;
        transform: translate(-50%, 120%);
    }

    .toggle-show-category {
        position: absolute;
        top: 4px;
        left: 4px;
        width: 1.5rem;
        cursor: pointer;
        z-index: 2;
    }

</style>