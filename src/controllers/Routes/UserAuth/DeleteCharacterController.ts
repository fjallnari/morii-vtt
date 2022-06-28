import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import jwt from 'jsonwebtoken';
import { CHARACTER_SKELETON } from "../../../enum/CHARACTER_SKELETON";

export default class DeleteCharacterController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const accessToken = <string> this.req.headers.authorization?.split(' ')[1];
        const { campaignID, characterID } = this.req.body;
    
        try {
            const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
            const userID = new ObjectId(decodedToken.user._id);

            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            const usersCollection = <Collection<Document>> await getCollection('users');
            const charactersCollection = <Collection<Document>> await getCollection('characters');
            
            const characterObjectID = new ObjectId(characterID);
            
            // deletes character link from campaigns' player records
            await campaignsCollection.updateOne({_id: new ObjectId(campaignID), "players.playerID": userID}, {$unset: { "players.$.characterID": ''}});

            // deletes character link from users characters list
            await usersCollection.updateOne({_id: userID}, {$pull: { characters: characterObjectID }});

            // finally deletes the character itself
            await charactersCollection.deleteOne({ _id: characterObjectID });

            return this.res.status(200).end();
        }
        catch (error) {
            return this.res.status(500).send('Creation failed');
        }
    }
}