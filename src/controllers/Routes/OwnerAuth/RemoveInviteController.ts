import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import logger from "../../../logger";
import RouteController from "../RouteController";

export default class RemoveInviteCodeController extends RouteController {
    
    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { campaignID } = this.req.body;

        logger.info({ campaignID }, `attempting to remove invite-code for campaign '${campaignID}'`);

        try {
            // TODO: verify if the owner of campaign is the one actually making the request
    
            const invitesCollection = <Collection<Document>> await getCollection('invites');
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            
            // delete the invite from the collection
            await invitesCollection.deleteOne({ campaign_id: new ObjectId(campaignID) });
    
            // reset it in the campaign's document as well
            await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$set: {invite: ""}});

            logger.info({ campaignID }, `invite-code was removed succesfully`);
            return this.res.status(200).end();
        }
        catch (error) {
            logger.info({ error, campaignID }, `failed removing invite-code from campaign '${campaignID}'`);
            return this.res.status(401).end();
        }        
    }
}