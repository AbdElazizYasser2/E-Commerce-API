import mongoose, { Schema } from "mongoose";

const shippingMethodSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Shipping method name is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    cost: {
      type: Number,
      required: [true, 'Shipping cost is required'],
      min: [0, 'Cost cannot be negative'],
      default: 0
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

const shippingMethod = mongoose.model("ShippingMethod", shippingMethodSchema);
export default shippingMethod;