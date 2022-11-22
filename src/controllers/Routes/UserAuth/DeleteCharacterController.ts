import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";
import logger from "../../../logger";
import Campaign from "../../../interfaces/Campaign";

export default class DeleteCharacterController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { campaignID, characterID, playerID, isNPC = false } = this.req.body;
        const userID = this.req.user?._id;

        const childLogger = logger.child({
            userID: userID, // the user who is attempting to delete the character
            playerID: playerID, // owner of the character
            characterID, 
            campaignID
        });

        childLogger.info(`user '${userID}' attempting to delete ${isNPC ? 'npc': 'character'}`);
    
        try {
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            const usersCollection = <Collection<Document>> await getCollection('users');
            const charactersCollection = <Collection<Document>> await getCollection('characters');
            
            const characterObjectID = new ObjectId(characterID);
            const playerObjectID = new ObjectId(playerID);
            const campaignObjectID = new ObjectId(campaignID);

            const campaignObj = <Campaign> await campaignsCollection.findOne({_id: campaignObjectID});

            // check if the user eithers is the GM or owns the character
            if (!(userID?.toString() !== campaignObj.owner.toString()
              || !campaignObj.players.some(player => player.playerID.toString() === userID.toString() && player.characterID === characterID))) {
                logger.warn({ userID, characterID, campaignID, status: 401 }, `user '${userID}' without access rights tried to delete character '${characterID}'`);
                return this.res.status(401).send('Invalid access rights.');
            }

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
                `user '${userID}' deleted ${isNPC ? 'npc': 'character'} successfully`
            );

            return this.res.status(200).end();
        }
        catch (error) {
            childLogger.warn({ status: 500 }, 
                `user '${userID}' failed deleting ${isNPC ? 'npc': 'character'}`
            );
            return this.res.status(500).send('Creation failed');
        }
    }
}