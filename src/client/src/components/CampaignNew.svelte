<script lang="ts">
    import IconButton from '@smui/icon-button/src/IconButton.svelte';
    import Button, { Label } from '@smui/button';
    import Textfield from '@smui/textfield';
    import Select, { Option } from '@smui/select';

    import { campaignNewActive } from '../stores';
import ProgressCircle from './ProgressCircle.svelte';

    const gameSystems = ["D&D 5E"];
    let campaignName: string = "";
    let gameSystem: string = gameSystems[0];
    let inProgress: boolean = false;


</script>

{#if !inProgress}
    <div class="create-campaign-content">
        <Textfield style="width: 17em;" bind:value={campaignName} label="Name" required variant="outlined"></Textfield>
        <div>
            <Select style="width: 17em;" variant="outlined" bind:gameSystem label="Game System" disabled>
            {#each gameSystems as system}
                <Option gameSystem={system}>{system}</Option>
            {/each}
            </Select>
        </div>
        <div style="padding-top: 3em;">
            <Button variant="raised" color="primary" on:click={() => inProgress = true}>
                <Label>Create!</Label>
            </Button>
        </div>
    </div>
{:else}
    <div id="progress-circle">
        <ProgressCircle></ProgressCircle>
    </div>
{/if}

<div id="create-campaign-button">
    <IconButton class="material-icons" on:click={ () => campaignNewActive.set(! $campaignNewActive) }>close</IconButton>
</div>




<style>
    .create-campaign-content {
        padding-top: 2em;
        width: 17em;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        gap: 2em;        
    }

    #create-campaign-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

    #progress-circle {
        padding-top: 6em;
    }

</style>
