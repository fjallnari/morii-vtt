<script lang="ts">
    import Textfield, {Input, InputComponentDev} from '@smui/textfield';
    import Button, { Label } from "@smui/button";
    import Icon from '@smui/textfield/icon';
    import PasswordField from './PasswordField.svelte';
    import axios from 'axios';
    let username = "";
    let password = "";

    const loginUser = async () => {
        if (! password || ! username){
            return;
        }
        
        await axios.post('/api/auth/signin', {
            username: username,
            password: password
        });
    }

</script>


<div class="input-block">
    <h2>Sign in</h2>
    <Textfield variant="outlined" style="width: 15em" bind:value={username} label="Username">
        <Icon class="material-icons" slot="leadingIcon">person</Icon>
    </Textfield>

    <PasswordField bind:password={password} label="Password"></PasswordField>

    <Button on:click={loginUser} variant="raised">
        <Label>Sign In</Label>
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