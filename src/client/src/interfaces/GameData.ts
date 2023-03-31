import type UserSimple from "./UserSimple";
import type InitiativeData from "./5E/InitiativeData";
import type { MonsterData } from "./5E/MonsterData";
import type MonsterSimple from "./5E/MonsterSimple";
import type CharacterAny from "./CharacterAny";
import type CairnData from "./Cairn/CairnData";
import type Invite from "./Invite";
import type { SpellShadowdark } from "./Shadowdark/SpellShadowdark";
import type { AttackShadowdark } from "./Shadowdark/AttackShadowdark";

export default interface GameData {
    _id: string;
    owner: string;
    name: string;
    system: string;
    invite?: Invite;
    characters: CharacterAny[];
    players: UserSimple[];
    npcs: CharacterAny[];
    monsters?: MonsterData[];
    monsters_SRD?: MonsterSimple[]; 
    initiative?: InitiativeData;
    cairn?: CairnData,
    shadowdark?: {
        spells: SpellShadowdark[],
        weapons: Omit<AttackShadowdark, "id">[]
    }
}