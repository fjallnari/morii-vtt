<script lang="ts">
    import { tooltip } from "@svelte-plugins/tooltips";

    export let label: string = '';
    export let valueWidth: string = '2em';
    export let valueHeight: string = valueWidth;
    export let valueFontSize: string = '1.5em';
    export let labelFontSize: string = '';
    export let boxColor: string = 'normal';
    export let valueBoxStyle = 'default';
    export let labelClass: string = 'default-label';
    export let wantBorder: boolean = false;
    export let borderColor: string = 'var(--clr-contrast-dark)'
    export let clickable: boolean = false;
    export let tooltipText: string = undefined;
    export let onClickFn = () => {};

</script>

<row-box-with-label style="--border-color: {borderColor};">
    <box class="row-box-value{valueBoxStyle === 'ac' ? ' ac-value': ''}{wantBorder ? ' bordered': ''}" style="width:{valueWidth}; height: {valueHeight}; font-size: {valueFontSize}; background-color: var(--clr-box-bg-{boxColor}); cursor: {clickable ? 'pointer': ''}"
        on:click={() => onClickFn()} on:keyup={() => {}}
    >
        <slot></slot>
    </box>
    {#if tooltipText}
        <box class="row-box-label {labelClass}{wantBorder ? ' bordered': ''}" 
            style="font-size: {labelFontSize}; background-color: var(--clr-box-bg-{boxColor});"
            use:tooltip={{
                content: `${tooltipText}`,
                theme: 'blurred', 
                position: 'bottom', 
                animation: 'fade',
                arrow: false,
                autoPosition: true
            }}
        >
            {label}
        </box>
    {:else}
        <box class="row-box-label {labelClass}{wantBorder ? ' bordered': ''}" 
            style="font-size: {labelFontSize}; background-color: var(--clr-box-bg-{boxColor});"
        >
            {label}
        </box>
    {/if}
</row-box-with-label>

<style>
    row-box-with-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .row-box-value {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-weight: var(--semi-bold);
        font-family: Quicksand;
        z-index: 2;
    }

    .ac-value {
        border: 0.5em solid transparent;
        border-radius: 50% 50% 50% 50% / 12% 12% 70% 70%;
    }

    .row-box-label {
        padding: 0.5em;
        z-index: 1;
        margin-left: -15px;
        padding-left: 25px;
        padding-right: 0.75em;
        overflow: hidden;
        text-overflow: ellipsis;
        position: unset !important;
        white-space: nowrap;
    }

    .default-label {
        text-transform: uppercase;
        font-family: Athiti;
    }

    .overview-label {
        font-family: Quicksand;
        max-width: 6em;
    }

    .bordered {
        border: 1px var(--border-color) solid;
    }


</style>