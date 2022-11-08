<script lang="ts">
    import Icon from "@iconify/svelte";



    type ButtonType = 'default' | 'primary' | 'green' | 'delete' | 'orange';
    
    interface ButtonColors {
        bg_color: string,
        active_bg_color: string,
    }

    export let value: string;
    export let icon: string = '';
    export let disabled: boolean = false;
    export let type: ButtonType = 'default';
    export let onClickFn: () => void;    

    const BUTTON_TYPES: Record<ButtonType, ButtonColors> = {
        'default': {
            bg_color: '#303036',
            active_bg_color: '#27272B'
        },
        'primary': {
            bg_color: 'var(--clr-accent-dark)',
            active_bg_color: 'var(--clr-accent-darker)'
        },
        'orange': {
            bg_color: '#E9805D',
            active_bg_color: '#E7724B'
        },
        'green': {
            bg_color: '#80A451',
            active_bg_color: '#556D36'
        },
        'delete': {
            bg_color: 'var(--clr-contrast-normal)',
            active_bg_color: 'var(--clr-contrast-dark)'
        }
    }

</script>

<simple-button
    style:active=""
    style="--bg-color:{BUTTON_TYPES[type].bg_color}; --active-bg-color:{BUTTON_TYPES[type].active_bg_color};"
    {disabled}
    on:click={() => onClickFn()}
    on:keydown={(event) => {if (event.key === 'Enter') {onClickFn();}}}
    tabindex="0"
>
    {#if icon}
        <Icon class='big-icon' icon={icon} />
    {/if}
    {value}
</simple-button>

<style>
    simple-button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        width: 100%;
        padding: 0.2em 0em;

        background-color: var(--bg-color);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;

        cursor: pointer;

        transition: all .2s ease-in-out;

        font-weight: var(--semi-bold);
        font-family: Athiti;
        text-transform: uppercase;
    }

    simple-button:active {
        background-color: var(--active-bg-color);
        transition: all .2s ease-in-out;      
    }

    simple-button:hover {
        transform: scale(1.048);
        filter: opacity(0.9);
    }

    simple-button[disabled=true] {
        cursor: not-allowed;
        pointer-events: none;
        opacity: 0.4;
    }

</style>