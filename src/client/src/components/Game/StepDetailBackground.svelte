<script lang="ts">
    import SKILLS from "../../enum/Skills";
    import type QuickCreateCharacterParts from "../../interfaces/QuickCreateCharacterParts";
    import type QuickCreateData from "../../interfaces/QuickCreateData";
    import BioTextareaBox from "../BioTextareaBox.svelte";
    import BoxWithChips from "../BoxWithChips.svelte";
    import BoxWithList from "../BoxWithList.svelte";
    import InPlaceEdit from "../InPlaceEdit.svelte";
    import MarkdownBoxText from "./MarkdownBoxText.svelte";
    import SimpleAccordionDetail from "./SimpleAccordionDetail.svelte";

    export let characterParts: QuickCreateCharacterParts;
    export let quickCreateData: QuickCreateData;

    const addFeature = () => {
        characterParts.bio.features = characterParts.bio.features.concat([{ name: '', content: '' }]); 
    }

    const deleteFeature = (feature) => {
        characterParts.bio.features = characterParts.bio.features.filter((featIter) => featIter !== feature);
    }

    const addItem = () => {
        characterParts.bio.equipment = characterParts.bio.equipment.concat([{ name: '', tooltip: '', amount: '1' }]); 
    }

    const deleteItem = (item) => {
        characterParts.bio.equipment = characterParts.bio.equipment.filter((itemIter) => itemIter !== item);
    }
    
</script>

<background-detail>
    <p class='disclaimer'>Background has to be filled in manually as well, under the OGL license there are only custom background rules.</p>
    <box class="bkg-info"></box>

    <box class="bkg-info">
        <MarkdownBoxText text={characterParts.bio.info}></MarkdownBoxText>
        <div class="box-label auto-margin">
            Custom Background
        </div>
    </box>

    <BoxWithChips bind:chipsArray={characterParts.bio.skills} label='Skills' let:index={index} gridArea='bkg-skills'>
        <select bind:value={characterParts.bio.skills[index]} on:change={() => {}}>
            <option value="" selected disabled hidden>???</option>
            {#each SKILLS as skill}
                <option value={skill}>
                    {skill}
                </option>
            {/each}
        </select>
    </BoxWithChips>

    <BoxWithChips bind:chipsArray={characterParts.bio.tools} label='Tools' let:index={index} gridArea=bkg-tools>
        <InPlaceEdit bind:value={characterParts.bio.tools[index]} editWidth='5rem' editHeight='1.5rem' on:submit={() => {}}/>
    </BoxWithChips>

    <BoxWithChips bind:chipsArray={characterParts.bio.languages} label='Languages' let:index={index} gridArea=bkg-languages>
        <InPlaceEdit bind:value={characterParts.bio.languages[index]} editWidth='5rem' editHeight='1.5rem' on:submit={() => {}}/>
    </BoxWithChips>

    <BoxWithList label='Equipment' inlineStyle='grid-area: bkg-equipment;' addNewListItem={addItem} isModifyDisabled>
        <div class="box-list" slot='list'>
            {#each characterParts.bio.equipment as item, index}
                <SimpleAccordionDetail 
                    bind:value={item.name} 
                    bind:content={item.tooltip}
                    bind:amount={item.amount}
                    editWidth='8rem'
                    deleteItem={() => deleteItem(item)}>
                </SimpleAccordionDetail>
            {/each}
        </div>
    </BoxWithList>

    <BoxWithList label='Features' inlineStyle='grid-area: bkg-features;' addNewListItem={addFeature} isModifyDisabled>
        <div class="box-list" slot='list'>
            {#each characterParts.bio.features as feature, index}
                <SimpleAccordionDetail 
                    bind:value={feature.name} 
                    bind:content={feature.content}
                    icon='sprout'
                    editWidth='8rem'
                    deleteItem={() => deleteFeature(feature)}>
                </SimpleAccordionDetail>
            {/each}
        </div>
    </BoxWithList>

    <BioTextareaBox 
        bind:charAttribute={characterParts.bio.personality} 
        inlineStyle="grid-area: bkg-personality;"
        label="Personality Traits" 
        socketModifyEnabled={false}>
    </BioTextareaBox>

    <BioTextareaBox 
        bind:charAttribute={characterParts.bio.ideals} 
        inlineStyle="grid-area: bkg-ideals;"
        label="Ideals" 
        socketModifyEnabled={false}>
    </BioTextareaBox>

    <BioTextareaBox 
        bind:charAttribute={characterParts.bio.bonds} 
        inlineStyle="grid-area: bkg-bonds;"
        label="Bonds" 
        socketModifyEnabled={false}>
    </BioTextareaBox>

    <BioTextareaBox 
        bind:charAttribute={characterParts.bio.flaws} 
        inlineStyle="grid-area: bkg-flaws;"
        label="Flaws" 
        socketModifyEnabled={false}>
    </BioTextareaBox>
</background-detail>

<style>
    background-detail { grid-area: step-detail;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        gap: 0.5em 0.5em; 
        grid-template-areas: 
            "bkg-info bkg-info bkg-skills bkg-skills bkg-tools bkg-tools bkg-languages bkg-languages"
            "bkg-info bkg-info bkg-skills bkg-skills bkg-tools bkg-tools bkg-languages bkg-languages"
            "bkg-info bkg-info bkg-skills bkg-skills bkg-tools bkg-tools bkg-languages bkg-languages"
            "bkg-info bkg-info bkg-equipment bkg-equipment bkg-personality bkg-personality bkg-ideals bkg-ideals"
            "bkg-info bkg-info bkg-equipment bkg-equipment bkg-personality bkg-personality bkg-ideals bkg-ideals"
            "bkg-features bkg-features bkg-equipment bkg-equipment bkg-personality bkg-personality bkg-ideals bkg-ideals"
            "bkg-features bkg-features bkg-equipment bkg-equipment bkg-bonds bkg-bonds bkg-flaws bkg-flaws"
            "bkg-features bkg-features bkg-equipment bkg-equipment bkg-bonds bkg-bonds bkg-flaws bkg-flaws"
            "bkg-features bkg-features bkg-equipment bkg-equipment bkg-bonds bkg-bonds bkg-flaws bkg-flaws"; 
    }

    background-detail box {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;        
    }
    
    .bkg-info { grid-area: bkg-info; }

    p.disclaimer {
        position: absolute;
        top: 0.5em;
        right: 5em;
        width: 20em;
        color: var(--clr-contrast-normal);
    }

    .box-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.25em;
    }

</style>