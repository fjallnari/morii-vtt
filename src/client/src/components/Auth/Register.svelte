<script lang="ts">
    import Textfield, {Input, InputComponentDev} from '@smui/textfield';
    import Button, { Label } from "@smui/button";
    import Icon from '@smui/textfield/icon';
    import PasswordField from '../PasswordField.svelte';
    import ProgressCircle from '../ProgressCircle.svelte';
    import Snackbar, {
        Actions,
        SnackbarComponentDev,
    } from '@smui/snackbar';
    import IconButton from '@smui/icon-button';
    import { axiosPublic } from '../../axiosPublic';
import SimpleButton from '../SimpleButton.svelte';
    
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
            snackbarStatus = 1;
            successSnackbar.open();
        }
        try {
            await axiosPublic.post('/auth/signup', {
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

        username = password = passwordCheck = '';
        inProgress = false;
    }

</script>

<auth-simple-box>
    <h2>Sign up</h2>
    {#if ! inProgress}
        <Textfield variant="outlined" style="width: 15em" bind:value={username} label="Username">
            <Icon class="material-icons" slot="leadingIcon">person</Icon>
        </Textfield>

        <PasswordField bind:password={password} label="Password" icon="lock_open"></PasswordField>
        <PasswordField bind:password={passwordCheck} label="Confirm password" icon="lock"></PasswordField>

        <div class="button-container">
            <SimpleButton value='Sign In' type='primary' onClickFn={registerNewUser}></SimpleButton>
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
</auth-simple-box>

<style>
    .button-container {
        display: flex;
        padding-top: 2em; 
    }
</style>