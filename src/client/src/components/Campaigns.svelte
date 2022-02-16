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
  let selection = '';
  let selectionIndex: number | undefined = undefined;

  const sayHello = () => {
      console.log('Hello');
  }

</script>


<div class="campaigns-box">
    <h3>Your Campaigns</h3>
    <div>
        <List
            class="demo-list"
            style="width: 34em; text-align: left; gap: 1em;"
            twoLine
            singleSelection
            bind:selectedIndex={selectionIndex}
        >
            {#each options as item}
                <div  class="campaign-item">
                    <Item
                        style="margin-bottom: 1em; border-radius: 1%;"
                        on:SMUI:action={() => (selection = item.name)}
                        disabled={item.disabled}
                        selected={selection === item.name}
                    >
                        <Text>
                            <PrimaryText>{item.name}</PrimaryText>
                            <SecondaryText>{item.description}</SecondaryText>
                        </Text>
                        <Meta><img id="crown" src="../static/crown.svg" alt="crown"></Meta>
                    </Item>
                </div>
            {/each}
        </List>
    </div>
    
    <div id="create-campaign-button">
        <IconButton class="material-icons" on:click={sayHello}>add</IconButton>
    </div>
</div>

<style>
    .campaigns-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        gap: 1em;

        width: 40em;
        height: 35em;
        background-color:#212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 1%;
    }

    h3 {
        color: #FCF7F8;
        font-size: 2em;
        font-family: Quicksand;
        font-weight: 200;
    }

    #create-campaign-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

    .campaign-item:hover {
        transform: scale(1.05);
    }

</style>