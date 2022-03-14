import { Response } from "express";
import { Collection, Document } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import jwt from 'jsonwebtoken';

export default class SignOutController extends RouteController {

    public async handleRequest(): Promise<Response | void> {
        try {
            const refreshToken = this.req.cookies._refresh_token;
            const decodedToken = <jwt.JwtPayload> jwt.decode(refreshToken);
            const username = decodedToken.user.username;

            // resets refresh token
            const usersCollection = <Collection<Document>> await getCollection('users');
            await usersCollection.updateOne({username: username}, {$set: {refresh_token: ""}});
            
            this.res.clearCookie('_refresh_token');
            return this.res.status(200).end();
        }

        catch (error) {
            return this.res.status(500).send('Signout failed');
        }
    }
}