import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import jwt from 'jsonwebtoken';

export default class ChangeUserSettingsController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const accessToken = <string> this.req.headers.authorization?.split(' ')[1];
        const { newSettings } = this.req.body;

        try {
            const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
            const userID = new ObjectId(decodedToken.user._id);
            const usersCollection = <Collection<Document>> await getCollection('users');
            
            // modify user's settings
            await usersCollection.updateOne({ _id: userID }, { $set: { settings: newSettings }});

            return this.res.status(200).end();
        }
        catch (error) {
            return this.res.status(500).send('User settings change failed.');
        }
    }
}