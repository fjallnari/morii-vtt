import type { Character } from "./Character";
import type MonsterSimple from "./MonsterSimple";
import type UserSimple from "./UserSimple";
import type InitiativeData from "./InitiativeData";

export default interface GameData {
    _id: string;
    owner: string;
    name: string;
    system: string;
    characters: Character[];
    players: UserSimple[];
    npcs: Character[];
    monsters: MonsterSimple[];
    monsters_SRD: MonsterSimple[]; 
    initiative?: InitiativeData;
}