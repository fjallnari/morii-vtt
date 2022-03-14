import { Response } from "express";
import { ObjectId } from "mongodb";
import { getFullCampaignsInfo, getUserFromToken } from "../../../util/helpers";
import RouteController from "../RouteController";

export default class GameController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        try {
            const accessToken = <string> this.req.headers.authorization?.split(' ')[1];
            const user = await getUserFromToken(accessToken);
            
            if (! user.campaigns.find( campaign => campaign.toString() === this.req.params.id)) {
                return this.res.status(404).end();
            }
    
            // we only really need one campaign's info for any given started game
            const campaignID = new ObjectId(this.req.params.id);
            const campaignInfo = await getFullCampaignsInfo([campaignID]);
    
            return this.res.status(200).send({userInfo: {_id: user._id.toString(), username: user.username, settings: user.settings , campaigns: campaignInfo}});
        }
        catch (err) {
            return this.res.status(401).end();
        }
    }
}