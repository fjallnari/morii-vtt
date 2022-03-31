import type Campaign from "./Campaign";
import type GameData from "./GameData";
import type UserSettings from "./UserSettings";

export default interface User {
    _id: string;
    username: string;
    settings: UserSettings;
    campaigns?: Campaign[];
    invited_to?: Campaign[];
    gameData?: GameData;
}