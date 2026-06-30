import { check, body } from "express-validator";
import validatorMiddleware from "../../middlewares/validation.middleware.ts";
import { t } from "../../utils/translate.ts";

export const createAddressValidator = [
  check("first_name")
    .notEmpty().withMessage(t("address:first_name_required"))
    .trim(),

  check("last_name")
    .notEmpty().withMessage(t("address:last_name_required"))
    .trim(),

  check("email")
    .optional()
    .isEmail().withMessage(t("validation:email_invalid")),

  check("phone")
    .notEmpty().withMessage(t("address:phone_required"))
    .isMobilePhone(["ar-EG", "ar-SA", "ar-KW"])
    .withMessage(t("address:phone_invalid")),

  check("address_line1")
    .notEmpty().withMessage(t("address:address_line1_required")),

  check("city")
    .notEmpty().withMessage(t("address:city_required")),

  check("postal_code")
    .notEmpty().withMessage(t("address:postal_code_required")),

  check("type")
    .optional()
    .isIn(["shipping", "billing", "both"])
    .withMessage(t("address:type_invalid")),

  check("is_default")
    .optional()
    .isBoolean().withMessage(t("address:is_default_invalid")),

  validatorMiddleware,
];

export const getAddressValidator = [
  check("id").isMongoId().withMessage(t("address:id_invalid")),
  validatorMiddleware,
];

export const updateAddressValidator = [
  check("id").isMongoId().withMessage(t("address:id_invalid")),

  body("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA", "ar-KW"])
    .withMessage(t("address:phone_invalid")),

  body("email")
    .optional()
    .isEmail().withMessage(t("validation:email_invalid")),

  body("type")
    .optional()
    .isIn(["shipping", "billing", "both"])
    .withMessage(t("address:type_invalid")),

  body("is_default")
    .optional()
    .isBoolean().withMessage(t("address:is_default_invalid")),

  validatorMiddleware,
];

export const deleteAddressValidator = [
  check("id").isMongoId().withMessage(t("address:id_invalid")),
  validatorMiddleware,
];