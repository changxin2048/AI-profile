import { Router } from 'express';
import { resultController } from '../controllers/resultController';

const router = Router();

// 接收外部请求的结果
router.post('/result', resultController.receiveResult);

export default router; 