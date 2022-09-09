<script lang="ts">

    export let label: string;
    export let value: string = 'x';
    export let icon: string = '';
    export let isDisabled: boolean = false;
    export let gridClass: string = '';

    const handleError = ev => ev.target.src = '../static/class-icons/no-class.svg';

</script>

<box class="box-with-icon" style='grid-area: {gridClass};'>
    <div class="value">{value}</div>
    <div class="label">{label}</div>
    <div class="icon{isDisabled ? ' disabled' : ''}">
        <img id="main-icon" src="../static/{icon}.svg" alt="icon" on:error={handleError}>
    </div>
</box>

<style>
    .box-with-icon {
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr; 
        gap: 0em; 
        grid-template-areas: 
            "value value value icon icon"
            "value value value icon icon"
            "label label label icon icon";
        width: 100%;
        height: 100%;  
    }

    .box-with-icon > div {
        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    .label { grid-area: label; 
        font-family: Athiti, sans-serif;
        font-size: 1.2em;
        font-weight: 500;
        margin: 0em;
        text-transform: uppercase;
        align-self: center;
    }

    .value { grid-area: value; 
        font-size: 1.5em;
        font-weight: var(--semi-bold);
    }

    .icon { grid-area: icon; }

    .disabled {
        filter: brightness(0) saturate(100%) invert(77%) sepia(0%) saturate(136%) hue-rotate(185deg) brightness(88%) contrast(92%);
    }

    #main-icon {
        height: 90%;
    }

</style>