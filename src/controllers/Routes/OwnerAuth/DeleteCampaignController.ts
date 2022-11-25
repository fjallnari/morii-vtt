import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import Campaign from "../../../interfaces/Campaign";
import logger from "../../../logger";
import RouteController from "../RouteController";

export default class DeleteCampaignController extends RouteController {
    
    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { campaignID } = this.req.body;

        logger.info({ campaignID }, `attempting to delete campaign '${campaignID}'`);

        try {
    
            const usersCollection = <Collection<Document>> await getCollection('users');
            const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
            const invitesCollection = <Collection<Document>> await getCollection('invites');
    
            const campaignInfo = <Campaign> await campaignsCollection.findOne({_id: new ObjectId(campaignID)});

            if (! campaignInfo) {
                logger.info({ campaignID, status: 404 }, `failed deleting campaign '${campaignID}'; does not exist`);
                return this.res.status(404).end();
            }
    
            // remove campaign's invite (if there is any) from the "invites collection"
            if (campaignInfo.invite) {
                await invitesCollection.deleteOne({_id: campaignInfo.invite});
            }
    
            const allUsersInCampaign = campaignInfo.players.concat([{playerID: campaignInfo.owner}]);
    
            // remove the campaign from all players documents; not the best design in terms of efficiency rn!
            for (const userID of allUsersInCampaign) {
                usersCollection.updateOne({_id: userID}, { $pull: { campaigns: campaignInfo._id }});
            }
    
            // remove campaign from the campaigns coll
            await campaignsCollection.deleteOne({ _id: campaignInfo._id });

            logger.info({ campaignID, status: 404 }, `deleted campaign '${campaignID}' succesfully`);    
            return this.res.status(200).send();
        }
        catch (error) {
            logger.warn({ campaignID, error, status: 401 }, `failed deleting campaign '${campaignID}'; fallback`);
            return this.res.status(401).end();
        }
    }
}