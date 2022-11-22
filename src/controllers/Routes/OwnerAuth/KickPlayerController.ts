import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import logger from "../../../logger";
import RouteController from "../RouteController";

export default class KickPlayerController extends RouteController {
    
    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { playerID, campaignID } = this.req.body;

        logger.info({ playerID, campaignID }, `attempting to kick player '${playerID}' from campaign`);

        try {    
            const usersCollection = <Collection<Document>> await getCollection('users');
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
    
            // remove the campaign from user's campaigns
            await usersCollection.updateOne({ _id: new ObjectId(playerID) }, {$pull: { campaigns: new ObjectId(campaignID) }});
            
            // remove player from campaign's document
            await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$pull: {players: {playerID: new ObjectId(playerID) }}});

            logger.info({ playerID, campaignID }, `player '${playerID}' was successfully kicked from campaign`);    
            return this.res.status(200).send();
        }
        catch (err) {
            logger.info({ playerID, campaignID }, `failed kicking player '${playerID}' from campaign`);   
            return this.res.status(401).end();
        }        
    }
}