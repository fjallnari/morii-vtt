<script lang="ts">
    import type { Character } from "../../interfaces/Character";

    export let characterTemplate: Partial<Character> = {};

</script>

<div class="race-detail">
    <box class="select-race"></box>
    <box class="ability-score-increase"></box>
    <box class="age"></box>
    <box class="alignment"></box>
    <box class="size"></box>
    <box class="speed"></box>
    <box class="languages"></box>
    <box class="features"></box>
    <box class="skill-prof"></box>
    <box class="tools-prof"></box>
    <box class="other-prof"></box>
</div>


<style>
    .race-detail { grid-area: step-detail;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        gap: 0.5em; 
        grid-template-areas: 
            "ability-score-increase ability-score-increase ability-score-increase ability-score-increase select-race select-race select-race select-race"
            "ability-score-increase ability-score-increase ability-score-increase ability-score-increase features features features features"
            "age age alignment alignment features features features features"
            "age age alignment alignment features features features features"
            "size size speed speed features features features features"
            "size size speed speed features features features features"
            "languages languages skill-prof skill-prof tools-prof tools-prof other-prof other-prof"
            "languages languages skill-prof skill-prof tools-prof tools-prof other-prof other-prof"; 
    }

    .select-race { grid-area: select-race; }

    .ability-score-increase { grid-area: ability-score-increase; }
    .age { grid-area: age; }
    .alignment { grid-area: alignment; }
    .size { grid-area: size; }
    .speed { grid-area: speed; }
    .languages { grid-area: languages; }
    .features { grid-area: features; }
    .skill-prof { grid-area: skill-prof; }
    .tools-prof { grid-area: tools-prof; }
    .other-prof { grid-area: other-prof; }
</style>