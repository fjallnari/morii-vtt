<script lang="ts">
    import { fade } from 'svelte/transition';
    import Campaigns from "../components/Campaign/Campaigns.svelte";
    import UserProfile from "../components/UserProfile.svelte";
    import DashboardBox from "../components/DashboardBox.svelte";
    import { campaignNewActive, campaignDetailActive, selectedCampaign, user } from "../stores";
    import CampaignChoice from '../components/Campaign/CampaignChoice.svelte';
    import CampaignDetailOwner from "../components/Campaign/CampaignDetailOwner.svelte";
    import CampaignDetailPlayer from '../components/Campaign/CampaignDetailPlayer.svelte';

    campaignDetailActive.set(false);
    campaignNewActive.set(false);
    
</script>


<div>
    <UserProfile></UserProfile>
    <h1>Dashboard</h1>
    <div class="dashboard-container">
        <div class:active = {$campaignDetailActive} class="campaigns-list">
            {#if $campaignNewActive}
                <DashboardBox title="Create/Join Campaign" component={CampaignChoice}></DashboardBox>
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



<style>
    .dashboard-container {
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        padding-right: 15em;
        padding-left: 15em;
    }
    
    .campaign-detail {
        flex: 1;
        max-width: fit-content;
        
    }
    
    .campaigns-list {
        flex: 0;
        transition: flex 0.5s;
    }

    .dashboard-container .active {
        flex: auto;
    }
</style>