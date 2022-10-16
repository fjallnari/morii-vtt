import express from 'express';
import verifyToken from "../middleware/auth";
import DashboardController from '../controllers/Routes/UserAuth/DashboardController';
import GameController from '../controllers/Routes/UserAuth/GameController';
import CreateCampaignController from '../controllers/Routes/UserAuth/CreateCampaignController';
import JoinCampaignController from '../controllers/Routes/UserAuth/JoinCampaignController';
import LeaveCampaignController from '../controllers/Routes/UserAuth/LeaveCampaignController';
import CreateCharacterController from '../controllers/Routes/UserAuth/CreateCharacterController';
import ModifyCharacterController from '../controllers/Routes/UserAuth/ModifyCharacterController';
import DeleteCharacterController from '../controllers/Routes/UserAuth/DeleteCharacterController';
import ChangeUserSettingsController from '../controllers/Routes/UserAuth/ChangeUserSettingsController';
import GetCharactersController from '../controllers/Routes/UserAuth/GetCharactersController';
import GetQuickCreateDataController from '../controllers/Routes/UserAuth/GetQuickCreateDataController';
import GetInviteController from '../controllers/Routes/UserAuth/GetInviteController';

const router = express.Router();


router.get("/api/dashboard", verifyToken, async (req, res) => {
    await new DashboardController(req, res).handleRequest();
});

router.get("/api/game/:id", verifyToken, async (req, res) => {
    await new GameController(req, res).handleRequest();
});

router.get('/api/characters', verifyToken, async (req, res, next) => {
    await new GetCharactersController(req, res).handleRequest();
});

router.get('/api/quick-create-data', verifyToken, async (req, res, next) => {
    await new GetQuickCreateDataController(req, res).handleRequest();
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

router.post('/api/create-character', verifyToken, async (req, res, next) => {
    await new CreateCharacterController(req, res).handleRequest();
});

router.post('/api/modify-character', verifyToken, async (req, res, next) => {
    await new ModifyCharacterController(req, res).handleRequest();
});

router.post('/api/delete-character', verifyToken, async (req, res, next) => {
    await new DeleteCharacterController(req, res).handleRequest();
});

router.post('/api/change-user-settings', verifyToken, async (req, res, next) => {
    await new ChangeUserSettingsController(req, res).handleRequest();
});

router.get("/api/invite-info/:inviteCode", verifyToken, async (req, res) => {
    await new GetInviteController(req, res).handleRequest();
});

export default router;