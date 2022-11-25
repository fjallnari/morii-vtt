import { Response } from "express";
import { SPELLS } from "../../../enum/srd/SPELLS";
import logger from "../../../logger";
import RouteController from "../RouteController";

export default class GetSpells extends RouteController {
    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        try {
            return this.res.status(200).send({ 
                spells: SPELLS, 
            });
        }
        catch (error) {
            logger.error({ error, status: 500 }, `failed getting spells data`);
            return this.res.status(500).end();
        }
    }
}