<script lang="ts">
    import { modifyCharacter } from "../stores";

    export let charAttribute: string;
    export let gridClass: string = "";
    export let label: string = gridClass;
    export let textFontSize: string = "1em";
    export let socketModifyEnabled = true;

</script>

<box class="box-with-label" style={`grid-area: ${gridClass};`}>
    <textarea class='{charAttribute ? '' : 'placeholder'}' style={`font-size: ${textFontSize};`} on:change={() => socketModifyEnabled ? $modifyCharacter() : {}} bind:value={charAttribute}></textarea>
    <div class="box-justify-filler"></div>
    <div class="box-label">
        { label ? label : gridClass }
    </div>
</box>

<style>
    textarea {
        border: transparent;
        height: 100%;
        font-family: Quicksand;
    }

    textarea:focus {
        outline: none !important;
        border: 2px solid var(--clr-accent-normal);
        caret-color: var(--clr-accent-normal);
        background-image: none !important;
    }

    textarea.placeholder {
        background-image: url('../static/pencil.svg');
        background-size: 10%;
        background-position: center;
        background-repeat: no-repeat;
    }

    .box-with-label {
        height: auto;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #1d1d22;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #757578;
        border: transparent;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #404044;
    }


</style>