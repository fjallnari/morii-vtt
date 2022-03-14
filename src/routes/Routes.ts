import express from 'express';
import SignUpController from '../controllers/Routes/NoAuth/SignUpController';
import SignInController from '../controllers/Routes/NoAuth/SignInController';
import SignOutController from '../controllers/Routes/NoAuth/SignOutController';
import RefreshTokenController from '../controllers/Routes/NoAuth/RefreshTokenController';

const router = express.Router();

router.post('/api/auth/signup', async (req, res, next) => {
    await new SignUpController(req, res).handleRequest();
});

router.post('/api/auth/signin', async (req, res, next) => {
    await new SignInController(req, res).handleRequest();
});

router.post('/api/auth/refresh-token', async (req, res, next) => {
    await new RefreshTokenController(req, res).handleRequest();
});

router.post('/api/auth/signout', async (req, res, next) => {
    await new SignOutController(req, res).handleRequest();
});

export default router;