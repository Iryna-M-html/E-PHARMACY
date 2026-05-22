import { Schema, model } from 'mongoose';

const createShopSchema = new Schema(
  {
    nameShop: {
      type: String,
      required: [true, 'Shop name  is required'],
      trim: true,
    },

    ownerShop: {
      type: String,
      required: [true, 'Shop owner is required'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    userPhone: { type: String, required: true },
    addressStreet: { type: String, required: true },
    city: { type: String, required: true },
    postal: { type: String, required: true },
    ownDelivery: {
      type: String,
      required: true,
      trim: true,
      default: 'no',
      enum: ['no', 'yes'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('Shop', createShopSchema);
