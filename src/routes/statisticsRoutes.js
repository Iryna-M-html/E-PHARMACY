import { Router } from 'express';
import { getStoreStatistics } from '../controllers/statisticsController.js';
import { authenticate } from '../middleware/authenticate.js';

// import { requireAdmin } from '../middlewares/requireAdmin.js';

const router = Router();

router.get('/statistics', authenticate, getStoreStatistics);

export default router;
