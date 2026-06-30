import { check, body } from "express-validator";
import validatorMiddleware from "../../middlewares/validation.middleware.ts";
import Coupon from "./coupon.model.ts";
import { COUPON_TYPES } from "../../constants/coupon.ts";
import { t } from "../../utils/translate.ts";

export const createCouponValidator = [
  check("name")
    .notEmpty().withMessage(t("coupon:name_required"))
    .isString().withMessage(t("coupon:name_string"))
    .isLength({ min: 3, max: 50 }).withMessage(t("coupon:name_length"))
    .custom(async (val: string) => {
      const existingCoupon = await Coupon.findOne({ name: val.toUpperCase() });
      if (existingCoupon) 
        throw new Error(t("coupon:name_exists"));
      return true;
    }),

  check("type")
    .optional()
    .isIn(Object.values(COUPON_TYPES)).withMessage(t("coupon:type_invalid")),

  check("discount")
    .notEmpty().withMessage(t("coupon:discount_required"))
    .isNumeric().withMessage(t("coupon:discount_invalid"))
    .isFloat({ min: 1 }).withMessage(t("coupon:discount_min"))
    .custom((val: number, { req }: any) => {
      if (req.body.type === COUPON_TYPES.PERCENTAGE && val > 100)
        throw new Error(t("coupon:discount_percentage"));
      return true;
    }),

  check("start_at")
    .notEmpty().withMessage(t("coupon:start_at_required"))
    .isISO8601().withMessage(t("coupon:start_at_invalid")),

  check("expire_at")
    .notEmpty().withMessage(t("coupon:expire_at_required"))
    .isISO8601().withMessage(t("coupon:expire_at_invalid"))
    .custom((val: string, { req }: any) => {
      if (new Date(val) <= new Date(req.body.start_at))
        throw new Error(t("coupon:expire_at_after"));
      return true;
    }),

  check("is_active")
    .optional()
    .isBoolean().withMessage(t("coupon:is_active_invalid")),

  validatorMiddleware,
];

export const getCouponValidator = [
  check("id").isMongoId().withMessage(t("coupon:id_invalid")),
  validatorMiddleware,
];

export const updateCouponValidator = [
  check("id").isMongoId().withMessage(t("coupon:id_invalid")),

  body("name")
    .optional()
    .isString().withMessage(t("coupon:name_string"))
    .isLength({ min: 3, max: 50 }).withMessage(t("coupon:name_length"))
    .custom(async (val: string, { req }: any) => {
      const existingCoupon = await Coupon.findOne({ name: val.toUpperCase() });
      if (existingCoupon && existingCoupon._id.toString() !== req.params?.id)
        throw new Error(t("coupon:name_in_use"));
      return true;
    }),

  body("type")
    .optional()
    .isIn(Object.values(COUPON_TYPES)).withMessage(t("coupon:type_invalid")),

  body("discount")
    .optional()
    .isNumeric().withMessage(t("coupon:discount_invalid"))
    .isFloat({ min: 1 }).withMessage(t("coupon:discount_min"))
    .custom((val: number, { req }: any) => {
      if (req.body.type === COUPON_TYPES.PERCENTAGE && val > 100)
        throw new Error(t("coupon:discount_percentage"));
      return true;
    }),

  body("start_at")
    .optional()
    .isISO8601().withMessage(t("coupon:start_at_invalid")),

  body("expire_at")
    .optional()
    .isISO8601().withMessage(t("coupon:expire_at_invalid"))
    .custom((val: string, { req }: any) => {
      if (req.body.start_at && new Date(val) <= new Date(req.body.start_at))
        throw new Error(t("coupon:expire_at_after"));
      return true;
    }),

  body("is_active")
    .optional()
    .isBoolean().withMessage(t("coupon:is_active_invalid")),

  validatorMiddleware,
];

export const deleteCouponValidator = [
  check("id").isMongoId().withMessage(t("coupon:id_invalid")),
  validatorMiddleware,
];

export const applyCouponValidator = [
  body("code")
    .notEmpty().withMessage(t("coupon:code_required"))
    .isString().withMessage(t("coupon:code_invalid")),

  body("totalPrice")
    .notEmpty().withMessage(t("coupon:total_price_required"))
    .isNumeric().withMessage(t("coupon:total_price_invalid"))
    .isFloat({ min: 0 }).withMessage(t("coupon:total_price_negative")),

  validatorMiddleware,
];