<script lang="ts">
    export let title = "";
    export let component;
</script>


<div class="dashboard-box">
    <h3>{title}</h3>
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
        background-color:#212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 1%;
    }

    h3 {
        color: #FCF7F8;
        font-size: 2em;
        font-family: Quicksand;
        font-weight: 200;
    }

</style>