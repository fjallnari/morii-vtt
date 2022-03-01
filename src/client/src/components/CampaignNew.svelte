<script lang="ts">
    import IconButton from '@smui/icon-button';
    import Button, { Label } from '@smui/button';
    import Textfield from '@smui/textfield';
    import Select, { Option } from '@smui/select';

    import { campaignNewActive, user, accessToken } from '../stores';
    import ProgressCircle from './ProgressCircle.svelte';
    import type Campaign from '../interfaces/Campaign';
    import axios from 'axios';

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
            },
            {
                headers: {
					'Authorization': `Bearer ${$accessToken}`
				}
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
        <Textfield style="width: 17em;" bind:value={campaignName} label="Name" required variant="outlined"></Textfield>
        <div>
            <Select style="width: 17em;" variant="outlined" bind:gameSystem label="Game System" disabled>
            {#each gameSystems as system}
                <Option gameSystem={system}>{system}</Option>
            {/each}
            </Select>
        </div>
        <div style="padding-top: 3em;">
            <Button variant="raised" color="primary" on:click={createCampaign}>
                <Label>Create!</Label>
            </Button>
        </div>
    </div>
{:else}
    <div id="progress-circle">
        <ProgressCircle></ProgressCircle>
    </div>
{/if}

<div id="cancel-button">
    <IconButton class="material-icons" on:click={ () => campaignNewActive.set(! $campaignNewActive) }>close</IconButton>
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
    }

    #cancel-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

    #progress-circle {
        padding-top: 6em;
    }

</style>
