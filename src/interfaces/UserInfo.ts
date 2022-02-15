import { ObjectId } from "mongodb";

interface CampaignSimple {
    _id: ObjectId;
    isGM: boolean;
}


export default interface UserInfo {
    username: string;
    password: string;
    refresh_token: string;
    campaigns: CampaignSimple[];
}