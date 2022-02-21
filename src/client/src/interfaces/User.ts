import type Campaign from "./Campaign";
import type UserSimple from "./UserSimple";

interface UserSettings {
    pfpID: number;
    pfpColor: string;
}

export default interface User {
    _id: string;
    username: string;
    settings: UserSettings;
    campaigns: Campaign[];
}