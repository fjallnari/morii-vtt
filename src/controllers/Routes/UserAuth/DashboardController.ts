import { Response } from "express";
import { getFullCampaignsInfo, getUserFromToken } from "../../../util/helpers";
import RouteController from "../RouteController";

export default class DashboardController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        try {
            const accessToken = <string> this.req.headers.authorization?.split(' ')[1];
            const user = await getUserFromToken(accessToken);
            const campaignsInfo = await getFullCampaignsInfo(user.campaigns);
    
            return this.res.status(200).send({
                userInfo: { 
                    _id: user._id.toString(), 
                    username: user.username, 
                    settings: user.settings, 
                    campaigns: campaignsInfo 
                }
            });
        }
        catch (err) {
            return this.res.status(401).end();
        }        
    }
}