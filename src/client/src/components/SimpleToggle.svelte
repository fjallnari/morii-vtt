<script lang="ts">
    export let checked = false;
    export let onToggleFce = () => {};
</script>

<label class="switch">
    <input type="checkbox" bind:checked on:change={() => onToggleFce()} />
    <span class="slider" />
</label>

<style>
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--clr-box-bg-lighter);
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: var(--clr-text);
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: var(--clr-accent-normal);
    }

    input:checked + .slider {
        box-shadow: 0 0 1px var(--clr-accent-normal);
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
</style>