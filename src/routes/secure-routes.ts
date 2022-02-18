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

/**
 * Fills all the needed data for each campaign - (players & and other specific campaign info)
 * @param campaigns 
 * @returns 
 */
const getCampaignsAndPlayers = async (campaigns: ObjectId[]) => {
    const campaignsInfo = <Campaign[]> await getIdsFromCollection(campaigns, "campaigns");
    const allPlayers = campaignsInfo?.flatMap(campaign => campaign.players);

    // fill in all the player info
    const allPlayerInfo = <UserDB[]> await getIdsFromCollection(allPlayers, "users");
    const simplePlayerInfo = allPlayerInfo?.map(player => {
        return { _id: player._id.toString(), username: player.username, pfpAnimal: player.settings.pfpAnimal, pfpColor: player.settings.pfpColor}
    });

    const simpleCampaignInfo = campaignsInfo.map( campaign => {
        return {
            _id: campaign._id.toString(), 
            name: campaign.name, 
            system: campaign.system, 
            owner: campaign.owner.toString(), 
            players: campaign.players.map(player => player.toString())}
    });


    return {campaigns: simpleCampaignInfo, players: simplePlayerInfo}
}


router.get("/api/dashboard", auth, async (req, res) => {
    try {
        const accessToken = <string> req.headers.authorization?.split(' ')[1];
        const user = await getUserFromToken(accessToken);
        const {campaigns, players } = await getCampaignsAndPlayers(user.campaigns);

        return res.status(200).send({userInfo: { _id: user._id.toString(), username: user.username, settings: user.settings, campaigns: campaigns , players: players}});
    }
    catch (err) {
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

        const campaign = await campaignsCollection.insertOne({
            name: campaignName,
            system: gameSystem,
            owner: userID,
            players: []            
        });
        
        // add campaign to user's campaigns
        await usersCollection.updateOne({_id: userID}, {$push: {campaigns: campaign.insertedId }});

        return res.status(200).end();
    }
    catch (error) {
        return res.status(500).send('Creation failed');
    }
});

export default router;