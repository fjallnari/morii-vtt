import { Collection, Document, WithId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import UserDB from "../../../interfaces/UserDB";
import RouteController from "../RouteController";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response } from "express";
import logger from "../../../logger";

export default class SignInController extends RouteController {
    
    public async handleRequest (): Promise<Response | void> {
        const { username, password, salt } = this.req.body;

        if (salt !== "") {
            logger.warn({ username, salt, status: 400 }, `there seems to be a bot trying to log in as '${username}'; aborting`);
            return this.res.status(400).send("Login failed. Try again later please.");
        }

        logger.info(`user '${username}' attempting to login`);

        try {
            const usersCollection = <Collection<Document>> await getCollection('users');
            const user = <WithId<UserDB>> await usersCollection.findOne({username: username});

            if (! user) {
                logger.info({ username, status: 403 }, `user '${username}' was not found`);
                return this.res.status(403).send('Login failed.');
            }
            
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (! isValidPassword) {
                logger.info({ username, status: 403 }, `incorrect password for user '${username}'`);
                return this.res.status(403).send('Login failed.');
            }

            if ( !process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
                logger.error({ username, status: 403 }, `JWT secrets were not found in .env file`);
                return this.res.status(403).send('Login failed.');
            }

            // signing new jwt refresh and access tokens
            const body = { _id: user._id, username: user.username };
            const refreshToken = jwt.sign({ user: body }, process.env.JWT_REFRESH_SECRET, { expiresIn: '2y' });
            const accessToken = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '600s' });

            this.res.setHeader('Set-Cookie', `_refresh_token=${refreshToken}; HttpOnly; SameSite=Lax; max-age=63072000;`);
            
            // add new refresh token to the db
            await usersCollection.updateOne({_id: user._id}, {$set: {refresh_token: refreshToken}});

            logger.info({ username, status: 200 }, `user '${username}' login success`);
            return this.res.status(200).json({ accessToken });

        } catch (error) {
            logger.warn({ username, error, status: 403 }, `'fallback; ${username}' login failed`);
            return this.res.status(403).send('Login failed.');
        }
    }
}