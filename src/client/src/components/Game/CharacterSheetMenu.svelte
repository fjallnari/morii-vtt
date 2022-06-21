<script lang="ts">
    import IconButton, { Icon } from '@smui/icon-button';
    import { selectedCharacterTab } from '../../stores';

    const TABS = [
        { color: '#A7C284', icon: 'home' },
        { color: '#DBD8B3', icon: 'article' },
        { color: '#EFA48B', icon: 'local_fire_department' },
        { color: '#9DB5B2', icon: 'settings' },
    ]


</script>

<div class="tab-switch-container">
    {#each TABS as tab, index}
        <IconButton 
            class="material-icons" 
            style="color: {tab.color}; font-size: xx-large;" 
            ripple={false} 
            on:click={() => selectedCharacterTab.set(index)}
        >
            {tab.icon}
        </IconButton>
    {/each}
    
</div>

<style>
    .tab-switch-container {
        grid-area: char-sheet-menu;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1em;
        margin-bottom: 0.5em;
    }

</style>