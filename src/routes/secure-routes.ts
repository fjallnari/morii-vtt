import express from 'express';
import auth from "../middleware/auth";
import jwt from "jsonwebtoken";
import { getCollection, getIdsFromCollection } from '../db/Mongo';
import { Collection, Document, ObjectId, WithId } from 'mongodb';
import { getFullCampaignsInfo, getUserFromToken } from '../util/helpers';

const router = express.Router();


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
            players: [],
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

router.post('/api/join-campaign', auth, async (req, res, next) => {
    const accessToken = <string> req.headers.authorization?.split(' ')[1];
    const { inviteCode, password } = req.body;

    // TODO: check if inviteCode is valid uuidv4

    try {
        const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
        const userID = new ObjectId(decodedToken.user._id);

        // add campaign to user's document; add user into campaign's document
        const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
        const invitesCollection = <Collection<Document>> await getCollection('invites');
        const usersCollection = <Collection<Document>> await getCollection('users');

        const inviteObj = await invitesCollection.findOne({invite_code: inviteCode});
        if (! inviteObj) {
            return res.status(404).send('Invite code does not exist');
        }

        // TODO: check if inviteCode matches the one stored in DB, also check the password

        await campaignsCollection.updateOne({_id: inviteObj.campaign_id}, {$addToSet: {players: userID}})
        
        // add campaign to user's campaigns
        await usersCollection.updateOne({_id: userID}, {$push: { campaigns: inviteObj.campaign_id }});

        // TODO: send the actual campaign object instead of the id to allow "live-reload"

        return res.status(200).send({campaigns: await getFullCampaignsInfo([inviteObj.campaign_id])});
    }
    catch (error) {
        return res.status(500).send('Creation failed');
    }
});

export default router;