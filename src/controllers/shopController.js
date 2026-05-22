import createHttpError from 'http-errors';
import Shop from '../models/shop.js';
export const createShop = async (req, res) => {
  const {
    nameShop,
    ownerShop,
    email,
    userPhone,
    addressStreet,
    city,
    postal,
    ownDelivery,
  } = req.body;

  if (!nameShop) {
    throw createHttpError(400, "The 'Shop name' field is required");
  }

  if (!ownerShop) {
    throw createHttpError(400, "The 'ownerShop' field is required");
  }
  if (!email) {
    throw createHttpError(400, "The 'email' field is required");
  }
  if (!userPhone) {
    throw createHttpError(400, "The 'userPhone' field is required");
  }
  if (!addressStreet) {
    throw createHttpError(400, "The 'addressStreet' field is required");
  }
  if (!city) {
    throw createHttpError(400, "The 'city' field is required");
  }
  if (!postal) {
    throw createHttpError(400, "The 'postal' field is required");
  }
  if (!ownDelivery) {
    throw createHttpError(400, "The 'ownDelivery' field is required");
  }
  const existingShop = await Shop.findOne({ nameShop, ownerShop });

  if (existingShop) {
    throw createHttpError(
      409,
      'A shop with this name or name owner already exists',
    );
  }

  const category = await Shop.create({
    nameShop,
    ownerShop,
    email,
    userPhone,
    addressStreet,
    city,
    postal,
    ownDelivery,
  });

  res.status(201).json({
    success: true,
    message: 'Shop created successfully',
    category,
  });
};
