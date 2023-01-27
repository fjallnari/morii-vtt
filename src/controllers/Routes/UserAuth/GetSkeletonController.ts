import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import CHARACTER_SKELETONS from "../../../enum/skeletons/CHARACTER_SKELETONS";
import Campaign from "../../../interfaces/Campaign";
import RouteController from "../RouteController";

export default class GetSkelletonController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const campaignIDString = this.req.params.id;

        try {
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            const campaignID = new ObjectId(campaignIDString);
            const campaignObj = await campaignsCollection.findOne({_id: campaignID}) as Campaign;

            return this.res.status(200).send({ characterSkeleton: CHARACTER_SKELETONS[campaignObj.system] ?? {}});
        }
        catch (err) {
            return this.res.status(401).end();
        }
    }
}