import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validation.middleware.ts";
import Product from "../products/product.model.ts";
import { t } from "../../utils/translate.ts";

export const addProductToWishlistValidator = [
  check("productId")
    .notEmpty().withMessage(t("wishlist:product_id_required"))
    .isMongoId().withMessage(t("wishlist:product_id_invalid"))
    .custom(async (val: string) => {
      const product = await Product.findById(val);
      if (!product) 
        throw new Error(t("wishlist:product_not_found", { id: val }));
      return true;
    }),

  validatorMiddleware,
];

export const removeProductFromWishlistValidator = [
  check("productId")
    .isMongoId().withMessage(t("wishlist:product_id_invalid")),

  validatorMiddleware,
];