import { check, body } from "express-validator";
import validatorMiddleware from "../../middlewares/validation.middleware.ts";
import { t } from "../../utils/translate.ts";

export const registerValidator = [
  check("first_name")
    .notEmpty().withMessage(t("validation:first_name_required"))
    .isLength({ min: 2 }).withMessage(t("validation:first_name_too_short")),

  check("last_name")
    .notEmpty().withMessage(t("validation:last_name_required"))
    .isLength({ min: 2 }).withMessage(t("validation:last_name_too_short")),

  check("email")
    .notEmpty().withMessage(t("validation:email_required"))
    .isEmail().withMessage(t("validation:email_invalid")),

  check("password")
    .notEmpty().withMessage(t("validation:password_required"))
    .isLength({ min: 8 }).withMessage(t("validation:password_too_short")),

  check("passwordConfirm")
    .notEmpty().withMessage(t("validation:password_confirm_required"))
    .custom((val: string, { req }: any) => {
      if (val !== req.body.password)
        throw new Error(t("validation:password_confirm_mismatch"));
      return true;
    }),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA", "ar-KW"])
    .withMessage(t("validation:phone_invalid")),

  validatorMiddleware,
];

export const loginValidator = [
  check("email")
    .notEmpty().withMessage(t("validation:email_required"))
    .isEmail().withMessage(t("validation:email_invalid")),

  check("password")
    .notEmpty().withMessage(t("validation:password_required")),

  validatorMiddleware,
];

export const forgotPasswordValidator = [
  check("email")
    .notEmpty().withMessage(t("validation:email_required"))
    .isEmail().withMessage(t("validation:email_invalid")),

  validatorMiddleware,
];

export const verifyResetCodeValidator = [
  check("resetCode")
    .notEmpty().withMessage(t("validation:reset_code_required"))
    .isLength({ min: 6, max: 6 }).withMessage(t("validation:reset_code_digits"))
    .isNumeric().withMessage(t("validation:reset_code_numeric")),

  validatorMiddleware,
];

export const resetPasswordValidator = [
  check("email")
    .notEmpty().withMessage(t("validation:email_required"))
    .isEmail().withMessage(t("validation:email_invalid")),

  check("newPassword")
    .notEmpty().withMessage(t("validation:password_new_required"))
    .isLength({ min: 8 }).withMessage(t("validation:password_too_short")),

  check("passwordConfirm")
    .notEmpty().withMessage(t("validation:password_confirm_required"))
    .custom((val: string, { req }: any) => {
      if (val !== req.body.newPassword)
        throw new Error(t("validation:password_confirm_mismatch"));
      return true;
    }),

  validatorMiddleware,
];

export const changePasswordValidator = [
  check("currentPassword")
    .notEmpty().withMessage(t("validation:password_current_required")),

  check("newPassword")
    .notEmpty().withMessage(t("validation:password_new_required"))
    .isLength({ min: 8 }).withMessage(t("validation:password_too_short")),

  check("passwordConfirm")
    .notEmpty().withMessage(t("validation:password_confirm_required"))
    .custom((val: string, { req }: any) => {
      if (val !== req.body.newPassword)
        throw new Error(t("validation:password_confirm_mismatch"));
      return true;
    }),

  validatorMiddleware,
];