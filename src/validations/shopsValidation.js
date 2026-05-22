import { Joi, Segments } from 'celebrate';
export const createShopSchema = {
  [Segments.BODY]: Joi.object({
    nameShop: Joi.string().trim().required(),
    ownerShop: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    userPhone: Joi.string().email().required(),
    addressStreet: Joi.string().email().required(),
    city: Joi.string().email().required(),
    postal: Joi.string().email().required(),
    ownDelivery: Joi.string().email().required(),
  }),
};
