<script lang="ts">
    import Textfield, {Input, InputComponentDev} from '@smui/textfield';
    import Button, { Label } from "@smui/button";
    import Icon from '@smui/textfield/icon';
    import PasswordField from './PasswordField.svelte';
    import axios from 'axios';
    import { accessToken } from "../stores";
import ProgressCircle from './ProgressCircle.svelte';
    let username = "";
    let password = "";
    let inProgress = false;

    const loginUser = async () => {
        if (! password || ! username){
            return;
        }

        try {
            inProgress = true;
            const response = await axios.post('/api/auth/signin', {
                username: username,
                password: password
            });
            console.log(response);

            if (response.status === 200) {
                accessToken.set(response.data.accessToken);
                location.href = '/?#/';
            }
        }
        catch (err) {
            console.log(err);
        }
    }

</script>


<div class="input-block">
    <h2>Sign in</h2>

    {#if !inProgress}
        <Textfield variant="outlined" style="width: 15em" bind:value={username} label="Username">
            <Icon class="material-icons" slot="leadingIcon">person</Icon>
        </Textfield>

        <PasswordField bind:password={password} label="Password"></PasswordField>

        <Button on:click={loginUser} variant="raised">
            <Label>Sign In</Label>
        </Button>
    {:else}
        <ProgressCircle></ProgressCircle>
    {/if}
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