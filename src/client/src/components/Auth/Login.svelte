<script lang="ts">
    import Textfield, {Input, InputComponentDev} from '@smui/textfield';
    import Button, { Label } from "@smui/button";
    import Icon from '@smui/textfield/icon';
    import PasswordField from '../PasswordField.svelte';
    import axios from 'axios';
    import { accessToken, user } from "../../stores";
    import ProgressCircle from '../ProgressCircle.svelte';
    import Snackbar, {
        Actions,
        SnackbarComponentDev,
    } from '@smui/snackbar';
    import IconButton from '@smui/icon-button';
    import { axiosPublic } from '../../axiosPublic';

    let loginFailedSnackbar: SnackbarComponentDev;

    let username = "";
    let password = "";
    let inProgress = false;

    const loginUser = async () => {
        if (! password || ! username){
            return;
        }

        try {
            inProgress = true;
            const response = await axiosPublic.post('/auth/signin', {
                username: username,
                password: password
            });

            if (response.status === 200) {
                accessToken.set(response.data.accessToken);
                location.href = '/?#/';
            }
        }
        catch (err) {
            // if login fails -> popup with 'login failed' appears

            loginFailedSnackbar.open();
            inProgress = false;
        }
    }

</script>

<div class="background-box">
    <h2>Sign in</h2>

    {#if !inProgress}
        <Textfield variant="outlined" style="width: 15em" bind:value={username} label="Username">
            <Icon class="material-icons" slot="leadingIcon">person</Icon>
        </Textfield>

        <PasswordField bind:password={password} label="Password"></PasswordField>

        <div style="padding-top: 2em; ">
            <Button on:click={loginUser} variant="raised">
                <Label>Sign In</Label>
            </Button>
        </div>
    {:else}
        <ProgressCircle></ProgressCircle>
    {/if}

    <Snackbar bind:this={loginFailedSnackbar}>
        <Label>Login failed. Please try again or sign up.</Label>
        <Actions>
          <IconButton class="material-icons" title="Dismiss">close</IconButton>
        </Actions>
    </Snackbar>
</div>



<style>
    h2 {
        padding-top: 0.5em;
        text-transform: none;
    }

    .background-box {
        width: 25em;
        height: 40em;
        background-color:#212125;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        border-radius: 1%;

        display: flex;
		justify-content: flex-start;
		align-items: center;
        flex-direction: column;
        gap: 2em;
    }


</style>