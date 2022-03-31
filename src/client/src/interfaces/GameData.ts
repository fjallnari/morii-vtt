import type Character from "./Character";

export default interface GameData {
    _id: string;
    name: string;
    system: string;
    character: Character;
}