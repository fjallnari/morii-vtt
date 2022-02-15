interface UserSettings {
    pfpAnimal: number;
    pfpColor: string;
}


export default interface User {
    username: string;
    settings: UserSettings
}