<script lang="ts">
    import CircularProgress from '@smui/circular-progress';
    import LOADING_MESSAGES from '../enum/LoadingMessages';
    
    const randomizeLoadingMessage = () => {
		return LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
    }
</script>

<div id="progress">
    <div id="progress-circle"><CircularProgress style="height: 4em; width: 4em;" indeterminate /></div>
    <div id="progress-text" style="padding-top: 4em">{randomizeLoadingMessage()}</div>
</div>


<style>
    #progress-circle {
      display: flex; 
      justify-content: center;
    }

    #progress-text {
      font-family: "Quicksand", sans-serif;
      font-weight: 200;
    }

</style>