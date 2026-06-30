import mongoose, { Schema } from "mongoose";
import { IShippingMethod, IShippingMethodModel } from "./shippingMethod.interface.ts";

const shippingMethodSchema = new Schema<IShippingMethod, IShippingMethodModel>(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Shipping Method name is required'],
    },

    description: {
      type: String,
      trim: true,
    },

    cost: {
      type: Number,
      min: [0, 'Cost cannot be negative'],
      required: [true, 'Shipping cost is required'],
      default: 0,
    },

    free_shipping_threshold: {
      type: Number,
      default: null,
    },

    estimated_days_min: {
      type: Number,
      min: [0, 'Days cannot be negative'],
    },

    estimated_days_max: {
      type: Number,
      min: [0, 'Days cannot be negative'],
    },

    is_active: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true, 
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

shippingMethodSchema.virtual('delivery_time').get(function () {
  if (this.estimated_days_min && this.estimated_days_max) {
    return `${this.estimated_days_min}-${this.estimated_days_max} days`;
  }
  return 'Not specified';
});

const shippingMethod = mongoose.model<IShippingMethod, IShippingMethodModel>(
  "ShippingMethod", 
  shippingMethodSchema
);
export default shippingMethod;