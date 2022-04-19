import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import jwt from 'jsonwebtoken';

export default class CreateCharacterController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const accessToken = <string> this.req.headers.authorization?.split(' ')[1];
        const { campaignID } = this.req.body;
    
        try {
            const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
            const userID = new ObjectId(decodedToken.user._id);
    
            // add campaign to campaigns collection
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            const usersCollection = <Collection<Document>> await getCollection('users');
            const charactersCollection = <Collection<Document>> await getCollection('characters');

            const newCharacter = {
                name: '',
                classLevel: '',
                experience: '',
                race: '',
                background: '',
                alignment: ''
            };
    
            const insertResult = await charactersCollection.insertOne(newCharacter);
            const newCharacterID = insertResult.insertedId;
            
            // add campaign to user's campaigns
            await usersCollection.updateOne({_id: userID}, {$push: { characters: newCharacterID }});
            await campaignsCollection.updateOne({_id: new ObjectId(campaignID), "players.playerID": userID}, {$set: { "players.$.characterID": newCharacterID }});
    
            return this.res.status(200).send({characterInfo: Object.assign(newCharacter, {_id: insertResult.insertedId.toString()})});
        }
        catch (error) {
            return this.res.status(500).send('Creation failed');
        }
    }
}