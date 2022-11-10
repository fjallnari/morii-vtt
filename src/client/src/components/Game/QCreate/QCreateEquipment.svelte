<script lang="ts">
    import Icon from '@iconify/svelte';
    import type ClassData from '../../../interfaces/ClassData';

    export let selectedClass: ClassData;

</script>

<box class="equipment">
    <p class='header-text'>You start with the following equipment, in addition to the equipment granted by your background:</p>
    <div class="choices-container">
        {#each selectedClass.equipment as equipmentLine}
            {#if equipmentLine.line_options}
                <single-line>
                    <Icon class="big-icon" icon={equipmentLine.final.length !== 0 ? 'mdi:check' : 'material-symbols:alt-route'} />
                    {#each equipmentLine.line_options as itemOptions, lineOptionIndex}
                        {#if lineOptionIndex !== 0}
                            <div class="or-sign">
                                {'OR'}
                            </div>
                        {/if}
                        
                        <box class='chip selectable {equipmentLine.final === itemOptions ? 'selected': ''}' on:click={() => {equipmentLine.final = itemOptions}}>
                            {#each itemOptions as item, index}
                                {#if index !== 0}
                                    <Icon class="big-icon" icon='mdi:add' />
                                {/if}
                                {#if item.options}
                                    <select bind:value={item.name}>
                                        <option value="" selected disabled hidden>{item.placeholder ?? '???'}</option>
                                        {#each item.options as itemOption}
                                            <option value={itemOption}>
                                                {itemOption}
                                            </option>
                                        {/each}
                                    </select>
                                {:else}
                                    {`${item.amount !== 1 ? `${item.amount}x` : ''} ${item.name}`}
                                {/if}
                            {/each}
                        </box>
                    {/each}
                </single-line>                
            {:else}
                <single-line>
                    <Icon class="big-icon" icon='mdi:chevron-double-right' />
                    <box class='chip selected'>
                        {#each equipmentLine.final as item, index}
                            {#if index !== 0}
                                <Icon class="big-icon" icon='mdi:add' />
                            {/if}
                            {#if item.options}
                                <select bind:value={item.name}>
                                    <option value="" selected disabled hidden>{item.placeholder ?? '???'}</option>
                                    {#each item.options as itemOption}
                                        <option value={itemOption}>
                                            {itemOption}
                                        </option>
                                    {/each}
                                </select>
                            {:else}
                                {`${item.amount !== 1 ? `${item.amount}x` : ''} ${item.name}`}
                            {/if}
                        {/each}
                    </box>
                </single-line>
            {/if}
        {/each}
    </div>
    <div class="box-justify-filler"></div>
    <div class="box-label">
        Equipment
    </div>
</box>

<style>
    .equipment { grid-area: equipment;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        font-family: 'Quicksand';
    }

    p.header-text {
        font-size: 1em;
        margin: 0.5em 1em calc(0.5em - 4px) 1em;
    }

    .choices-container {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        gap: 1em;
        overflow-y: auto;
        scrollbar-width: thin;
        margin-bottom: 0.2em;
        margin-top: 0.5em;
        padding-bottom: 4px;
    }

    single-line {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        flex-wrap: wrap;
    }

    .or-sign {
        font-weight: var(--semi-bold);
    }

    .chip {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 0.2em;
        font-size: 1em;
        padding: 0.4em;
        background-color: var(--clr-box-bg-light);
        flex-wrap: wrap;
        max-width: 90%;
    }

    .chip.selectable {
        cursor: pointer;
    }

    .chip.selected {
        background-color: var(--clr-accent-dark) !important;
        font-weight: var(--semi-bold);
    }

    select {
        background-color: inherit;
    }

</style>