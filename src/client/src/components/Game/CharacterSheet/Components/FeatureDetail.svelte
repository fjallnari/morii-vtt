<script lang="ts">
    import { isMessagePublic, modifyCharacter, socket, user } from '../../../../stores';
    import { Icon } from '@smui/icon-button';
    import { slide, fade } from 'svelte/transition';
    import { params } from "svelte-spa-router";
    import type { Character, Feature } from '../../../../interfaces/Character';
    import InPlaceEdit from '../../../InPlaceEdit.svelte';
    import SimpleButton from '../../../SimpleButton.svelte';

    export let feature: Feature;
    export let character: Character;
    let isOpen: boolean = false;

    const featureTypes = [
        { name: 'RACIAL', icon: 'account-supervisor' },
        { name: 'CLASS', icon: 'arrow-projectile-multiple' },
        { name: 'FEAT', icon: 'arm-flex' },
        { name: 'BACKGROUND', icon: 'sprout' },
        { name: 'OTHER', icon: 'atom' }
    ];

    const deleteFeature = () => {
        character.features = character.features.filter(obj => obj.id !== feature.id);
        $modifyCharacter();
    }

    const sendFeature = () => {
        $socket.emit('chat-message', {
            senderInfo: {
                _id: $user._id, 
                username: $user.username,
                settings: $user.settings,
            }, 
            messageText: `#### ${feature.name}\n${feature.content}`,
            skillCheckInfo: {
                characterName: character.name,
                skillName: ''
            },
            gameID: $params.id,
            isPublic: $isMessagePublic
        });
    }

</script>

<box class="feature-main-container">
    <div class="feature-summary">
        <div class="feature-type">
            <img class="prof-type-icon" 
                src="../static/{featureTypes[feature.type].icon}.svg" 
                alt="prof-type-icon"
                on:click={() => { feature.type += 1 + (feature.type === 4 ? -5 : 0); $modifyCharacter(); }}
            >
        </div>
  
        <div class="feature-name">
            <InPlaceEdit bind:value={feature.name} editWidth='18rem' editHeight='2rem' on:submit={() => $modifyCharacter()}/>
        </div>
        
        <sendable class="feature-send" on:click={() => sendFeature()}>
            <Icon class="material-icons" style="font-size: 1.4em;">{'send'}</Icon>
        </sendable>

        <sendable class="feature-menu" on:click={() => { isOpen = !isOpen }}>
            <Icon class="material-icons">{isOpen ? 'menu_open' : 'menu'}</Icon>
        </sendable>
    </div>
    {#if isOpen}
        <div class="details" transition:slide|local>
            <div class="single-detail-line">
                <div class="box-label">
                    Type:
                </div>
                <select bind:value={feature.type} on:change={() => $modifyCharacter()}>
                    <option value="" selected disabled hidden>---</option>
                    {#each featureTypes as featureType, index}
                        <option value={index}>
                            {featureType.name}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="single-detail-line">
                <div class="box-label">
                    Source:
                </div>
                <InPlaceEdit bind:value={feature.source_name} editWidth='10rem' editHeight='1.5rem' on:submit={() => $modifyCharacter()}/>
            </div>
            <textarea on:change={() => $modifyCharacter()} bind:value={feature.content}></textarea>
            <SimpleButton value='Delete' type="delete" onClickFn={deleteFeature}></SimpleButton>
        </div>
    {/if}
</box>



<style>
    box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 95%;
        background-color: var(--clr-box-bg-light);
    }

    img {
        cursor: pointer; 
        height: 1.25em;
        width: 1.25em;
    }

    textarea {
        height: 15em;
    }

    .feature-summary {
        display: grid; 
        grid-template-columns: 1fr 8fr 1fr 1fr; 
        grid-template-rows: 2fr; 
        gap: 0.5em; 
        grid-template-areas: 
            "feature-type feature-name feature-send feature-menu";
        padding: 0.5em 0em;
    }

    .feature-type { grid-area: feature-type; }

    .feature-name { grid-area: feature-name; 
        font-size: 1.1em;
    }

    .feature-send { grid-area: feature-send; }

    .feature-menu { grid-area: feature-menu; }

    .feature-summary > div, .feature-summary > sendable {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div.details {
		padding: 0em 0.5em 0.5em 0.5em;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.5em;
    }

    .single-detail-line {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.4em;
    }

    .single-detail-line div {
        font-size: 1em;
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