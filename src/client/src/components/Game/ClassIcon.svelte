<script lang="ts">
    import { getClassIcon } from "../../util/util";

    export let characterClasses: string | undefined = undefined;

</script>

<class-icon>
    <img id="main-class" src="../static/class-icons/{getClassIcon(characterClasses)[0]}.svg" alt="class-icon">
    {#if getClassIcon(characterClasses).length > 2}
        <img id="multi-class" src="../static/class-icons/{getClassIcon(characterClasses)[2]}.svg" alt="class-icon">
    {/if}
</class-icon>

<style>
    class-icon {
        border-radius: 25%;
        width: 5em;
        height: 5em;
        position: relative;
    }

    #main-class {
        width: 100%;
        height: 100%;
    }

    #multi-class {
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 3em;
        height: 3em;
    }
</style>