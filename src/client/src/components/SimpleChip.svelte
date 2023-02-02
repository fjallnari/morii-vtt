<script lang="ts">
    export let value: string;
    export let color: string = 'var(--clr-box-bg-light)';

</script>

<box class='chip' style="background-color: {color};">
    {value}
</box>

<style>
    .chip {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 0.2em;
        font-size: 1em;
        padding: 0.4em;
        background-color: var(--clr-box-bg-lighter);
        flex-wrap: wrap;
        max-width: 90%;
    }
</style>