export const COUPON_TYPES = {
  FIXED: "fixed",
  PERCENTAGE: "percentage",
} as const;

export type CouponType = (typeof COUPON_TYPES)[keyof typeof COUPON_TYPES];
