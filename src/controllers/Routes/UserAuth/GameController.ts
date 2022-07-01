import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection, getIdsFromCollection } from "../../../db/Mongo";
import Campaign from "../../../interfaces/Campaign";
import Character from "../../../interfaces/Character";
import UserDB from "../../../interfaces/UserDB";
import { getFullCampaignsInfo, getUserFromToken, simplifyPlayerInfo } from "../../../util/helpers";
import { zip } from "../../../util/util";
import RouteController from "../RouteController";

export default class GameController extends RouteController {

    private async getGameData(campaignID: ObjectId, userID: ObjectId) {
        const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
        const charactersCollection = <Collection<Document>> await getCollection('characters');
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