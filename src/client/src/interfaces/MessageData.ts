import type { RollResultData } from "./RollResultData";
import type SkillCheckInfo from "./SkillCheckInfo";
import type UserSimple from "./UserSimple";

export default interface MessageData {
    senderInfo: UserSimple;
    messageText: string;
    messageID?: string;
    gameID: string;
    isPublic: boolean;
    timestamp?: string;
    skillCheckInfo?: SkillCheckInfo;
    rollResult?: RollResultData;
}