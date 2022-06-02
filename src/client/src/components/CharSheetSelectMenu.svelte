<script lang="ts">
    export let options: string[];
    // need default behaviour

    // sveltified from - https://codepen.io/cssinate/pen/KVdYjz

</script>

<div class="select" tabindex="0">
    {#each options as option, index}
        <input class="selectopt" name="test" type="radio" id="opt{index}" checked on:change={() => console.log('changed')}>
        <label for="opt{index}" class="option">{option}</label>
    {/each}
</div>


<style>

    .select {
        display:flex;
        flex-direction: column;
        position:relative;
        width:250px;
        height:40px;
    }

    .option {
        min-height:40px;
        display:flex;
        align-items:center;
        justify-content: center;
        background:#252527;
        border-radius: 4px;
        position:absolute;
        top:0;
        width: 100%;
        pointer-events:none;
        order:2;
        z-index:1;
        transition:background .4s ease-in-out;
        box-sizing:border-box;
        overflow:hidden;
        white-space:nowrap;
    }

    .option:hover {
        background:#525252;
    }

    .select:focus .option {
        position:relative;
        pointer-events:all;
    }

    input {
        opacity:0;
        position:absolute;
        left:-99999px;
    }

    input:checked + label {
        order: 1;
        z-index:2;
        background: #252529;
        border-top:none;
        position:relative;
    }


</style>