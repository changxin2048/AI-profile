import { Router } from 'express';
import { handleChat } from '../controllers/chatController';

const router = Router();

router.post('/', handleChat);

export default router;
