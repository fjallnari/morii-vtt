<script lang="ts">
    import Icon from "@iconify/svelte";

    export let label: string = '';
    export let headerText: string = ''
    export let gridArea: string = '';

    let isHeaderToggled: boolean = false;

</script>

<box class="box-with-header-main-container" style="grid-area: {gridArea};">
    <box-header>
        <header-text class='{isHeaderToggled ? 'toggle-on' : 'toggle-off'}' >{headerText}</header-text>
        <sendable class="tooltip-toggle-icon" on:click={() => isHeaderToggled = !isHeaderToggled}>
            <Icon class="big-icon" icon="{isHeaderToggled ? 'mdi:information' : 'mdi:information-outline'}" />
        </sendable>
    </box-header>

    <div class="box-main-text {isHeaderToggled ? 'toggle-on' : 'toggle-off'}">
        <slot/>
    </div>
    
    <div class="box-justify-filler"></div>
    <div class="box-label">
        {label}
    </div>
</box>

<style>
    .box-with-header-main-container {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }

    box-header {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    header-text {
        font-family: Quicksand;
        text-transform: none;
        margin-top: 0.2em;
        font-size: 0.6vw;
        margin-right: 1.3em;
        margin-left: 1.3em;
    }

    header-text.toggle-off {
        display: none;
    }

    header-text.toggle-on {
        display: inherit;
    }

    .tooltip-toggle-icon {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 1.5em;
        height: 1.5em;
        cursor: pointer;
    }

    .box-main-text {
        font-weight: var(--semi-bold);
        font-size: 1.2em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box-main-text.toggle-on {
        margin-bottom: 0em;
    }

</style>