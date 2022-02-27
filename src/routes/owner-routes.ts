import express from 'express';
import { Collection, Document, ObjectId } from 'mongodb';
import { getCollection } from '../db/Mongo';
import UserDB from '../interfaces/UserDB';
import verifyToken from "../middleware/auth";
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import { getUserFromToken, simplifyPlayerInfo } from '../util/helpers';

const router = express.Router();

router.post("/api/invite-player", verifyToken, async (req, res) => {
    try {
        // TODO: verify if the owner of campaign is the one actually making the request
        const { username, campaignID } = req.body;
        
        // add player to the "invited" array for the campaign; also add the campaign id to player's invited_to array

        const usersCollection = <Collection<Document>> await getCollection('users');
        const invitedPlayer = <UserDB | undefined> await usersCollection.findOne({ username: username });
        if (! invitedPlayer) {
            return res.status(404).send('This user does not exist.');
        }
        // TODO: cannot invite yourself, cannot invited already playing player

        const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
        await campaignsCollection.updateOne({ _id: new ObjectId(campaignID) }, { $addToSet: {invited: invitedPlayer._id }});
        await usersCollection.updateOne({ _id: invitedPlayer._id }, { $addToSet: {invited_to: new ObjectId(campaignID) }});

        return res.status(200).send({ invitedPlayer: simplifyPlayerInfo(invitedPlayer) });
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

export default router;