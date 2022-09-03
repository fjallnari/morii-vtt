<script lang="ts">
import SKILLS from "../../enum/Skills";

    import type QuickCreateCharacterParts from "../../interfaces/QuickCreateCharacterParts";
    import type QuickCreateData from "../../interfaces/QuickCreateData";
    import BoxWithChips from "../BoxWithChips.svelte";

    export let characterParts: QuickCreateCharacterParts;
    export let quickCreateData: QuickCreateData;
    export let isCompleted: boolean;


    $: skillsFinal = [].concat({ name: 'race', items: characterParts.race?.skill_prof ?? []})
        .concat({name: 'class', items: characterParts.class?.skills.final ?? []})
        .concat({name: 'background', items: characterParts.bio.skills});
    
    $: languagesFinal = [].concat(characterParts.race?.languages ?? []).concat(characterParts.bio.languages);
    $: toolsFinal = [].concat(characterParts.race?.tools_prof ?? []).concat(characterParts.class?.tool_prof.tools.map(tool => tool.name) ?? []).concat(characterParts.bio.tools);
    $: otherProfFinal = [].concat(characterParts.race?.other_prof.map(prof => prof.name) ?? []).concat(characterParts.class?.other_prof.map(prof => prof.name) ?? []);

</script>
 
<summary-detail>
    <BoxWithChips bind:chipsArray={skillsFinal} label='Skills' gridArea='skills' chipsType='with-categories'></BoxWithChips>

    <BoxWithChips bind:chipsArray={languagesFinal} label='Languages' let:index={index} gridArea='languages' chipsType='readonly'>
        {languagesFinal[index]}
    </BoxWithChips>

    <BoxWithChips bind:chipsArray={toolsFinal} label='Tools' let:index={index} gridArea='tools' chipsType='readonly'>
        {toolsFinal[index]}
    </BoxWithChips>

    <BoxWithChips bind:chipsArray={otherProfFinal} label='Other Proficiencies' let:index={index} gridArea='other-prof' chipsType='readonly'>
        {otherProfFinal[index]}
    </BoxWithChips>

    <div class="bio">
        <box class="details"></box>
        <box class="error-log"></box>
    </div>

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
            "bio bio bio bio bio bio skills skills skills skills languages languages"
            "bio bio bio bio bio bio skills skills skills skills languages languages"
            "bio bio bio bio bio bio tools tools tools other-prof other-prof other-prof"
            "bio bio bio bio bio bio tools tools tools other-prof other-prof other-prof"
            "as as as as equipment equipment equipment equipment features features features features"
            "as as as as equipment equipment equipment equipment features features features features"
            "as as as as equipment equipment equipment equipment features features features features"
            "as as as as equipment equipment equipment equipment features features features features"; 
    }


    .bio { grid-area: bio; 
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr; 
        gap: 0.5em 0.5em; 
        grid-template-areas: 
            "details details error-log error-log"
            "details details error-log error-log"
            "details details error-log error-log";     
    }

    .details { grid-area: details; }
    .error-log { grid-area: error-log; }

    .as { grid-area: as; }
    .equipment { grid-area: equipment; }
    .features { grid-area: features; }

</style>