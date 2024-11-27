import { Router } from 'express';
import healthController from '../controller/healthController';

const router = Router();

router.get('/', healthController.health);

export default router;
