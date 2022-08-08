<script lang="ts">
    import { Icon } from '@smui/button';

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
            bg_color: '#C78B77',
            active_bg_color: '#A3634E'
        },
        'orange': {
            bg_color: '#E9805D',
            active_bg_color: '#E7724B'
        },
        'green': {
            bg_color: '#80A451',
            active_bg_color: '#75964A'
        },
        'delete': {
            bg_color: '#BC4B51',
            active_bg_color: '#A43D42'
        }
    }

</script>

<simple-button
    style:active=""
    style="--bg-color:{BUTTON_TYPES[type].bg_color}; --active-bg-color:{BUTTON_TYPES[type].active_bg_color};"
    {disabled}
    on:click={() => onClickFn()}
    tabindex="0"
>
    {#if icon}
        <Icon class="material-icons">{icon}</Icon>
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
        transform: scale(1.025);
        filter: opacity(0.9);
    }

    simple-button[disabled=true] {
        cursor: not-allowed;
        pointer-events: none;
        opacity: 0.4;
    }

</style>