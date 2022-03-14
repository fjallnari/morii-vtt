import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import jwt from 'jsonwebtoken';

export default class LeaveCampaignController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { campaignID } = this.req.body;

        const accessToken = <string> this.req.headers.authorization?.split(' ')[1];
        const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
        const userID = new ObjectId(decodedToken.user._id);
    
        try {
            const usersCollection = <Collection<Document>> await getCollection('users');
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            
            // remove user from campaign's list 
            await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$pull: {players: userID}})
            
            // remove campaign from user's campaigns
            await usersCollection.updateOne({_id: userID}, {$pull: { campaigns: campaignID }});
    
            return this.res.status(200).end();
        }
        catch (err) {
            console.log(err);
            return this.res.status(401).end();
        }
    }
}