<script lang="ts">
    import ANIMALS from "../../enum/SVGAnimals";
    import { user } from "../../stores";
    import ThemeSwitcher from "./ThemeSwitcher.svelte";
    import UserSettings from "./UserSettings.svelte";

    let openSettings = false;

</script>

<header>
    <ThemeSwitcher></ThemeSwitcher>
    <user-tag on:click={() => {openSettings = true}} on:keyup={() => {}}>
        <pfp style="background-color: #{$user.settings.pfpColor};">
            {@html `${ANIMALS[$user.settings.pfpID] ?? ANIMALS['default']}`}
        </pfp>
        <h3>{$user.username}</h3>
    </user-tag>
</header>
<UserSettings bind:open={openSettings}></UserSettings>

<style>
    h3 {
        font-size: 1.5em;
        font-family: Montserrat;
        text-transform: uppercase;
        font-weight: 400;
    }

    header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        margin: 1em 2em;
        padding-top: 1em;
        gap: 2em;
    }

    user-tag {
        display: flex; 
        justify-content: center; 
        align-items: center; 
        gap: 1.5em;
        height: 4.5em;

        cursor: pointer;
        padding: 0.1em 1em;
        background-color:var(--clr-box-bg-dark);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    user-tag pfp {
        border-radius: 15%;
        width: 3em;
        height: 3em;
    }

</style>