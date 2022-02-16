<script lang="ts">
    import Paper from "@smui/paper/src/Paper.svelte";
    import { user } from "../stores";
    import ANIMALS from "../enum/Animals";
    import Logout from "./Logout.svelte";

    let openSettings = false;

</script>

<div id="menu-top">
    <Paper style="cursor: pointer;" on:click={() => {openSettings = true}}>
        <div id="menu-profile">
            <img id="pfp" style="background-color: #{$user.settings.pfpColor};" src="../static/pfp/{ANIMALS[$user.settings.pfpAnimal]}.svg" alt="pfp">
            <h3>{$user.username}</h3>
        </div>
    </Paper>
</div>
<Logout bind:open={openSettings}></Logout>

<style>
    h3 {
        color: #FCF7F8;
        font-size: 1.5em;
        font-family: Montserrat;
        text-transform: uppercase;
        font-weight: 400;
    }

    #menu-top {
        display: flex;
        justify-content: flex-end;
    }

    #menu-profile {
        display: flex; 
        justify-content: center; 
        align-items: center; 
        gap: 1.5em;
        height: 1.5em;
    }

    #pfp {
        border-radius: 25%;
        width: 3em;
        height: 3em;
    }

</style>