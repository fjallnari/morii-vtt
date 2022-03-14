import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";

export default class KickPlayerController extends RouteController {
    
    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        try {
            // TODO: verify if the owner of campaign is the one actually making the request
            const { playerID, campaignID } = this.req.body;
    
            const usersCollection = <Collection<Document>> await getCollection('users');
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
    
            // remove the campaign from user's campaigns
            await usersCollection.updateOne({ _id: new ObjectId(playerID) }, {$pull: { campaigns: new ObjectId(campaignID) }});
            
            // remove player from campaign's document
            await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$pull: {players: new ObjectId(playerID) }});
    
            return this.res.status(200).send();
        }
        catch (err) {
            console.log(err);
            return this.res.status(401).end();
        }        
    }
}