<script lang="ts">
    import Login from '../components/Login.svelte';
    import Register from '../components/Register.svelte';
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