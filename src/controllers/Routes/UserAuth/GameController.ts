import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection, getIdsFromCollection } from "../../../db/Mongo";
import Campaign from "../../../interfaces/Campaign";
import { getFullCampaignsInfo, getUserFromToken, simplifyPlayerInfo } from "../../../util/helpers";
import RouteController from "../RouteController";

export default class GameController extends RouteController {

    private async getGameData(campaignID: ObjectId, userID: ObjectId) {
        const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
        const campaignInfo = <Campaign> await campaignsCollection?.findOne({ _id: campaignID });

        const playerObj = campaignInfo.players.find( playerObj => playerObj.playerID === userID);
        const characterID = playerObj?.characterID;

        return {
            id: campaignInfo._id,
            name: campaignInfo.name,
            system: campaignInfo.system,
            // TODO
            characterInfo: characterID
        }

    }

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        try {
            const accessToken = <string> this.req.headers.authorization?.split(' ')[1];
            const user = await getUserFromToken(accessToken);
            
            if (! user.campaigns.find( campaign => campaign.toString() === this.req.params.id)) {
                return this.res.status(404).end();
            }

            const campaignID = new ObjectId(this.req.params.id);
            const gameData = await this.getGameData(campaignID, user._id);
    
            return this.res.status(200).send({ userInfo: {...simplifyPlayerInfo(user), gameData }});
        }
        catch (err) {
            return this.res.status(401).end();
        }
    }
}