<script lang="ts">
    import Icon from "@iconify/svelte";
    import Dialog from "@smui/dialog/src/Dialog.svelte";
    import SimpleIconButton from "../../SimpleIconButton.svelte";
    import CharactersPage from "./CharactersPage.svelte";
    import ChatPage from "./ChatPage.svelte";
    import WelcomePage from "./WelcomePage.svelte";

    export let showGuide: boolean = true;

    let wantGuide = true;
    let selectedPage: number = 0;

    const guidePages = [
        {
            name: 'MoriiVTT guide',
            component: WelcomePage
        },
        {
            name: 'Characters/NPCs basics',
            component: CharactersPage
        },
        {
            name: 'Chat basics',
            component: ChatPage
        },
    ];

</script>

<Dialog
    bind:open={showGuide}
    aria-labelledby="simple-title"
    surface$style="padding: 1em 1.5em; width: 40vw;"
>
    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
    <dialog-content>
        <h3 class="title">{guidePages[selectedPage].name}</h3>

        <svelte:component
            this={guidePages[selectedPage].component}
        />

        <nav-buttons>
            {#each guidePages as _, index}
                <box class="nav-button" selected={index === selectedPage} on:click={() => selectedPage = index} on:keyup={() => {}}></box>
            {/each}
        </nav-buttons>

        <show-again-prompt>
            <sendable on:click={() => {wantGuide = !wantGuide}} on:keyup={() => {}}>
                <Icon class="big-icon" icon="mdi:{wantGuide ? 'checkbox-blank-outline': 'checkbox-marked'}" />
            </sendable>
            <div>Don't show me this guide next time.</div>
        </show-again-prompt>
        
        <close-button>
            <SimpleIconButton icon="mdi:close" width="1.5em" onClickFn={() => showGuide = false}></SimpleIconButton>
        </close-button>
    </dialog-content>
</Dialog>

<style>

    dialog-content {
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr; 
        grid-template-rows: 0.7fr 1fr 2fr 0.7fr 0.5fr 0.5fr; 
        gap: 0.5em; 
        grid-template-areas: 
            "title title title"
            "page-content page-content page-content"
            "page-content page-content page-content"
            "nav-buttons nav-buttons nav-buttons"
            "show-again-prompt show-again-prompt show-again-prompt"            
            "close-button close-button close-button";
        font-family: Athiti;
    }

    dialog-content > * {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title { grid-area: title; 
        color: var(--clr-text);
        font-family: Quicksand;
        font-size: 1.5em;
        font-weight: 400;
    }

    :global(guide-page-content) { grid-area: page-content; 
        text-align: left;
    }

    nav-buttons { grid-area: nav-buttons; 
        gap: 0.75em;
    }

    .nav-button {
        background-color: var(--clr-box-bg-light);
        transition: background-color 100ms linear;
        cursor: pointer;
        padding: 1em;
    }

    .nav-button:active {
        background-color: var(--clr-accent-darker);
    }

    .nav-button[selected=true] {
        background-color: var(--clr-accent-dark);                
    }

    show-again-prompt { grid-area: show-again-prompt; 
        gap: 0.3em;
    }

    close-button { grid-area: close-button; }

    

</style>