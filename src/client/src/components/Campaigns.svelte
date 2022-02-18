<script lang="ts">
    import List, {
        Item,
        Graphic,
        Meta,
        Text,
        PrimaryText,
        SecondaryText,
    } from '@smui/list';
    import Fab, { Icon } from '@smui/fab';
    import IconButton from '@smui/icon-button/src/IconButton.svelte';
    import Tooltip, { Wrapper } from '@smui/tooltip';
    import { campaignNewActive, user } from '../stores';
 
    let options = [
        {
            name: 'Bunions & Flagons',
            description: 'D&D 5E',
            disabled: false,
        },
        {
            name: 'The Forlorn Mysterium',
            description: 'Call of Cthulhu',
            disabled: false,
        },
    ];
    const campaigns = ($user).campaigns;

    let selection = '';
    let selectionIndex: number | undefined = undefined;

    const sayHello = (itemName: string) => {
        selection = itemName;
        console.log($user);
    }

</script>

<div>
    <List
        class="demo-list"
        style="width: 34em; text-align: left; gap: 1em;"
        twoLine
        singleSelection
        bind:selectedIndex={selectionIndex}
    >
        {#each campaigns as campaign}
            <div class="campaign-item">
                <Item
                    style="margin-bottom: 1em; border-radius: 1%;"
                    on:SMUI:action={() => sayHello(campaign.name)}
                    selected={selection === campaign.name}
                >
                    <Text>
                        <PrimaryText>{campaign.name}</PrimaryText>
                        <SecondaryText>{campaign.system}</SecondaryText>
                    </Text>
                    <Meta>
                        <Wrapper>
                            <img id="crown" src="../static/crown.svg" alt="crown">
                            <Tooltip>GM</Tooltip>
                        </Wrapper>      
                    </Meta>
                </Item>
            </div>
        {/each}
    </List>
</div>

<div id="create-campaign-button">
    <IconButton class="material-icons" on:click={ () => campaignNewActive.set(! $campaignNewActive) }>add</IconButton>
</div>

<style>
    #create-campaign-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

    .campaign-item:hover {
        transform: scale(1.05);
    }

    .campaign-item {
        font-family: Montserrat;
    }

</style>