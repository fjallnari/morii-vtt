<script lang="ts">
    import IconButton from '@smui/icon-button';
    import Textfield from '@smui/textfield';

    import { campaignNewActive, user, accessToken } from '../../stores';
    import axios from 'axios';
    import PasswordField from '../PasswordField.svelte';
    import ProgressCircle from '../ProgressCircle.svelte';
    import SimpleButton from '../SimpleButton.svelte';
    import Snackbar, {
        Actions,
        SnackbarComponentDev,
    } from '@smui/snackbar';
    import Button, { Label } from "@smui/button";
    import SimpleIconButton from '../SimpleIconButton.svelte';
    import SimpleTextfield from '../SimpleTextfield.svelte';

    let inviteCode: string = "";
    let password: string = "";
    let inProgress: boolean = false;

    let invalidInviteSnackbar: SnackbarComponentDev;

    const joinCampaign = async () => {
        if (! inviteCode) {
            return;
        }
        try {
            inProgress = true;

            const response = await axios.post('/api/join-campaign', {
                inviteCode: inviteCode,
                password: password
            });

            const newCampaign = response.data.campaigns[0];

            // "live-reloading" to see the newly added campaign instantly without the need to hard reload
            if (response.status === 200 && newCampaign && ! $user.campaigns.find( campaign => campaign._id === newCampaign._id)) {
                user.update( userInfo => {
                    return Object.assign( userInfo, { campaigns: userInfo.campaigns.concat([newCampaign]) });
                });
            }
            
            campaignNewActive.set(! $campaignNewActive);
        }
        catch (err) {
            invalidInviteSnackbar.open();
            inProgress = false;
        }
        
    }

</script>

{#if !inProgress}
    <div class="join-campaign-content">
        <SimpleTextfield bind:value={inviteCode} placeholder="Invite Code" icon="mdi:note-text"></SimpleTextfield>
        <SimpleTextfield bind:value={password} type="password" placeholder="Password" icon="mdi:lock"></SimpleTextfield>
        <SimpleButton value="Join!" type="primary" onClickFn={joinCampaign}></SimpleButton>
    </div>
{:else}
    <div id="progress-circle">
        <ProgressCircle></ProgressCircle>
    </div>
{/if}

<div id="cancel-button">
    <SimpleIconButton icon="mdi:close" width="1.5em" onClickFn={() => campaignNewActive.set(!$campaignNewActive)}></SimpleIconButton>
</div>

<Snackbar bind:this={invalidInviteSnackbar}>
    <Label>Failed to join. Invalid invite code.</Label>
    <Actions>
      <IconButton class="material-icons" title="Dismiss">close</IconButton>
    </Actions>
</Snackbar>


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
