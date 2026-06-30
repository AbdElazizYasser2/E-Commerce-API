import mongoose, { Schema } from "mongoose";
import { COUPON_TYPES } from "../../constants/coupon.ts";
import { ICoupon, ICouponModel } from "./coupon.interface.ts";

const couponSchema = new Schema<ICoupon, ICouponModel>(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: [true, "Coupon name is required"],
    },

    type: {
      type: String,
      enum: Object.values(COUPON_TYPES),
      default: COUPON_TYPES.FIXED,
    },

    discount: {
      type: Number,
      min: [1, "Discount must be at least 1"],
      required: [true, "Coupon discount value is required"],
    },

    start_at: {
      type: Date,
      required: [true, "Start date is required"],
    },

    expire_at: {
      type: Date,
      required: [true, "Expiration date is required"],
    },

    used_count: {
      type: Number,
      default: 0,
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    is_deleted: {
      type: Boolean,
      default: false,
      select: false,
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

couponSchema.index({ name: 1, is_active: 1, expire_at: 1 });

couponSchema.virtual("is_expired").get(function () {
  return Date.now() > this.expire_at.getTime();
});

const Coupon = mongoose.model<ICoupon, ICouponModel>(
  "Coupon", 
  couponSchema
);
export default Coupon;