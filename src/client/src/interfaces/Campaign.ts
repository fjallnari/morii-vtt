import type Invite from "./Invite";
import type UserSimple from "./UserSimple";

export default interface Campaign {
    _id: string,
    name: string,
    system: string,
    owner: UserSimple,
    players: UserSimple[],
    invite: Invite,
}