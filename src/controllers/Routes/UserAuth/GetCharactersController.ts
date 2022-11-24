import { Response } from "express";
import { getCollection, getIdsFromCollection, getUserObj } from "../../../db/Mongo";
import RouteController from "../RouteController";
import Character from "../../../interfaces/Character";
import logger from "../../../logger";

export default class GetCharactersController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const user = await getUserObj(this.req.user?._id);

        logger.info({ userID: user._id }, `attempting to get characters for user '${user._id}'`);

        try {
            const charactersObjs = <Character[]> await getIdsFromCollection(user.characters, 'characters');

            // stringifies objectIDs
            const cleanCharacters = charactersObjs.map(character => Object.assign(character, {_id: character._id.toString(), playerID: character.playerID.toString()}));

            logger.info({ userID: user._id, status: 200 }, `succesfully sent ${cleanCharacters.length} characters to user '${user._id}'`);
            return this.res.status(200).send({ characters: cleanCharacters });
        }
        catch (error) {
            logger.info({ error, userID: user._id, status: 500 }, `failed to get characters for user '${user._id}'`);
            return this.res.status(500).end();
        }
    }
}