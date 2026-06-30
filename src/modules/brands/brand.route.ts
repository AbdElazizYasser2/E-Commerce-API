import { Router } from "express";
import {
  createBrand,
  getBrandById,
  getAllBrands,
  updateBrand,
  deleteBrand,
} from "./brand.controller.ts";

import { protect, restrictTo } from '../../middlewares/auth.middleware.ts';

import {
  createBrandValidator,
  updateBrandValidator,
  getBrandValidator,
  deleteBrandValidator,
} from './brand.validation.ts';

const router = Router();

router.route("/")
  .get(getAllBrands)
  .post(protect, restrictTo("admin"),
    createBrandValidator,
    createBrand
  );

router.route("/:id")
  .get(getBrandValidator, getBrandById)
  .put(protect, restrictTo("admin"),
    updateBrandValidator,
    updateBrand
  )
  .delete(protect, restrictTo("admin"),
    deleteBrandValidator,
    deleteBrand
  );

export default router;