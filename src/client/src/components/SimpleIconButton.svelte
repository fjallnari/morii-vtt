<script lang="ts">
    import Icon from '@iconify/svelte';

    export let icon: string;
    export let onClickFn: () => void;
    export let width: string = "2em";
    export let height: string = width;
    export let wrapperPadding = "1em";
    export let color: string = "inherit";

</script>

<div 
    class="icon-wrapper icon-ripple" 
    style='width: {`calc(${width} + ${wrapperPadding})`}; height: {`calc(${height} + ${wrapperPadding})`};' 
    on:click={() => onClickFn()}
    tabindex="0"
>
    <Icon icon={icon} width={width} height={height} color={color} />
</div>

<style>
    .icon-wrapper {
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    /* Icon Ripple effect */
	.icon-ripple {
        background-position: center;
        transition: background 0.25s;
    }

    .icon-ripple:hover {
        background: #404044aa;
    }

    .icon-ripple:active {
        background-color: #606068ce;
        transition: background 0.25s;
    }

</style>