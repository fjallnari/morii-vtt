<script lang="ts">
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import { accessToken, user } from '../stores';
  import axios from 'axios';
  import { replace } from 'svelte-spa-router';
 
  export let open: boolean;

  const logoutUser = async () => {
    try {
      await axios.post('/api/auth/signout');
      replace('/auth');
    }
    catch (err) {
      console.log(err);
    }
  }

</script>


<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <h3 id="simple-title">Log out</h3>
  <Content id="simple-content">Would you like to log out?</Content>
  <Actions>
    <Button variant="raised" on:click={() => (open=false)}>
      <Label>No</Label>
    </Button>
    <Button color="secondary" on:click={logoutUser}>
      <Label>Yes</Label>
    </Button>
  </Actions>
</Dialog>


<style>
  #simple-title {
    color: #FCF7F8;
    font-size: 1.5em;
    font-family: Montserrat;
    text-transform: uppercase;
    font-weight: 400;
  }


</style>
