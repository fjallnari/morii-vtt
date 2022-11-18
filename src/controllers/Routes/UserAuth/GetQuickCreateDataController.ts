import { Response } from "express";
import RouteController from "../RouteController";
import { RACES } from "../../../enum/srd/RACES";
import { CHARACTER_SKELETON } from "../../../enum/CHARACTER_SKELETON";
import { CLASSES } from "../../../enum/srd/CLASSES";
import { SPELLS } from "../../../enum/srd/SPELLS";
import { QC_AS_BLANK } from "../../../enum/QC_AS_BLANK";
import { ASI } from "../../../enum/srd/ASI";
import { QC_BIO_BLANK } from "../../../enum/QC_BIO_BLANK";
import { WEAPON_STATS } from "../../../enum/srd/WEAPON_STATS";
import logger from "../../../logger";

export default class GetQuickCreateDataController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        try {
            logger.info({ status: 200 }, `attempting to get q-create data`);
            
            return this.res.status(200).send({ 
                characterSkeleton: CHARACTER_SKELETON, 
                races: RACES, 
                classes: CLASSES, 
                spells: SPELLS, 
                asBlank: QC_AS_BLANK, 
                asGenInfo: { 
                    baseArray: [], 
                    customAssignPrio: [
                        { id: 1, name: "STR" },
                        { id: 2, name: "DEX" },
                        { id: 3, name: "CON" },
                        { id: 4, name: "INT" },
                        { id: 5, name: "WIS" },
                        { id: 6, name: "CHA" },
                    ], 
                    customField: '',
                    asiInfo: ASI,
                    feats: []
                },
                bio: QC_BIO_BLANK,
                weapons: WEAPON_STATS
            });
        }
        catch (error) {
            logger.error({ error, status: 500 }, `failed getting q-create data`);
            return this.res.status(500).end();
        }
    }
}