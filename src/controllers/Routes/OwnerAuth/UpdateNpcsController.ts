import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import CharacterGeneric from "../../../interfaces/CharacterGeneric";
import { MonsterData } from "../../../interfaces/srd/MonsterData";
import RouteController from "../RouteController";

export default class UpdateNpcsController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { campaignID, updatedNpcs } = this.req.body;
    
        try {
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');

            const updatedNpcsIDs = updatedNpcs.map((npc: CharacterGeneric) => new ObjectId(npc._id));

            await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$set: { npcs: updatedNpcsIDs }});

            return this.res.status(200).end();
        }
        catch (error) {
            return this.res.status(500).send(error);
        }
    }
}