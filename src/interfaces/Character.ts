import { ObjectId } from "mongodb";

export default interface Character {
    _id: ObjectId | string,
    playerID: ObjectId | string,
    name: string,
    classLevel: string,
    experience: string,
    race: string,
    background: string,
    alignment: string
}