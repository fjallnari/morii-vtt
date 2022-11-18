import { Response } from "express";
import logger from "../../../logger";
import { getFullCampaignsInfo, getUserFromToken } from "../../../util/helpers";
import RouteController from "../RouteController";

export default class DashboardController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const accessToken = <string> this.req.headers.authorization?.split(' ')[1];
        const user = await getUserFromToken(accessToken);

        logger.info({ userID: user._id }, `user '${user._id}' attempting to get dashboard`);

        try {
            const campaignsInfo = await getFullCampaignsInfo(user.campaigns);

            logger.info({ userID: user._id, status: 200 }, `user '${user._id}' get dashboard success`);
            return this.res.status(200).send({
                userInfo: { 
                    _id: user._id.toString(), 
                    username: user.username, 
                    settings: user.settings, 
                    campaigns: campaignsInfo 
                }
            });
        }
        catch (error) {
            logger.info({ error, userID: user._id, status: 401 }, `user '${user._id}' failed to get dashboard`);
            return this.res.status(401).end();
        }        
    }
}