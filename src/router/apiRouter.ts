import { Router } from 'express';
import healthController from '../controller/healthController';

const router = Router();

router.get('/health', healthController.health);

export default router;

