<script lang="ts">
    import IconButton from '@smui/icon-button/src/IconButton.svelte';
    import { campaignNewActive } from '../stores';
</script>


<div id="create-campaign-button">
    <IconButton class="material-icons" on:click={ () => campaignNewActive.set(! $campaignNewActive) }>close</IconButton>
</div>

<style>
    #create-campaign-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }
</style>
