import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import logger from "../../../logger";

export default class ChangeUserSettingsController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { newSettings } = this.req.body;
        const userID = this.req.user?._id;

        try {
            logger.info({ userID }, `user '${userID}' attempting to change settings`);

            const usersCollection = <Collection<Document>> await getCollection('users');
            
            // modify user's settings
            await usersCollection.updateOne({ _id: userID }, { $set: { settings: newSettings }});

            logger.info({ userID, status: 200 }, `user '${userID}' changed settings successfully`);
            return this.res.status(200).end();
        }
        catch (error) {
            logger.warn({ error, userID, newSettings, status: 500 }, `user '${userID}' failed changing settings`);
            return this.res.status(500).send('User settings change failed.');
        }
    }
}