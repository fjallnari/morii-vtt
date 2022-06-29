<script lang="ts">
    import { Icon } from '@smui/button';

    export let value: string;
    export let icon: string = '';
    export let disabled: boolean = false;
    export let type: 'default' | 'delete' = 'default';
    export let onClickFn: () => void;    

    const BUTTON_TYPES = {
        'default': {
            bg_color: '#303036',
            active_bg_color: '#27272B'
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

        background-color: var(--bg-color);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        width: 100%;
        cursor: pointer;
        transition-duration: 200ms;
        transition-property: color;
        font-weight: bold;
        font-family: Athiti;
        text-transform: uppercase;
    }

    simple-button:active {
        background-color: var(--active-bg-color);
        transition-duration: 200ms;
        transition-property: color;        
    }

    simple-button[disabled=true] {
        cursor: not-allowed;
        pointer-events: none;
    }

</style>