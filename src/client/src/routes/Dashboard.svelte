<script lang="ts">
    import Campaigns from "../components/Campaigns.svelte";
    import Characters from "../components/Characters.svelte";
    import UserProfile from "../components/UserProfile.svelte";
</script>

<UserProfile></UserProfile>
<h1>Dashboard</h1>
<div class="dashboard-content">
    <Campaigns></Campaigns>
    <Characters></Characters>
</div>


<style>
    .dashboard-content {
        display: flex;
        justify-content: space-evenly;
        flex-direction: row;
        align-items: center;
    }
</style>