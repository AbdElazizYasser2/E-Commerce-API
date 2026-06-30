import { Router } from "express";
import {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
} from "./coupon.controller.ts";

import { protect, restrictTo } from "../../middlewares/auth.middleware.ts";

import {
  createCouponValidator,
  getCouponValidator,
  updateCouponValidator,
  deleteCouponValidator,
  applyCouponValidator,
} from "./coupon.validation.ts";

const router = Router();

router.route("/")
  .get(protect, restrictTo("admin"), getAllCoupons)
  .post(protect, restrictTo("admin"), createCouponValidator, createCoupon);

router.post("/apply", protect, applyCouponValidator, applyCoupon);

router.route("/:id")
  .get(protect, restrictTo("admin"), getCouponValidator, getCouponById)
  .put(protect, restrictTo("admin"), updateCouponValidator, updateCoupon)
  .delete(protect, restrictTo("admin"), deleteCouponValidator, deleteCoupon);

export default router;