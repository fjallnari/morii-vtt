import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import Campaign from "../../../interfaces/Campaign";
import RouteController from "../RouteController";

export default class DeleteCampaignController extends RouteController {
    
    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        try {
            // TODO: verify if the owner of campaign is the one actually making the request
            const { campaignID } = this.req.body;
    
            const usersCollection = <Collection<Document>> await getCollection('users');
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            const invitesCollection = <Collection<Document>> await getCollection('invites');
    
            const campaignInfo = <Campaign> await campaignsCollection.findOne({_id: new ObjectId(campaignID)});
            if (! campaignInfo) {
                return this.res.status(404).end();
            }
    
            // remove campaign's invite (if there is any) from the "invites collection"
            if (campaignInfo.invite) {
                await invitesCollection.deleteOne({_id: campaignInfo.invite});
            }
    
            const allUsersInCampaign = campaignInfo.players.concat([campaignInfo.owner]);
    
            // remove the campaign from all players documents; not the best design in terms of efficiency rn!
            for (const userID of allUsersInCampaign) {
                usersCollection.updateOne({_id: userID}, { $pull: { campaigns: campaignInfo._id } });
            }
    
            // remove campaign from the campaigns coll
            await campaignsCollection.deleteOne({_id: campaignInfo._id });
    
            return this.res.status(200).send();
        }
        catch (err) {
            console.log(err);
            return this.res.status(401).end();
        }
    }
}