import { Router } from "express";
import {
  getAllReviews,
  getProductReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "./review.controller.ts";

import { protect, restrictTo } from "../../middlewares/auth.middleware.ts";

import {
  createReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} from "./review.validation.ts";

const router = Router();

router.route("/")
  .get(protect, restrictTo("admin"), getAllReviews)
  .post(protect, restrictTo("customer"), createReviewValidator, createReview);

router.get("/product/:productId", getProductReviews);

router.route("/:id")
  .get(getReviewValidator, getReviewById)
  .put(protect, restrictTo("customer"), updateReviewValidator, updateReview)
  .delete(protect, restrictTo("customer", "admin"), deleteReviewValidator, deleteReview);

export default router;