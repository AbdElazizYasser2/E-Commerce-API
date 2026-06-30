import { Router } from "express";
import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByBrand,
} from "./product.controller.ts";

import { protect, restrictTo } from "../../middlewares/auth.middleware.ts";

import {
  createProductValidator,
  updateProductValidator,
  getProductValidator,
  deleteProductValidator,
} from "./product.validation.ts";

const router = Router();

router.route("/")
  .get(getAllProducts)
  .post(protect, restrictTo("admin"),
    createProductValidator,
    createProduct
  );

router.route("/:id")
  .get(getProductValidator, getProductById)
  .put(protect, restrictTo("admin"),
    updateProductValidator,
    updateProduct
  )
  .delete(protect, restrictTo("admin"),
    deleteProductValidator,
    deleteProduct
  );

router.get("/category/:categoryId", getProductsByCategory);
router.get("/brand/:brandId", getProductsByBrand);

export default router;