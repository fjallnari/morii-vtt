<script lang="ts">
    export let component;
</script>


<div class="dashboard-box">
    <slot name="title"></slot>
    <svelte:component this={component}/>
</div>



<style>
    .dashboard-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        gap: 1em;

        width: 30vw;
        height: 60vh;
        background-color: var(--clr-box-bg-dark); /* #202024CF */
        /* backdrop-filter: blur(6px); */
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    :global(.dashboard-box > h3) {
        color: var(--clr-text);
        font-size: 2em;
        font-family: Quicksand;
        font-weight: 200;
    }

</style>