import { Response } from "express"
import { Collection, Document } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController"
import jwt from 'jsonwebtoken';
import logger from "../../../logger";

export default class RefreshTokenController extends RouteController {
    
    public async handleRequest(): Promise<Response | void> {
        try {
            const refreshToken = this.req.cookies._refresh_token;

            if (!refreshToken) {
                logger.info({ status: 401 }, `JWT token does not exist`);
                return this.res.status(401).send('Invalid token.');
            }

            if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
                logger.error({ status: 401 }, `JWT secrets were not found in .env file`);
                return this.res.status(401).send('Invalid token.');
            }

            // check if the token is still valid
            try {
                jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
              } catch (err) {
                logger.info({ status: 401 }, `JWT refresh token is invalid`);
                return this.res.status(401).send("Invalid Token");
            }

            const usersCollection = <Collection<Document>> await getCollection('users');
            const user = await usersCollection.findOne({ refresh_token: refreshToken });

            if (! user ) {
                logger.info({ refresh_token: refreshToken }, `No user has this refreshToken stored in DB`);
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
            logger.warn({ error, status: 403 }, `JWT refresh failed`);
            return this.res.status(403).send('Login failed');
        }        
    }
}