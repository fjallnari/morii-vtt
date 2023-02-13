import { Response } from "express";
import { MONSTERS_CAIRN } from "../../../enum/cairn/MONSTERS_CAIRN";
import { MONSTERS } from "../../../enum/srd/MONSTERS";
import { MonsterData } from "../../../interfaces/srd/MonsterData";
import logger from "../../../logger";
import RouteController from "../RouteController";

export default class GetMonster extends RouteController {
    private monsters: Record<string, Partial<MonsterData>[]> = {
        '5e': MONSTERS,
        'cairn': MONSTERS_CAIRN
    }

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {

        try {
            if (this.req.params.system && this.req.params.id) {
                return this.res.status(200).send(this.monsters[this.req.params.system].find(monster => monster.id === this.req.params.id));
            }

            return this.res.status(400).end();
        }
        catch (error) {
            logger.error({ error, status: 500 }, `failed getting monsters data`);
            return this.res.status(500).end();
        }
    }
}