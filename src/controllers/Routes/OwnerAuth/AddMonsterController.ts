import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import MONSTER_SKELETON from "../../../enum/skeletons/MONSTER_SKELETONS";
import Campaign from "../../../interfaces/Campaign";
import RouteController from "../RouteController";


export default class AddMonsterController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { campaignID, monsterTemplate } = this.req.body;
    
        try {
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            const monstersCollection = <Collection<Document>> await getCollection('monsters');

            const campaignObj = <Campaign> await campaignsCollection.findOne({_id: new ObjectId(campaignID)});

            const monsterObj = Object.assign({... MONSTER_SKELETON[campaignObj.system]}, monsterTemplate);

            const monsterInsertResult = await monstersCollection.insertOne(monsterObj);
            const newMonsterID = monsterInsertResult.insertedId;

            const monsterWithID = Object.assign(monsterObj, { id: newMonsterID.toString(), system: campaignObj.system});

            await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$push: { monsters: newMonsterID }});

            return this.res.status(200).send({monster: monsterWithID});
        }
        catch (error) {
            return this.res.status(500).send('Failed creating new monster');
        }
    }
}