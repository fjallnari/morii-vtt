import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { Collection, Document } from 'mongodb';
import { getCollection } from '../db/Mongo';
import jwt from 'jsonwebtoken';

const router = express.Router();


router.post(
    '/api/auth/signup',
    async (req, res, next) => {
        const { username, password } = req.body;
        
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const usersCollection = <Collection<Document>> await getCollection('users');
            var user = await usersCollection.insertOne({
                username: username,
                password: hashedPassword,
                refresh_token: ""
            });
        }
        catch (err) {
            return res.status(409).send("User already exists. Please login.");
        }

        return res.status(201).json({
            message: 'Signup successful', 
            user: user
        });
    }
);

router.post(
    '/api/auth/signin',
    async (req, res, next) => {
        const { username, password } = req.body;

        try {
            const usersCollection = <Collection<Document>> await getCollection('users');
            const user = await usersCollection.findOne({username: username});

            if (!user) {
                return res.status(403).send('Login failed.');
            }
            
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (! isValidPassword || ! process.env.JWT_SECRET || ! process.env.JWT_REFRESH_SECRET) {
                return res.status(403).send('Login failed.');
            }

            // jwt refresh token
            const body = { _id: user._id, username: user.username };
            const refreshToken = jwt.sign({ user: body }, process.env.JWT_REFRESH_SECRET, { expiresIn: '2y' });
            const accessToken = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '600s' });

            res.setHeader('Set-Cookie', `_refresh_token=${refreshToken}; HttpOnly; SameSite=Lax; max-age=63072000;`);
            
            // add new refresh token to the db
            await usersCollection.updateOne({_id: user._id}, {$set: {refresh_token: refreshToken}});
            

            return res.status(200).json({ accessToken });

        } catch (error) {
            return res.status(403).send('Login failed.');
        }
    }
);


router.post(
    '/api/auth/refresh-token',

    async (req, res, next) => {

        try {
            const refreshToken = req.cookies._refresh_token;
            if (!refreshToken) {
                return;
            }
            
            const usersCollection = <Collection<Document>> await getCollection('users');
            const user = await usersCollection.findOne({refresh_token: refreshToken});

            if (! user || ! process.env.JWT_SECRET || ! process.env.JWT_REFRESH_SECRET) {
                return res.status(401).send('Invalid token.');
            }

            // actually check if the token is still valid
            try {
                req.user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
              } catch (err) {
                return res.status(401).send("Invalid Token");
            }

            // jwt, create new access token and new refreshToken to rotate into the db
            const body = { _id: user._id, username: user.username };
            const newRefreshToken = jwt.sign({ user: body }, process.env.JWT_REFRESH_SECRET, { expiresIn: '2y' });
            const accessToken = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '600s' });

            res.setHeader('Set-Cookie', `_refresh_token=${newRefreshToken}; HttpOnly; SameSite=Lax; max-age=63072000;`);
            
            // add new refresh token to the db
            await usersCollection.updateOne({_id: user._id}, {$set: {refresh_token: newRefreshToken}});

            return res.status(200).json({ accessToken });

        } catch (error) {
            return res.status(403).send('Login failed');
        }
    }
)

export default router;