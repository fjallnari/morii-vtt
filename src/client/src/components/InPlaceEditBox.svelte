<script lang="ts">
    import { modifyCharacter } from "../stores";
    import InPlaceEdit from "./InPlaceEdit.svelte";
    import { Tooltip } from "@svelte-plugins/tooltips";

    export let value: string;
    export let boxLabel: string;
    export let characterLimit: number = 0;
    export let inlineStyle: string = '';
    export let editWidth: string = '';
    export let editHeight: string = '';
    export let valueFontSize: string = 'inherit';
    export let onSubmitFce: () => void = () => $modifyCharacter();
    export let onClickFn: () => void = () => {};
    export let tooltip: string = undefined;
    export let sendable: boolean = false;

</script>

<box class="box-with-label" style={inlineStyle}>
    <div class="box-main-text">
        <InPlaceEdit 
            bind:value={value} 
            editWidth={editWidth} 
            editHeight={editHeight}
            valueFontSize={valueFontSize}
            on:submit={() => { characterLimit !== 0 && value.length > characterLimit ? value = value.slice(0, characterLimit) : value; onSubmitFce()}}
        />
    </div>
    <div class="box-justify-filler"></div>
    {#if !sendable}
        <div class="box-label">
            {#if tooltip}
                <Tooltip 
                    content={tooltip} 
                    theme="blurred" 
                    position='bottom' 
                    animation='fade'
                    arrow={false}
                >
                    {boxLabel}
                </Tooltip>
            {:else}
                {boxLabel}
            {/if}
        </div>
    {:else}
        <sendable class="box-label" on:click={() => onClickFn()} on:keyup={() => {}}>
            {boxLabel}
        </sendable>
    {/if}
</box>

<style>
    .box-with-label {
        position: relative;
    }
    
</style>