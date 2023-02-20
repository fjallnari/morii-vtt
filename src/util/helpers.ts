import jwt from "jsonwebtoken";
import { getCollection, getIdsFromCollection } from '../db/Mongo';
import { Collection, Document, ObjectId, WithId } from 'mongodb';
import UserDB from '../interfaces/UserDB';
import Campaign from '../interfaces/Campaign';
import Invite from "../interfaces/Invite";

export const simplifyPlayerInfo = (player: UserDB) => {
    return {
        _id: player._id.toString(),
        username: player.username,
        settings: player.settings
    };
}

export const getInviteInfo = async (inviteCollection: Collection<Document> | undefined, inviteID: ObjectId) => {
    if (!inviteCollection) { return undefined }
    const inviteInfo = <Invite> await inviteCollection?.findOne({ _id: inviteID });

    return {
        invite_code: inviteInfo.invite_code,
        has_password: inviteInfo.password !== ''
    }
}

/**
 * Fills all the needed data for each campaign - (players & and other specific campaign info)
 * @param campaigns 
 * @returns 
 */
export const getFullCampaignsInfo = async (campaigns: ObjectId[]) => {
    const campaignsInfo = <Campaign[]> await getIdsFromCollection(campaigns, "campaigns");
    const users = await getCollection('users');
    const invites = await getCollection('invites');
    if (! users || ! invites) {return}

    // gets additional info for all players in campaign, then merges it with the original "campaign" object
    return await Promise.all(campaignsInfo.map( async campaign => {
        const allPlayerInfo = <UserDB[]> await users?.find({_id: {$in : campaign.players.map( playerObj => playerObj.playerID )}}).toArray();
        const ownerInfo = <UserDB> await users?.findOne({ _id: campaign.owner });

        const simplePlayerInfo = allPlayerInfo?.map(player => {
            return simplifyPlayerInfo(player);
        });

        return Object.assign( campaign, 
            { _id: campaign._id.toString() }, 
            { owner: simplifyPlayerInfo(ownerInfo) },
            { players: simplePlayerInfo },
            { invite: campaign.invite ? await getInviteInfo(invites, campaign.invite) : undefined },
        );
    }));
}