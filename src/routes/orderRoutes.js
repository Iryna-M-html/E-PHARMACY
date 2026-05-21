import { Router } from 'express';
import { celebrate } from 'celebrate';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { createOrderSchema } from '../validations/ordersValidation.js';
import { createOrder } from '../controllers/orderController.js';

const router = Router();
router.post('/orders', celebrate(createOrderSchema), ctrlWrapper(createOrder));
export default router;
