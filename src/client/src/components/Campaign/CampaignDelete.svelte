<script lang="ts">
    import IconButton from '@smui/icon-button';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button, { Label } from '@smui/button';
    import { accessToken, campaignDetailActive, selectedCampaign, user } from '../../stores';
    import axios from 'axios';

    let open = false;

    const deleteCampaign = async () => {
        try {            
            const response = await axios.post('/api/delete-campaign', {
                campaignID: $selectedCampaign._id
            });

            if (response.status === 200) {
                // removes the campaign from user's campaigns
                user.update( userInfo => {
                    return Object.assign(userInfo, {campaigns: userInfo.campaigns.filter(campaign => campaign._id !== $selectedCampaign._id)});
                });

                campaignDetailActive.set(false)
            }

        }
        catch (err) {
            console.log(err);
        }
    }

</script>


<div class="campaign-delete-content">
    <IconButton class="material-icons" style="color: #FCC8B2" ripple={false} on:click={() => open = true}>delete</IconButton>

    <Dialog
        bind:open
        aria-labelledby="simple-title"
        aria-describedby="simple-content"
    >
        <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
        <h3 id="simple-title">Delete campaign</h3>
        <Content>Are you sure you want to delete <strong>{$selectedCampaign.name}</strong>?<br><em>This is irreversible.</em></Content>
        <Actions>
        <Button variant="raised" on:click={() => open = false}>
            <Label>No</Label>
        </Button>
        <Button color="secondary" on:click={() => deleteCampaign()}>
            <Label>Yes</Label>
        </Button>
        </Actions>
    </Dialog>
</div>

<style>
    .campaign-delete-content {
        font-family: Montserrat;
    }

    #simple-title {
        color: #FCF7F8;
        font-size: 1.5em;
        text-transform: uppercase;
        font-weight: 400;
    }



</style>