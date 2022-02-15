import express from 'express';
import auth from "../middleware/auth";
import jwt from "jsonwebtoken";
import { getCollection } from '../db/Mongo';
import { Collection, Document, WithId } from 'mongodb';
import UserDB from '../interfaces/UserDB';

const router = express.Router();


router.get("/api/dashboard", auth, async (req, res) => {
    try {
        const token = <string> req.headers.authorization?.split(' ')[1];
        const decodedToken = <jwt.JwtPayload> jwt.decode(token);
        const username = decodedToken.user.username;
    
        const usersCollection = <Collection<Document>> await getCollection('users');
        const user = <WithId<UserDB>> await usersCollection.findOne({username: username});
    
        return res.status(200).send({userInfo: { username: user.username, settings: user.settings }});
    }
    catch (err) {
        console.log(err);
        return res.status(401).send('');
    }

});

export default router;