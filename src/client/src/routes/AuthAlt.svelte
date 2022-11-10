<script lang="ts">
    import AuthComponent from "../components/Auth/AuthComponent.svelte";
    import Login from "../components/Auth/Login.svelte";

</script>

<auth-main>
    <div class="auth-content">
        <div class="inner-auth-box">
            <Login></Login>
        </div>
    </div>
</auth-main>

<style>
    auth-main {
        background: var(--bg-waves) no-repeat;
        background-size: 100%;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .auth-content {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #212125A1;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        width: 40vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(6px);
    }

    .inner-auth-box {
        display: flex;
		justify-content: flex-start;
		align-items: center;
        flex-direction: column;
        gap: 2em;
        padding: 3em;
    }

</style>