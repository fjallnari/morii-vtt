<script lang="ts">
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import { campaignDetailActive, selectedCampaign, user } from '../../stores';
    import axios from 'axios';
    import SimpleIconButton from '../SimpleIconButton.svelte';
    import SimpleButton from '../SimpleButton.svelte';

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
    <SimpleIconButton 
        icon="mdi:delete"
        onClickFn={() => open = true}
        color='#FCC8B2'
    >
    </SimpleIconButton>

    <Dialog
        bind:open
        aria-labelledby="simple-title"
        aria-describedby="simple-content"
    >
        <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
        <h3 id="simple-title">Delete campaign</h3>
        <Content>Are you sure you want to delete <strong>{$selectedCampaign.name}</strong>?<br><em>This is irreversible.</em></Content>
        <Actions>
            <SimpleButton value="No" type="primary" onClickFn={() => open = false}></SimpleButton>
            <SimpleButton value="Yes" onClickFn={() => deleteCampaign()}></SimpleButton>
        </Actions>
    </Dialog>
</div>

<style>
    .campaign-delete-content {
        font-family: Montserrat;
    }

    #simple-title {
        font-size: 1.5em;
        text-transform: uppercase;
        font-weight: 400;
    }

</style>