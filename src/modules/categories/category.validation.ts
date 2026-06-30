import slugify from "slugify";
import { check, body } from "express-validator";
import validatorMiddleware from '../../middlewares/validation.middleware.ts';
import Category from './category.model.ts';
import { t } from "../../utils/translate.ts";

export const createCategoryValidator = [
  check("name")
    .notEmpty().withMessage(t("category:name_required"))
    .isString().withMessage(t("category:name_string"))
    .isLength({ min: 3, max: 100 }).withMessage(t("category:name_length"))
    .custom(async (val: string, { req }: any) => {
      const existingCategory = await Category.findOne({ name: val });
      if (existingCategory) 
        throw new Error(t("category:name_exists"));
      req.body.slug = slugify(val);
      return true;
    }),

  check("parent_id")
    .optional()
    .isMongoId().withMessage(t("category:parent_id_invalid"))
    .custom(async (val: string) => {
      const parentCategory = await Category.findById(val);
      if (!parentCategory)
        throw new Error(t("category:parent_not_found", { id: val }));
      return true;
    }),

  check("description")
    .optional()
    .isString().withMessage(t("category:description_invalid")),

  check("order")
    .optional()
    .isNumeric().withMessage(t("category:order_invalid")),

  check("is_active")
    .optional()
    .isBoolean().withMessage(t("category:is_active_invalid")),

  check("is_featured")
    .optional()
    .isBoolean().withMessage(t("category:is_featured_invalid")),

  validatorMiddleware,
];

export const getCategoryValidator = [
  check("id").isMongoId().withMessage(t("category:id_invalid")),
  validatorMiddleware,
];

export const updateCategoryValidator = [
  check("id").isMongoId().withMessage(t("category:id_invalid")),

  body("name")
    .optional()
    .isString()
    .isLength({ min: 3, max: 100 })
    .custom(async (val: string, { req }: any) => {
      const existingCategory = await Category.findOne({ name: val });
      if (existingCategory && existingCategory._id.toString() !== req.params?.id)
        throw new Error(t("category:name_in_use"));
      req.body.slug = slugify(val);
      return true;
    }),

  body("parent_id")
    .optional()
    .isMongoId().withMessage(t("category:parent_id_invalid"))
    .custom(async (val: string, { req }: any) => {
      if (val === req.params?.id)
        throw new Error(t("category:parent_self"));
      const parentCategory = await Category.findById(val);
      if (!parentCategory)
        throw new Error(t("category:parent_not_found", { id: val }));
      return true;
    }),

  body("description").optional().isString(),
  body("order").optional().isNumeric(),
  body("is_active").optional().isBoolean(),
  body("is_featured").optional().isBoolean(),

  validatorMiddleware,
];

export const deleteCategoryValidator = [
  check("id").isMongoId().withMessage(t("category:id_invalid")),
  validatorMiddleware,
];