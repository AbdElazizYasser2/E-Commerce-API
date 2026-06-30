import { Router } from "express";
import {
  createCategory,
  getCategoryById,
  getAllCategories,
  getSubcategories,
  updateCategory,
  deleteCategory,
} from "./category.controller.ts";

import { protect, restrictTo } from "../../middlewares/auth.middleware.ts";

import {
  createCategoryValidator,
  updateCategoryValidator,
  getCategoryValidator,
  deleteCategoryValidator,
} from './category.validation.ts';

const router = Router();

router.route("/")
  .get(getAllCategories)
  .post(protect, restrictTo("admin"),
    createCategoryValidator,
    createCategory
  );

router.route("/:id")
  .get(getCategoryValidator, getCategoryById)
  .put(protect, restrictTo("admin"),
    updateCategoryValidator,
    updateCategory
  )
  .delete(protect, restrictTo("admin"),
    deleteCategoryValidator,
    deleteCategory
  );

router.get("/:id/subcategories", getCategoryValidator, getSubcategories);

export default router;