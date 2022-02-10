import express from 'express';
import auth from "../middleware/auth";

const router = express.Router();


router.get("/api/welcome", auth, (req, res) => {
    console.log("Im doing something.");
    res.status(200).send("Welcome 🙌 ");
});

export default router;