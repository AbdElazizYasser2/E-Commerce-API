import { check, body } from "express-validator";
import validatorMiddleware from "../../middlewares/validation.middleware.ts";
import { PAYMENT_METHODS, PAYMENT_STATUS } from "../../constants/payment.ts";
import { t } from "../../utils/translate.ts";

export const createTransactionValidator = [
  check("order")
    .notEmpty().withMessage(t("payment:order_id_required"))
    .isMongoId().withMessage(t("payment:order_id_invalid")),

  check("payment_method")
    .notEmpty().withMessage(t("payment:method_required"))
    .isIn(Object.values(PAYMENT_METHODS)).withMessage(t("payment:method_invalid")),

  check("amount")
    .notEmpty().withMessage(t("payment:amount_required"))
    .isNumeric().withMessage(t("payment:amount_invalid"))
    .isFloat({ min: 0 }).withMessage(t("payment:amount_negative")),

  check("currency")
    .optional()
    .isString().withMessage(t("payment:currency_invalid"))
    .isLength({ min: 3, max: 3 }).withMessage(t("payment:currency_length")),

  check("status")
    .optional()
    .isIn(Object.values(PAYMENT_STATUS)).withMessage(t("payment:status_invalid")),

  validatorMiddleware,
];

export const getTransactionValidator = [
  check("id").isMongoId().withMessage(t("payment:id_invalid")),
  validatorMiddleware,
];

export const updateTransactionStatusValidator = [
  check("id").isMongoId().withMessage(t("payment:id_invalid")),

  body("status")
    .notEmpty().withMessage(t("payment:status_required"))
    .isIn(Object.values(PAYMENT_STATUS)).withMessage(t("payment:status_invalid")),

  body("payment_result.id")
    .optional()
    .isString().withMessage(t("payment:result_id_invalid")),

  body("payment_result.status")
    .optional()
    .isString().withMessage(t("payment:result_status_invalid")),

  body("payment_result.update_time")
    .optional()
    .isString().withMessage(t("payment:result_time_invalid")),

  body("payment_result.email_address")
    .optional()
    .isEmail().withMessage(t("payment:result_email_invalid")),

  validatorMiddleware,
];

export const getOrderTransactionsValidator = [
  check("orderId").isMongoId().withMessage(t("payment:order_id_invalid")),
  validatorMiddleware,
];