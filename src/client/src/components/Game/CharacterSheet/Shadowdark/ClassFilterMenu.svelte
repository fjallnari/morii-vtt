<script lang="ts">
    import { user } from "../../../../stores";
    import { getClassIcon } from "../../../../util/util";

    export let currentFilter: number = 0;
    export let options: { name: string }[] = [];

</script>


<div class="filter-menu">
    {#each [...options] as filterOption, index}
        <sendable class="spell-type-icon"
            on:click={() => currentFilter = index } selected={currentFilter === index} on:keyup={() => {}}
        >
            <small-class-icon>
                <img id="main-class" src="../static/class-icons/{getClassIcon(filterOption.name, $user.gameData.system)[0]}.svg" alt="class-icon">
            </small-class-icon>
        </sendable>
    {/each}
</div>

<style>
    .filter-menu {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.2em;
        padding: 0.3em;
        margin-bottom: 0.2em;
    }

    small-class-icon {
        width: 2em;
        height: 2em;
    }

    sendable {
        transition: border 100ms ease-in;
    }

    sendable[selected="true"] {
        border-bottom: 1px solid var(--clr-accent-normal); 
        padding-bottom: 0.2em;
    }


</style>