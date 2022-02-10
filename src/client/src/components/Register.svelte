<script lang="ts">
    import Textfield, {Input, InputComponentDev} from '@smui/textfield';
    import Button, { Label } from "@smui/button";
    import Icon from '@smui/textfield/icon';
    import PasswordField from './PasswordField.svelte';
    import axios from "axios";

    let username = "";
    let password = "";
    let passwordCheck = "";

    const sayHello = () => {
        console.log(password, passwordCheck, password === passwordCheck);
    }

    const registerNewUser = () => {
        if (! password || password !== passwordCheck){
            console.log("passwords don't match");
            return;
        }

        console.log(username, password);

        axios.post('/api/auth/signup', {
            username: username,
            password: password
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            // console.log(error);
        });
    }

</script>


<div class="input-block">
    <h2>Sign up</h2>
    <Textfield variant="outlined" style="width: 15em" bind:value={username} label="Username">
        <Icon class="material-icons" slot="leadingIcon">person</Icon>
    </Textfield>

    <PasswordField bind:password={password} label="Password" icon="lock_open"></PasswordField>
    <PasswordField bind:password={passwordCheck} label="Confirm password" icon="lock"></PasswordField>

    <Button on:click={registerNewUser} variant="raised">
        <Label>Sign Up</Label>
    </Button>
</div>

<style>
    h2 {
        padding-top: 0px;
        text-transform: none;
    }

    .input-block {
		display: flex;
		padding-bottom: 40px;
		justify-content: center;
		align-items: center;
        flex-direction: column;
        gap: 2em;
	}
</style>