import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection, getIdsFromCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import jwt from 'jsonwebtoken';
import UserDB from "../../../interfaces/UserDB";
import Character from "../../../interfaces/Character";

export default class GetCharactersController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const accessToken = <string> this.req.headers.authorization?.split(' ')[1];

        try {
            const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
            const userID = new ObjectId(decodedToken.user._id);
            const usersCollection = <Collection<Document>> await getCollection('users');

            const userObj = <UserDB> await usersCollection.findOne({_id: userID});

            const charactersObjs = <Character[]> await getIdsFromCollection(userObj.characters, 'characters');

            // stringifies objectIDs
            const cleanCharacters = charactersObjs.map(character => Object.assign(character, {_id: character._id.toString(), playerID: character.playerID.toString()}));

            return this.res.status(200).send({ characters: cleanCharacters });
        }
        catch (error) {
            return this.res.status(500).end();
        }
    }
}