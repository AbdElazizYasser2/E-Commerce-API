import slugify from "slugify";
import { body, check } from "express-validator";
import validatorMiddleware from '../../middlewares/validation.middleware.ts';
import Brand from './brand.model.ts';
import { t } from "../../utils/translate.ts";

export const createBrandValidator = [
  check("name")
    .notEmpty().withMessage(t("brand:name_required"))
    .isLength({ min: 3, max: 100 }).withMessage(t("brand:name_length"))
    .custom(async (val: string, { req }: any) => {
      const existingBrand = await Brand.findOne({ name: val });
      if (existingBrand) 
        throw new Error(t("brand:name_exists"));
      req.body.slug = slugify(val);
      return true;
    }),

  check("logo")
    .optional()
    .isLength({ max: 255 })
    .isString().withMessage(t("brand:logo_invalid")),

  check("website")
    .optional()
    .isURL()
    .isLength({ max: 255 })
    .withMessage(t("brand:website_invalid")),

  check("description")
    .optional()
    .isString().withMessage(t("brand:description_invalid")),

  check("is_active")
    .optional()
    .isBoolean().withMessage(t("brand:is_active_invalid")),

  validatorMiddleware,
];

export const getBrandValidator = [
  check("id").isMongoId().withMessage(t("brand:id_invalid")),
  validatorMiddleware,
];

export const updateBrandValidator = [
  check("id").isMongoId().withMessage(t("brand:id_invalid")),

  body("name")
    .optional()
    .isLength({ min: 3, max: 100 }).withMessage(t("brand:name_length"))
    .custom(async (val: string, { req }: any) => {
      const existingBrand = await Brand.findOne({ name: val });
      if (existingBrand && existingBrand._id.toString() !== req.params?.id)
        throw new Error(t("brand:name_in_use"));
      req.body.slug = slugify(val);
      return true;
    }),

  body("description")
    .optional()
    .isString().withMessage(t("brand:description_invalid")),

  body("website")
    .optional()
    .isURL().withMessage(t("brand:website_invalid")),

  body("is_active")
    .optional()
    .isBoolean().withMessage(t("brand:is_active_invalid")),

  validatorMiddleware,
];

export const deleteBrandValidator = [
  check("id").isMongoId().withMessage(t("brand:id_invalid")),
  validatorMiddleware,
];