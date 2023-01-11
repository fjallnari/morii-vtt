<script lang="ts">
    import { params } from "svelte-spa-router";
    import type { MonsterTrait } from "../../../interfaces/MonsterData";
    import { messageMode, ownerSocketID, sendSkillCheck, socket, user } from "../../../stores";

    export let trait: MonsterTrait;

    const sendDamage = () => {
        const opDict = { 'plus': '+', 'taking': '+' };
        const dmgMatch = trait.attack_dmg.matchAll(/(?: (?<op>plus|or|taking) [0-9]+ )*\((?<formula>[0-9]+d[0-9]+(?: [+−] [0-9]+)*)\)(?: (?:(?<type>[a-z]*) damage))*/gm);
        const dmgGroups = [ ... dmgMatch].map(match => match.groups);

        const dmgFormula = dmgGroups.map(dmg => `${opDict[`${dmg.op}` ?? ''] ?? ''}${dmg.op === 'or' ? '' : dmg.formula}`).join(' ');
        const dmgType = dmgGroups.map(dmg => `${dmg.type}`).join(' + ');

        $sendSkillCheck(0, `${trait.name.toLowerCase().replace('.', '')} | ${dmgType} damage`, '', '-', '-', '-', dmgFormula);
    }

    const sendAttack = () => {
        const atkMatch = /(?<to_hit_mod>[^ ]*) to hit/.exec(trait.attack_info);

        if (!atkMatch) {
            return;
        }

        $sendSkillCheck(~~atkMatch.groups.to_hit_mod ?? 0, `${trait.name.toLowerCase().replace('.', '')} | to hit`, '');
    }

    const sendTrait = () => {
        $socket.emit('chat-message', {
            senderInfo: {
                _id: $user._id, 
                username: $user.username,
                settings: $user.settings,
            }, 
            messageText: `#### ${trait.name}\n${trait.subtitle ? `*${trait.subtitle}*\n` : ''}${trait.content}`,
            gameID: $params.id,
            ownerSocketID: $ownerSocketID,
            messageMode: $messageMode
        });
    }

</script>

{#if !trait.attack_dmg}
    <p>
        <sendable on:click={() => sendTrait()}>
            <em><strong>{trait.name ?? ''}</strong></em>
        </sendable>
        <em>{trait.subtitle ?? ''}</em>
        {trait.content.split('\n\n')[0]}
        {#each trait.content.split('\n\n').slice(1) as paragraph}
            <p class="inner-trait-paragraph">{paragraph}</p>
        {/each}
    </p>
{:else}
    <p>
        <sendable on:click={() => { sendAttack(); sendDamage()}}>
            <em><strong>{trait.name ?? ''}</strong></em>          
        </sendable>
        <sendable on:click={() => sendAttack()}>
            <em>{trait.type ?? ''}</em>
        </sendable>
        {trait.attack_info}
        <sendable on:click={() => sendDamage()}>
            <em>{"Hit:"}</em>         
        </sendable>
        {trait.attack_dmg}
        {trait?.content?.split('\n\n')[0] ?? ''}
        {#each trait?.content?.split('\n\n').slice(1) ?? [] as paragraph}
            <p class="inner-trait-paragraph">{paragraph}</p>
        {/each}
    </p>
{/if}

<style>
    .inner-trait-paragraph {
        margin: 0.8em 0em;
    }
</style>