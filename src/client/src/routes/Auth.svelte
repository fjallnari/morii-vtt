<script lang="ts">
    import Login from '../components/Auth/Login.svelte';
    import Register from '../components/Auth/Register.svelte';
</script>


<div id="login-page">
    <Login></Login>
    <Register></Register>
</div>


<style>
    #login-page {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 5em;
        height: 95vh;
    }

</style>