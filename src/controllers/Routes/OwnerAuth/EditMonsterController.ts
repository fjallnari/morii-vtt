import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";

export default class EditMonsterController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { campaignID, modifiedMonster } = this.req.body;
    
        try {
            const monstersCollection = <Collection<Document>> await getCollection('monsters');
            const monsterID = new ObjectId(modifiedMonster.id);

            const monsterClean = (({ id, _id, ...other }) => other)(modifiedMonster);
            await monstersCollection.updateOne({ _id: monsterID }, { $set: { ... monsterClean }});

            return this.res.status(200).end();
        }
        catch (error) {
            return this.res.status(500).send('Creation failed');
        }
    }
}