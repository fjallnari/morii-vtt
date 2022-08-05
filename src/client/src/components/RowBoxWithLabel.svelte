<script lang="ts">

    export let label: string = '';
    export let valueWidth: string = '2em';
    export let valueHeight: string = valueWidth;
    export let valueFontSize: string = '1.5em';
    export let labelFontSize: string = '';

</script>

<row-box-with-label>
    <box class="row-box-value" style="width:{valueWidth}; height: {valueHeight}; font-size: {valueFontSize};">
        <slot name='value'></slot>
    </box>
    <box class="row-box-label" style="font-size: {labelFontSize};">
        {label}
    </box>
</row-box-with-label>

<style>
    row-box-with-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
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

    .row-box-label {
        padding: 0.5em;
        text-transform: uppercase;
        font-family: Athiti;
        margin-left: -5px;
        z-index: 1;
        padding-left: 15px;
        padding-right: 0.75em;
    }
</style>