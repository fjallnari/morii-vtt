<script lang="ts">
    import { fade } from 'svelte/transition';
    import Campaigns from "../components/Campaign/Campaigns.svelte";
    import DashboardBox from "../components/DashboardBox.svelte";
    import { campaignNewActive, campaignDetailActive, selectedCampaign, user } from "../stores";
    import CampaignChoice from '../components/Campaign/CampaignChoice.svelte';
    import CampaignDetailOwner from "../components/Campaign/CampaignDetailOwner.svelte";
    import CampaignDetailPlayer from '../components/Campaign/CampaignDetailPlayer.svelte';
    import DashboardHeader from '../components/Campaign/DashboardHeader.svelte';
    import { onMount } from 'svelte';
    import { querystring } from 'svelte-spa-router';
    import axios from 'axios';
    import Dialog, { Content, Actions } from '@smui/dialog';
    import SimpleButton from '../components/SimpleButton.svelte';

    campaignDetailActive.set(false);
    campaignNewActive.set(false);

    let joinDialogOpen = false;
    let inviteCode = undefined;

    onMount (() => {
        const searchParams = new URLSearchParams($querystring);
		inviteCode = searchParams.get('invite');
        if (inviteCode) {
            joinDialogOpen = true;
        }
    });

    const joinCampaign = async (inviteCode: string, password = '') => {
        if (! inviteCode) {
            return;
        }
        try {

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
        }
        catch (err) {

        }

        joinDialogOpen = false
    }
    
</script>

<div class="upper-container">
    <div class="dashboard-container">
        <DashboardHeader></DashboardHeader>
        <h1>Dashboard</h1>
        <div class="dashboard-content">
            <div class:active = {$campaignDetailActive} class="campaigns-list">
                {#if $campaignNewActive}
                    <DashboardBox title="Add Campaign" component={CampaignChoice}></DashboardBox>
                {:else}
                    <DashboardBox title="Your Campaigns" component={Campaigns}></DashboardBox>
                {/if}
            </div>
            {#if $campaignDetailActive}
                <div class="campaign-detail" transition:fade="{{ duration: 100 }}">
                    <DashboardBox title={$selectedCampaign.name} component={$user._id === $selectedCampaign.owner._id ? CampaignDetailOwner : CampaignDetailPlayer}></DashboardBox>
                </div>
            {/if}   
        </div>
    </div>
    <div class="overlay"></div>
    <Dialog
        bind:open={joinDialogOpen}
        aria-labelledby="simple-title"
        surface$style="padding: 0.5em 1em;"
    >
        <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
        <h3 id="simple-title">invited to:</h3>
        <Actions id="dialog-buttons">
            <SimpleButton value='Reject' icon='close' type='default' onClickFn={() => joinDialogOpen = false}></SimpleButton>
            <SimpleButton value='Accept' icon='close' type='green' onClickFn={() => joinCampaign(inviteCode)}></SimpleButton>
        </Actions>
    </Dialog>
</div>




<style>
    .upper-container {
        display: grid;
    }

    .dashboard-container, .overlay {
        grid-area: 1 / 1;
    }

    .overlay {
        background: var(--bg-waves) no-repeat;
        background-size: 100%;
        margin: 0em -1em;
    }

    .dashboard-content {
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        padding-right: 10%;
        padding-left: 10%;
        position: relative;
    }
    
    .campaign-detail {
        flex: 1;
        max-width: fit-content;
    }
    
    .campaigns-list {
        flex: 0;
        transition: flex 0.5s;
    }

    .dashboard-content .active {
        flex: auto;
    }
</style>