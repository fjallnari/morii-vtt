import express from 'express';
import auth from "../middleware/auth";
import jwt from "jsonwebtoken";

const router = express.Router();


router.get("/api/welcome", auth, (req, res) => {
    const token = <string> req.headers.authorization?.split(' ')[1];
    const decodedToken = <jwt.JwtPayload> jwt.decode(token);
    const username = decodedToken.user.username;

    res.status(200).send({username});
});

export default router;