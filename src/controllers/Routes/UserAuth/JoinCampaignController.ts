import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import Invite from "../../../interfaces/Invite";
import { getFullCampaignsInfo } from "../../../util/helpers";
import RouteController from "../RouteController";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Campaign from "../../../interfaces/Campaign";
import logger from "../../../logger";

export default class JoinCampaignController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const accessToken = <string> this.req.headers.authorization?.split(' ')[1];
        const { inviteCode, password } = this.req.body;
        const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
        const userID = new ObjectId(decodedToken?.user?._id);

        logger.info({ userID, inviteCode }, `'user ${userID}' attempting to join campaign`);

        try {
            // add campaign to user's document; add user into campaign's document
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            const invitesCollection = <Collection<Document>> await getCollection('invites');
            const usersCollection = <Collection<Document>> await getCollection('users');
    
            const inviteObj = <Invite> await invitesCollection.findOne({invite_code: inviteCode});
            if (! inviteObj) {
                logger.info({ userID, inviteCode, status: 404 }, `join failed; invite '${inviteCode}' was not found`);
                return this.res.status(404).send('Invite code does not exist');
            }
    
            // check if password matches if there's any
            if (inviteObj.password !== "" && ! await bcrypt.compare(password, inviteObj.password)) {
                logger.info({ userID, inviteCode, status: 401 }, `aborting join; incorrect password`);
                return this.res.status(401).send('Incorrect password');
            }

            const campaignObj = <Campaign> await campaignsCollection.findOne({_id: new ObjectId(inviteObj.campaign_id)});

            // prevents double-add and owner adding themselves
            if (campaignObj.players.map(id => id.playerID.toString()).includes(decodedToken.user._id) || campaignObj.owner.toString() === decodedToken.user._id) {
                logger.info({ userID, campaignID: campaignObj._id, inviteCode, status: 401 }, `aborting join; user is already in campaign`);
                return this.res.status(401).send('Already in campaign');
            }
    
            await campaignsCollection.updateOne({_id: inviteObj.campaign_id}, {$addToSet: {players: { playerID: userID }}});
            
            // add campaign to user's campaigns
            await usersCollection.updateOne({_id: userID}, {$push: { campaigns: inviteObj.campaign_id }});

            logger.info({ userID, campaignID: campaignObj._id, inviteCode, status: 200 }, `user '${userID}' joined campaign '${campaignObj._id}' succesfully`);
                
            // sends the actual campaign object instead of the id to allow "live-reload"
            return this.res.status(200).send({campaigns: await getFullCampaignsInfo([inviteObj.campaign_id])});
        }
        catch (error) {
            logger.warn({ error, userID, inviteCode, status: 500 }, `aborting join; something went wrong`);
            return this.res.status(500).send('Failed joining campaign.');
        }
    }
}