<script lang="ts">
    import LOADING_MESSAGES from "../enum/LoadingMessages";
    import SimpleProgressCircle from "./SimpleProgressCircle.svelte";

    const randomizeLoadingMessage = () => {
        return LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
    }

</script>


<progress-container>
    <SimpleProgressCircle></SimpleProgressCircle>
    <div class="loading-message">
        {randomizeLoadingMessage()}
    </div>
</progress-container>

<style>
    progress-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 2em;
    }

    .loading-message {
        font-family: Quicksand;
        font-weight: 200;
    }

</style>