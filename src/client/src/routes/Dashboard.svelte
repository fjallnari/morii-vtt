<script lang="ts">
    import Campaigns from "../components/Campaigns.svelte";
    import Characters from "../components/Characters.svelte";
    import UserProfile from "../components/UserProfile.svelte";
    import { fade } from 'svelte/transition';

    export let campaignDetailActive = false;
    
</script>


<div>
    <UserProfile></UserProfile>
    <h1>Dashboard</h1>
    <div class="dashboard-container">
        <div class:active = {campaignDetailActive} class="campaigns-list"><Campaigns></Campaigns></div>
        {#if campaignDetailActive}
            <div class="campaign-detail" transition:fade="{{duration: 100 }}"><Characters></Characters></div>
        {/if}   
    </div>
    <button on:click={() => campaignDetailActive = ! campaignDetailActive}>Flip</button>
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