import { ObjectId } from "mongodb";

interface UserSettings {
    pfpAnimal: number;
    pfpColor: string;
}

export default interface UserDB {
    _id: ObjectId,
    username: string,
    password: string,
    refresh_token: string,
    settings: UserSettings,
    campaigns: ObjectId[],
}