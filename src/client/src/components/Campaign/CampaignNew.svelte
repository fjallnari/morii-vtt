<script lang="ts">
    import axios from 'axios';
    import { campaignNewActive, user, accessToken } from '../../stores';
    import type Campaign from '../../interfaces/Campaign';
    import SimpleButton from '../SimpleButton.svelte';
    import SimpleIconButton from '../SimpleIconButton.svelte';
    import SimpleTextfield from '../SimpleTextfield.svelte';
    import SimpleProgressCircle from '../SimpleProgressCircle.svelte';

    const gameSystems = ["D&D 5E"];
    let campaignName: string = "";
    let gameSystem: string = gameSystems[0];
    let inProgress: boolean = false;

    const createCampaign = async () => {
        if (! campaignName) {
            return;
        }
        try {
            inProgress = true;
            // await new Promise(res => setTimeout(res, 1000));

            const response = await axios.post('/api/create-campaign', {
                campaignName: campaignName,
                gameSystem: gameSystem
            });

            // "live-reloading" to see the newly added campaign instantly without the need to hard reload
            const userInfo = $user;
            const newCampaign: Campaign = response.data.campaign;
            const newCampaignWithOwner = Object.assign( newCampaign, {
                owner: {
                    _id: userInfo._id, 
                    username: userInfo.username, 
                    pfpID: userInfo.settings.pfpID, 
                    pfpColor: userInfo.settings.pfpID
                }
            });

            user.update( userInfo => {
                return Object.assign( userInfo, { campaigns: userInfo.campaigns.concat([newCampaignWithOwner]) });
            });
                        
            campaignNewActive.set(! $campaignNewActive);
        }
        catch (err) {
            console.log(err);
        }
        
    }

</script>

{#if !inProgress}
    <div class="create-campaign-content">
        <SimpleTextfield bind:value={campaignName} placeholder="Name" icon="mdi:folder-text"></SimpleTextfield>
        <SimpleTextfield bind:value={gameSystem} placeholder="Game System" icon="iconoir:hexagon-dice" disabled></SimpleTextfield>
        <SimpleButton value="Create!" type="green" onClickFn={createCampaign}></SimpleButton>
    </div>
{:else}
    <div id="progress-circle">
        <SimpleProgressCircle></SimpleProgressCircle>
    </div>
{/if}

<div id="cancel-button">
    <SimpleIconButton icon="mdi:close" width="1.5em" onClickFn={() => campaignNewActive.set(! $campaignNewActive)}></SimpleIconButton>
</div>




<style>
    .create-campaign-content {
        padding-top: 2em;
        width: 17em;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        gap: 2em;
        font-family: Quicksand; 
    }

    :global(.create-campaign-content simple-button) {
        margin-top: 3rem;
        padding: 0.5rem 0em;
        font-size: 1.2em;
    }

    #cancel-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

    #progress-circle {
        padding-top: 6em;
    }

</style>
