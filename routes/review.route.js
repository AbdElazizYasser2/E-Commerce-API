import express from "express";
import {
  createReview,
  getReview,
  getReviews,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import {
  createReviewValidator,
  updateReviewValidator,
  getReviewValidator,
  deleteReviewValidator,
} from "../validators/reviewValidator.js";

const router = express.Router();

router.route('/')
  .get(getReviews)
  .post(
    protect,
    restrictTo('customer'),
    createReviewValidator,
    createReview
  );

router.route('/:id')
  .get(getReviewValidator, getReview)
  .put(
    protect,
    restrictTo('customer'),
    updateReviewValidator,
    updateReview
  )
  .delete(
    protect,
    restrictTo('customer', 'admin'),
    deleteReviewValidator,
    deleteReview
  );

export default router;