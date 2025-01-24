import express from 'express';
import chatRouter from './chat';
import resultRouter from './result';
import messageRouter from './message';
import { triggerJenkinsBuild } from '../controllers/jenkinsController';

const router = express.Router();

router.use('/chat', chatRouter);
router.use('/messages', messageRouter);
router.use('/', resultRouter);
router.post('/jenkins/build', triggerJenkinsBuild);

export default router; 