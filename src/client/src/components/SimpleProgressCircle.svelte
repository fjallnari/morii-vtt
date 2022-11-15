<script lang="ts">
    // from https://codepen.io/agtoaaa/pen/brNLVx

    export let width: string = '4em';
    export let height: string = '4em';

</script>

<progress-circle>
    <svg class="circular" style="width: {width}; height: {height};">
        <circle class="path" cx="50%" cy="50%" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
    </svg>
</progress-circle>

<style>
    progress-circle {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .circular {
        animation: rotate 2s linear infinite;
        position: relative;
    }

    .path {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0;
        stroke:var(--clr-accent-normal);
        animation:
            dash 1.5s ease-in-out infinite,
            color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @keyframes rotate {
        100%{
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0%{
            stroke-dasharray: 1,200;
            stroke-dashoffset: 0;
        }
        50%{
            stroke-dasharray: 89,200;
            stroke-dashoffset: -35;
        }
        100%{
            stroke-dasharray: 89,200;
            stroke-dashoffset: -124;
        }
    }

    @keyframes color {
        100%, 0%{
            stroke: var(--clr-accent-normal);
        }
        40%{
            stroke: var(--clr-accent-light);
        }
        66%{
            stroke: var(--clr-accent-normal);
        }
        80%, 90%{
            stroke: var(--clr-accent-dark);
        }
    }

</style>