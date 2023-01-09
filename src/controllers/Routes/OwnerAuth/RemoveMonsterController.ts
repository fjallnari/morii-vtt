import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import { MONSTER_BLANK } from "../../../enum/MONSTER_BLANK";
import RouteController from "../RouteController";


export default class RemoveMonsterController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { campaignID, monsterID } = this.req.body;
    
        try {
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            const monstersCollection = <Collection<Document>> await getCollection('monsters');

            const monsterObjectID = new ObjectId(monsterID);

            await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$pull: { monsters: monsterObjectID}});
            await monstersCollection.deleteOne({_id: monsterObjectID});

            return this.res.status(200).end();
        }
        catch (error) {
            return this.res.status(500).send('Failed deleting custom monster');
        }
    }
}