import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Coupon name is required'],
      uppercase: true,
    },
    type: {
      type: String,
      enum: ['fixed', 'percentage'],
      default: 'fixed',
    },
    discount: {
      type: Number,
      required: [true, 'Coupon discount value is required'],
      min: [1, 'Discount munst be at least 1'],
    },
    start_at: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    expire_at: {
      type: Date,
      required: [true, 'Expiration date is required'],
    },
    used_count: {
      type: Number,
      default: 0
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

couponSchema.index({ name: 1, is_active: 1, expire_at: 1 });

couponSchema.virtual('is_expired').get(function () {
  return Date.now() > this.expire_at;
});

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;