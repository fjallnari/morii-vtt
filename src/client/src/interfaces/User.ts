import type Campaign from "./Campaign";
import type UserSimple from "./UserSimple";

interface UserSettings {
    pfpAnimal: number;
    pfpColor: string;
}

export default interface User {
    username: string;
    settings: UserSettings;
    campaigns: Campaign[];
    players: UserSimple[];
}