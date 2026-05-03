import express from "express";
import {
  createCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
} from "../controllers/coupon.controller.js";

import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import {
  createCouponValidator,
  updateCouponValidator,
  getCouponValidator,
  deleteCouponValidator,
} from "../validators/couponValidator.js";

const router = express.Router();

router.use(protect, restrictTo('admin'));

router.route('/')
  .get(getCoupons)
  .post(createCouponValidator, createCoupon);

router.route('/:id')
  .get(getCouponValidator, getCoupon)
  .put(updateCouponValidator, updateCoupon)
  .delete(deleteCouponValidator, deleteCoupon);

export default router;