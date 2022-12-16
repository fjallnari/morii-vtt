import { ObjectId } from "mongodb";
import MonsterSimple from "./srd/MonsterSimple";

interface PlayerInfo {
    playerID: ObjectId,
    characterID?: ObjectId
}

export default interface Campaign {
    _id: ObjectId,
    name: string,
    system: string,
    owner: ObjectId,
    players: PlayerInfo[],
    invite?: ObjectId,
    npcs: ObjectId[],
    monsters: MonsterSimple[]
}