import express from 'express';
import { Collection, Document, ObjectId } from 'mongodb';
import { getCollection } from '../db/Mongo';
import UserDB from '../interfaces/UserDB';
import verifyToken from "../middleware/auth";
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

export default router;