<script lang="ts">
    import IconButton from '@smui/icon-button/src/IconButton.svelte';

</script>


<div class="characters-box">
    <h3>Your Characters</h3>
    
    <div id="create-character-button">
        <IconButton class="material-icons" on:click={() => {}}>add</IconButton>
    </div>
</div>



<style>
    .characters-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        gap: 1em;

        width: 40em;
        height: 35em;
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

    #create-character-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

</style>