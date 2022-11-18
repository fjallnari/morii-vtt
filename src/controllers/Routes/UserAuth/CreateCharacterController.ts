import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import jwt from 'jsonwebtoken';
import { CHARACTER_SKELETON } from "../../../enum/CHARACTER_SKELETON";
import logger from "../../../logger";


export default class CreateCharacterController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const accessToken = <string> this.req.headers.authorization?.split(' ')[1];
        const { campaignID, characterTemplate } = this.req.body;
        const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
        const userID = new ObjectId(decodedToken?.user?._id);

        const childLogger = logger.child({ userID, campaignID });
        childLogger.info( `user '${userID}' attempting to create new character`);
    
        try {
    
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            const usersCollection = <Collection<Document>> await getCollection('users');
            const charactersCollection = <Collection<Document>> await getCollection('characters');

            const newCharacterObj = Object.assign({}, { _id: new ObjectId(), playerID: userID, ... CHARACTER_SKELETON, ... characterTemplate });

            const insertResult = await charactersCollection.insertOne(newCharacterObj);
            const newCharacterID = insertResult.insertedId;
            
            await usersCollection.updateOne({_id: userID}, {$push: { characters: newCharacterID }});
            await campaignsCollection.updateOne({_id: new ObjectId(campaignID), "players.playerID": userID}, {$set: { "players.$.characterID": newCharacterID }});
            
            childLogger.info({ characterID: newCharacterID, status: 200  }, `user '${userID}' created new character successfully`);
            // sends newly created blank character object
            return this.res.status(200).send({characterInfo: Object.assign(newCharacterObj, {_id: insertResult.insertedId.toString(), playerID: userID.toString()})});
        }
        catch (error) {
            childLogger.warn({ campaignID, error, status: 500 }, `user '${userID}' failed creating new character`);
            childLogger.trace({ characterTemplate }, `character template for the failed creation`);
            return this.res.status(500).send('Creation failed');
        }
    }
}