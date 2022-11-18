import { Collection, Document } from "mongodb";
import bcrypt from 'bcrypt';
import { getCollection } from "../../../db/Mongo";
import { randint, randomChoice, randomColor } from "../../../util/util";
import RouteController from "../RouteController";
import ANIMALS from "../../../enum/ANIMALS";
import logger from "../../../logger";

export default class SignUpController extends RouteController {
    
    public async handleRequest () {
        const { username, password } = this.req.body;

        logger.info({ username }, `user '${username}' attempting to register`);
        
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const usersCollection = <Collection<Document>> await getCollection('users');
            var user = await usersCollection.insertOne({
                username: username,
                password: hashedPassword,
                refresh_token: "",
                settings: {
                    pfpID: randomChoice(ANIMALS),
                    pfpColor: randomColor()
                },
                campaigns: [],
                characters: []
            });
        }
        catch (error) {
            logger.info({ error, username, status: 409 }, `user '${username}' already exists, aborting register`);
            return this.res.status(409).send("User already exists. Please login.");
        }

        logger.info({ username, status: 201 }, `user '${username}' register success`);
        return this.res.status(201).json({
            message: 'Signup successful', 
            user: user
        });
    }
}