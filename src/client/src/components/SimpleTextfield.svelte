<script lang="ts">
    import Icon from "@iconify/svelte";

    export let value: string;
    export let icon: string = undefined;
    export let type: string = "text";
    export let placeholder: string = "";

</script>

<textfield>
    {#if icon}
        <Icon class="biggest-icon" icon={icon} color="#fcf7f88a"></Icon>
    {/if}
    {#if type === "password"}
        <input type="password" placeholder={placeholder} bind:value>
    {:else}
        <input type="text" placeholder={placeholder} bind:value>
    {/if}
</textfield>

<style>
    textfield {
        padding: 0.25em 0.5em;
        box-sizing: border-box;
        border-bottom: 1px solid #fcf7f88a;
        margin-bottom: -1px;
        background-color: transparent;
        font-size: 1em;
        color: var(--clr-text);
        resize: none;
        scrollbar-width: thin;
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    textfield:focus-within {
        outline: none !important;
        border-bottom: 2px solid var(--clr-accent-normal) !important;
        margin-bottom: -2px;
        caret-color: var(--clr-accent-normal) !important;
    }

	textfield:hover {
        outline: none !important;
        border-color: #ffffffb4;
    }

    textfield > input {
        background-color: transparent;
        border: none;
        display: flex;
        height: 100%;
        width: 100%;
        caret-color: var(--clr-accent-normal);
        letter-spacing: 0.009375em;
        font-size: 1.1rem;
        font-weight: 400;
        font-family: Palanquin;
        color: #fcf7f8de;
        padding: 0.75rem;
        font: small-caption;
        font-size: 1em;
    }

    textfield > input:focus-visible {
        border: none;
        outline: none;
    }

</style>