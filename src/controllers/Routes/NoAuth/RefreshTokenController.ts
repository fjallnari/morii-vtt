import { Response } from "express"
import { Collection, Document } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController"
import jwt from 'jsonwebtoken';

export default class RefreshTokenController extends RouteController {
    
    public async handleRequest(): Promise<Response | void> {
        try {
            const refreshToken = this.req.cookies._refresh_token;

            if (!refreshToken || ! process.env.JWT_SECRET || ! process.env.JWT_REFRESH_SECRET) {
                return this.res.status(401).send('Invalid token.');
            }

            // actually check if the token is still valid
            try {
                this.req.user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
              } catch (err) {
                return this.res.status(401).send("Invalid Token");
            }

            const usersCollection = <Collection<Document>> await getCollection('users');
            const user = await usersCollection.findOne({refresh_token: refreshToken});

            if (! user ) {
                return this.res.status(401).send('Invalid token.');
            }

            // jwt, create new access token and new refreshToken to rotate into the db
            const body = { _id: user._id, username: user.username };
            const newRefreshToken = jwt.sign({ user: body }, process.env.JWT_REFRESH_SECRET, { expiresIn: '2y' });
            const accessToken = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '600s' });

            this.res.setHeader('Set-Cookie', `_refresh_token=${newRefreshToken}; HttpOnly; SameSite=Lax; max-age=63072000;`);
            
            // add new refresh token to the db
            await usersCollection.updateOne({_id: user._id}, {$set: {refresh_token: newRefreshToken}});

            return this.res.status(200).json({ accessToken });

        } catch (error) {
            return this.res.status(403).send('Login failed');
        }        
    }
}