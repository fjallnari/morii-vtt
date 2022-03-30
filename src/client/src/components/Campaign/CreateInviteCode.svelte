<script lang="ts">
    import { accessToken, selectedCampaign } from '../../stores';
    import IconButton, { Icon } from '@smui/icon-button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import axios from 'axios';
    import CircularProgress from '@smui/circular-progress';
    import PasswordField from '../PasswordField.svelte';
    import Ripple from '@smui/ripple';
    import CopyToClipboard from 'svelte-copy-to-clipboard';

    let open = false;
    let codeWasCopied = false;
    let password: string = "";
    let inProgress = false; 

    const createInviteCode = async () => {
        try {
            inProgress = true;
            const response = await axios.post('/api/create-invite-code', {
                campaignID: $selectedCampaign._id,
                password: password
            }, 
            {
                headers: {
					'Authorization': `Bearer ${$accessToken}`
				}
            });
            
            // "Live-reloads" campaign invites
            if (response.status === 200) {
                selectedCampaign.set(Object.assign($selectedCampaign, {
                    invite: response.data.invite
                }));
            }
            inProgress = false;
        }
        catch (err) {
            console.log(err);
        }
    }

    const removeInviteCode = async () => {
        try {
            inProgress = true;
            const response = await axios.post('/api/remove-invite-code', {
                campaignID: $selectedCampaign._id
            },
            {
                headers: {
					'Authorization': `Bearer ${$accessToken}`
				}
            });
            
            // "Live-reloads" campaign invites
            if (response.status === 200) {
                selectedCampaign.set(Object.assign($selectedCampaign, {
                    invite: ""
                }));
            }
            inProgress = false;
        }
        catch (err) {
            console.log(err);
        }


    }

</script>


<div>
    <IconButton ripple={false} on:click={() => {codeWasCopied = false; open = true}}>
        <img id="invite-image" src="../static/invite.svg" alt="invite">
    </IconButton>
    <Dialog
        bind:open
        aria-labelledby="simple-title"
        aria-describedby="simple-content"
        surface$style="width: 30em; max-width: calc(100vw - 32px);"
    >
        <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
        <h3 id="simple-title">Invite Players to {$selectedCampaign.name}</h3>
        <div class="dialog-content">
            {#if inProgress}
                <CircularProgress style="height: 2em; width: 2em;" indeterminate></CircularProgress>
            {:else if ! $selectedCampaign.invite}
                <div id="generate-code-div">
                    <PasswordField bind:password={password} label="Password"></PasswordField>

                    <IconButton ripple={false} on:click={() => createInviteCode()}>
                        <img id="invite" src="../static/invite.svg" alt="invite">
                    </IconButton>
                </div>
                <p id="invite-tooltip">Generates new invite code. Password is optional.</p>
            {:else}
                <div class="invite-card">
                    <CopyToClipboard text={$selectedCampaign.invite.invite_code} on:copy={() => {codeWasCopied = true}} let:copy>
                        <div class="invite-code" use:Ripple={{ surface: true }} on:click={copy}>
                            <Icon class="material-icons">{codeWasCopied ? "check" : "content_copy"}</Icon>
                            <p>{$selectedCampaign.invite.invite_code}</p>
                            <Icon class="material-icons">{$selectedCampaign.invite.has_password ? "password" : "no_encryption"}</Icon>
                        </div>
                    </CopyToClipboard>
                    <IconButton class="material-icons" style="color: #ff6a60;" ripple={false} on:click={() => removeInviteCode()}>delete</IconButton>
                </div>
            {/if}
        </div>
        <div id="close-button">
            <IconButton class="material-icons" ripple={false} on:click={() => {open = false}}>close</IconButton>
        </div>
    </Dialog>
</div>

<style>
    .dialog-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
        margin: 1em;
    }

    .invite-card {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1em;
        padding-right: 1em;
        cursor: pointer;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 3px;
    }

    .invite-code {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1em;
        padding-left: 1em;
        padding-right: 1em;
        color: #FCF7F8;
        font-size: 1em;
        font-family: Montserrat;
    }

    #simple-title {
        color: #FCF7F8;
        font-size: 1.5em;
        font-family: Montserrat;
        font-weight: 400;
    }

    #generate-code-div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }

    #invite-tooltip {
        color: #FCF7F8;
        font-size: 1em;
        font-family: Montserrat;
    }
    
    #close-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

</style>