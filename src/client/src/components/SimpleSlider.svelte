<script lang="ts">
    import RangeSlider from "svelte-range-slider-pips/src";

    export let value: number;

    let values = [value];
    $: value = values[0] ?? 1

    const styleVariables = `
        --range-slider:          #5A77A13D; /* slider main background color */
        --range-handle-inactive: var(--clr-accent-normal); /* inactive handle color */
        --range-handle:          var(--clr-accent-normal); /* non-focussed handle color */
        --range-handle-focus:    var(--clr-accent-normal); /* focussed handle color */
        --range-handle-border:   var(--range-handle);
        --range-range-inactive:  var(--clr-accent-dark); /* inactive range bar background color */
        --range-range:           var(--clr-accent-dark); /* active range bar background color */
        --range-float-inactive:  var(--clr-bg); /* inactive floating label background color */
        --range-float:           var(--clr-bg); /* floating label background color */
        --range-float-text:      var(--clr-text); /* text color on floating label *`;

</script>

<simple-slider style={styleVariables}>
    <RangeSlider id="color-pips" bind:values range="min" min={1} max={20} pips float first={false} last={false} springValues={{ stiffness: 0.25, damping: 1 }}/>
</simple-slider>

<style>

    :global(#color-pips .rangeHandle .rangeNub) {
        cursor: pointer;
        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12);
    }

    :global(#color-pips .rangePips) {
        z-index: 1;
        height: 100%;
        bottom: 0em;
        cursor: pointer;
    }

    :global(#color-pips .rangePips .pip) {
        background: var(--clr-accent-normal);
        opacity: .6;
        border-radius: 50%;
        width: 2px;
        height: 2px;
    }

    :global(#color-pips .rangePips .pip.in-range) {
        background: transparent;
    }

    :global(#color-pips .rangeHandle > .rangeFloat) {
        padding: 0.4em 0.7em;
        box-shadow: 0 1px 20px rgba(0, 0, 0, 0.25);
        border-radius: 4px;
    }

</style>