import { ObjectId } from "mongodb";

export default interface Campaign {
    _id: ObjectId,
    name: string,
    system: string,
    owner: ObjectId,
    players: ObjectId[],
}