import { ObjectId } from "mongodb";

export default interface Invite {
    _id: ObjectId,
    invite_code: string,
    campaign: ObjectId,
    password: string
}