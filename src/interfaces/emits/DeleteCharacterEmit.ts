export default interface DeleteCharacterEmit {
    ownerSocketID?: string;
    userSocketID?: string;
    characterID: string;
    isNPC: boolean;
}