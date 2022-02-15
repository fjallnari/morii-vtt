<script lang="ts">
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
    import IconButton from '@smui/icon-button';
    import Button, { Label } from '@smui/button';
   
    let open = false;
    let response = 'Nothing yet.';
   
    function closeHandler(event: CustomEvent<{ action: string }>) {
      switch (event.detail.action) {
        case 'close':
          response = 'Closed without response.';
          break;
        case 'reject':
          response = 'Rejected.';
          break;
        case 'accept':
          response = 'Accepted.';
          break;
      }
    }
  </script>


<Dialog
  bind:open
  fullscreen
  aria-labelledby="fullscreen-title"
  aria-describedby="fullscreen-content"
  on:SMUIDialog:closed={closeHandler}
>
  <Header>
    <Title id="fullscreen-title">Settings</Title>
    <IconButton action="close" class="material-icons">close</IconButton>
  </Header>
  <Content id="fullscreen-content">
      Unga bunga
  </Content>
  <Actions>
    <Button action="reject">
      <Label>Reject</Label>
    </Button>
    <Button action="accept" defaultAction>
      <Label>Accept</Label>
    </Button>
  </Actions>
</Dialog>
 
<Button on:click={() => (open = true)}>
  <Label>Open Dialog</Label>
</Button>
 
<pre class="status">Response: {response}</pre>
 
