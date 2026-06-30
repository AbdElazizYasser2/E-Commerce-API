import { check, body } from "express-validator";
import validatorMiddleware from "../../middlewares/validation.middleware.ts";
import Product from "../products/product.model.ts";
import { t } from "../../utils/translate.ts";

export const createReviewValidator = [
  check("title")
    .optional()
    .isString().withMessage(t("review:title_invalid"))
    .isLength({ max: 100 }).withMessage(t("review:title_too_long")),

  check("rating")
    .notEmpty().withMessage(t("review:rating_required"))
    .isFloat({ min: 1, max: 5 }).withMessage(t("review:rating_invalid")),

  check("product")
    .notEmpty().withMessage(t("review:product_id_required"))
    .isMongoId().withMessage(t("review:product_id_invalid"))
    .custom(async (val: string) => {
      const product = await Product.findById(val);
      if (!product)
        throw new Error(t("review:product_not_found", { id: val }));
      return true;
    }),

  validatorMiddleware,
];

export const getReviewValidator = [
  check("id").isMongoId().withMessage(t("review:id_invalid")),
  validatorMiddleware,
];

export const updateReviewValidator = [
  check("id").isMongoId().withMessage(t("review:id_invalid")),

  body("title")
    .optional()
    .isString().withMessage(t("review:title_invalid"))
    .isLength({ max: 100 }).withMessage(t("review:title_too_long")),

  body("rating")
    .optional()
    .isFloat({ min: 1, max: 5 }).withMessage(t("review:rating_invalid")),

  validatorMiddleware,
];

export const deleteReviewValidator = [
  check("id").isMongoId().withMessage(t("review:id_invalid")),
  validatorMiddleware,
];