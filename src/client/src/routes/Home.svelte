<script lang="ts">
    import Login from '../components/Login.svelte';
    import Register from '../components/Register.svelte';
    import SegmentedButton, { Segment, Label } from '@smui/segmented-button';
    const views = [
        {name: 'login', component: Login},
        {name: 'register', component: Register}
    ];

    let selected = views[0];

</script>


<div id="login-page">
    <!-- Button to switch between login and register-->
    <svelte:component this={selected.component}/>
    <SegmentedButton segments={views} let:segment singleSelect bind:selected>
        <Segment {segment}>
          <Label>{segment.name}</Label>
        </Segment>
    </SegmentedButton>
</div>

<style>
    #login-page {
        padding-top: 14em;
        padding-right: 7em;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

</style>