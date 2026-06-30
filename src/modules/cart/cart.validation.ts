import { check, body } from "express-validator";
import validatorMiddleware from "../../middlewares/validation.middleware.ts";
import Product from "../products/product.model.ts";
import { t } from "../../utils/translate.ts";

export const addItemToCartValidator = [
  check("productId")
    .notEmpty().withMessage(t("cart:product_id_required"))
    .isMongoId().withMessage(t("cart:product_id_invalid"))
    .custom(async (val: string) => {
      const product = await Product.findById(val);
      if (!product) 
        throw new Error(t("cart:product_not_found", { id: val }));
      if (!product.is_active) 
        throw new Error(t("cart:product_not_available"));
      return true;
    }),

  check("quantity")
    .optional()
    .isInt({ min: 1 }).withMessage(t("cart:quantity_invalid")),

  check("color")
    .optional()
    .isString().withMessage(t("cart:color_invalid")),

  validatorMiddleware,
];

export const updateCartItemValidator = [
  check("itemId")
    .notEmpty().withMessage(t("cart:item_id_required"))
    .isMongoId().withMessage(t("cart:item_id_invalid")),

  body("quantity")
    .notEmpty().withMessage(t("cart:quantity_required"))
    .isInt({ min: 1 }).withMessage(t("cart:quantity_invalid")),

  validatorMiddleware,
];

export const removeCartItemValidator = [
  check("itemId")
    .notEmpty().withMessage(t("cart:item_id_required"))
    .isMongoId().withMessage(t("cart:item_id_invalid")),

  validatorMiddleware,
];

export const applyCouponValidator = [
  body("discount")
    .notEmpty().withMessage(t("cart:discount_required"))
    .isNumeric().withMessage(t("cart:discount_invalid"))
    .isFloat({ min: 0 }).withMessage(t("cart:discount_negative")),

  validatorMiddleware,
];