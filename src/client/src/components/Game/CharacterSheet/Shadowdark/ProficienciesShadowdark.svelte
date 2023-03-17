<script lang="ts">
    import Icon from "@iconify/svelte";

    import { tooltip } from "@svelte-plugins/tooltips";
    import { nanoid } from "nanoid/non-secure";
    import type { CharacterShadowdark } from "../../../../interfaces/Shadowdark/CharacterShadowdark";
    import type ProfShadowdark from "../../../../interfaces/Shadowdark/ProfShadowdark";
    import { modifyCharacter } from "../../../../stores";
    import { capitalize } from "../../../../util/util";
    import SimpleAccordionDetail from "../../SimpleAccordionDetail.svelte";

    export let character: CharacterShadowdark;
    let currentFilter = 0;

    const addNewProf = () => {
        const profSkeleton: ProfShadowdark = {
            id: nanoid(16),
            name: '',
            type: currentFilter === 0 ? 0 : currentFilter - 1,
            content: ''
        }

        character.proficiencies = character.proficiencies.concat([profSkeleton]);
    }

    const deleteProf = (prof: ProfShadowdark) => {
        character.proficiencies = character.proficiencies.filter(obj => obj.id !== prof.id);
        $modifyCharacter();
    }

    const PROF_TYPES = [
        { name: 'OTHER', icon: 'mdi:atom' },
        { name: 'ARMOR', icon: 'mdi:shield-half-full' },
        { name: 'WEAPON', icon: 'mdi:sword' },
        { name: 'LANGUAGE', icon: 'mdi:translate' },
    ];

    const isSelectedType = (filteredType: number, profType: number) => {
        return filteredType === 0 ? true : profType === filteredType - 1;
    }

</script>


<box class="proficiencies-container inside-box-content">
    <div class="filter-menu">
        {#each [{ name: 'FILTER_OFF', icon: 'mdi:filter-off' }, ...PROF_TYPES] as profType, index}
            <sendable class="prof-type-icon" 
                use:tooltip={{content: `${capitalize(profType.name.toLowerCase()).split('_').join(' ')}`, theme: 'blurred'}} 
                on:click={() => currentFilter = index } selected={currentFilter === index} on:keyup={() => {}}
            >
                <Icon class="medi-icon" icon={profType.icon} />
            </sendable>
        {/each}                
    </div>
    <div class="inside-box-list">
        {#each character.proficiencies.filter( prof => isSelectedType(currentFilter, prof.type)) as prof}
            <SimpleAccordionDetail 
                bind:value={prof.name} 
                bind:content={prof.content}
                icon={PROF_TYPES[prof.type]?.icon}
                editWidth='10rem'
                textareaHeight='5rem'
                deleteItem={() => deleteProf(prof)}>
            </SimpleAccordionDetail>
        {/each}
        <sendable class="add-new-item" on:click={() => { addNewProf(); $modifyCharacter() }} on:keyup={() => {}}>
            <Icon class="big-icon" icon="mdi:add" />
        </sendable>
    </div>
    <div class="box-justify-filler"></div>
    <div class="box-label">
        Weapons/Armor/Languages
    </div>
</box>


<style>
    sendable {
        transition: border 100ms ease-in;
    }

    sendable[selected="true"] {
        border-bottom: 1px solid var(--clr-accent-normal); 
        padding-bottom: 0.2em;
    }

    .inside-box-content {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    .proficiencies-container {
        width: 100%;
        height: 100%;
    }

    .inside-box-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 0.25em;
        scrollbar-width: thin;
        overflow-y: auto;
    }

    .filter-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.2em;
        padding: 0.3em;
    }

    .add-new-item {
        padding-top: 0.3em;
    }
</style>