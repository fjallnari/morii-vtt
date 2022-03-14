import { Collection, Document, WithId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import UserDB from "../../../interfaces/UserDB";
import RouteController from "../RouteController";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response } from "express";

export default class SignInController extends RouteController {
    
    public async handleRequest (): Promise<Response | void> {
        const { username, password } = this.req.body;

        try {
            const usersCollection = <Collection<Document>> await getCollection('users');
            const user = <WithId<UserDB>> await usersCollection.findOne({username: username});

            if (! user) {
                return this.res.status(403).send('Login failed.');
            }
            
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (! isValidPassword || ! process.env.JWT_SECRET || ! process.env.JWT_REFRESH_SECRET) {
                return this.res.status(403).send('Login failed.');
            }

            // jwt refresh token
            const body = { _id: user._id, username: user.username };
            const refreshToken = jwt.sign({ user: body }, process.env.JWT_REFRESH_SECRET, { expiresIn: '2y' });
            const accessToken = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '600s' });

            this.res.setHeader('Set-Cookie', `_refresh_token=${refreshToken}; HttpOnly; SameSite=Lax; max-age=63072000;`);
            
            // add new refresh token to the db
            await usersCollection.updateOne({_id: user._id}, {$set: {refresh_token: refreshToken}});

            return this.res.status(200).json({ accessToken });

        } catch (error) {
            return this.res.status(403).send('Login failed.');
        }
    }
}