import express from "express";
import {
  createBrand,
  getBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.controller.js";

import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import { uploadSingleImage } from "../middlewares/uploadMiddleware.js";
import { processSingleImage } from "../middlewares/imageProcessingMiddleware.js";
import {
  createBrandValidator,
  updateBrandValidator,
  getBrandValidator,
  deleteBrandValidator,
} from "../validators/brandValidator.js";

const router = express.Router();

router.route('/')
  .get(getBrands)
  .post(
    protect,
    restrictTo('admin'),
    uploadSingleImage('logo'),
    processSingleImage('brands', 'logo'),
    createBrandValidator,
    createBrand
  );

router.route('/:id')
  .get(getBrandValidator, getBrand)
  .put(
    protect,
    restrictTo('admin'),
    uploadSingleImage('logo'),
    processSingleImage('brands', 'logo'),
    updateBrandValidator,
    updateBrand
  )
  .delete(
    protect,
    restrictTo('admin'),
    deleteBrandValidator,
    deleteBrand
  );

export default router;