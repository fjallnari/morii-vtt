import express from 'express';
import auth from "../middleware/auth";

const router = express.Router();


router.get("/api/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

export default router;