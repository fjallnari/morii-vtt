import { ObjectId } from "mongodb";
import UserSettings from "./UserSettings";

export default interface UserDB {
    _id: ObjectId,
    username: string,
    password: string,
    refresh_token: string,
    settings: UserSettings,
    campaigns: ObjectId[],
    characters: ObjectId[]
}