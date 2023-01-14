import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import logger from "../../../logger";
import Campaign from "../../../interfaces/Campaign";
import CHARACTER_SKELETONS from "../../../enum/skeletons/CHARACTER_SKELETONS";


export default class CreateCharacterController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { campaignID, characterTemplate } = this.req.body;
        const userID = this.req.user?._id;

        const childLogger = logger.child({ userID, campaignID });
        childLogger.info( `user '${userID}' attempting to create new character`);
    
        try {
    
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            const usersCollection = <Collection<Document>> await getCollection('users');
            const charactersCollection = <Collection<Document>> await getCollection('characters');

            const campaignObjectID = new ObjectId(campaignID);
            const campaignObj = await campaignsCollection.findOne({_id: campaignObjectID}) as Campaign;

            const newCharacterObj = Object.assign({}, { 
                _id: new ObjectId(), 
                playerID: userID,
                system: campaignObj.system,
                ... CHARACTER_SKELETONS[campaignObj.system] ?? {},
                ... characterTemplate 
            });

            const insertResult = await charactersCollection.insertOne(newCharacterObj);
            const newCharacterID = insertResult.insertedId;
            
            await usersCollection.updateOne({_id: userID}, {$push: { characters: newCharacterID }});
            await campaignsCollection.updateOne({_id: campaignObjectID, "players.playerID": userID}, {$set: { "players.$.characterID": newCharacterID }});
            
            childLogger.info({ characterID: newCharacterID, status: 200  }, `user '${userID}' created new character successfully`);
            // sends newly created blank character object
            return this.res.status(200).send({characterInfo: Object.assign(newCharacterObj, {_id: insertResult.insertedId.toString(), playerID: userID?.toString()})});
        }
        catch (error) {
            childLogger.warn({ campaignID, error, status: 500 }, `user '${userID}' failed creating new character`);
            childLogger.trace({ characterTemplate }, `character template for the failed creation`);
            return this.res.status(500).send('Creation failed');
        }
    }
}