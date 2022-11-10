<script lang="ts">
    import Icon from '@iconify/svelte';
    import { nanoid } from 'nanoid/non-secure'
    import type { Attack, Character } from '../../../../interfaces/Character';
    import { createNewAttack, modifyCharacter } from '../../../../stores';
    import AttackDetail from "./AttackDetail.svelte";

    export let character: Character;

    createNewAttack.set((customName: string = '', itemID: string = '') => {
        const attackObjSkeleton: Attack = {
            id: nanoid(16),
            name: customName,
            atk_ability: '', // e.g. STR
            atk_bonus: '',
            atk_proficiency: false,
            range: '',
            dmg_die: '', // e.g. 1d6
            dmg_ability: '', // e.g. STR
            dmg_bonus: '',
            dmg_type: '', // e.g. Slashing
            versatile_die: '',
            versatile_active: false,
            item_id: itemID
            //// properties: [] // only property ids are saved, e.g. 0 ~ Ammunition
        }

        character.attacks = character.attacks.concat([attackObjSkeleton]);
        return attackObjSkeleton.id;
    });


</script>


{#if character.attacks.length === 0}
    <box class="box-with-label">
        <div class="box-main-text">
            <sendable on:click={() => { $createNewAttack(); $modifyCharacter() }}>
                <Icon class="big-icon" icon="mdi:add" />
            </sendable>
        </div>
        <div class="box-justify-filler"></div>
        <div class="box-label">
            Attacks
        </div>
    </box>
{:else}
    <div class="attacks-list">
        {#each character.attacks as attack}
            <AttackDetail bind:attack={attack} bind:character={character}></AttackDetail>
        {/each}
        <sendable style="cursor: pointer;" on:click={() => { $createNewAttack(); $modifyCharacter() }}>
            <Icon class="big-icon" icon="mdi:add" />
        </sendable>
    </div>
    <div class="box-label">
        Attacks
    </div>
{/if}

<style>
    .box-with-label {
        width: 100%;
    }

    .attacks-list {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0.5em;
        height: 90%;
        width: 100%;
        overflow-y: auto;
        scrollbar-width: thin;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #1d1d22;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #757578;
        border: transparent;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #404044;
    }

</style>