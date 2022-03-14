import express from 'express';
import verifyToken from "../middleware/auth";
import DashboardController from '../controllers/Routes/UserAuth/DashboardController';
import GameController from '../controllers/Routes/UserAuth/GameController';
import CreateCampaignController from '../controllers/Routes/UserAuth/CreateCampaignController';
import JoinCampaignController from '../controllers/Routes/UserAuth/JoinCampaignController';
import LeaveCampaignController from '../controllers/Routes/UserAuth/LeaveCampaignController';

const router = express.Router();


router.get("/api/dashboard", verifyToken, async (req, res) => {
    await new DashboardController(req, res).handleRequest();
});

router.get("/api/game/:id", verifyToken, async (req, res) => {
    await new GameController(req, res).handleRequest();
});

router.post('/api/create-campaign', verifyToken, async (req, res, next) => {
    await new CreateCampaignController(req, res).handleRequest();
});

router.post('/api/join-campaign', verifyToken, async (req, res, next) => {
    await new JoinCampaignController(req, res).handleRequest();
});

router.post("/api/leave-campaign", verifyToken, async (req, res) => {
    await new LeaveCampaignController(req, res).handleRequest();
});

export default router;