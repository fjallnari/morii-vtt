<script lang="ts">
    import type { Character, Item } from "../../../interfaces/Character";
    import { modifyCharacter } from "../../../stores";
    import InPlaceEdit from "../../InPlaceEdit.svelte";
    import IconButton, { Icon } from '@smui/icon-button';
    import { slide, fade } from 'svelte/transition';
    import Tooltip, { Wrapper, Content } from '@smui/tooltip';
    import Button, { Label } from '@smui/button';

    export let item: Item;
    export let character: Character;
    let isOpen = false;

    const changeItemAmount = () => {
        item.is_equipped = ~~item.amount !== 0;
        $modifyCharacter();
    }

    const deleteItem = () => {
        character.inventory = character.inventory.filter(obj => obj.id !== item.id);
        $modifyCharacter();
    }

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
            <img class="has-attack-icon" 
                src="../static/shield-sword{item.has_attack? '': '-outline'}.svg" 
                alt="has-attack"
                on:click={() => { item.has_attack = !item.has_attack; $modifyCharacter(); }}
            >
            <img class="want-tooltip-icon" 
                src="../static/tooltip-text{ item.want_tooltip ? '': '-outline'}.svg" 
                alt="want-tooltip"
                on:click={() => { item.want_tooltip = !item.want_tooltip; $modifyCharacter(); }}
            >
            <img class="has-weight-icon" 
                src="../static/weight{ item.has_weight ? '': '-crossed'}.svg" 
                alt="has-weight"
                on:click={() => { item.has_weight = !item.has_weight; $modifyCharacter(); }}
            >
            {#if item.has_weight}
                <div class="item-weight">
                    <InPlaceEdit bind:value={item.weight} editWidth='1.5em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
                </div>
            {/if}
            <sendable class="show-details-icon" on:click={() => { isOpen = !isOpen }}>
                <Icon class="material-icons">{isOpen ? 'menu_open' : 'menu'}</Icon>
            </sendable>
        </div>
    </div>
    {#if isOpen}
        <div class="details" transition:slide>
            <textarea on:change={() => $modifyCharacter()} bind:value={item.tooltip}></textarea>
            <box id="delete-item">
                <div class="box-label" on:click={() => deleteItem()}>
                    Delete
                </div>
            </box>
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
        background-color: var(--secondary-box-background-color);
        /*
        border-bottom: 1px solid var(--primary-text-color);
        border-image: linear-gradient(to right, rgba(108,219,141,0) 5%,#FCF7F8 25%,#FCF7F8 75%,rgba(108,219,141,0) 95%);
        border-image-slice: 3;
        */
    }

    .item-summary {
        display: grid; 
        grid-template-columns: 5fr 2fr; 
        grid-template-rows: 1fr; 
        gap: 0px 0px; 
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
        font-weight: bold;
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
        justify-content: center;
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
        width: 100%;
        height: 7em;
        padding: 0.5em 0.5em;
        box-sizing: border-box;
        border: 1px solid var(--primary-text-color);
        border-radius: 4px;
        background-color: transparent;
        font-size: 1em;
        font-family: Athiti;
        color: var(--primary-text-color);
        resize: none;
        scrollbar-width: thin;
    }

    textarea:focus {
        outline: none !important;
        border: 2px solid var(--primary-accent-color);
        caret-color: var(--primary-accent-color);
    }

    #delete-item {
        background-color: var(--delete-button-background-color);
        width: 100%;
        cursor: pointer;
    }

    #delete-item div {
        font-size: 1em;
        font-weight: bold;
    }
    
    :global(.mdc-tooltip__surface) {
        background-color: #212125;
    }

    :global(.mdc-tooltip__content) {
        font-size: 1em;
        font-family: Athiti;
        color: var(--primary-text-color);
        width: 100%;
    }

    ::-webkit-scrollbar {
        width: 9px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(155, 155, 155, 0.5);
        border-radius: 4px;
        border: transparent;
    }


</style>