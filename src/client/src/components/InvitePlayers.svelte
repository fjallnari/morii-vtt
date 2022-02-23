<script lang="ts">
    import { accessToken, selectedCampaign } from '../stores';
    import IconButton, { Icon } from '@smui/icon-button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import Textfield from '@smui/textfield';
    import Tooltip, { Wrapper } from '@smui/tooltip';
    import List, {
        Item,
        Separator,
        Meta,
        Text,
    } from '@smui/list';
    import axios from 'axios';
    import CircularProgress from '@smui/circular-progress';

    let open = false;
    let playerToInvite: string = "";
    let inProgress = false; 

    const invitePlayer = async () => {
        if (! playerToInvite){
            return;
        }

        try {
            inProgress = true;
            const response = await axios.post('/api/invite-player', {
                username: playerToInvite,
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
                    invited: $selectedCampaign.invited.concat([response.data.invitedPlayer])
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
    <IconButton class="material-icons" style="color: #6CD4FF" ripple={false} on:click={ () => {open = true}}>add</IconButton>
    <Dialog
        bind:open
        aria-labelledby="simple-title"
        aria-describedby="simple-content"
        surface$style="width: 25em; max-width: calc(100vw - 32px);"
    >
        <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
        <h3 id="simple-title">Invite Players to {$selectedCampaign.name}</h3>
        <div class="dialog-content">
            <div class="invite-player">
                <Textfield style="width: 12em;" bind:value={playerToInvite} label="Username" variant="outlined"></Textfield>
                {#if ! inProgress}
                    <Wrapper>
                        <IconButton class="material-icons" style="color: #6CD4FF" ripple={false} on:click={() => invitePlayer()}>add</IconButton>
                        <Tooltip>Invite {playerToInvite}</Tooltip>
                    </Wrapper>
                {:else}
                    <CircularProgress style="height: 2em; width: 2em;" indeterminate />
                {/if}
            </div>
            <div class="invited-list">
                <List
                style="width: 18em; gap: 1em;"
                nonInteractive
                >
                {#each $selectedCampaign.invited as player}
                    <div class="campaign-item">
                        <Item>
                            <img id="invite-sent" style="margin-right: 1em;" src="../static/email-send.svg" alt="invite-sent">
                            <Text>
                                {player.username}
                            </Text>
                            <IconButton class="material-icons" style="color: #ff6a60; margin-left: auto;" ripple={false} on:click={() => {}}>close</IconButton> 
                        </Item>
                    </div>
                {/each}
                </List>               
            </div>
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
        justify-content: flex-start;
        align-items: center;
        gap: 1em;
        margin: 1em;
    }

    .invite-player {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }

    .campaign-item {
        font-family: Montserrat;
    }

    #simple-title {
        color: #FCF7F8;
        font-size: 1.5em;
        font-family: Montserrat;
        font-weight: 400;
    }
    
    #close-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

</style>
