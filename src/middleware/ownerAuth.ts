import { NextFunction, Request, Response } from "express";
import { Collection, Document, ObjectId } from "mongodb";
import { getCollection } from "../db/Mongo";
import Campaign from "../interfaces/Campaign";
import logger from "../logger";

const verifyOwner = async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.user?._id;
    const { campaignID } = req.body;

    try {
        const campaignsCollection = <Collection<Document>> await getCollection('campaigns');
        const campaignObj = <Campaign> await campaignsCollection.findOne({_id: new ObjectId(campaignID)});

        if (userID?.toString() !== campaignObj.owner.toString()) {
            logger.warn({ req, userID, status: 401 }, `User '${userID}' attempted owner action`);
            return res.status(401).send("Owner access is needed for this action.");
        }

    } catch (err) {
        return res.status(401).send("Owner access is needed for this action.");
    }
    return next();
  };
  
export default verifyOwner;