import { Response } from "express";
import RouteController from "../RouteController";
import { RACES } from "../../../enum/ogl/RACES";
import { CHARACTER_SKELETON } from "../../../enum/CHARACTER_SKELETON";

export default class GetQuickCreateDataController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        try {
            return this.res.status(200).send({ characterSkeleton: CHARACTER_SKELETON, races: RACES });
        }
        catch (error) {
            return this.res.status(500).end();
        }
    }
}