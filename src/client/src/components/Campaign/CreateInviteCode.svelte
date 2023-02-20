<script lang="ts">
    import { selectedCampaign, user } from '../../stores';
    import Dialog from '@smui/dialog';
    import axios from 'axios';
    import CopyToClipboard from 'svelte-copy-to-clipboard';
    import SimpleButton from '../SimpleButton.svelte';
    import SimpleIconButton from '../SimpleIconButton.svelte';
    import SimpleTextfield from '../SimpleTextfield.svelte';
    import SimpleProgressCircle from '../SimpleProgressCircle.svelte';
    import SimpleSnackbar from '../SimpleSnackbar.svelte';
    import Icon from '@iconify/svelte';
    import type Invite from '../../interfaces/Invite';
    import { params } from 'svelte-spa-router';

    export let invite: Invite;
    export let inGameInvite: boolean = false;

    let open = false;
    let codeWasCopied = false;
    let password: string = "";
    let inProgress = false; 
    let inviteSnackbar: SimpleSnackbar;

    $: inviteLink = `${new URL("/?#/", window.location.href)}?invite=${invite?.invite_code}`;

    const createInviteCode = async () => {
        try {
            inProgress = true;
            const response = await axios.post('/api/create-invite-code', {
                campaignID: $selectedCampaign?._id ?? $params.id,
                password: password
            });
            
            // "Live-reloads" campaign invites
            if (response.status === 200) {
                if (inGameInvite) {
                    user.set(Object.assign($user, { 
                        gameData: Object.assign($user.gameData, {
                            invite: response.data.invite
                        })
                    }));
                }
                else {
                    selectedCampaign.set(Object.assign($selectedCampaign, {
                        invite: response.data.invite
                    }));
                }
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
                campaignID: $selectedCampaign?._id ?? $params.id
            });
            
            // "Live-reloads" campaign invites
            if (response.status === 200) {
                if (inGameInvite) {
                    user.set(Object.assign($user, { 
                        gameData: Object.assign($user.gameData, {
                            invite: ""
                        })
                    }));
                }
                else {
                    selectedCampaign.set(Object.assign($selectedCampaign, {
                        invite: ""
                    }));
                }
            }
            codeWasCopied = false;
            inProgress = false;
        }
        catch (err) {
            console.log(err);
        }
    }

    const openDialog = () => {
        codeWasCopied = false; 
        open = true;
    }

</script>

{#if inGameInvite}
    <SimpleButton value='Invite players'
        icon="mdi:invite"
        iconWidth='1.25em'
        type="primary"
        inlineStyle="width: fit-content; padding: 0.5em;"
        onClickFn={() => openDialog()}
    />
{:else}
    <SimpleIconButton 
        icon="mdi:invite"
        onClickFn={() => openDialog()}
        color='#DBD8B3'
    >
    </SimpleIconButton>
{/if}

<Dialog
    bind:open
    aria-labelledby="simple-title"
    aria-describedby="simple-content"
    surface$style="width: 30em; max-width: calc(100vw - 32px);"
>
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <h3 id="simple-title">Invite Players to {$selectedCampaign?.name ?? $user?.gameData?.name}</h3>
    <div class="dialog-content">
        {#if inProgress}
            <SimpleProgressCircle></SimpleProgressCircle>
        {:else if !invite}
            <div id="generate-code-div">
                <SimpleTextfield type="password" bind:value={password} placeholder="Password" icon="mdi:lock"></SimpleTextfield>
                <SimpleIconButton icon="mdi:invite" color="#DBD8B3" onClickFn={() => createInviteCode()}></SimpleIconButton>
            </div>
            <p id="invite-tooltip">Generates new invite code. Password is optional.</p>
        {:else}
            <div class="invite-card">
                <CopyToClipboard text={invite?.invite_code} on:copy={() => {codeWasCopied = true}} let:copy>
                    <div class="invite-code icon-ripple" on:click={copy} on:keyup={() => {}}>
                        <Icon class="big-icon" icon={`mdi:${codeWasCopied ? "check" : "content-copy"}`} />
                        <p>{invite?.invite_code}</p>
                        <Icon class="big-icon" icon={`material-symbols:${invite?.has_password ? "password" : "no-encryption"}`} />
                    </div>
                </CopyToClipboard>
                <SimpleIconButton icon="mdi:delete" color="#FF6A60" width="1.5em" onClickFn={() => removeInviteCode()}></SimpleIconButton>
            </div>
            <div class="invite-or">OR</div>
            <div class="invite-link">
                <CopyToClipboard text={inviteLink} let:copy on:copy={() => inviteSnackbar.open()}>
                    <SimpleButton value="Get invite link" icon="mdi:link" iconClass="big-icon" type="primary" onClickFn={() => copy()}></SimpleButton>
                </CopyToClipboard>
            </div>
        {/if}
    </div>
    <div id="close-button">
        <SimpleIconButton icon="mdi:close" width="1.5em" onClickFn={() => open = false }></SimpleIconButton>
    </div>
</Dialog>

<SimpleSnackbar bind:this={inviteSnackbar} label="Copied {inviteLink} to clipboard."></SimpleSnackbar>

<style>
    .dialog-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
        margin: 1em;
        font-family: Quicksand;
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
        border-radius: 4px;
        background-color: var(--clr-box-bg-normal);
    }

    .invite-code {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1em;
        padding-left: 1em;
        padding-right: 1em;
        font-size: 1em;
        font-family: Montserrat;
    }

    .invite-or {
        font-weight: var(--semi-bold);
        font-size: 1.2em;
    }

    .invite-link {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        font-size: 1.2em;
    }

    #simple-title {
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
        font-size: 1em;
        font-family: Montserrat;
    }
    
    #close-button {
        margin-top: auto;
        padding-bottom: 1.5em;
        align-self: center;
    }

</style>