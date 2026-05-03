import express from "express";
import {
  getWishlist,
  getWishlists,
  createWishlist,
  updateWishlist,
  deleteWishlist,
} from "../controllers/wishlist.controller.js";

import { protect, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/')
  .get(protect, restrictTo('admin'), getWishlists)
  .post(protect, createWishlist);

router.route('/:id')
  .get(protect, getWishlist)
  .put(protect, updateWishlist)
  .delete(protect, deleteWishlist);

export default router;