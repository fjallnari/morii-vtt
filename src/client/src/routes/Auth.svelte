<script lang="ts">
    import Login from '../components/Auth/Login.svelte';
    import Register from '../components/Auth/Register.svelte';
</script>

<div class="landing-page-container">
    <div class="auth-container">
        <Login></Login>
        <Register></Register>
    </div>
    <div class="overlay"></div>
</div>



<style>
    .landing-page-container {
        display: grid;
    }

    .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 5em;
        height: 95vh;
    }
    
    :global(.auth-container .background-box) {
        z-index: 2;        
    }

    .auth-container, .overlay {
        grid-area: 1 / 1;
    }

    .overlay {
        background: url('../static/background-waves.svg') no-repeat;
        background-size: 100%;
        margin: 0em -1em;
    }

</style>