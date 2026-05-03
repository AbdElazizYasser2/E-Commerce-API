import express from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import { uploadMultipleImages } from "../middlewares/uploadMiddleware.js";
import { processMultipleImages } from "../middlewares/imageProcessingMiddleware.js";
import {
  createProductValidator,
  updateProductValidator,
  getProductValidator,
  deleteProductValidator,
} from "../validators/productValidator.js";

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(
    protect,
    restrictTo('admin'),
    uploadMultipleImages([
      { name: 'image', maxCount: 1 },
      { name: 'images', maxCount: 5 },
    ]),
    processMultipleImages('products'),
    createProductValidator,
    createProduct
  );

router.route('/:id')
  .get(getProductValidator, getProduct)
  .put(
    protect,
    restrictTo('admin'),
    uploadMultipleImages([
      { name: 'image', maxCount: 1 },
      { name: 'images', maxCount: 5 },
    ]),
    processMultipleImages('products'),
    updateProductValidator,
    updateProduct
  )
  .delete(
    protect,
    restrictTo('admin'),
    deleteProductValidator,
    deleteProduct
  );

export default router;