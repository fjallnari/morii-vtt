import { ObjectId } from "mongodb";

export default interface Campaign {
    owner: ObjectId,
    players: ObjectId,
    system: string,
}