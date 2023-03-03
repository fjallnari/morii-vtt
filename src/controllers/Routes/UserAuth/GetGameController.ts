import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection, getIdsFromCollection, getUserObj } from "../../../db/Mongo";
import { CAIRN_DATA } from "../../../enum/cairn/CAIRN_DATA";
import { MONSTERS_CAIRN } from "../../../enum/cairn/MONSTERS_CAIRN";
import { MONSTERS } from "../../../enum/srd/MONSTERS";
import Campaign from "../../../interfaces/Campaign";
import Character from "../../../interfaces/Character";
import UserDB from "../../../interfaces/UserDB";
import logger from "../../../logger";
import { getInviteInfo, simplifyPlayerInfo } from "../../../util/helpers";
import RouteController from "../RouteController";

export default class GetGameController extends RouteController {

    private SYSTEM_SPECIFIC_DATA: Record<string, (campaignInfo: Campaign) => Promise<object>> = {
        "D&D 5E": this.get5ESpecificData,
        "Cairn": this.getCairnSpecificData
    }


    private async get5ESpecificData(campaignInfo: Campaign) {
        // get all monsters 
        const monstersObj = await getIdsFromCollection(campaignInfo.monsters, 'monsters');
        const cleanMonsters = monstersObj?.map( monster => Object.assign(monster, { id: monster._id.toString() }));

        return {
            monsters: cleanMonsters ?? [],
            monsters_SRD: MONSTERS.map(monster => { 
                return { 
                    id: monster.id, 
                    name: monster.name, 
                    cr: monster.challenge.split(' (')[0], 
                    type: monster.meta.split(' ')[1].replace(',', '') 
                }
            }), 
            initiative: { 
                topID: '', 
                order: [] 
            }
        }
    }

    private async getCairnSpecificData(campaignInfo: Campaign) {
        const monstersObj = await getIdsFromCollection(campaignInfo.monsters, 'monsters');
        const cleanMonsters = monstersObj?.map( monster => Object.assign(monster, { id: monster._id.toString() }));

        return { 
            cairn: {
                monsters: cleanMonsters ?? [],
                monsters_SRD: MONSTERS_CAIRN.map(monster => { 
                    return { 
                        id: monster.id, 
                        name: monster.name,
                    }
                }),
                ... CAIRN_DATA
            } 
        };
    }
    
    private async getGameData(campaignID: ObjectId, userID: ObjectId) {
        const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
        const invitesCollection = await getCollection('invites');

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
        // needs to have both _id and id (cause svelte-dnd-action does not support custom id properties unless applied globally)
        const cleanNpcs = npcsObj.map(npc => Object.assign(npc, {_id: npc._id.toString(), id: npc._id.toString(), playerID: npc.playerID.toString()}));

        const specificSystemData = this.SYSTEM_SPECIFIC_DATA[campaignInfo.system] ? await this.SYSTEM_SPECIFIC_DATA[campaignInfo.system](campaignInfo) : {};

        return {
            id: campaignInfo._id,
            owner: campaignInfo.owner.toString(),
            name: campaignInfo.name,
            system: campaignInfo.system,
            invite: campaignInfo.invite ? await getInviteInfo(invitesCollection, campaignInfo.invite) : undefined,
            characters: cleanCharacters,
            players: simpleUsers,
            npcs: cleanNpcs,
            ... specificSystemData
        }

    }

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const user = await getUserObj(this.req.user?._id);
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