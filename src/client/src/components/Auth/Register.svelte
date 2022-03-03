<script lang="ts">
    import Textfield, {Input, InputComponentDev} from '@smui/textfield';
    import Button, { Label } from "@smui/button";
    import Icon from '@smui/textfield/icon';
    import PasswordField from '../PasswordField.svelte';
    import axios from "axios";
    import Paper from "@smui/paper";
    import ProgressCircle from '../ProgressCircle.svelte';
    import Snackbar, {
        Actions,
        SnackbarComponentDev,
    } from '@smui/snackbar';
    import IconButton from '@smui/icon-button';
    
    let successSnackbar: SnackbarComponentDev;

    let username = "";
    let password = "";
    let passwordCheck = "";
    let inProgress = false;

    const TEXTS = [
        "Registration succesful! You can login now.",
        "Passwords don't match.",
        "User with this username already exists, please login."
    ]

    let snackbarStatus: number = 0;

    const registerNewUser = async () => {
        inProgress = true;
        if (! password || password !== passwordCheck){
            // TODO: Pop up with non matching passwords
            snackbarStatus = 1;
            successSnackbar.open();
            console.log("passwords don't match");
            return;
        }
        try {
            const response = await axios.post('/api/auth/signup', {
                username: username,
                password: password
            });

            snackbarStatus = 0;
            successSnackbar.open();
        }
        catch (err) {
            console.log(err);
            snackbarStatus = 2;
            successSnackbar.open();
        }

        inProgress = false;
    }

</script>

<div class="background-box">
    <h2>Sign up</h2>
    {#if ! inProgress}
        <Textfield variant="outlined" style="width: 15em" bind:value={username} label="Username">
            <Icon class="material-icons" slot="leadingIcon">person</Icon>
        </Textfield>

        <PasswordField bind:password={password} label="Password" icon="lock_open"></PasswordField>
        <PasswordField bind:password={passwordCheck} label="Confirm password" icon="lock"></PasswordField>

        <div style="padding-top: 2em; padding-bottom: 2em;">
            <Button on:click={registerNewUser} variant="raised">
                <Label>Sign Up</Label>
            </Button>
        </div>
    {:else}
        <div>
            <ProgressCircle></ProgressCircle>
        </div>
    {/if}


    <Snackbar bind:this={successSnackbar} labelText={TEXTS[snackbarStatus]}>
        <Label />
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