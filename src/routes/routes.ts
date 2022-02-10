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
                password: hashedPassword
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
                return res.status(403).send('Login failed');
            }
            
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword || ! process.env.JWT_SECRET) {
                return res.status(403).send('Login failed');
            }

            const body = { _id: user._id, username: user.username };
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '2s' });       
    
            return res.status(200).json({ token });

        } catch (error) {
            return res.status(403).send('Login failed');
        }
    }
);

export default router;