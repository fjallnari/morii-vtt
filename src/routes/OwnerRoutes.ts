import express from 'express';
import verifyToken from "../middleware/auth";
import KickPlayerController from '../controllers/Routes/OwnerAuth/KickPlayerController';
import CreateInviteCodeController from '../controllers/Routes/OwnerAuth/CreateInviteController';
import RemoveInviteCodeController from '../controllers/Routes/OwnerAuth/RemoveInviteController';
import DeleteCampaignController from '../controllers/Routes/OwnerAuth/DeleteCampaignController';
import CreateNPCController from '../controllers/Routes/OwnerAuth/CreateNPCController';
import verifyOwner from '../middleware/ownerAuth';

const router = express.Router();

router.post("/api/kick-player", verifyToken, verifyOwner, async (req, res) => {
    await new KickPlayerController(req, res).handleRequest();
});

router.post("/api/create-invite-code", verifyToken, verifyOwner, async (req, res) => {
    await new CreateInviteCodeController(req, res).handleRequest();
});

router.post("/api/remove-invite-code", verifyToken, verifyOwner, async (req, res) => {
    await new RemoveInviteCodeController(req, res).handleRequest();
});

router.post("/api/delete-campaign", verifyToken, verifyOwner, async (req, res) => {
    await new DeleteCampaignController(req, res).handleRequest();
});

router.post('/api/create-npc', verifyToken, verifyOwner, async (req, res, next) => {
    await new CreateNPCController(req, res).handleRequest();
});

export default router;