<script lang="ts">
    import { modifyCharacter } from "../../../../stores";
    import type { Character5E } from "../../../../interfaces/5E/Character5E";
    import Icon from "@iconify/svelte";

    export let character: Character5E;

</script>

<line-div>
    <div>Show Encumbrance</div>
    <sendable on:click={() => { character.settings.use_encumbrance = !character.settings.use_encumbrance; $modifyCharacter(); }} on:keyup={() => {}}>
        <Icon class="big-icon" icon="mdi:{character.settings.use_encumbrance ? 'checkbox-marked': 'checkbox-blank-outline'}" />
    </sendable>
</line-div>
<line-div>
    <div>Show Spell Components</div>
    <sendable on:click={() => { character.settings.use_spell_components = !character.settings.use_spell_components; $modifyCharacter(); }} on:keyup={() => {}}>
        <Icon class="big-icon" icon="mdi:{character.settings.use_spell_components ? 'checkbox-marked': 'checkbox-blank-outline'}" />
    </sendable>
</line-div>
