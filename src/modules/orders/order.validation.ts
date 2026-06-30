import { check, body } from "express-validator";
import validatorMiddleware from "../../middlewares/validation.middleware.ts";
import { t } from "../../utils/translate.ts";

export const createOrderValidator = [
  check("cartItems")
    .notEmpty().withMessage(t("order:cart_items_required"))
    .isArray({ min: 1 }).withMessage(t("order:cart_items_min")),

  check("cartItems.*.product")
    .notEmpty().withMessage(t("order:product_id_required"))
    .isMongoId().withMessage(t("order:product_id_invalid")),

  check("cartItems.*.quantity")
    .notEmpty().withMessage(t("order:quantity_required"))
    .isInt({ min: 1 }).withMessage(t("order:quantity_min")),

  check("cartItems.*.color")
    .optional()
    .isString().withMessage(t("order:color_invalid")),

  check("shippingAddress")
    .notEmpty().withMessage(t("order:shipping_address_required")),

  check("shippingAddress.phone")
    .notEmpty().withMessage(t("order:phone_required"))
    .isMobilePhone(["ar-EG", "ar-SA", "ar-KW"])
    .withMessage(t("order:phone_invalid")),

  check("shippingAddress.city")
    .notEmpty().withMessage(t("order:city_required")),

  check("shippingAddress.details")
    .notEmpty().withMessage(t("order:details_required")),

  check("shippingAddress.postalCode")
    .optional()
    .isPostalCode("any").withMessage(t("order:postal_code_invalid")),

  check("shipping_cost")
    .optional()
    .isNumeric().withMessage(t("order:shipping_cost_invalid"))
    .isFloat({ min: 0 }).withMessage(t("order:shipping_cost_negative")),

  check("paymentMethodType")
    .optional()
    .isIn(["card", "cash"]).withMessage(t("order:payment_method_invalid")),

  check("coupon_code")
    .optional()
    .isString().withMessage(t("order:coupon_code_invalid")),

  check("discount")
    .optional()
    .isNumeric().withMessage(t("order:discount_invalid"))
    .isFloat({ min: 0 }).withMessage(t("order:discount_negative")),

  check("notes")
    .optional()
    .isString().withMessage(t("order:notes_invalid")),

  validatorMiddleware,
];

export const getOrderValidator = [
  check("id").isMongoId().withMessage(t("order:id_invalid")),
  validatorMiddleware,
];

export const updateOrderStatusValidator = [
  check("id").isMongoId().withMessage(t("order:id_invalid")),

  body("status")
    .notEmpty().withMessage(t("order:status_required"))
    .isIn(["pending", "processing", "shipped", "delivered", "cancelled", "failed"])
    .withMessage(t("order:status_invalid")),

  validatorMiddleware,
];

export const updatePaymentStatusValidator = [
  check("id").isMongoId().withMessage(t("order:id_invalid")),

  body("payment_status")
    .notEmpty().withMessage(t("order:payment_status_required"))
    .isIn(["pending", "paid", "failed", "refunded"])
    .withMessage(t("order:payment_status_invalid")),

  validatorMiddleware,
];

export const cancelOrderValidator = [
  check("id").isMongoId().withMessage(t("order:id_invalid")),
  validatorMiddleware,
];

export const deleteOrderValidator = [
  check("id").isMongoId().withMessage(t("order:id_invalid")),
  validatorMiddleware,
];