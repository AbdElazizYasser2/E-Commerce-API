import Coupon from "./coupon.model.ts";
import { ICoupon } from "./coupon.interface.ts";
import ApiError from "../../utils/ApiError.ts";
import ApiFeatures, { QueryString } from "../../utils/ApiFeatures.ts";
import { COUPON_TYPES } from "../../constants/coupon.ts";
import { t } from "../../utils/translate.ts";

export const getAllCoupons = async (queryString: QueryString) => {
  const totalDocs = await Coupon.countDocuments({ is_deleted: false });
  const features = new ApiFeatures<ICoupon>(Coupon.find({ is_deleted: false }), queryString)
    .filter()
    .sort()
    .limitFields()
    .paginate(totalDocs);

  const coupons = await features.query;
  return {
    results: coupons.length,
    pagination: features.paginationResult,
    data: coupons,
  };
};

export const getCouponById = async (id: string) => {
  const coupon = await Coupon.findOne({ _id: id, is_deleted: false });
  if (!coupon) 
    throw new ApiError(t("coupon:not_found", { id }), 404);
  return coupon;
};

export const createCoupon = async (data: Partial<ICoupon>) => {
  const coupon = await Coupon.create(data);
  return coupon;
};

export const updateCoupon = async (id: string, data: Partial<ICoupon>) => {
  const coupon = await Coupon.findOneAndUpdate(
    { _id: id, is_deleted: false },
    data,
    { new: true }
  );
  if (!coupon) 
    throw new ApiError(t("coupon:not_found", { id }), 404);
  return coupon;
};

export const deleteCoupon = async (id: string) => {
  const coupon = await Coupon.findOneAndUpdate(
    { _id: id, is_deleted: false },
    { is_deleted: true },
    { new: true }
  );
  if (!coupon) 
    throw new ApiError(t("coupon:not_found", { id }), 404);
};

export const applyCoupon = async (code: string, totalPrice: number) => {
  const coupon = await Coupon.findOne({
    name: code.toUpperCase(),
    is_active: true,
    is_deleted: false,
    start_at: { $lte: new Date() },
    expire_at: { $gte: new Date() },
  });

  if (!coupon) 
    throw new ApiError(t("coupon:invalid"), 400);

  let discount = 0;
  if (coupon.type === COUPON_TYPES.PERCENTAGE) {
    discount = Math.round(((totalPrice * coupon.discount) / 100) * 100) / 100;
  } else {
    discount = coupon.discount;
  }

  if (discount >= totalPrice)
    throw new ApiError(t("coupon:discount_exceeds"), 400);

  await Coupon.findByIdAndUpdate(coupon._id, { $inc: { used_count: 1 } });

  return {
    discount,
    totalAfterDiscount: Math.round((totalPrice - discount) * 100) / 100,
  };
};