import { body } from "express-validator";
import validatorMiddleware from "../../middlewares/validation.middleware.ts";
import { t } from "../../utils/translate.ts";

export const updateSettingsValidator = [
  body("language")
    .optional()
    .isIn(["ar", "en"]).withMessage(t("setting:language_invalid")),

  body("currency")
    .optional()
    .isIn(["EGP", "USD", "SAR"]).withMessage(t("setting:currency_invalid")),

  body("timezone")
    .optional()
    .isString().withMessage(t("setting:timezone_invalid")),

  body("notifications.email").optional().isBoolean(),
  body("notifications.sms").optional().isBoolean(),
  body("notifications.push").optional().isBoolean(),
  body("notifications.order_updates").optional().isBoolean(),
  body("notifications.promotions").optional().isBoolean(),

  body("privacy.show_profile").optional().isBoolean(),
  body("privacy.show_orders").optional().isBoolean(),

  validatorMiddleware,
];

export const updateLanguageValidator = [
  body("language")
    .notEmpty().withMessage(t("setting:language_required"))
    .isIn(["ar", "en"]).withMessage(t("setting:language_invalid")),

  validatorMiddleware,
];

export const updateCurrencyValidator = [
  body("currency")
    .notEmpty().withMessage(t("setting:currency_required"))
    .isIn(["EGP", "USD", "SAR"]).withMessage(t("setting:currency_invalid")),

  validatorMiddleware,
];