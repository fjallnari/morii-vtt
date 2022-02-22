<script lang="ts">
    import { selectedCampaign } from '../stores';
    import IconButton from '@smui/icon-button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import Textfield from '@smui/textfield';
    import Tooltip, { Wrapper } from '@smui/tooltip';

    let open = false;
    let playerToInvite: string = "";

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
                <Wrapper>
                    <IconButton class="material-icons" style="color: #6CD4FF" ripple={false} on:click={() => {}}>add</IconButton>
                    <Tooltip>Invite {playerToInvite}</Tooltip>
                </Wrapper>
            </div>
            <div class="invited-list">
                
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
