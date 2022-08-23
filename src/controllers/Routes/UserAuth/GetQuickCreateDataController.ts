import { Response } from "express";
import RouteController from "../RouteController";
import { RACES } from "../../../enum/srd/RACES";
import { CHARACTER_SKELETON } from "../../../enum/CHARACTER_SKELETON";
import { CLASSES } from "../../../enum/srd/CLASSES";
import { SPELLS } from "../../../enum/srd/SPELLS";
import { QC_AS_BLANK } from "../../../enum/QC_AS_BLANK";

export default class GetQuickCreateDataController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        try {
            return this.res.status(200).send({ characterSkeleton: CHARACTER_SKELETON, races: RACES, classes: CLASSES, spells: SPELLS, as_blank: QC_AS_BLANK });
        }
        catch (error) {
            return this.res.status(500).end();
        }
    }
}