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

<auth-simple-box>
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
</auth-simple-box>