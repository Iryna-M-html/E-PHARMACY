import { celebrate } from 'celebrate';
import { Router } from 'express';

import { createShopSchema } from '../validations/shopsValidation/js';
import { ctrlWrapper } from '../utils/ctrlWrapper';
const router = Router();
router.post(
  '/create-shop',
  celebrate(createShopSchema),
  ctrlWrapper(createShop),
);
export default router;
