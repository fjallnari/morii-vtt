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
        background: var(--bg-waves) no-repeat;
        background-size: 100%;
        margin: 0em -1em;
    }

    :global(auth-container auth-simple-box) {
        width: 25em;
        height: 40em;
        background-color: var(--clr-box-bg-dark);
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 1%;

        display: flex;
		justify-content: flex-start;
		align-items: center;
        flex-direction: column;
        gap: 2em;
    }

    :global(auth-container auth-simple-box > h2) {
        padding-top: 0.5em;
        text-transform: none;
    }

</style>