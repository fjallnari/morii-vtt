<script lang="ts">
    import GAME_SYSTEMS from '../../../../enum/GameSystems';
    import { selectedCharacterTab, user } from '../../../../stores';
    import SimpleIconButton from '../../../SimpleIconButton.svelte';

    const TABS = GAME_SYSTEMS[$user?.gameData?.system].characterSheetTabs;

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
    }

</style>