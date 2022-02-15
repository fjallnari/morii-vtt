import { ObjectId } from "mongodb";

interface CampaignSimple {
    _id: ObjectId;
    isGM: boolean;
}

interface UserSettings {
    pfpAnimal: number;
    pfpColor: string;
}

export default interface UserDB {
    username: string;
    password: string;
    refresh_token: string;
    settings: UserSettings;
    campaigns: CampaignSimple[];
}