import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection, getIdsFromCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import jwt from 'jsonwebtoken';
import UserDB from "../../../interfaces/UserDB";
import Character from "../../../interfaces/Character";
import logger from "../../../logger";

export default class GetCharactersController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const accessToken = <string> this.req.headers.authorization?.split(' ')[1];
        const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
        const userID = new ObjectId(decodedToken?.user?._id);

        logger.info({ userID }, `attempting to get characters for user '${userID}'`);

        try {
            const usersCollection = <Collection<Document>> await getCollection('users');

            const userObj = <UserDB> await usersCollection.findOne({_id: userID});

            const charactersObjs = <Character[]> await getIdsFromCollection(userObj.characters, 'characters');

            // stringifies objectIDs
            const cleanCharacters = charactersObjs.map(character => Object.assign(character, {_id: character._id.toString(), playerID: character.playerID.toString()}));

            logger.info({ userID, status: 200 }, `succesfully sent ${cleanCharacters.length} characters to user '${userID}'`);
            return this.res.status(200).send({ characters: cleanCharacters });
        }
        catch (error) {
            logger.info({ error, userID, status: 500 }, `failed to get characters for user '${userID}'`);
            return this.res.status(500).end();
        }
    }
}