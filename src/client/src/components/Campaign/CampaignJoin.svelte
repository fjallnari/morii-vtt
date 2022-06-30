<script lang="ts">
    import IconButton from '@smui/icon-button';
    import Textfield from '@smui/textfield';

    import { campaignNewActive, user, accessToken } from '../../stores';
    import axios from 'axios';
    import PasswordField from '../PasswordField.svelte';
    import ProgressCircle from '../ProgressCircle.svelte';
    import SimpleButton from '../SimpleButton.svelte';

    let inviteCode: string = "";
    let password: string = "";
    let inProgress: boolean = false;

    const joinCampaign = async () => {
        if (! inviteCode) {
            return;
        }
        try {
            inProgress = true;
            // await new Promise(res => setTimeout(res, 1000));

            const response = await axios.post('/api/join-campaign', {
                inviteCode: inviteCode,
                password: password
            });

            // "live-reloading" to see the newly added campaign instantly without the need to hard reload
            if (response.status === 200 && response.data.campaigns) {
                user.update( userInfo => {
                    return Object.assign( userInfo, { campaigns: userInfo.campaigns.concat(response.data.campaigns) });
                });
            }
            
            campaignNewActive.set(! $campaignNewActive);
        }
        catch (err) {
            console.log(err);
        }
        
    }

</script>

{#if !inProgress}
    <div class="join-campaign-content">
        <Textfield style="width: 15em;" bind:value={inviteCode} label="Invite Code" required variant="outlined"></Textfield>
        <PasswordField bind:password={password} label="Password"></PasswordField>
        <SimpleButton value="Join!" type="primary" onClickFn={joinCampaign}></SimpleButton>
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
    .join-campaign-content {
        padding-top: 2em;
        width: 15em;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        gap: 2em;        
    }

    :global(.join-campaign-content > simple-button) {
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
