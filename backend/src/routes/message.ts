import { Router } from 'express';
import { messageController } from '../controllers/messageController';

const router = Router();

router.get('/latest-pending', messageController.getLatestPending);
router.put('/:id/status', messageController.updateMessageStatus);

export default router;