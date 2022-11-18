import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection, getIdsFromCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import UserDB from "../../../interfaces/UserDB";
import Invite from "../../../interfaces/Invite";
import Campaign from "../../../interfaces/Campaign";
import logger from "../../../logger";

export default class GetInviteController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const inviteCode = this.req.params.inviteCode;

        logger.info({ inviteCode }, `attempting to get invite-code data`);

        try {
            const invitesCollection = <Collection<Document>> await getCollection('invites');
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            const usersCollection = <Collection<Document>> await getCollection('users');

            const inviteObj = <Invite> await invitesCollection.findOne({invite_code: inviteCode});
            if (! inviteObj) {
                logger.info({ inviteCode, status: 404 }, `invite-code '${inviteCode}' does not exist`);
                return this.res.status(404).send('Invite code does not exist');
            }

            const campaignObj = <Campaign> await campaignsCollection.findOne({_id: inviteObj.campaign_id});
            const ownerObj = <UserDB> await usersCollection.findOne({_id: campaignObj.owner});

            logger.info({ inviteCode, status: 200 }, ` succesffully sent data for invite-code '${inviteCode}'`);
            return this.res.status(200).send({ campaignName: campaignObj.name, ownerName: ownerObj.username, needsPassword: inviteObj.password && inviteObj.password !== ''});
        }
        catch (error) {
            logger.info({ error, inviteCode, status: 500 }, `failed getting invite-code data`);
            return this.res.status(500).end();
        }
    }
}