<script lang="ts">
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import { accessToken, user } from '../stores';
  import { replace } from 'svelte-spa-router';
  import { axiosPublic } from '../axiosPublic';
 
  export let open: boolean;

  const logoutUser = async () => {
    try {
      await axiosPublic.post('/auth/signout');
      accessToken.set(undefined);
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
    color: var(--primary-text-color);
    font-size: 1.5em;
    font-family: Montserrat;
    text-transform: uppercase;
    font-weight: 400;
  }


</style>
