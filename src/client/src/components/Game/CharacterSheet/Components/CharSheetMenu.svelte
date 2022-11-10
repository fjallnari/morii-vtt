<script lang="ts">
    import { selectedCharacterTab } from '../../../../stores';
    import SimpleIconButton from '../../../SimpleIconButton.svelte';

    const TABS = [
        { color: '#A7C284', icon: 'mdi:home' },
        { color: '#DBD8B3', icon: 'mdi:script-text' },
        { color: '#EFA48B', icon: 'mdi:fire' },
        { color: '#9DB5B2', icon: 'mdi:cog' },
    ]


</script>

<div class="tab-switch-container">
    {#each TABS as tab, index}
        <SimpleIconButton 
            icon={tab.icon}
            color={tab.color} 
            onClickFn={() => selectedCharacterTab.set(index)}>
        </SimpleIconButton>
    {/each}
    
</div>

<style>
    .tab-switch-container {
        grid-area: char-sheet-menu;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        margin-bottom: 0.5em;
    }

</style>