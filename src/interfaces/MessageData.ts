import LangData from "./LangData";
import { RollResultData } from "./RollResultData";
import type UserSimple from "./UserSimple";

export default interface MessageData {
    senderInfo: UserSimple;
    messageText: string;
    messageID?: string;
    gameID: string;
    timestamp?: string;
    messageMode: number;
    rollResult?: RollResultData,
    langData?: LangData,
    ownerSocketID: string,
    whisperGM?: boolean
}