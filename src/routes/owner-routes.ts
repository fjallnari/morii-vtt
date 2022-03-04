import express from 'express';
import { Collection, Document, ObjectId } from 'mongodb';
import { getCollection } from '../db/Mongo';
import UserDB from '../interfaces/UserDB';
import verifyToken from "../middleware/auth";
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import { getUserFromToken, simplifyPlayerInfo } from '../util/helpers';
import Campaign from '../interfaces/Campaign';

const router = express.Router();

router.post("/api/kick-player", verifyToken, async (req, res) => {
    try {
        // TODO: verify if the owner of campaign is the one actually making the request
        const { playerID, campaignID } = req.body;

        const usersCollection = <Collection<Document>> await getCollection('users');
        const campaignsCollection = <Collection<Document>> await getCollection('campaigns');

        // remove the campaign from user's campaigns
        await usersCollection.updateOne({ _id: new ObjectId(playerID) }, {$pull: { campaigns: new ObjectId(campaignID) }});
        
        // remove player from campaign's document
        await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$pull: {players: new ObjectId(playerID) }});

        return res.status(200).send();
    }
    catch (err) {
        console.log(err);
        return res.status(401).end();
    }
});


router.post("/api/create-invite-code", verifyToken, async (req, res) => {
    try {
        // TODO: verify if the owner of campaign is the one actually making the request
        const { campaignID, password } = req.body;
        const inviteCode = uuidv4();

        // hash password only if it exists
        const newInvite = {
            invite_code: inviteCode,
            campaign_id: new ObjectId(campaignID),
            password: password === "" ? "" : await bcrypt.hash(password, 10)
        }

        const invitesCollection = <Collection<Document>> await getCollection('invites');
        const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
        
        // create invite object and add it to the invites collection
        const insertResult = await invitesCollection.insertOne(newInvite);
        const newInviteID = insertResult.insertedId;

        // set invite id in campaign document
        await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$set: {invite: newInviteID}});

        return res.status(200).send({ invite: { invite_code: inviteCode, has_password: password !== "" }});
    }
    catch (err) {
        console.log(err);
        return res.status(401).end();
    }
});

router.post("/api/remove-invite-code", verifyToken, async (req, res) => {
    try {
        // TODO: verify if the owner of campaign is the one actually making the request
        const { campaignID } = req.body;

        const invitesCollection = <Collection<Document>> await getCollection('invites');
        const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
        
        // delete the invite from the collection
        await invitesCollection.deleteOne({ campaign_id: new ObjectId(campaignID) });

        // reset it in the campaign's document as well
        await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$set: {invite: ""}});

        return res.status(200).end();
    }
    catch (err) {
        console.log(err);
        return res.status(401).end();
    }
});


router.post("/api/delete-campaign", verifyToken, async (req, res) => {
    try {
        // TODO: verify if the owner of campaign is the one actually making the request
        const { campaignID } = req.body;

        const usersCollection = <Collection<Document>> await getCollection('users');
        const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
        const invitesCollection = <Collection<Document>> await getCollection('invites');

        const campaignInfo = <Campaign> await campaignsCollection.findOne({_id: new ObjectId(campaignID)});
        if (! campaignInfo) {
            return res.status(404).end();
        }

        // remove campaign's invite (if there is any) from the "invites collection"
        if (campaignInfo.invite) {
            await invitesCollection.deleteOne({_id: campaignInfo.invite});
        }

        const allUsersInCampaign = campaignInfo.players.concat([campaignInfo.owner]);

        // remove the campaign from all players documents; not the best design in terms of efficiency rn!
        for (const userID of allUsersInCampaign) {
            usersCollection.updateOne({_id: userID}, { $pull: { campaigns: campaignInfo._id } });
        }

        // remove campaign from the campaigns coll
        await campaignsCollection.deleteOne({_id: campaignInfo._id });

        return res.status(200).send();
    }
    catch (err) {
        console.log(err);
        return res.status(401).end();
    }
});

export default router;