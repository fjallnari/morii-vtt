<script lang="ts">

    export let label: string = '';
    export let valueWidth: string = '2em';
    export let valueHeight: string = valueWidth;
    export let valueFontSize: string = '1.5em';
    export let labelFontSize: string = '';
    export let boxColor: string = 'normal';
    export let valueBoxStyle = 'default';
    export let labelClass: string = 'default-label';

</script>

<row-box-with-label>
    <box class="row-box-value{valueBoxStyle === 'ac' ? ' ac-value': ''}" style="width:{valueWidth}; height: {valueHeight}; font-size: {valueFontSize}; background-color: var(--clr-box-bg-{boxColor});">
        <slot></slot>
    </box>
    <box class="row-box-label {labelClass}" style="font-size: {labelFontSize}; background-color: var(--clr-box-bg-{boxColor});">
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
    }

    .default-label {
        text-transform: uppercase;
        font-family: Athiti;
    }

    .overview-label {
        font-family: Quicksand;
        max-width: 6em;
    }


</style>