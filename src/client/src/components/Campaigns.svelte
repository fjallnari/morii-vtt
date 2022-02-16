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
                    <Meta>
                        <img id="crown" src="../static/crown.svg" alt="crown">
                    </Meta>
                </Item>
            </div>
        {/each}
    </List>
</div>

<div id="create-campaign-button">
    <IconButton class="material-icons" on:click={sayHello}>add</IconButton>
</div>

<style>
    #create-campaign-button {
        margin-top: auto;
        padding-bottom: 1.5em;
    }

    .campaign-item:hover {
        transform: scale(1.05);
    }

</style>