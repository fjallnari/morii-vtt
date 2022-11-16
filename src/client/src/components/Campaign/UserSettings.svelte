<script lang="ts">
    import Dialog from '@smui/dialog';
    import { replace } from 'svelte-spa-router';
    import { axiosPublic } from '../../axiosPublic';
    import ANIMALS from '../../enum/Animals';
    import type UserSettings from '../../interfaces/UserSettings';
    import { accessToken, user } from '../../stores';
    import SimpleButton from '../SimpleButton.svelte';
    // @ts-ignore
    import { HsvPicker } from 'svelte-color-picker';
    import axios from 'axios';

    export let open: boolean;
    let settingsEditObj: UserSettings = { pfpID: $user.settings.pfpID, pfpColor: $user.settings.pfpColor };

    const logoutUser = async () => {
        try {
            await axiosPublic.post('/auth/signout');
            accessToken.set(undefined);
            replace('/auth');
        }
        catch (err) {
            console.log(err);
        }
    }

    const saveSettings = async () => {
        try {
            await axios.post('/api/change-user-settings', {
                newSettings: settingsEditObj
            });
            user.set(Object.assign($user, { settings: settingsEditObj }));
            open = false;
        }
        catch (err) {
            console.log(err);
        }
    }

    const closeSettings = () => {
        settingsEditObj = { pfpID: $user.settings.pfpID, pfpColor: $user.settings.pfpColor };
        open = false;
    }
    
    // https://stackoverflow.com/a/5623914/13222140
    const rgbToHex = (r: number, g: number, b: number) => {
        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    const colorCallback = (colorChange) => {
        const rgba = colorChange.detail;
        settingsEditObj.pfpColor = rgbToHex(rgba.r, rgba.g, rgba.b);
    }

</script>

<Dialog
    bind:open
    fullscreen
    aria-labelledby="simple-title"
    surface$style="padding: 0.5em 1em; width: 35em;"
>
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <h3 id="simple-title">Settings</h3>
    <settings-content>
        <div class="pfp-select">
            {#each ANIMALS as pfpAnimal, index}
                <img 
                    class="{settingsEditObj.pfpID === index ? 'selected' : 'pfp'}" 
                    style="background-color: transparent;" 
                    src="../static/pfp/{pfpAnimal}.svg" 
                    alt="pfp"
                    on:click={() => {settingsEditObj.pfpID = index}}
                    tabindex="0"
                >
            {/each}
        </div>
        <div class="color-picker">
            <HsvPicker on:colorChange={colorCallback} startColor={`#${$user.settings.pfpColor}`}/>
            <user-tag>
                <img class="pfp" style="background-color: #{settingsEditObj.pfpColor};" src="../static/pfp/{ANIMALS[settingsEditObj.pfpID]}.svg" alt="pfp">
                <h3>{$user.username}</h3>
            </user-tag>
        </div>
        <div class="settings-buttons">
            <SimpleButton value='Logout' icon='mdi:logout' iconClass="big-icon" type='delete' onClickFn={() => logoutUser()}></SimpleButton>
            <SimpleButton value='' icon='mdi:close' iconClass="big-icon" type='default' onClickFn={() => closeSettings()}></SimpleButton>
            <SimpleButton value='Save' icon='mdi:content-save-cog' iconClass="big-icon" type='green' onClickFn={() => saveSettings()}></SimpleButton>
        </div>
    </settings-content>
</Dialog>


<style>
    #simple-title {
        font-size: 1.5em;
        font-family: Montserrat;
        text-transform: uppercase;
        font-weight: 400;
    }

    settings-content {
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 1fr 1fr 0.25fr; 
        gap: 1em;
        grid-template-areas: 
            "pfp-select color-picker"
            "pfp-select color-picker"
            "settings-buttons settings-buttons";
        height: 100%;
    }

    .pfp-select { grid-area: pfp-select; 
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5em;
        overflow-y: auto;
        scrollbar-width: thin;
    }

    .pfp-select img {
        width: 3em;
        height: 3em;
        cursor: pointer;
    }

    .pfp-select img:hover {
        filter: brightness(0) saturate(100%) invert(68%) sepia(12%) saturate(919%) hue-rotate(160deg) brightness(89%) contrast(91%);
    }

    .pfp-select img:active {
        filter: brightness(0) saturate(100%) invert(30%) sepia(10%) saturate(3076%) hue-rotate(190deg) brightness(90%) contrast(90%);
    }

    .pfp-select > img.selected {
        border-bottom: 2px var(--clr-text) solid;
        filter: brightness(0) saturate(100%) invert(50%) sepia(49%) saturate(409%) hue-rotate(176deg) brightness(81%) contrast(82%);
    }


    .color-picker { grid-area: color-picker;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
    }

    :global(.color-picker .main-container), :global(.color-picker .colorsquare), :global(.color-picker .saturation-gradient) {
        border-radius: 4px;
    }

    :global(.color-picker .main-container) {
        height: 73% !important;
        border-radius: 4px !important;
    }

    :global(.color-picker .alpha-selector), :global(.color-picker .color-info-box) {
        display: none;
    }

    user-tag {
        display: flex; 
        justify-content: center; 
        align-items: center; 
        gap: 1em;

        padding: 0.5em;
        margin: 1em 4px 4px 4px;
        background-color: var(--clr-box-bg-normal);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        max-width: 70%;
    }

    user-tag img {
        border-radius: 15%;
        width: 3em;
        height: 3em;
    }

    user-tag h3 {
        font-size: 1em;
        font-family: Montserrat;
        text-transform: uppercase;
        font-weight: 400;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .settings-buttons { grid-area: settings-buttons;
        display: flex;
        justify-content: center;
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