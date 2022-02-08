<script lang="ts">
    import Textfield, {Input, InputComponentDev} from '@smui/textfield';
    import FloatingLabel, { FloatingLabelComponentDev } from '@smui/floating-label';
    import NotchedOutline, { NotchedOutlineComponentDev } from '@smui/notched-outline';
    import Icon from '@smui/textfield/icon';

    // Manual Setup requires passing the lower components up to the Textfield
    let inputPswd: InputComponentDev;
    let floatingLabelPswd: FloatingLabelComponentDev;
    let notchedOutlinePswd: NotchedOutlineComponentDev;

    export let password: string;
    export let label:string;
    export let icon:string = "lock";
</script>


<div>
    <Textfield
        bind:input={inputPswd}
        bind:notchedOutline={notchedOutlinePswd}
        bind:floatingLabel={floatingLabelPswd}
        style="width: 15em"
        variant="outlined"
    >
        <NotchedOutline bind:this={notchedOutlinePswd} slot="label">
            <FloatingLabel bind:this={floatingLabelPswd} for="input-manual-c">
                {label}
            </FloatingLabel>
        </NotchedOutline>

        <Input
            bind:this={inputPswd}
            bind:value={password}
            id="input-manual-a"
            type="password"
            aria-controls="helper-text-manual-a"
            aria-describedby="helper-text-manual-a"
        />
        <Icon class="material-icons" slot="leadingIcon">{icon}</Icon>
    </Textfield>
</div>