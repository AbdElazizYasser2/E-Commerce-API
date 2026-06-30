import { Document, Model } from "mongoose";
import { CouponType } from "../../constants/coupon.ts";

export interface ICoupon extends Document {
  name: string;
  type: CouponType;
  discount: number;
  start_at: Date;
  expire_at: Date;
  used_count: number;
  is_active: boolean;
  is_deleted: boolean;
}

export interface ICouponModel extends Model<ICoupon> {}