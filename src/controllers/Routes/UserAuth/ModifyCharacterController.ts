import { Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../../../db/Mongo";
import RouteController from "../RouteController";

export default class ModifyCharacterController extends RouteController {

    public async handleRequest(): Promise<void | Response<any, Record<string, any>>> {
        const { modifiedCharacter } = this.req.body;
    
        try {
            const charactersCollection = <Collection<Document>> await getCollection('characters');
            const characterID = new ObjectId(modifiedCharacter._id);

            const characterWithoutID = (({ _id, ...other }) => other)(modifiedCharacter);
            const characterObj = Object.assign(characterWithoutID, {playerID: new ObjectId(characterWithoutID.playerID)});
            await charactersCollection.updateOne({ _id: characterID }, { $set: { ...characterObj }});
    
            return this.res.status(200).end();
        }
        catch (error) {
            return this.res.status(500).send('Creation failed');
        }
    }
}