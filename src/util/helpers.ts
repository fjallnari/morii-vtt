import jwt from "jsonwebtoken";
import { getCollection, getIdsFromCollection } from '../db/Mongo';
import { Collection, Document, ObjectId, WithId } from 'mongodb';
import UserDB from '../interfaces/UserDB';
import Campaign from '../interfaces/Campaign';



export const getUserFromToken = async (accessToken: string) => {
    const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
    const userID = new ObjectId(decodedToken.user._id);

    const usersCollection = <Collection<Document>> await getCollection('users');

    return <WithId<UserDB>> await usersCollection.findOne({ _id: userID});
}

export const simplifyPlayerInfo = (player: UserDB) => {
    return {
        _id: player._id.toString(),
        username: player.username,
        pfpID: player.settings.pfpID, 
        pfpColor: player.settings.pfpColor
    };
}

/**
 * Fills all the needed data for each campaign - (players & and other specific campaign info)
 * @param campaigns 
 * @returns 
 */
export const getFullCampaignsInfo = async (campaigns: ObjectId[]) => {
    const campaignsInfo = <Campaign[]> await getIdsFromCollection(campaigns, "campaigns");
    const users = await getCollection('users');

    // gets additional info for all players in campaign, then merges it with the original "campaign" object
    return await Promise.all(campaignsInfo.map( async campaign => {
        const allPlayerInfo = <UserDB[]> await users?.find({_id: {$in : campaign.players}}).toArray();
        const allInvitedInfo = <UserDB[]> await users?.find({_id: {$in : campaign.invited}}).toArray();
        const ownerInfo = <UserDB> await users?.findOne({ _id: campaign.owner });

        const simplePlayerInfo = allPlayerInfo?.map(player => {
            return simplifyPlayerInfo(player);
        });

        const simpleInvitedInfo = allInvitedInfo?.map(player => {
            return simplifyPlayerInfo(player);
        });

        return Object.assign( campaign, 
            { _id: campaign._id.toString() }, 
            { owner: simplifyPlayerInfo(ownerInfo) },
            { players: simplePlayerInfo },
            { invited: simpleInvitedInfo },
        );
    }));
}