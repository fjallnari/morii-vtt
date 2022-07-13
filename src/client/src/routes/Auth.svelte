<script lang="ts">
    import Login from '../components/Auth/Login.svelte';
    import Register from '../components/Auth/Register.svelte';
</script>

<auth-container>
    <Login></Login>
    <Register></Register>
</auth-container>



<style>
    auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 5em;
        height: 95vh;
        background: url('../static/background-waves.svg') no-repeat;
        background-size: 100%;
        margin: 0em -1em;
    }

</style>