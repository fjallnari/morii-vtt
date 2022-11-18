import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid/non-secure';
import logger from "../../../logger";

export default class CreateInviteCodeController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        try {
            // TODO: verify if the owner of campaign is the one actually making the request
            const { campaignID, password } = this.req.body;
            const inviteCode = nanoid(16);

            logger.info({ campaignID, inviteCode }, `attempting to create new invite-code for the campaign '${campaignID}'`);
    
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

            logger.info({ campaignID, inviteCode, has_password: password !== "", status: 200 }, `invite code '${inviteCode}' was created succesfully`); 
            return this.res.status(200).send({ invite: { invite_code: inviteCode, has_password: password !== "" }});
        }
        catch (error) {
            logger.info({ error, campaignID: this.req.body.campaignID, status: 401 }, `failed creating invite code for campaign ${this.req.body.campaignID}`);
            return this.res.status(401).end();
        }        
    }
}