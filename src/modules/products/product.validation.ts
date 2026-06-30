import { check, body } from "express-validator";
import slugify from "slugify";
import validatorMiddleware from "../../middlewares/validation.middleware.ts";
import Product from './product.model.ts';
import Category from '../categories/category.model.ts';
import Brand from '../brands/brand.model.ts';
import { t } from "../../utils/translate.ts";

export const createProductValidator = [
  check("name")
    .notEmpty().withMessage(t("product:name_required"))
    .isString().withMessage(t("product:name_string"))
    .isLength({ min: 3 }).withMessage(t("product:name_too_short"))
    .custom(async (val: string, { req }: any) => {
      const existingProduct = await Product.findOne({ name: val });
      if (existingProduct) throw new Error(t("product:name_exists"));
      req.body.slug = slugify(val);
      return true;
    }),

  check("sku")
    .notEmpty().withMessage(t("product:sku_required"))
    .custom(async (val: string) => {
      const existingSku = await Product.findOne({ sku: val.toUpperCase() });
      if (existingSku) throw new Error(t("product:sku_exists"));
      return true;
    }),

  check("description")
    .notEmpty().withMessage(t("product:description_required"))
    .isLength({ min: 20 }).withMessage(t("product:description_too_short")),

  check("price")
    .notEmpty().withMessage(t("product:price_required"))
    .isNumeric().withMessage(t("product:price_invalid"))
    .isFloat({ max: 1000000 }).withMessage(t("product:price_too_high")),

  check("compare_price")
    .optional()
    .isNumeric().withMessage(t("product:compare_price_invalid"))
    .custom((val: number, { req }: any) => {
      if (val <= req.body.price)
        throw new Error(t("product:compare_price_greater"));
      return true;
    }),

  check("quantity")
    .optional()
    .isNumeric().withMessage(t("product:quantity_invalid"))
    .isInt({ min: 0 }).withMessage(t("product:quantity_negative")),

  check("category")
    .notEmpty().withMessage(t("product:category_required"))
    .isMongoId().withMessage(t("product:category_id_invalid"))
    .custom(async (val: string) => {
      const category = await Category.findById(val);
      if (!category) throw new Error(t("product:category_not_found", { id: val }));
      return true;
    }),

  check("brand")
    .optional()
    .isMongoId().withMessage(t("product:brand_id_invalid"))
    .custom(async (val: string) => {
      const brand = await Brand.findById(val);
      if (!brand) throw new Error(t("product:brand_not_found", { id: val }));
      return true;
    }),

  check("stock_status")
    .optional()
    .isIn(["in_stock", "out_of_stock", "on_backorder"])
    .withMessage(t("product:stock_status_invalid")),

  validatorMiddleware,
];

export const getProductValidator = [
  check("id").isMongoId().withMessage(t("product:id_invalid")),
  validatorMiddleware,
];

export const updateProductValidator = [
  check("id").isMongoId().withMessage(t("product:id_invalid")),

  body("name")
    .optional()
    .custom(async (val: string, { req }: any) => {
      const existingProduct = await Product.findOne({ name: val });
      if (existingProduct && existingProduct._id.toString() !== req.params?.id)
        throw new Error(t("product:name_in_use"));
      req.body.slug = slugify(val);
      return true;
    }),

  body("price").optional().isNumeric(),

  body("compare_price")
    .optional()
    .isNumeric()
    .custom((val: number, { req }: any) => {
      if (req.body.price && val <= req.body.price)
        throw new Error(t("product:compare_price_greater"));
      return true;
    }),

  body("category").optional().isMongoId(),
  body("brand").optional().isMongoId(),

  validatorMiddleware,
];

export const deleteProductValidator = [
  check("id").isMongoId().withMessage(t("product:id_invalid")),
  validatorMiddleware,
];