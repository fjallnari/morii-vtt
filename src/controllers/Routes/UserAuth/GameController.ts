import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection, getIdsFromCollection } from "../../../db/Mongo";
import Campaign from "../../../interfaces/Campaign";
import Character from "../../../interfaces/Character";
import UserDB from "../../../interfaces/UserDB";
import logger from "../../../logger";
import { getFullCampaignsInfo, getUserFromToken, simplifyPlayerInfo } from "../../../util/helpers";
import RouteController from "../RouteController";

export default class GameController extends RouteController {

    private async getGameData(campaignID: ObjectId, userID: ObjectId) {
        const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
        const campaignInfo = <Campaign> await campaignsCollection?.findOne({ _id: campaignID });

        // get all character ids, if they exist (filters out all undefineds)
        const characterIds = campaignInfo.players.map( playerObj => playerObj.characterID).filter((character): character is ObjectId => !!character);
        const charactersObjs = <Character[]> await getIdsFromCollection(characterIds, 'characters');

        // stringifies objectIDs
        const cleanCharacters = charactersObjs.map(character => Object.assign(character, {_id: character._id.toString(), playerID: character.playerID.toString()}));

        // get all players' info; then simplify it to pairs of id and username
        const usersObjs = <UserDB[]> await getIdsFromCollection(campaignInfo.players.map( playerObj => playerObj.playerID), 'users');
        const simpleUsers = usersObjs.map(user => { return { _id: user._id.toString(), username: user.username, settings: user.settings }});

        // get all npcs
        const npcsObj = <Character[]> await getIdsFromCollection(campaignInfo.npcs, 'characters');
        const cleanNpcs = npcsObj.map(npc => Object.assign(npc, {_id: npc._id.toString(), playerID: npc.playerID.toString()}));

        return {
            id: campaignInfo._id,
            owner: campaignInfo.owner.toString(),
            name: campaignInfo.name,
            system: campaignInfo.system,
            characters: cleanCharacters,
            players: simpleUsers,
            npcs: cleanNpcs
        }

    }

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const accessToken = <string> this.req.headers.authorization?.split(' ')[1];
        const user = await getUserFromToken(accessToken);
        const campaignIDString = this.req.params.id;

        logger.info({ userID: user._id, campaignID: campaignIDString}, `attempting to get game data for campaign '${campaignIDString}'`);
        try {
            if (! user.campaigns.find( campaign => campaign.toString() === campaignIDString)) {
                logger.info({ userID: user._id, campaignID: campaignIDString, status: 404 }, `failed getting game data; campaign was not found`); 
                return this.res.status(404).end();
            }

            const campaignID = new ObjectId(campaignIDString);
            const gameData = await this.getGameData(campaignID, user._id);

            logger.info({ userID: user._id, campaignID: campaignIDString, status: 200 }, `succesfully sent game data for campaign '${campaignIDString}'`);    
            return this.res.status(200).send({ userInfo: {...simplifyPlayerInfo(user), gameData }});
        }
        catch (err) {
            logger.info({ userID: user._id, campaignID: campaignIDString, status: 401 }, `failed getting game data for campaign '${campaignIDString}'`); 
            return this.res.status(401).end();
        }
    }
}