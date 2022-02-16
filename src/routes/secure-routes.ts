import express from 'express';
import auth from "../middleware/auth";
import jwt from "jsonwebtoken";
import { getCollection } from '../db/Mongo';
import { Collection, Document, ObjectId, WithId } from 'mongodb';
import UserDB from '../interfaces/UserDB';

const router = express.Router();


const getUserFromToken = async (accessToken: string) => {
    const decodedToken = <jwt.JwtPayload> jwt.decode(accessToken);
    const userID = new ObjectId(decodedToken.user._id);

    const usersCollection = <Collection<Document>> await getCollection('users');

    return <WithId<UserDB>> await usersCollection.findOne({ _id: userID});
}


router.get("/api/dashboard", auth, async (req, res) => {
    try {
        const accessToken = <string> req.headers.authorization?.split(' ')[1];
        const user = await getUserFromToken(accessToken);
    
        return res.status(200).send({userInfo: { username: user.username, settings: user.settings }});
    }
    catch (err) {
        return res.status(401).end();
    }

});

export default router;