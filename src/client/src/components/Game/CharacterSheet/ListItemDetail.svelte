<script lang="ts">
    import { slide, fade } from 'svelte/transition';
        
    let isOpen: false;

</script>

<box class="prof-main-container">
    <slot name="summary"></slot>
    {#if isOpen}
        <div class="details" transition:slide>
            <slot name="details"></slot>
        </div>
    {/if}
</box>



<style>
    box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 95%;
        background-color: var(--secondary-box-background-color);
    }

    div.details {
		padding: 0em 0.5em 0.5em 0.5em;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 0.5em;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #1d1d22;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #757578;
        border: transparent;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #404044;
    }

</style>