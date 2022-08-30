<script lang="ts">
    import SKILLS from "../../enum/Skills";
    import type QuickCreateCharacterParts from "../../interfaces/QuickCreateCharacterParts";
    import type QuickCreateData from "../../interfaces/QuickCreateData";
    import BioTextareaBox from "../BioTextareaBox.svelte";
    import BoxWithChips from "../BoxWithChips.svelte";
    import InPlaceEdit from "../InPlaceEdit.svelte";
    import MarkdownBoxText from "./MarkdownBoxText.svelte";

    export let characterParts: QuickCreateCharacterParts;
    export let quickCreateData: QuickCreateData;
    
</script>

<background-detail>
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

    <box class="bkg-equipment"></box>
    <box class="bkg-features"></box>

    <BioTextareaBox 
        bind:charAttribute={characterParts.bio.personality} 
        inlineStyle="grid-area: bkg-personality;"
        label="Personality" 
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
            "bkg-equipment bkg-equipment bkg-equipment bkg-equipment bkg-features bkg-features bkg-features bkg-features"
            "bkg-equipment bkg-equipment bkg-equipment bkg-equipment bkg-features bkg-features bkg-features bkg-features"
            "bkg-equipment bkg-equipment bkg-equipment bkg-equipment bkg-features bkg-features bkg-features bkg-features"
            "bkg-personality bkg-personality bkg-ideals bkg-ideals bkg-bonds bkg-bonds bkg-flaws bkg-flaws"
            "bkg-personality bkg-personality bkg-ideals bkg-ideals bkg-bonds bkg-bonds bkg-flaws bkg-flaws"
            "bkg-personality bkg-personality bkg-ideals bkg-ideals bkg-bonds bkg-bonds bkg-flaws bkg-flaws"; 
    }

    background-detail box {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;        
    }
    
    .bkg-info { grid-area: bkg-info; }

    .bkg-equipment { grid-area: bkg-equipment; }
    .bkg-features { grid-area: bkg-features; }

</style>