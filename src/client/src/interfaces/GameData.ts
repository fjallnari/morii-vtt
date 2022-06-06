import type { Character } from "./Character";
import type UserSimple from "./UserSimple";

export default interface GameData {
    _id: string;
    owner: string;
    name: string;
    system: string;
    characters: Character[];
    players: UserSimple[];
}