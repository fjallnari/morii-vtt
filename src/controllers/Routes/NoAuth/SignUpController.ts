import { Collection, Document } from "mongodb";
import bcrypt from 'bcrypt';
import { getCollection } from "../../../db/Mongo";
import { randint, randomChoice, randomColor } from "../../../util/util";
import RouteController from "../RouteController";
import ANIMALS from "../../../enum/ANIMALS";
import logger from "../../../logger";

export default class SignUpController extends RouteController {
    
    public async handleRequest () {
        const { username, password, salt } = this.req.body;

        if (salt !== "") {
            logger.warn({ username, salt, status: 400 }, `there seems to be a bot trying to register as '${username}'; aborting`);
            return this.res.status(400).send("Register failed. Try again later please.");
        }

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