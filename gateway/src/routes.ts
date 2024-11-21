import express from 'express';
import proxy from 'express-http-proxy';
import { config } from './config/config';

const router = express.Router();

router.use('/auth', proxy(config.authServiceURL));
router.use('/users', proxy(config.userServiceURL));

export default router;
