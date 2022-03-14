import type UserSimple from "./UserSimple";

export default interface MessageData {
    senderInfo: UserSimple;
    messageText: string;
    gameID: string;
    timestamp?: string;
    isPublic: boolean;
}