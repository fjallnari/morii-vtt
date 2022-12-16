import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";


export default class FavoriteMonsterController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { campaignID, monster, isFavorite } = this.req.body;
    
        try {
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');

            if (isFavorite) {
                await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$push: { monsters: monster }});
            }
            else {
                await campaignsCollection.updateOne({_id: new ObjectId(campaignID)}, {$pull: { monsters: { id: monster.id }}});
            }

            return this.res.status(200).end();
        }
        catch (error) {
            return this.res.status(500).send('Changing monster status failed');
        }
    }
}