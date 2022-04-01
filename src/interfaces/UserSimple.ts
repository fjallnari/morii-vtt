import UserSettings from "./UserSettings";

export default interface UserSimple {
    _id: string;
    username: string;
    settings: UserSettings;
}