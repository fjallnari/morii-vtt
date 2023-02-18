import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import { MonsterData } from "../../../interfaces/srd/MonsterData";
import RouteController from "../RouteController";

export default class UpdateMonstersController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { campaignID, updatedMonsters } = this.req.body;
    
        try {
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');

            const updatedMonstersIDs = updatedMonsters.map((monster: Partial<MonsterData>) => new ObjectId(monster.id));

            await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$set: { monsters: updatedMonstersIDs }});

            return this.res.status(200).end();
        }
        catch (error) {
            return this.res.status(500).send(error);
        }
    }
}