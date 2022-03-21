<script lang="ts">
    import { user } from "../stores";
    import ANIMALS from "../enum/Animals";
    import Logout from "./Logout.svelte";

    let openSettings = false;

</script>

<div class="menu-top">
    <div id="menu-profile" on:click={() => {openSettings = true}}>
        <img id="pfp" style="background-color: #{$user.settings.pfpColor};" src="../static/pfp/{ANIMALS[$user.settings.pfpID]}.svg" alt="pfp">
        <h3>{$user.username}</h3>
    </div>
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

    .menu-top {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 4em;
    }

    #menu-profile {
        display: flex; 
        justify-content: center; 
        align-items: center; 
        gap: 1.5em;
        height: 4.5em;

        cursor: pointer;
        padding: 0.1em 1em;
        margin-top: 1em;
        background-color:#212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    #pfp {
        border-radius: 15%;
        width: 3em;
        height: 3em;
    }

</style>