import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import Invite from "../../../interfaces/Invite";
import { getFullCampaignsInfo } from "../../../util/helpers";
import RouteController from "../RouteController";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class JoinCampaignController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const accessToken = <string> this.req.headers.authorization?.split(' ')[1];
        const { inviteCode, password } = this.req.body;
    
        try {
            const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
            const userID = new ObjectId(decodedToken.user._id);
    
            // add campaign to user's document; add user into campaign's document
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            const invitesCollection = <Collection<Document>> await getCollection('invites');
            const usersCollection = <Collection<Document>> await getCollection('users');
    
            const inviteObj = <Invite> await invitesCollection.findOne({invite_code: inviteCode});
            if (! inviteObj) {
                return this.res.status(404).send('Invite code does not exist');
            }
    
            // check if password matches if there's any
            if (password !== "" && ! await bcrypt.compare(password, inviteObj.password)) {
                return this.res.status(401).send('Incorrect password');
            }
    
            await campaignsCollection.updateOne({_id: inviteObj.campaign_id}, {$addToSet: {players: { playerID: userID }}});
            
            // add campaign to user's campaigns
            await usersCollection.updateOne({_id: userID}, {$push: { campaigns: inviteObj.campaign_id }});
    
            // sends the actual campaign object instead of the id to allow "live-reload"
            return this.res.status(200).send({campaigns: await getFullCampaignsInfo([inviteObj.campaign_id])});
        }
        catch (error) {
            return this.res.status(500).send('Creation failed');
        }
    }
}