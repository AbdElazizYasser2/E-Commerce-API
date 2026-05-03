import express from "express";
import {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import { uploadSingleImage } from "../middlewares/uploadMiddleware.js";
import { processSingleImage } from "../middlewares/imageProcessingMiddleware.js";
import {
  createCategoryValidator,
  updateCategoryValidator,
  getCategoryValidator,
  deleteCategoryValidator,
} from "../validators/categoryValidator.js";

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(
    protect,
    restrictTo('admin'),
    uploadSingleImage('image'),
    processSingleImage('categories', 'image'),
    createCategoryValidator,
    createCategory
  );

router.route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(
    protect,
    restrictTo('admin'),
    uploadSingleImage('image'),
    processSingleImage('categories', 'image'),
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    protect,
    restrictTo('admin'),
    deleteCategoryValidator,
    deleteCategory
  );

export default router;