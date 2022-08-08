<script lang="ts">
    import type { Character } from "../../../../interfaces/Character";
    import { getASModifier, modifyCharacter, sendSkillCheck } from'../../../../stores';
    import Tooltip, {
        Wrapper,
        Content,
    } from '@smui/tooltip';
    import InPlaceEdit from "../../../InPlaceEdit.svelte";
    import { onMount } from "svelte";

    export let character: Character;

    type RollNotationRegexGroups = { groups: { diceCount: string, diceSides: string } } | null;

    onMount (() => parseHitDiceStr());

    const parseHitDiceStr = () => {
        const splitHDTotal = character.hd_total.split(' ');
        const validationRegexp = /(?<diceCount>[0-9]*)(?<diceSides>d[0-9]+)/;

        if (!character.hd_current){
            character.hd_current = {};
        }

        splitHDTotal.forEach( dice_type => {
            const matchedNotation: RollNotationRegexGroups = dice_type.match(validationRegexp) as any;
            const matchedGroups = matchedNotation?.groups;

            if (! matchedGroups) {
                character.hd_current = {};
                return undefined;
            }
        
            const { diceCount, diceSides } = matchedGroups;

            if (! diceSides || diceSides === '0') {
                return undefined;
            }

            character.hd_current[diceSides.toLowerCase()] = diceCount;
        });
    }

    const sendHitDiceRoll = (d_type: string) => {
        character.hd_current[d_type] = (~~character.hd_current[d_type] - 1).toString(); 
        $sendSkillCheck($getASModifier('CON'), `${d_type} hit dice`, d_type);
        $modifyCharacter();
    }

</script>


<box class="total-hit-dice box-with-label">
    <div class="box-main-text">
        <InPlaceEdit bind:value={character.hd_total} editWidth="4em" editHeight="2em" on:submit={() => {parseHitDiceStr(); $modifyCharacter()}}/>
    </div>
    <div class="box-justify-filler"></div>
    <Wrapper rich>
        <div class="box-label">
            Total
        </div>
        <Tooltip>
            <Content style="white-space: pre-line;">
                Use dice notation, separated by spaces, e.g. '3d8 1d10'
            </Content>
        </Tooltip>
    </Wrapper>

</box>
<box class="current-hit-dice box-with-label">
    <div class="box-main-text">
        {#each Object.keys(character.hd_current) as d_type}
            <div class="hit-dice-single-type">
                <InPlaceEdit bind:value={character.hd_current[d_type]} editWidth="1.5em" editHeight="1.5em" on:submit={() => $modifyCharacter()}/>x
                <sendable style="{~~character.hd_current[d_type] === 0 ? 'pointer-events: none; color: var(--clr-accent-normal);': ''}" on:click={() => sendHitDiceRoll(d_type)}>
                    {` ${d_type.toUpperCase()};`}
                </sendable>
            </div>
        {/each}
    </div>
    <div class="box-justify-filler"></div>
    <div class="box-label">
        Hit Dice
    </div>
</box>


<style>

    .total-hit-dice {
        height: 75%;
        width: 3em;
        margin-right: 1em;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .total-hit-dice .box-main-text {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: smaller;
    }

    .current-hit-dice {
        height: 100%;
        width: 50%;
        margin-left: -1em;
    }

    .current-hit-dice .box-main-text {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        gap: 0.4em;
        font-weight: var(--semi-bold);
    }

    .hit-dice-single-type {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.2em;
    }
</style>