<script lang="ts">
    import type { Character, Item } from "../../../interfaces/Character";
    import { modifyCharacter } from "../../../stores";
    import InPlaceEdit from "../../InPlaceEdit.svelte";
    import IconButton, { Icon } from '@smui/icon-button';
    import { slide, fade } from 'svelte/transition';

    export let item: Item;
    export let character: Character;

    const changeItemAmount = () => {
        item.is_equipped = ~~item.amount !== 0;
        $modifyCharacter();
    }

    const deleteItem = () => {
        character.inventory = character.inventory.filter(obj => obj.id !== item.id);
        $modifyCharacter();
    }

</script>

<box class="item-container" transition:slide>
    <div class="main-item-info">
        <img class="is-equipped-icon" 
            src="../static/{item.is_equipped ? 'checkbox-marked': 'checkbox-blank-outline'}.svg" 
            alt="atk-prof"
            on:click={() => { item.is_equipped = !item.is_equipped; $modifyCharacter(); }}
        >
        <div class="item-amount">
            <InPlaceEdit bind:value={item.amount} editWidth='1.5em' editHeight='1.5em' on:submit={() => changeItemAmount()}/>x
        </div>
        <div class="item-name" style={item.is_equipped ? '' : 'text-decoration: line-through; '}>
            <InPlaceEdit bind:value={item.name} editWidth='11em' editHeight='1.5em' on:submit={() => $modifyCharacter()}/>
        </div>
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
    </div>
    
    <div class="delete-item" on:click={() => deleteItem()}>
        <Icon class="material-icons">delete</Icon>
    </div>
</box>

<style>
    box {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.1em;
        width: 100%;
        height: 2em;
        background-color: #303036;
    }

    .item-container {
        display: grid; 
        grid-template-columns: 5fr 2fr 0.5fr; 
        grid-template-rows: 1fr; 
        gap: 0px 0px; 
        grid-template-areas: 
            "main-item-info toggable-item-info delete-item";
        margin-top: 0.5em;
        width: 97%;
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
        height: 1.4em; 
        width: 1.4em;
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
    .delete-item { grid-area: delete-item;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer; 
        color: #BC4B51;
    }


</style>