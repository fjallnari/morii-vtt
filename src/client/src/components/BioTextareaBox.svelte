<script lang="ts">
    import { modifyCharacter } from "../stores";

    export let charAttribute: string;
    export let styleClass: string = "";
    export let inlineStyle: string = "";
    export let label: string = styleClass;
    export let socketModifyEnabled = true;

</script>

<box class="{styleClass} box-with-label" style={inlineStyle}>
    <textarea on:change={() => socketModifyEnabled ? $modifyCharacter() : {}} bind:value={charAttribute}></textarea>
    <div class="box-justify-filler"></div>
    <div class="box-label">
        { label ? label : styleClass }
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
    }

    .box-with-label {
        height: auto;
    }

    .appearance { grid-area: appearance;
        margin-left: var(--outer-edge-margin);
    }

    .backstory { grid-area: backstory;
        margin: 0em 0em 0.5em var(--outer-edge-margin);
    }

    .allies-orgs { grid-area: allies-orgs; }
    .enemies { grid-area: enemies; }
    .treasury { grid-area: treasury; }

    .personality-traits { grid-area: personality-traits; 
        margin-right: var(--outer-edge-margin);
    }

    .ideals { grid-area: ideals; 
        margin-right: var(--outer-edge-margin);
    }

    .bonds { grid-area: bonds; 
        margin-right: var(--outer-edge-margin);
    }

    .flaws { grid-area: flaws; 
        margin-right: var(--outer-edge-margin);
    }

    .other-notes { grid-area: other-notes; 
        margin: 0em var(--outer-edge-margin) 0.5em 0em;
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