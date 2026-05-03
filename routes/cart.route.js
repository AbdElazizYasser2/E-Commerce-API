import express from "express";
import {
  getCarts,
  getCart,
  deleteCart,
} from "../controllers/cart.controller.js";

import { protect, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/')
  .get(protect, restrictTo('admin'), getCarts);

router.route('/:id')
  .get(protect, getCart)
  .delete(protect, deleteCart);

export default router;