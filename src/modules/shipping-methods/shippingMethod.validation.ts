import { check, body } from "express-validator";
import validatorMiddleware from "../../middlewares/validation.middleware.ts";
import ShippingMethod from "./shippingMethod.model.ts";
import { t } from "../../utils/translate.ts";

export const createShippingMethodValidator = [
  check("name")
    .notEmpty().withMessage(t("shippingMethod:name_required"))
    .trim()
    .custom(async (val: string) => {
      const existingMethod = await ShippingMethod.findOne({ name: val });
      if (existingMethod) throw new Error(t("shippingMethod:name_exists"));
      return true;
    }),

  check("cost")
    .notEmpty().withMessage(t("shippingMethod:cost_required"))
    .isNumeric().withMessage(t("shippingMethod:cost_invalid"))
    .isFloat({ min: 0 }).withMessage(t("shippingMethod:cost_negative")),

  check("free_shipping_threshold")
    .optional()
    .isNumeric().withMessage(t("shippingMethod:threshold_invalid"))
    .isFloat({ min: 0 }).withMessage(t("shippingMethod:threshold_negative")),

  check("estimated_days_min")
    .optional()
    .isInt({ min: 0 }).withMessage(t("shippingMethod:min_days_invalid")),

  check("estimated_days_max")
    .optional()
    .isInt({ min: 0 }).withMessage(t("shippingMethod:max_days_invalid"))
    .custom((val: number, { req }: any) => {
      if (req.body.estimated_days_min && val < req.body.estimated_days_min)
        throw new Error(t("shippingMethod:max_days_greater"));
      return true;
    }),

  check("is_active")
    .optional()
    .isBoolean().withMessage(t("shippingMethod:is_active_invalid")),

  validatorMiddleware,
];

export const getShippingMethodValidator = [
  check("id").isMongoId().withMessage(t("shippingMethod:id_invalid")),
  validatorMiddleware,
];

export const updateShippingMethodValidator = [
  check("id").isMongoId().withMessage(t("shippingMethod:id_invalid")),

  body("name")
    .optional()
    .trim()
    .custom(async (val: string, { req }: any) => {
      const existingMethod = await ShippingMethod.findOne({ name: val });
      if (existingMethod && existingMethod._id.toString() !== req.params?.id)
        throw new Error(t("shippingMethod:name_in_use"));
      return true;
    }),

  body("cost")
    .optional()
    .isNumeric()
    .isFloat({ min: 0 }),

  body("estimated_days_max")
    .optional()
    .custom((val: number, { req }: any) => {
      if (req.body.estimated_days_min && val < req.body.estimated_days_min)
        throw new Error(t("shippingMethod:max_days_greater_update"));
      return true;
    }),

  validatorMiddleware,
];

export const deleteShippingMethodValidator = [
  check("id").isMongoId().withMessage(t("shippingMethod:id_invalid")),
  validatorMiddleware,
];