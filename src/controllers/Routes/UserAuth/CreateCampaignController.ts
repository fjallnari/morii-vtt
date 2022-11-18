import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import jwt from 'jsonwebtoken';
import logger from "../../../logger";

export default class CreateCampaignController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const accessToken = <string> this.req.headers.authorization?.split(' ')[1];
        const { campaignName, gameSystem } = this.req.body;

        logger.info({ campaignName }, `attempting to create new campaign '${campaignName}'`);
    
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
                npcs: []
            };
    
            const insertResult = await campaignsCollection.insertOne(newCampaign);
            
            // add campaign to user's campaigns
            await usersCollection.updateOne({_id: userID}, {$push: {campaigns: insertResult.insertedId }});

            logger.info({ campaignID: insertResult.insertedId, userID, status: 200 }, `new campaign '${campaignName}' creation success by user ${userID}`);    
            return this.res.status(200).send({campaign: Object.assign(newCampaign, {_id: insertResult.insertedId})});
        }
        catch (error) {
            logger.warn({ campaignName, error }, `campaign '${campaignName}' creation failed `); 
            return this.res.status(500).send('Creation failed');
        }
    }
}