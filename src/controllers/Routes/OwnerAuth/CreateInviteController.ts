import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid/non-secure';

export default class CreateInviteCodeController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        try {
            // TODO: verify if the owner of campaign is the one actually making the request
            const { campaignID, password } = this.req.body;
            const inviteCode = nanoid(16);
    
            // hash password only if it exists
            const newInvite = {
                invite_code: inviteCode,
                campaign_id: new ObjectId(campaignID),
                password: password === "" ? "" : await bcrypt.hash(password, 10)
            }
    
            const invitesCollection = <Collection<Document>> await getCollection('invites');
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            
            // create invite object and add it to the invites collection
            const insertResult = await invitesCollection.insertOne(newInvite);
            const newInviteID = insertResult.insertedId;
    
            // set invite id in campaign document
            await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$set: {invite: newInviteID}});
    
            return this.res.status(200).send({ invite: { invite_code: inviteCode, has_password: password !== "" }});
        }
        catch (err) {
            console.log(err);
            return this.res.status(401).end();
        }        
    }
}