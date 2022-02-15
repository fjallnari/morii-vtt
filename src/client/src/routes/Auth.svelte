<script lang="ts">
    import Login from '../components/Login.svelte';
    import Register from '../components/Register.svelte';
    import SegmentedButton, { Segment, Label } from '@smui/segmented-button';
    const views = [
        {name: 'sign in', component: Login},
        {name: 'sign up', component: Register}
    ];

    let selected = views[0];

</script>


<div id="login-page">
    <Login></Login>
    <Register></Register>
</div>


<style>
    #login-page {
        padding-top: 14em;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 5em;
    }

</style>