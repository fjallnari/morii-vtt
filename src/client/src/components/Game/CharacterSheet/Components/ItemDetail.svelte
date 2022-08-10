<script lang="ts">
    import { addNewResource, createNewAttack, modifyCharacter } from '../../../../stores';
    import IconButton, { Icon } from '@smui/icon-button';
    import { slide, fade } from 'svelte/transition';
    import Tooltip, { Wrapper, Content } from '@smui/tooltip';
    import type { Character, Item } from '../../../../interfaces/Character';
    import InPlaceEdit from '../../../InPlaceEdit.svelte';
    import SimpleButton from '../../../SimpleButton.svelte';

    export let item: Item;
    export let character: Character;
    let isOpen = false;

    const deleteItem = () => {
        character.inventory = character.inventory.filter(obj => obj.id !== item.id);
        $modifyCharacter();
    }

    const deleteAttack = () => {
        character.attacks = character.attacks.filter(obj => obj.id !== item.attack_id);
        item.attack_id = '';
    }

    const addAttack = () => {
        // createNewAttack is defined in 'Attacks.svelte'
        const newAttackID = $createNewAttack(item.name, item.id);
        item.attack_id = newAttackID;
    }

    const changeHasAttack = () => {
        item.has_attack ? deleteAttack() : addAttack();
        item.has_attack = !item.has_attack;

        $modifyCharacter();
    }

    const addResource = () => {
        const newResourceID = $addNewResource(item.name, item.amount, item.id);
        item.resource_id = newResourceID;
        
        if (item.resource_id === '') {
            // TODO - add popup that the max number of resources have been reached
            item.use_as_resource = !item.use_as_resource;
        }
    }

    const deleteResource = () => {
        character.resources = character.resources.filter(obj => obj.id !== item.resource_id);
        item.resource_id = '';
    }

    const changeUseAsResource = () => {
        item.use_as_resource ? deleteResource() : addResource();
        item.use_as_resource = !item.use_as_resource;

        $modifyCharacter();
    }

    const changeItemAmount = () => {
        if (item.use_as_resource) {
            character.resources = character.resources.map(resource => {
                if (resource.id === item.resource_id) {
                    return Object.assign(resource, { current: item.amount });
                }
                else {
                    return resource;
                }
            })
        }
        $modifyCharacter();
    }

    $: item.is_equipped = item.is_equipped && ~~item.amount !== 0;

</script>

<box class="item-container">
    <div class="item-summary">
        <div class="main-item-info">
            <img class="is-equipped-icon" 
                src="../static/{item.is_equipped ? 'checkbox-marked': 'checkbox-blank-outline'}.svg" 
                alt="atk-prof"
                on:click={() => { item.is_equipped = !item.is_equipped; $modifyCharacter(); }}
            >
            <div class="item-amount">
                <InPlaceEdit bind:value={item.amount} editWidth='1.5em' editHeight='1.5em' on:submit={() => changeItemAmount()}/>x
            </div>
            <Wrapper>
                <div class="item-name" style={item.is_equipped ? '' : 'text-decoration: line-through; '}>
                    <InPlaceEdit bind:value={item.name} editWidth='11em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
                </div>
                <Tooltip style={item.want_tooltip && item.tooltip ? '': 'display: none;'} rich xPos="center">
                    <Content>
                        {item.tooltip}
                    </Content>
                </Tooltip>
            </Wrapper>

        </div>
    
        <div class="toggable-item-info">
            {#if character.settings.use_encumbrance}
                <img class="has-weight-icon" 
                    src="../static/{ item.has_weight ? 'weight': 'weight-crossed'}.svg" 
                    alt="has-weight"
                    on:click={() => { item.has_weight = !item.has_weight; $modifyCharacter(); }}
                >
                {#if item.has_weight}
                    <div class="item-weight">
                        <InPlaceEdit bind:value={item.weight} editWidth='1.5em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
                    </div>
                {/if}
            {/if}
            <sendable class="show-details-icon" on:click={() => { isOpen = !isOpen }}>
                <Icon class="material-icons">{isOpen ? 'menu_open' : 'menu'}</Icon>
            </sendable>
        </div>
    </div>
    {#if isOpen}
        <div class="details" transition:slide|local>
            <div class="special-tags">
                <div class="tag-with-icon">
                    <img class="want-tooltip-icon" 
                        src="../static/{item.want_tooltip ? 'tooltip-text': 'tooltip-text-outline'}.svg" 
                        alt="checkbox"
                        on:click={() => { item.want_tooltip = !item.want_tooltip; $modifyCharacter(); }}
                    >
                    <div class="box-label">
                        Show on hover
                    </div>
                </div>
                <div class="tag-with-icon">
                    <img class="has-attack-icon" 
                        src="../static/{item.has_attack? 'shield-sword' : 'shield-sword-outline'}.svg"
                        alt="checkbox"
                        on:click={() => { changeHasAttack() }}
                    >
                    <div class="box-label">
                        Has Attack
                    </div>
                </div>
                <div class="tag-with-icon">
                    <img class="use-as-resource-icon" 
                        src="../static/{item.use_as_resource ? 'checkbox-marked': 'checkbox-blank-outline'}.svg"
                        alt="checkbox"
                        on:click={() => { changeUseAsResource() }}
                    >
                    <div class="box-label">
                        Use as resource
                    </div>
                </div>
            </div>
            <textarea on:change={() => $modifyCharacter()} bind:value={item.tooltip}></textarea>
            <SimpleButton value='Delete' type="delete" onClickFn={deleteItem}></SimpleButton>
        </div>
    {/if}
</box>


<style>
    box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5em;
        width: 97%;
        background-color: var(--clr-box-bg-light);
    }

    .item-summary {
        display: grid; 
        grid-template-columns: 5fr 1.5fr; 
        grid-template-rows: 1fr; 
        gap: 0em; 
        grid-template-areas: 
            "main-item-info toggable-item-info";
        
        width: 100%;
        padding: 0.2em 0em;
    }

    .main-item-info { grid-area: main-item-info;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.4em;
        margin-left: 0.5em;
    }

    img {
        cursor: pointer; 
        height: 1.25em;
        width: 1.25em;
    }

    .main-item-info .item-amount {
        font-weight: var(--semi-bold);
        width: 2em;
        height: 1.5em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .main-item-info .item-name {
        flex-grow: 2;
    }

    .toggable-item-info { grid-area: toggable-item-info;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 0.4em;    
    }

    .show-details-icon {
        margin-right: 0.5em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.details {
		padding: 0em 1em 1em 1em;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 0.5em;
	}

    textarea {
        height: 7em;
    }

    .special-tags {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
    }

    .tag-with-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.2em;
    }

    .tag-with-icon img {
        cursor: pointer;
    }
    
    :global(.mdc-tooltip__surface) {
        background-color: var(--clr-box-bg-dark);
    }

    :global(.mdc-tooltip__content) {
        font-size: 1em;
        font-family: Athiti;
        color: var(--clr-text);
        width: 100%;
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