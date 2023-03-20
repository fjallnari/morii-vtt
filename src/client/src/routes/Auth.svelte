<script lang="ts">
    import { accessToken, user } from "../stores";
    import { axiosPublic } from '../axiosPublic';
    import { querystring, replace } from 'svelte-spa-router';
    import Icon from '@iconify/svelte';
    import SimpleTextfield from "../components/SimpleTextfield.svelte";
    import SimpleButton from "../components/SimpleButton.svelte";
    import LoadingCircle from "../components/LoadingCircle.svelte";
    import SimpleSnackbar from "../components/SimpleSnackbar.svelte";

    let statusSnackbar: SimpleSnackbar;

    let username = "";
    let password = "";
    let honeypot = "";
    let passwordCheck = "";
    let inProgress = false;
    let loginActive = true;

    const snackbarMessages = {
        "login_fail": "Login failed. Please try again or sign up.",
        "register_success": "Registration succesful! You can login now.",
        "no_match": "Passwords don't match.",
        "user_exists": "User with this username already exists, please login.",
        "default": "Something went wrong."
    }

    let snackbarStatus: string = "default";

    const loginUser = async () => {
        if (! password || ! username){
            return;
        }

        try {
            inProgress = true;
            const response = await axiosPublic.post('/auth/signin', {
                username: username,
                password: password,
                salt: honeypot
            });

            if (response.status === 200) {
                accessToken.set(response.data.accessToken);
                replace(`/${$querystring ? `?${$querystring}` : ''}`);
            }
        }
        catch (err) {
            // if login fails -> popup with 'login failed' appears
            snackbarStatus = "login_fail";
            statusSnackbar.open('error');
            inProgress = false;
        }
    }

    const registerNewUser = async () => {
        inProgress = true;

        if (! password || password !== passwordCheck){
            snackbarStatus = "no_match";
            statusSnackbar.open('error');
            inProgress = false;
            return;
        }

        try {
            await axiosPublic.post('/auth/signup', {
                username: username,
                password: password,
                salt: honeypot
            });

            snackbarStatus = "register_success";
            statusSnackbar.open('success');
            switchAuthView();
        }
        catch (err) {
            snackbarStatus = "user_exists";
            statusSnackbar.open('error');
        }

        username = password = passwordCheck = "";
        inProgress = false;
    }

    const switchAuthView = () => {
        loginActive = !loginActive;
        username = password = passwordCheck = ""; 
    }

</script>


<auth-main>
    <div class="auth-content">
        <div class="inner-auth-box">
            <h3>{loginActive ? "Login": "Sign up"}</h3>
            {#if !inProgress}
                {#if loginActive}
                    <SimpleTextfield bind:value={username} placeholder="Username" icon="mdi:account"></SimpleTextfield>
                    <SimpleTextfield type="password" bind:value={password} placeholder="Password" icon="mdi:lock"></SimpleTextfield>
                {:else}
                    <SimpleTextfield bind:value={username} placeholder="Username" icon="mdi:account"></SimpleTextfield>
                    <SimpleTextfield type="password" bind:value={password} placeholder="Password" icon="mdi:lock-outline"></SimpleTextfield>
                    <SimpleTextfield type="password" bind:value={passwordCheck} placeholder="Confirm password" icon="mdi:lock"></SimpleTextfield>
                {/if}

                <div style="display: none;">
                    <SimpleTextfield type="password" bind:value={honeypot} placeholder="Password" icon="mdi:lock"></SimpleTextfield>
                </div>

                <div class="switch-auth">
                    <span class="color-text">{loginActive ? "Don't have an account?": "Already have an account?"}</span>
                    <span class="accent-text" on:click={() => switchAuthView()} on:keyup={() => {}}>
                        {loginActive ? "Sign up here.": "Login here."}
                    </span>
                </div>

                <div class="button-container">
                    <SimpleButton 
                        value={loginActive ? "Login": "Sign up"} 
                        type='primary' 
                        onClickFn={loginActive ? loginUser: registerNewUser}>
                    </SimpleButton>
                </div>
                <div class="socials">
                    <sendable on:click={ () => window.open("https://github.com/fjallnari/morii-vtt")} on:keyup={() => {}}>
                        <Icon icon="mdi:github" /> 
                    </sendable>
                    <sendable on:click={ () => window.open("https://discord.gg/MhKxwkRpEU")} on:keyup={() => {}}>
                        <Icon icon="ic:baseline-discord" /> 
                    </sendable>      
                </div>
            {:else}
                <LoadingCircle></LoadingCircle>
            {/if}
        </div>
        <SimpleSnackbar bind:this={statusSnackbar} label={snackbarMessages[snackbarStatus]}></SimpleSnackbar>
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
        gap: 2.5em;
    }

    h3 {
        font-size: 3.5em;
        font-weight: 400;
        font-family: Quicksand;
        margin-bottom: 1.5em;
        margin-top: -1em;
    }

    .switch-auth {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25em;
        font-family: Montserrat;
        font-size: 1rem;
        margin-top: 1em;
    }

    .switch-auth .color-text {
        color: #fcf7f8de;
    }

    .accent-text {
        color: var(--clr-accent-light);
        cursor: pointer;
        transition-duration: 200ms;
        transition-property: color;
    }

    .accent-text:active {
        color: var(--clr-accent-normal);
        transition-duration: 200ms;
        transition-property: color;
    }    

    .button-container {
        display: flex;
        margin: 1em 0em; 
    }

    :global(.button-container simple-button) {
        padding: 0.5em 1.5em !important;
    }

    .socials {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        bottom: 2%;
        font-size: 3em;
    }
    
</style>