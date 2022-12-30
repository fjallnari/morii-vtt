<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";
    import HtmlRendererOverride from "../HTMLRendererOverride.svelte";

    export let text: string;

</script>

<markdown-text>
    <p><SvelteMarkdown source={text} renderers={{html: HtmlRendererOverride}}></SvelteMarkdown></p>
</markdown-text>

<style>
    markdown-text {
        margin: 0em !important;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        overflow-y: auto;
    }
    
    markdown-text p {
        overflow-y: auto;
        scrollbar-width: thin;
        font-family: 'Quicksand';
        font-size: 0.8vw;
        text-align: left;
        margin: 0.5em 0em 0.5em 0.5em !important;
    }
</style>