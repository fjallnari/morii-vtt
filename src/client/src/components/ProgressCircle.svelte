<script lang="ts">
    import CircularProgress from '@smui/circular-progress';
    import LOADING_MESSAGES from '../enum/LoadingMessages';
    
    const randomizeLoadingMessage = () => {
		return LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
    }
</script>

<div id="progress">
    <div id="progress-circle"><CircularProgress style="height: 48px; width: 48px;" indeterminate /></div>
    <div id="progress-text" style="padding: 10px">{randomizeLoadingMessage()}</div>
</div>


<style>
    #progress-circle {
		display: flex; 
		justify-content: center;
        font-family: "Palanquir", sans-serif;
	}
</style>