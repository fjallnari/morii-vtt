import { Request, Response } from "express";

export default class RouteController {
    public req: Request;
    public res: Response;


    constructor (req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    public async handleRequest (): Promise<Response | void>  {
        return this.res.status(200).end();
    }
}