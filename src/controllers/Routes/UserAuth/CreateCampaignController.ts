import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import logger from "../../../logger";

export default class CreateCampaignController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { campaignName, gameSystem } = this.req.body;
        const userID = this.req.user?._id;

        logger.info({ campaignName }, `attempting to create new campaign '${campaignName}'`);
    
        try {
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
            logger.warn({ error, campaignName, userID, status: 500 }, `campaign '${campaignName}' creation by user ${userID} failed `); 
            return this.res.status(500).send('Creation failed');
        }
    }
}