<script lang="ts">
    import IconButton from '@smui/icon-button/src/IconButton.svelte';
    import { campaignDetailActive } from '../stores';


</script>

<div id="close-campaign-detail">
    <IconButton class="material-icons" on:click={() => campaignDetailActive.set(false)}>close</IconButton>
</div>

<style>
    #close-campaign-detail {
        margin-top: auto;
        padding-bottom: 1.5em;
    }
</style>
