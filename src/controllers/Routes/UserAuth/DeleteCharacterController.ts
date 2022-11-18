import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import jwt from 'jsonwebtoken';
import logger from "../../../logger";

export default class DeleteCharacterController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { campaignID, characterID, playerID, removerID, isNPC = false } = this.req.body;

        const childLogger = logger.child({
            removerID: removerID, 
            playerID: playerID, 
            characterID, 
            campaignID
        });
    
        try {
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            const usersCollection = <Collection<Document>> await getCollection('users');
            const charactersCollection = <Collection<Document>> await getCollection('characters');
            
            const characterObjectID = new ObjectId(characterID);
            const playerObjectID = new ObjectId(playerID);

            childLogger.info(`user '${removerID}' attempting to delete ${isNPC ? 'npc': 'character'}`);

            if (isNPC){
                // delete character link from campaigns' npcs array
                await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$pull: { npcs: characterObjectID }});
            }
            else {
                // delete character link from campaigns' player records
                await campaignsCollection.updateOne({_id: new ObjectId(campaignID), "players.playerID": playerObjectID}, {$unset: { "players.$.characterID": ''}});
            }

            // delete character link from users characters list
            await usersCollection.updateOne({_id: playerObjectID}, {$pull: { characters: characterObjectID }});

            // finally delete the character itself
            await charactersCollection.deleteOne({ _id: characterObjectID });

            childLogger.info({ status: 200 }, 
                `user '${removerID}' deleted ${isNPC ? 'npc': 'character'} successfully`
            );

            return this.res.status(200).end();
        }
        catch (error) {
            childLogger.warn({ status: 500 }, 
                `user '${removerID}' failed deleting ${isNPC ? 'npc': 'character'}`
            );
            return this.res.status(500).send('Creation failed');
        }
    }
}