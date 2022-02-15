<script lang="ts">
    import Paper from "@smui/paper/src/Paper.svelte";
    import IconButton from "@smui/icon-button";
    import List, { Item, Separator, Text } from '@smui/list';
    import { user } from "../stores";
    import Settings from "../components/Settings.svelte";
    import ANIMALS from "../enum/Animals";

    const sayHello = () => {
        console.log('Hello!');
    }

    console.log($user.settings);

</script>

<div id="menu-top">
    <Paper style="cursor: pointer;" on:click={sayHello}>
        <div id="menu-profile">
            <img id="pfp" style="background-color: #{$user.settings.pfpColor};" src="../static/pfp/{ANIMALS[$user.settings.pfpAnimal]}.svg" alt="pfp">
            <h3>{$user.username}</h3>
        </div>
    </Paper>
</div>
<Settings></Settings>

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
