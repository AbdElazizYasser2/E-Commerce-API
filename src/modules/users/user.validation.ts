import { body, check } from "express-validator";
import validatorMiddleware from "../../middlewares/validation.middleware.ts";
import User from "./user.model.ts";
import { t } from "../../utils/translate.ts";

export const createUserValidator = [
  check("first_name")
    .notEmpty().withMessage(t("validation:first_name_required"))
    .trim()
    .isLength({ min: 2 }).withMessage(t("validation:first_name_too_short")),

  check("last_name")
    .notEmpty().withMessage(t("validation:last_name_required"))
    .trim()
    .isLength({ min: 2 }).withMessage(t("validation:last_name_too_short")),

  check("email")
    .notEmpty().withMessage(t("validation:email_required"))
    .isEmail().withMessage(t("validation:email_invalid"))
    .custom(async (val: string) => {
      const user = await User.findOne({ email: val });
      if (user) 
        throw new Error(t("validation:email_in_use"));
      return true;
    }),

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

  check("role")
    .optional()
    .isIn(["customer", "vendor"])
    .withMessage(t("validation:role_invalid")),

  check("gender")
    .optional()
    .isIn(["male", "female"])
    .withMessage(t("validation:gender_invalid")),

  validatorMiddleware,
];

export const getUserValidator = [
  check("id").isMongoId().withMessage(t("validation:mongo_id_invalid")),
  validatorMiddleware,
];

export const updateUserValidator = [
  check("id").isMongoId().withMessage(t("validation:mongo_id_invalid")),

  body("first_name").optional().trim(),
  body("last_name").optional().trim(),

  body("email")
    .optional()
    .isEmail().withMessage(t("validation:email_invalid"))
    .custom(async (val: string, { req }: any) => {
      const user = await User.findOne({ email: val });
      if (user && user._id.toString() !== req.params?.id)
        throw new Error(t("validation:email_in_use"));
      return true;
    }),

  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA", "ar-KW"])
    .withMessage(t("validation:phone_invalid")),

  check("status")
    .optional()
    .isIn(["active", "inactive", "pending", "banned"])
    .withMessage(t("validation:status_invalid")),

  validatorMiddleware,
];

export const changeUserPasswordValidator = [
  check("id").isMongoId().withMessage(t("validation:mongo_id_invalid")),

  body("currentPassword")
    .notEmpty().withMessage(t("validation:password_current_required")),

  body("passwordConfirm")
    .notEmpty().withMessage(t("validation:password_confirm_required")),

  body("password")
    .notEmpty().withMessage(t("validation:password_new_required"))
    .custom(async (val: string, { req }: any) => {
      if (val !== req.body.passwordConfirm)
        throw new Error(t("validation:password_confirm_incorrect"));
      return true;
    }),

  validatorMiddleware,
];

export const deleteUserValidator = [
  check("id").isMongoId().withMessage(t("validation:mongo_id_invalid")),
  validatorMiddleware,
];