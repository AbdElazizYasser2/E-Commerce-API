import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as CouponService from "./coupon.service.ts";
import sendResponse from "../../utils/sendResponse.ts";
import { t } from "../../utils/translate.ts";

export const getAllCoupons = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await CouponService.getAllCoupons(req.query as any);
    sendResponse(res, 200, t("coupon:all_fetched"), result);
  }
);

export const getCouponById = asyncHandler(
  async (req: Request, res: Response) => {
    const coupon = await CouponService.getCouponById(req.params.id as string);
    sendResponse(res, 200, t("coupon:fetched"), coupon);
  }
);

export const createCoupon = asyncHandler(
  async (req: Request, res: Response) => {
    const coupon = await CouponService.createCoupon(req.body);
    sendResponse(res, 201, t("coupon:created"), coupon);
  }
);

export const updateCoupon = asyncHandler(
  async (req: Request, res: Response) => {
    const coupon = await CouponService.updateCoupon(
      req.params.id as string,
      req.body
    );
    sendResponse(res, 200, t("coupon:updated"), coupon);
  }
);

export const deleteCoupon = asyncHandler(
  async (req: Request, res: Response) => {
    await CouponService.deleteCoupon(req.params.id as string);
    sendResponse(res, 204, t("coupon:deleted"));
  }
);

export const applyCoupon = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await CouponService.applyCoupon(
      req.body.code,
      req.body.totalPrice
    );
    sendResponse(res, 200, t("coupon:applied"), result);
  }
);