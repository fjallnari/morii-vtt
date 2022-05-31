import Character from "./Character";

export default interface ChangeCharacterEmitData {
    modifierID: string; // the ID of the the user who modifies the character!
    roomID: string;
    character: Character;
}