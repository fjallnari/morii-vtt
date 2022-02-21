import express from 'express';
import auth from "../middleware/auth";
import jwt from "jsonwebtoken";
import { getCollection, getIdsFromCollection } from '../db/Mongo';
import { Collection, Document, ObjectId, WithId } from 'mongodb';
import UserDB from '../interfaces/UserDB';
import Campaign from '../interfaces/Campaign';

const router = express.Router();


const getUserFromToken = async (accessToken: string) => {
    const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
    const userID = new ObjectId(decodedToken.user._id);

    const usersCollection = <Collection<Document>> await getCollection('users');

    return <WithId<UserDB>> await usersCollection.findOne({ _id: userID});
}

const simplifyPlayerInfo = (player: UserDB) => {
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
const getFullCampaignsInfo = async (campaigns: ObjectId[]) => {
    const campaignsInfo = <Campaign[]> await getIdsFromCollection(campaigns, "campaigns");
    const users = await getCollection('users');

    // gets additional info for all players in campaign, then merges it with the original "campaign" object
    return await Promise.all(campaignsInfo.map( async campaign => {
        const allPlayerInfo = <UserDB[]> await users?.find({_id: {$in : campaign.players}}).toArray();
        const ownerInfo = <UserDB> await users?.findOne({ _id: campaign.owner });

        const simplePlayerInfo = allPlayerInfo?.map(player => {
            return simplifyPlayerInfo(player);
        });

        return Object.assign( campaign, 
            { _id: campaign._id.toString() }, 
            { owner: simplifyPlayerInfo(ownerInfo) },
            { players: simplePlayerInfo }
        );
    }));
}


router.get("/api/dashboard", auth, async (req, res) => {
    try {
        const accessToken = <string> req.headers.authorization?.split(' ')[1];
        const user = await getUserFromToken(accessToken);
        const campaignsInfo = await getFullCampaignsInfo(user.campaigns);

        return res.status(200).send({userInfo: { _id: user._id.toString(), username: user.username, settings: user.settings, campaigns: campaignsInfo }});
    }
    catch (err) {
        console.log(err);
        return res.status(401).end();
    }

});

router.post('/api/create-campaign', auth, async (req, res, next) => {
    const accessToken = <string> req.headers.authorization?.split(' ')[1];
    const { campaignName, gameSystem } = req.body;

    try {
        const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
        const userID = new ObjectId(decodedToken.user._id);

        // add campaign to campaigns collection
        const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
        const usersCollection = <Collection<Document>> await getCollection('users');

        const newCampaign = {
            name: campaignName,
            system: gameSystem,
            owner: userID,
            players: [
                
            ]            
        };

        const insertResult = await campaignsCollection.insertOne(newCampaign);
        
        // add campaign to user's campaigns
        await usersCollection.updateOne({_id: userID}, {$push: {campaigns: insertResult.insertedId }});

        return res.status(200).send({campaign: Object.assign(newCampaign, {_id: insertResult.insertedId})});
    }
    catch (error) {
        return res.status(500).send('Creation failed');
    }
});

export default router;