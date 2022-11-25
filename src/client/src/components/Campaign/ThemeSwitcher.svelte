<script lang="ts">
    import Icon from "@iconify/svelte";
    import Dialog from "@smui/dialog/src/Dialog.svelte";
    import { THEMES } from "../../enum/Themes";
    import { cssVarTheme } from "../../util/util";
    import SimpleIconButton from "../SimpleIconButton.svelte";

    let open = false;
    let selected = localStorage.theme || "default";

    function selectTheme(theme) {
        selected = theme.id;
        document.getElementById("root").setAttribute("style", cssVarTheme(theme));
        localStorage.theme = theme.id;
    }

</script>

<Dialog
    bind:open
    aria-labelledby="simple-title"
    aria-describedby="simple-content"
    surface$style="width: 35em; max-width: calc(100vw - 32px);"
>
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <h3 id="simple-title">Change theme</h3>
    <div class="dialog-content">
        {#each THEMES as theme}
            <theme-card tabindex="0" style="{cssVarTheme(theme)}" selected="{theme.id === selected}" on:click={() => selectTheme(theme)}>
                <span class="theme-name">{theme.name}</span>
                <div class="color-palette">
                    <span class="swatch accent-light"></span>
                    <span class="swatch accent-normal"></span>
                    <span class="swatch accent-dark"></span>
                    <span class="swatch accent-darker"></span>
                    <span class="swatch bg-dark"></span>
                </div>
            </theme-card>
        {/each}
    </div>
    <div id="close-button">
        <SimpleIconButton icon="mdi:close" width="1.5em" onClickFn={() => open = false }></SimpleIconButton>
    </div>
</Dialog>

<box class="theme-switch-button" >
    <sendable on:click={() => open = !open}>
        <Icon icon="mdi:invert-colors" width="2em" height="2em"/>
    </sendable>
</box>


<style lang="scss">

    .dialog-content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 1em;
        margin: 1em;
        font-family: Quicksand;
    }

    theme-card {
        background-color: var(--clr-box-bg-normal);
        color: var(--clr-text);
        font-family: Quicksand;
        flex-basis: 33%;
        cursor: pointer;
        font-size: 1.2em;
        display: block;
        padding: 1em;
        border-radius: 4px;
        border: 4px solid transparent;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        width: 100%;
        text-align: center;
    }

    theme-card[selected="true"] {
        border: 4px solid var(--clr-accent-normal);
    }

    .theme-name {
        margin: -0.2em 0em 1em 0em;
        display: block;
    }

    .color-palette .swatch {
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        white-space: nowrap;
        text-indent: 100%;
        text-align: left;
        overflow: hidden;
        vertical-align: bottom;
        box-shadow: 0 0 0 2px #fff;
        margin-left: -.3125em;

        &.accent-light {
            background-color: var(--clr-accent-light);
        }
        &.accent-normal {
            background-color: var(--clr-accent-normal);
        }
        &.accent-dark {
            background-color: var(--clr-accent-dark);
        }
        &.accent-darker {
            background-color: var(--clr-accent-darker);
        }
        &.bg-dark {
            background-color: var(--clr-box-bg-dark);
        }
    }

    box.theme-switch-button {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        height: 3em;
        width: 3em;
        background-color: var(--clr-box-bg-dark);
        left: 1%;
        position: absolute;
    }

    #close-button {
        margin-top: auto;
        padding: 1em;
        align-self: center;
    }


</style>