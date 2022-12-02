import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import logger from "../../../logger";
import RouteController from "../RouteController";

export default class RenameCampaignController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { campaignID, newName } = this.req.body;

            logger.info({ campaignID }, `attempting to rename the campaign '${campaignID}'`);

            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
    
            // set invite id in campaign document
            await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$set: {name: newName}});

            logger.info({ campaignID, newName, status: 200 }, `campaign '${campaignID}' was succesfully renamed to ${newName}`); 
            return this.res.status(200).end();
        }
        catch (error) {
            logger.info({ error, campaignID: this.req.body.campaignID, status: 401 }, `failed renaming the campaign ${this.req.body.campaignID}`);
            return this.res.status(401).end();
        }        
    }
}