<script lang="ts">

    export let label: string;
    export let value: string = 'x';
    export let icon: string = '';

    const handleError = ev => ev.target.src = '../static/class-icons/no-class.svg';

</script>

<box class="box-with-icon">
    <div class="value">{value}</div>
    <div class="label">{label}</div>
    <div class="icon">
        <img id="main-icon" src="../static/{icon}.svg" alt="icon" on:error={handleError}>
    </div>
</box>

<style>
    .box-with-icon {
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr; 
        gap: 0em 0.5em; 
        grid-template-areas: 
            "value value value icon icon"
            "value value value icon icon"
            "label label label icon icon";
        padding: 0em 0.5em;   
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

    .icon { grid-area: icon; 
        height: 100%;
        width: 100%;
    }

    #main-icon {
        height: inherit;
    }

</style>