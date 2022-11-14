<script lang="ts">
    import SimpleIconButton from "./SimpleIconButton.svelte";

    export let label: string;
    export let theme: string = "default";

    const THEME_PROPERTIES = ['background-color', 'color'];
    const THEMES = {
        "default": ["var(--clr-box-bg-light)"],
        "error": ["var(--clr-contrast-dark)"],
        "success": ["#80A451"],
        "primary": ["var(--clr-accent-dark)"]
    }

    let isActive = false;
    let autoCloseTimeout: NodeJS.Timeout;
    let themeString = "";

    $: if (isActive) {
        // sets theme colors dynamically
        themeString = THEME_PROPERTIES.map((property, index) => `${property}: ${(THEMES[theme] ?? THEMES["default"])[index] ?? 'inherit'};`).join(' ');
        clearTimeout(autoCloseTimeout);
        autoCloseTimeout = setTimeout(() => {
            close();
        }, 3500);
    }

    export function open(snackbarTheme = "default") {
        theme = snackbarTheme;
        isActive = true;
    }

    function close() {
        isActive = false;
    }

</script>

<snackbar class="{isActive ? '' : 'inactive'}" style={themeString}>
    <div class="label">
        {label}
    </div>
    <div class="close">
        <SimpleIconButton icon="mdi:close" width="1.5em" onClickFn={() => close()}></SimpleIconButton>
    </div>
</snackbar>


<style>
    snackbar {
        z-index: 10;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        bottom: 2%;
        border-radius: 4px;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        display: grid;
        grid-template-columns: 6fr 1fr;
        grid-template-rows: 1fr;
        gap: 0px 0px;
        grid-auto-flow: row;
        grid-template-areas:
            "label close";

        opacity: 1;
        -webkit-animation: fadeIn 500ms;
        animation: fadeIn 500ms;
        color: var(--clr-text);
    }

    snackbar.inactive {
        display: none;
        opacity: 0;
    }

    snackbar > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .label { grid-area: label; 
        font-family: Quicksand;
        font-size: 1em;
        font-weight: 400;
        white-space: nowrap;
        padding-left: 1em;
    }

    .close { grid-area: close; }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @-webkit-keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>