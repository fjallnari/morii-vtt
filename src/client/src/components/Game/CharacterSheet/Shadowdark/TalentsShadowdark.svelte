<script lang="ts">
    import Icon from "@iconify/svelte";
    import { nanoid } from "nanoid/non-secure";
    import type TalentShadowdark from "../../../../interfaces/Shadowdark/TalentShadowdark";
    import BoxWithList from "../../../BoxWithList.svelte";
    import SimpleAccordionDetail from "../../SimpleAccordionDetail.svelte";
    import { tooltip } from "@svelte-plugins/tooltips";
    import { capitalize } from "../../../../util/util";
    import { modifyCharacter } from "../../../../stores";
    import type { CharacterShadowdark } from "../../../../interfaces/Shadowdark/CharacterShadowdark";

    export let character: CharacterShadowdark;
    let currentFilter = 0;

    enum SOURCE_TYPES {
        ALL,
        OTHER,
        ANCESTRY,
        CLASS
    }

    const PROF_TYPES = [
        { name: 'OTHER', icon: 'mdi:scatter-plot' },
        { name: 'ANCESTRY', icon: 'mdi:account-supervisor' },
        { name: 'CLASS', icon: 'mdi:arrow-projectile-multiple' },
    ];

    const addNewTalent = () => {
        const talentSkeleton: TalentShadowdark = {
            id: nanoid(16),
            name: '',
            type: currentFilter === SOURCE_TYPES.ALL ? 0 : currentFilter - 1,
            content: ''
        }

        character.talents = character.talents.concat([talentSkeleton]);
    }

    const deleteTalent = (talentToDelete: TalentShadowdark) => {
        character.talents = character.talents.filter(obj => obj.id !== talentToDelete.id);
        $modifyCharacter();
    }

    const isSelectedType = (filteredType: number, profType: number) => {
        return filteredType === SOURCE_TYPES.ALL ? true : profType === filteredType - 1;
    }


</script>

<BoxWithList label='Talents' inlineStyle='grid-area: talents;' addNewListItem={() => addNewTalent()} isModifyDisabled>
    <div class="filter-menu" slot='filter-menu'>
        {#each [{ name: 'FILTER_OFF', icon: 'mdi:filter-off' }, ...PROF_TYPES] as profType, index}
            <sendable class="talent-type-icon" 
                use:tooltip={{content: `${capitalize(profType.name.toLowerCase()).split('_').join(' ')}`, theme: 'blurred'}} 
                on:click={() => currentFilter = index } selected={currentFilter === index} on:keyup={() => {}}
            >
                <Icon class="medi-icon" icon={profType.icon} />
            </sendable>
        {/each}
    </div>   
    <div class="talents-list" slot='list'>
        {#each character.talents.filter( talent => isSelectedType(currentFilter, talent.type)) as talent}
            <SimpleAccordionDetail
                bind:value={talent.name} 
                bind:content={talent.content}
                icon={PROF_TYPES[talent.type]?.icon}
                editWidth='15rem'
                deleteItem={() => deleteTalent(talent)}>
            </SimpleAccordionDetail>
        {/each}
    </div>
</BoxWithList>

<style>

    .talents-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.3em;
    }

    .filter-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.2em;
        padding: 0.3em;
        margin-bottom: 0.2em;
    }

    sendable {
        transition: border 100ms ease-in;
    }

    sendable[selected="true"] {
        border-bottom: 1px solid var(--clr-accent-normal); 
        padding-bottom: 0.2em;
    }

</style>