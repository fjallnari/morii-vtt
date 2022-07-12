import Character from "../Character";

export default interface ChangeCharacterEmit {
    receiverSocketID: string; // the socketID of the user to whom the change is to be sent to
    roomID: string;
    character: Character;
    isNPC?: boolean;
}