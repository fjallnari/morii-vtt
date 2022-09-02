<script lang="ts">
import SKILLS from "../../enum/Skills";

    import type QuickCreateCharacterParts from "../../interfaces/QuickCreateCharacterParts";
    import type QuickCreateData from "../../interfaces/QuickCreateData";
    import BoxWithChips from "../BoxWithChips.svelte";

    export let characterParts: QuickCreateCharacterParts;
    export let quickCreateData: QuickCreateData;
    export let isCompleted: boolean;


    $: skillsFinal = [].concat(characterParts.race?.skill_prof ?? []).concat(characterParts.class?.skills.final ?? []).concat(characterParts.bio.skills);
    $: languagesFinal = [].concat(characterParts.race?.languages ?? []).concat(characterParts.bio.languages);

</script>
 
<summary-detail>
    <BoxWithChips bind:chipsArray={skillsFinal} label='Skills' let:index={index} gridArea='skills' chipsType='readonly'>
        {skillsFinal[index]}
    </BoxWithChips>

    <BoxWithChips bind:chipsArray={languagesFinal} label='Languages' let:index={index} gridArea='languages' chipsType='readonly'>
        {languagesFinal[index]}
    </BoxWithChips>

    <box class="tools"></box>
    <box class="other-prof"></box>
    <box class="bio"></box>
    <box class="as"></box>
    <box class="equipment"></box>
    <box class="features"></box>
</summary-detail>

<style>
    summary-detail { grid-area: step-detail;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        gap: 0.5em 0.5em; 
        grid-template-areas: 
            "bio bio bio bio bio bio skills skills skills languages languages languages"
            "bio bio bio bio bio bio skills skills skills languages languages languages"
            "bio bio bio bio bio bio tools tools tools other-prof other-prof other-prof"
            "bio bio bio bio bio bio tools tools tools other-prof other-prof other-prof"
            "as as as as equipment equipment equipment equipment features features features features"
            "as as as as equipment equipment equipment equipment features features features features"
            "as as as as equipment equipment equipment equipment features features features features"
            "as as as as equipment equipment equipment equipment features features features features"; 
    }
    
    .tools { grid-area: tools; }
    .other-prof { grid-area: other-prof; }
    .bio { grid-area: bio; }
    .as { grid-area: as; }
    .equipment { grid-area: equipment; }
    .features { grid-area: features; }

</style>