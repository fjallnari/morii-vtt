<script lang="ts">
    import type QuickCreateCharacterParts from "../../interfaces/QuickCreateCharacterParts";
    import type QuickCreateData from "../../interfaces/QuickCreateData";
    import { formatModifier } from "../../stores";
    import { getASModifier } from "../../util/util";
    import BoxWithChips from "../BoxWithChips.svelte";
    import BoxWithList from "../BoxWithList.svelte";
    import SimpleAccordionDetail from "./SimpleAccordionDetail.svelte";

    export let characterParts: QuickCreateCharacterParts;
    export let quickCreateData: QuickCreateData;
    export let isCompleted: boolean;


    $: skillsFinal = [].concat({ name: 'race', items: characterParts.race?.skill_prof ?? []})
        .concat({name: 'class', items: characterParts.class?.skills.final ?? []})
        .concat({name: 'background', items: characterParts.bio.skills});
    
    $: languagesFinal = [].concat(characterParts.race?.languages ?? []).concat(characterParts.bio.languages);
    $: toolsFinal = [].concat(characterParts.race?.tools_prof ?? []).concat(characterParts.class?.tool_prof.tools.map(tool => tool.name) ?? []).concat(characterParts.bio.tools);
    $: otherProfFinal = [].concat(characterParts.race?.other_prof.map(prof => prof.name) ?? []).concat(characterParts.class?.other_prof.map(prof => prof.name) ?? []);

    $: equipmentFinal = [].concat(characterParts.class?.equipment.flatMap(line => line.final) ?? []).concat(characterParts.bio.equipment);

    $: featuresFinal = [].concat(characterParts.race?.features ?? [])
        .concat(characterParts.class?.features.filter(feature => feature.level <= characterParts.class?.level ?? 1) ?? [])
        .concat(characterParts.as_gen_info.feats)
        .concat(characterParts.bio.features);

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

    <BoxWithList label='Equipment' inlineStyle='grid-area: equipment;' noCrud isModifyDisabled>
        <div class="box-list" slot='list'>
            {#if equipmentFinal.length === 0}
                <div>No equipment</div>
            {/if}
            {#each equipmentFinal as item, index}
                <SimpleAccordionDetail 
                    bind:value={item.name} 
                    bind:content={item.tooltip}
                    bind:amount={item.amount}
                    editable={false}
                    editWidth='8rem'>
                </SimpleAccordionDetail>
            {/each}
        </div>
    </BoxWithList>

    <BoxWithList 
        label='Features' 
        inlineStyle='grid-area: features;'
        noCrud
        isModifyDisabled
    >
        <div class="box-list" slot='list'>
            <!-- first shows the features which are selected, then compares the names alphabetically -->
            {#each featuresFinal as feature}
                <SimpleAccordionDetail 
                    bind:value={feature.name} 
                    bind:content={feature.content}
                    editable={false}
                    textareaHeight='15em'>
                </SimpleAccordionDetail>
            {/each}
        </div>
    </BoxWithList>
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
            ". . . . equipment equipment equipment equipment features features features features"
            ". . . . equipment equipment equipment equipment features features features features"
            ". . . . equipment equipment equipment equipment features features features features"
            ". . . . equipment equipment equipment equipment features features features features"; 
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

    .box-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.25em;
        padding-bottom: 4px;
    }

</style>