import { ObjectId } from "mongodb";

export default interface Character {
    _id: ObjectId,
    name: string,
    classLevel: string,
    experience: string,
    race: string,
    background: string,
    alignment: string
}