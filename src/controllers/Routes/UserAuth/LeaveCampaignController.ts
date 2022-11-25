import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import jwt from 'jsonwebtoken';
import logger from "../../../logger";

export default class LeaveCampaignController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { campaignID } = this.req.body;
        const userID = this.req.user?._id;

        logger.info({ userID, campaignID }, `user '${userID}' attempting to leave campaign '${campaignID}'`);
    
        try {
            const usersCollection = <Collection<Document>> await getCollection('users');
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            
            // remove user from campaign's list 
            await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$pull: {players: { playerID: userID }}})
            
            // remove campaign from user's campaigns
            await usersCollection.updateOne({_id: userID}, {$pull: { campaigns: new ObjectId(campaignID) }});

            logger.info({ userID, campaignID, status: 200 }, `user '${userID}' left '${campaignID}' successfully`);    
            return this.res.status(200).end();
        }
        catch (error) {
            logger.info({ userID, campaignID, error, status: 401 }, `user '${userID}' failed to leave camapaign '${campaignID}'`);
            return this.res.status(401).end();
        }
    }
}